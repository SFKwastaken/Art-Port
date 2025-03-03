// Function to get the dominant color from an image
function getAverageColor(imgElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = imgElement.naturalWidth || imgElement.offsetWidth;
    const height = imgElement.naturalHeight || imgElement.offsetHeight;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(imgElement, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height).data;
    let r = 0, g = 0, b = 0, count = 0;

    // Sample pixels at intervals for better performance
    for (let i = 0; i < imageData.length; i += 20) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
    }

    // Calculate average RGB values
    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);

    return { r, g, b };
}

// Function to apply the glow effect
function applyGlowEffect(imgElement) {
    const color = getAverageColor(imgElement);
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Create a semi-transparent version of the dominant color
    const glowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
    
    // Apply the color as a glow effect
    modalContent.style.setProperty('--glow-color', glowColor);
    
    // Slightly tint the background with the same color
    modal.style.backgroundColor = `rgba(0, 0, 0, 0.85)`;
    modal.style.backgroundImage = `radial-gradient(circle at center, ${glowColor} 0%, rgba(0, 0, 0, 0.9) 70%)`;

    // Set initial size constraints
    imgElement.style.maxWidth = '80%';
    imgElement.style.maxHeight = '80vh';
    modalContent.style.maxWidth = '80%';
    modalContent.style.maxHeight = '80vh';

    // Fade in the image
    setTimeout(() => {
        modalContent.style.opacity = '1';
    }, 50);
}

// Initialize the modal functionality and glow effect
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const modalContent = document.querySelector('.modal-content');
    const artworkImages = document.querySelectorAll('.artwork-img');
    const closeBtn = document.querySelector('.close');
    let currentIndex = 0;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    prevButton.innerHTML = '❮';
    nextButton.innerHTML = '❯';
    prevButton.className = 'modal-nav prev';
    nextButton.className = 'modal-nav next';
    modal.appendChild(prevButton);
    modal.appendChild(nextButton);

    // Function to update modal image with fade
    function updateModalImage(newSrc) {
        modalContent.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = newSrc;
            modalImg.style.maxWidth = '80%';
            modalImg.style.maxHeight = '80vh';
            modalContent.style.maxWidth = '80%';
            modalContent.style.maxHeight = '80vh';
            applyGlowEffect(modalImg);
        }, 300);
    }

    // Add click event listeners to all artwork images
    artworkImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalImg.style.maxWidth = '80%';
            modalImg.style.maxHeight = '80vh';
            currentIndex = index;
            applyGlowEffect(modalImg);
        });
    });

    // Previous button click handler
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + artworkImages.length) % artworkImages.length;
        updateModalImage(artworkImages[currentIndex].src);
    });

    // Next button click handler
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % artworkImages.length;
        updateModalImage(artworkImages[currentIndex].src);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + artworkImages.length) % artworkImages.length;
                updateModalImage(artworkImages[currentIndex].src);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % artworkImages.length;
                updateModalImage(artworkImages[currentIndex].src);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});