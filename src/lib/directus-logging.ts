import { directusUrl } from '@/constant/env';

type DirectusErrorShape = {
  errors?: Array<{
    message?: string;
    extensions?: { code?: string };
  }>;
  response?: {
    status?: number;
    statusText?: string;
  };
  message?: string;
  status?: number;
};

export type DirectusClientErrorSummary = {
  message: string;
  status?: number;
  code?: string;
};

export function formatDirectusClientError(
  error: unknown,
): DirectusClientErrorSummary {
  const e = error as DirectusErrorShape;
  const status = e?.response?.status ?? e?.status;
  const directusErrors = e?.errors;
  const message =
    directusErrors?.[0]?.message ??
    (error instanceof Error ? error.message : String(error));
  const code = directusErrors?.[0]?.extensions?.code;
  return { message, status, code };
}

export function logDirectusError(
  source: string,
  error: unknown,
  context: Record<string, unknown> = {},
): void {
  const { message, status, code } = formatDirectusClientError(error);

  const hint = (() => {
    if (status === 401) {
      return 'Auth failed. Check that DIRECTUS_API_TOKEN is set and that the user owning that token still has read access on the collection.';
    }
    if (status === 403) {
      return 'Forbidden. The role/policy attached to the API token (or the public role for unauthenticated calls) does not allow reading the requested collection or related collections (e.g. directus_files, authors, categories).';
    }
    if (status === 404) {
      return 'Not found. Either the collection does not exist (check the collection name in Directus) or NEXT_PUBLIC_DIRECTUS_URL is wrong.';
    }
    if (code === 'INVALID_QUERY' || code === 'INVALID_PAYLOAD') {
      return 'The request was rejected by Directus – usually because a field name in the `fields` array does not exist on the collection. Cross-check the names with Directus Studio.';
    }
    if (
      status === 500 &&
      /column .* does not exist|relation .* does not exist/i.test(message)
    ) {
      return 'Directus returned HTTP 500 from the database (e.g. unknown column). The instance was reached; fix the collection schema or the requested fields — this is not a CORS/connectivity issue.';
    }
    if (status !== undefined && status >= 500) {
      return 'Directus returned a server error (HTTP 5xx). Check Directus and database logs on the CMS host.';
    }
    if (!directusUrl) {
      return 'NEXT_PUBLIC_DIRECTUS_URL is not configured.';
    }
    return 'Cannot reach Directus. Check that NEXT_PUBLIC_DIRECTUS_URL is correct and reachable from the server, and that CORS_ORIGIN includes your frontend host.';
  })();

  // eslint-disable-next-line no-console
  console.error(
    `[directus][${source}] ${message}` +
      (status ? ` (HTTP ${status})` : '') +
      (code ? ` [${code}]` : ''),
    {
      hint,
      directusUrl,
      context,
    },
  );
}
