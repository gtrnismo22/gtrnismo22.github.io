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
    const viewToggle = document.getElementById('view-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    let allImages = []; // Store all images
    let isOrganized = true; // Start with organized view as default

    // Function to shuffle an array (Fisher-Yates Shuffle)
    function shuffleArray(array) {
        const shuffled = [...array]; // Create a copy
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Function to sort images by ID in descending order (newer first)
    function sortById(array) {
        return [...array].sort((a, b) => {
            // Sort by ID in descending order (15, 14, 13, ... 2, 1)
            return b.id - a.id;
        });
    }

    // Function to sort images by date (newest first)
    function sortByDate(images) {
        return [...images].sort((a, b) => {
            // Sort by actual date (newest first)
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    }

    // Function to render images in gallery view (masonry/randomized)
    function renderGalleryView(images) {
        gallery.innerHTML = '';

        images.forEach(image => {
            const anchor = document.createElement('a');
            anchor.href = image.src;
            anchor.setAttribute('data-lightbox', 'photography');
            anchor.setAttribute('data-title', image.caption);

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.caption;
            img.loading = 'lazy';

            anchor.appendChild(img);
            gallery.appendChild(anchor);
        });
    }

    // Function to render images in organized post view
    function renderPostView(images) {
        gallery.innerHTML = '';

        images.forEach(image => {
            // Create post container
            const postDiv = document.createElement('div');
            postDiv.className = 'photo-post';

            // Create anchor with image
            const anchor = document.createElement('a');
            anchor.href = image.src;
            anchor.setAttribute('data-lightbox', 'photography');
            anchor.setAttribute('data-title', image.caption);

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.caption;
            img.loading = 'lazy';

            anchor.appendChild(img);
            postDiv.appendChild(anchor);

            // Create metadata container
            const metadataDiv = document.createElement('div');
            metadataDiv.className = 'photo-metadata';

            // Add caption
            const captionDiv = document.createElement('div');
            captionDiv.className = 'photo-caption';
            captionDiv.textContent = image.caption || 'Untitled';
            metadataDiv.appendChild(captionDiv);

            // Create info row for location and date
            const infoDiv = document.createElement('div');
            infoDiv.className = 'photo-info';

            // Add location
            if (image.location) {
                const locationDiv = document.createElement('div');
                locationDiv.className = 'photo-location';
                locationDiv.textContent = image.location;
                infoDiv.appendChild(locationDiv);
            }

            // Add date
            if (image.date) {
                const dateDiv = document.createElement('div');
                dateDiv.className = 'photo-date';
                dateDiv.textContent = image.date;
                infoDiv.appendChild(dateDiv);
            }

            metadataDiv.appendChild(infoDiv);
            postDiv.appendChild(metadataDiv);

            gallery.appendChild(postDiv);
        });
    }

    // Toggle between views
    function toggleView() {
        isOrganized = !isOrganized;
        
        if (isOrganized) {
            // Switch to organized post view
            gallery.classList.add('organized');
            toggleIcon.src = './assets/icons/grid-view.svg';
            toggleIcon.alt = 'Switch to Gallery View';
            const sortedImages = sortById(allImages);
            renderPostView(sortedImages);
        } else {
            // Switch to randomized gallery view
            gallery.classList.remove('organized');
            toggleIcon.src = './assets/icons/list-view.svg';
            toggleIcon.alt = 'Switch to Post View';
            const shuffledImages = shuffleArray(allImages);
            renderGalleryView(shuffledImages);
        }
    }

    // Add click event to toggle button
    viewToggle.addEventListener('click', toggleView);

    // Fetch the JSON file
    fetch('./assets/data/photography.json')
        .then(response => response.json())
        .then(images => {
            allImages = images; // Store the images
            // Initial render with sorted images in post view (default)
            gallery.classList.add('organized');
            toggleIcon.src = './assets/icons/grid-view.svg';
            toggleIcon.alt = 'Switch to Gallery View';
            const sortedImages = sortById(allImages);
            renderPostView(sortedImages);
        })
        .catch(error => console.error('Error loading images:', error));
});