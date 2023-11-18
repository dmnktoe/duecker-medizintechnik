export default function Chatwoot({
  CHATWOOT_ID,
}: {
  CHATWOOT_ID: string | undefined;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        id='chatwoot'
        type='text/plain'
        data-cookieconsent='statistics'
        dangerouslySetInnerHTML={{
          __html: `
            window.chatwootSettings = {"position":"right","type":"expanded_bubble","launcherTitle":"Chatten Sie mit uns"};
            (function(d,t) {
              var BASE_URL="https://chat.duecker-medizintechnik.de";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.defer = true;
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: "${CHATWOOT_ID}",
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
            `,
        }}
      />
    </>
  );
}
