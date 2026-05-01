import * as React from 'react';

const IntlContext = React.createContext({ locale: 'de', messages: {} });

function resolveKey(obj, key) {
  if (!obj) return undefined;
  const parts = key.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

function makeT(nsMessages) {
  function t(key, params) {
    const value = resolveKey(nsMessages || {}, key);
    if (value === undefined) return key;
    if (typeof value !== 'string') return key;
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, name) =>
        params[name] !== undefined ? String(params[name]) : '{' + name + '}',
      );
    }
    return value;
  }

  t.rich = function (key) {
    const value = resolveKey(nsMessages || {}, key);
    if (typeof value === 'string') return value;
    return key;
  };

  t.raw = function (key) {
    return resolveKey(nsMessages || {}, key);
  };

  return t;
}

function NextIntlClientProvider({ locale, messages, children }) {
  return React.createElement(
    IntlContext.Provider,
    { value: { locale: locale || 'de', messages: messages || {} } },
    children,
  );
}

function useTranslations(namespace) {
  const { messages } = React.useContext(IntlContext);
  const nsMessages = namespace ? messages[namespace] : messages;
  return makeT(nsMessages);
}

function useLocale() {
  const { locale } = React.useContext(IntlContext);
  return locale;
}

async function getTranslations() {
  return makeT({});
}

export { NextIntlClientProvider, getTranslations, useLocale, useTranslations };
