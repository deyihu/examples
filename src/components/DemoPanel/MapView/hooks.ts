import { ATTRIBUTION, RESOURCE_PATH, URL_TEMPLATE } from "@/constants";

import { getHtmlCodeTitle } from "@/utils";
import { useAsync } from "react-use";
import { useStore } from "@/store";

export function useMapView() {
  const store = useStore();

  const title = getHtmlCodeTitle(store.selectedKey, store.language);

  useAsync(async () => {
    if (store.selectedKey) {
      const paths = store.selectedKey.split("_");
      const cssCode = (
        await import(
          `../../../../codes/${paths[0]}/${paths[1]}/${paths[2]}/index.css?raw`
        )
      ).default;
      const htmlCode = (
        await import(
          `../../../../codes/${paths[0]}/${paths[1]}/${paths[2]}/index.html?raw`
        )
      ).default;
      const jsCode = (
        await import(
          `../../../../codes/${paths[0]}/${paths[1]}/${paths[2]}/index.js?raw`
        )
      ).default;
      const code = `<!DOCTYPE html>
      <html>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>${title}</title>
        <style type='text/css'>
          ${cssCode.replaceAll("{res}", RESOURCE_PATH)}
        </style>
        <link rel='stylesheet' href='https://unpkg.com/maptalks/dist/maptalks.css' />
        <script type='text/javascript' src='https://unpkg.com/maptalks/dist/maptalks.min.js'></script>
        <script type='text/javascript' src='https://maptalks.com/api/maptalks-gl-layers.js'></script>
        <body>
          ${htmlCode}
          <script>
            ${jsCode
              .replaceAll("{urlTemplate}", URL_TEMPLATE)
              .replaceAll("{attribution}", ATTRIBUTION)
              .replaceAll("{res}", RESOURCE_PATH)}
          </script>
        </body>
      </html>`;
      store.setCode(code);
    } else {
      store.setCode("");
    }
  }, [store.selectedKey, store.language]);

  return {
    code: store.code,
  };
}