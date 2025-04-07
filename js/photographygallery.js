// document.addEventListener('DOMContentLoaded', () => {
//     const gallery = document.getElementById('gallery');

//     // Fetch the JSON file
//     fetch('./assets/data/photography.json')
//         .then(response => response.json())
//         .then(images => {
//             images.forEach(image => {
//                 // Create the anchor element
//                 const anchor = document.createElement('a');
//                 anchor.href = image.src;
//                 anchor.setAttribute('data-lightbox', 'photography');
//                 anchor.setAttribute('data-title', image.caption);

//                 // Create the image element
//                 const img = document.createElement('img');
//                 img.src = image.src;
//                 img.alt = image.caption;
//                 img.loading = 'lazy'; // Enable lazy loading

//                 // Append the image to the anchor, and the anchor to the gallery
//                 anchor.appendChild(img);
//                 gallery.appendChild(anchor);
//             });
//         })
//         .catch(error => console.error('Error loading images:', error));
// });

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');

    // Function to shuffle an array (Fisher-Yates Shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fetch the JSON file
    fetch('./assets/data/photography.json')
        .then(response => response.json())
        .then(images => {
            // Shuffle the images array
            const shuffledImages = shuffleArray(images);

            // Render the shuffled images
            shuffledImages.forEach(image => {
                // Create the anchor element
                const anchor = document.createElement('a');
                anchor.href = image.src;
                anchor.setAttribute('data-lightbox', 'photography');
                anchor.setAttribute('data-title', image.caption);

                // Create the image element
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.caption;
                img.loading = 'lazy'; // Enable lazy loading

                // Append the image to the anchor, and the anchor to the gallery
                anchor.appendChild(img);
                gallery.appendChild(anchor);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});