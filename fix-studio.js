const sharp = require('sharp');

sharp('public/images/studio.jpg')
  .rotate() // auto-rotates based on EXIF orientation
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile('public/images/studio.webp')
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
