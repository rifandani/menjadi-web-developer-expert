/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  if (image.includes('hero')) {
    // convert hero image lebar 1200px
    sharp(`${target}/${image}`)
      .resize(1200)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-1200.jpg`,
        ),
      );

    // convert hero image lebar 1000px
    sharp(`${target}/${image}`)
      .resize(1000)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-1000.jpg`,
        ),
      );

    // convert hero image lebar 600px
    sharp(`${target}/${image}`)
      .resize(600)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-600.jpg`,
        ),
      );
  } else {
    // convert loading image lebar 400px
    sharp(`${target}/${image}`)
      .resize(400)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-400.jpg`,
        ),
      );

    // convert loading image lebar 300px
    sharp(`${target}/${image}`)
      .resize(300)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-300.jpg`,
        ),
      );

    // convert loading image lebar 200px
    sharp(`${target}/${image}`)
      .resize(200)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-200.jpg`,
        ),
      );
  }
});
