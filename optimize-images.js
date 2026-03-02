import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

await imagemin(
  ["src/bilder/*.{jpg,jpeg,png}"],
  {
    destination: "src/bilder-optimized",
    plugins: [
      imageminWebp({
        quality: 75
      })
    ]
  }
);

console.log("Bilder optimerade till WebP");
