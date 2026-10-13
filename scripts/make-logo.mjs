// Builds transparent-background logo assets from the wordmark (assets/LOGO.png).
// White is converted to alpha; the ink colour is the brand orange.
import sharp from "sharp";
const SRC = process.argv[2] ?? "assets/LOGO.png";
const INK = { r: 232, g: 73, b: 12 };

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < info.width * info.height; i++) {
  const b = data[i * 3 + 2];
  const a = Math.max(0, Math.min(255, Math.round(((255 - b) / (255 - INK.b)) * 255)));
  rgba[i * 4] = INK.r; rgba[i * 4 + 1] = INK.g; rgba[i * 4 + 2] = INK.b;
  rgba[i * 4 + 3] = a < 12 ? 0 : a;
}
const word = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 }).png().toBuffer();

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
async function square(size, pad, out) {
  const inner = Math.round(size * (1 - pad * 2));
  const w = await sharp(word).resize(inner, inner, { fit: "inside", background: clear }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: clear } })
    .composite([{ input: w, gravity: "center" }]).png({ compressionLevel: 9 }).toFile(out);
}
await square(640, 0.04, "public/logo.png");
await square(256, 0.06, "src/app/icon.png");
await square(180, 0.06, "src/app/apple-icon.png");
console.log("logo assets written");
