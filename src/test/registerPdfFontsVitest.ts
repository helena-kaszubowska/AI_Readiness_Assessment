import path from "path";
import { fileURLToPath } from "url";
import { Font } from "@react-pdf/renderer";

const filesDir = path.join(
  fileURLToPath(new URL(".", import.meta.url)),
  "../../node_modules/@fontsource/roboto/files",
);

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: path.join(filesDir, "roboto-latin-ext-400-normal.woff"),
      fontWeight: 400,
    },
    {
      src: path.join(filesDir, "roboto-latin-ext-700-normal.woff"),
      fontWeight: 700,
    },
  ],
});
