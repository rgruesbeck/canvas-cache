const imageCache = () => {
    // track cached images
    const map = new Map();

    // store cached images
    const canvas = document.createElement('canvas');
    const store = canvas.getContext('2d');

    // set initial canvas size
    canvas.width = 0;
    canvas.height = 0;

    // build key
    const imageKey = (key, width, height) => {
        // return undefined if missing args
        if (!key || !width || !height) { return undefined; }

        return `${key}!${width}!${height}`;
    }

    // write new image
    const write = (key, img, width, height) => {
        let start = canvas.width;

        writeStore(img, start, width, height); // write to store
        writeMap(key, start, width, height); // write to map
    }

    // write to store
    const writeStore = (img, start, width, height) => {
        allocate(width, height);
        store.drawImage(img, start, 0, width, height);
    }

    // write to map
    const writeMap = (key, start, width, height) => {
        map.set(key, store.getImageData(start, 0, width, height));
    }

    // allocate store canvas space
    const allocate = (width, height) => {
        allocateWidth(width);
        allocateHeight(height);
    }

    const allocateWidth = (width = 0) => {
        canvas.width = canvas.width + width;
    }

    const allocateHeight = (height = 0) => {
        if (height > canvas.height) {
            canvas.height = height;
        }
    }

    // cache api
    return {
        has: ({ key, width, height }) => {
            return map.has(imageKey(key, width, height));
        },
        get: ({ key, width, height }) => {
            return map.get(imageKey(key, width, height));
        },
        set: ({ image, key, width, height }) => {
            if (!image) {
                throw new Error(`Error: image required`);
            }

            let imgKey = imageKey(key, width, height);
            if (imgKey === undefined) {
                throw new Error(`Error: missing required arguments. key, width, height`);
            }

            // check map for match
            // return image dump object for already stored images
            let cachedImage = map.get(imgKey);
            if (cachedImage) { return cachedImage; }

            // write image to cache
            write(imgKey, image, width, height);

            // return image data
            return map.get(imgKey);
        },
        delete: ({ key, width, height }) => {
            return map.delete(imageKey(key, width, height));
        },
        clear: () => {
            map.clear(); // clear map
            store.clearRect(0, 0, canvas.width, canvas.height); // clear pixels
            canvas.width = 0; // reset canvas width
            canvas.width = 0; // reset canvas height
        }
    }
}

export default imageCache;