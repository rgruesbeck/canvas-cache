# Canvas Cache
An image cache for canvas and key-value store for [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) objects. Usefull for fast draws in browser games with the `putImageData()` method.

## Install
```sh
npm install --save canvas-cache
```

## Use
```js
import canvasCache from 'canvas-cache';

// create cache instance
const cache = canvasCache();

/*
  your game draw method
*/
```

### Methods

#### has()
`cache.has({ key, width, height })`

Returns boolean if image with matching `key`, `width`, and `height` exists.

#### get()
`cache.get({ key, width, height })`

Returns matching `ImageData` object or `undefined`.

#### set()
`cache.set({ image, key, width, height })`

Sets new image and returns a new `ImageData` object.

#### delete()
`cache.delete({ key, width, height })`

Deletes matching image and returns boolean.

#### clear()
`cache.clear()`

Clear cache of all images.

## Example
```js
import canvasCache from 'canvas-cache';

// create cache instance
const cache = canvasCache();

// add image
cache.set({
	image: img,
	key: 'playerImage',
	width: 200,
	height: 200
});

// get image data
let imageData = cache.get({
	key: 'playerImage',
	width: 200,
	height: 200
});

// draw image data
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

ctx.putImageData(imageData, 0, 0);
```
