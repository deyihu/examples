import { getExampleByKey, getHtmlCodeTitle } from "@/utils";
import { useAsync, useMount } from "react-use";

import { useLocation } from "react-router-dom";
import { useState } from "react";

const urlTemplate = `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`;
const attribution =
  "&copy; <a href='http://osm.org'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/'>CARTO</a>";

export function useRawPage() {
  const location = useLocation();
  const [code, setCode] = useState("");

  const paths = location.pathname.split("/");
  const language = paths[3] as Language;

  useMount(() => {
    const example = getExampleByKey(`${paths[4]}_${paths[5]}_${paths[6]}`);
    document.title = `maptalks - ${example.title[language!]}`;
  });

  useAsync(async () => {
    const title = getHtmlCodeTitle(
      `${paths[4]}_${paths[5]}_${paths[6]}`,
      language
    );
    const cssCode = (
      await import(
        `../../../codes/${paths[4]}/${paths[5]}/${paths[6]}/index.css?raw`
      )
    ).default;
    const htmlCode = (
      await import(
        `../../../codes/${paths[4]}/${paths[5]}/${paths[6]}/index.html?raw`
      )
    ).default;
    const jsCode = (
      await import(
        `../../../codes/${paths[4]}/${paths[5]}/${paths[6]}/index.js?raw`
      )
    ).default;
    const code = `<!DOCTYPE html>
    <html>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>${title}</title>
      <style type='text/css'>
        ${cssCode.replaceAll("{res}", "/resources")}
      </style>
      <link rel='stylesheet' href='https://unpkg.com/maptalks/dist/maptalks.css' />
      <script type='text/javascript' src='https://unpkg.com/maptalks/dist/maptalks.min.js'></script>
      <script type='text/javascript' src='https://maptalks.com/api/maptalks-gl-layers.js'></script>
      <body>
        ${htmlCode}
        <script>
          ${jsCode
            .replaceAll("{urlTemplate}", urlTemplate)
            .replaceAll("{attribution}", attribution)
            .replaceAll("{res}", "/resources")}
        </script>
      </body>
    </html>`;
    setCode(code);
  });

  return {
    code,
  };
}
