// Builds square logo assets from the wordmark (assets/LOGO.png).
import sharp from "sharp";
const SRC = process.argv[2] ?? "assets/LOGO.png";
const trimmed = await sharp(SRC).trim({ threshold: 40 }).png().toBuffer();
async function square(size, pad, out, bg) {
  const inner = Math.round(size * (1 - pad * 2));
  const word = await sharp(trimmed).resize(inner, inner, { fit: "inside", background: bg }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: word, gravity: "center" }]).png({ compressionLevel: 9 }).toFile(out);
}
const white = { r: 255, g: 255, b: 255, alpha: 1 };
await square(640, 0.1, "public/logo.png", white);
await square(256, 0.08, "src/app/icon.png", white);
await square(180, 0.08, "src/app/apple-icon.png", white);
console.log("logo assets written");
