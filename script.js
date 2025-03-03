// Navigation Button Hover Effect
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'scale(1.1)';
    link.style.color = '#fff';
  });

  link.addEventListener('mouseleave', () => {
    link.style.transform = 'scale(1)';
    link.style.color = '#f0f0f0';
  });
});

// About Page Hover Button Effect
const hoverButton = document.querySelector('.hover-button');

if (hoverButton) {
  hoverButton.addEventListener('mouseenter', () => {
    hoverButton.style.backgroundColor = 'transparent';
    hoverButton.style.color = 'transparent';
    hoverButton.style.backgroundImage = 'url("path-to-your-image.jpg")'; // Add your image path
    hoverButton.style.backgroundSize = 'cover';
  });

  hoverButton.addEventListener('mouseleave', () => {
    hoverButton.style.backgroundColor = '#333';
    hoverButton.style.color = '#fff';
    hoverButton.style.backgroundImage = 'none';
  });
}

// Best Pieces and Artworks Page Hover Effect
const artItems = document.querySelectorAll('.art-item');

artItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const img = item.querySelector('img');
    img.style.transform = 'scale(1.1)';
    img.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
    const artName = item.querySelector('.art-name');
    artName.style.opacity = '1';
  });

  item.addEventListener('mouseleave', () => {
    const img = item.querySelector('img');
    img.style.transform = 'scale(1)';
    img.style.boxShadow = 'none';
    const artName = item.querySelector('.art-name');
    artName.style.opacity = '0';
  });
});

// Get the modal and modal image elements
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");

// Get all artwork images
const artworkImages = document.querySelectorAll(".artwork-img");

// Get navigation buttons
const prevButton = document.createElement("button");
prevButton.innerText = "❮";
prevButton.classList.add("modal-nav", "prev");

const nextButton = document.createElement("button");
nextButton.innerText = "❯";
nextButton.classList.add("modal-nav", "next");

// Append navigation buttons to the modal
modal.appendChild(prevButton);
modal.appendChild(nextButton);

let currentIndex = 0;

// Function to update the modal image with a fade animation
function updateModalImage(index) {
  // Fade out the current image
  modalImg.style.opacity = 0;

  // Wait for the fade-out transition to complete
  setTimeout(() => {
    modalImg.src = artworkImages[index].src; // Update the image source
    currentIndex = index;

    // Fade in the new image
    modalImg.style.opacity = 1;
  }, 300); // Match this duration with the CSS transition duration
}

// Add click event listeners to all artwork images
artworkImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex"; // Show the modal
    updateModalImage(index); // Set the clicked image as the modal content
  });
});

// Close the modal when the close button is clicked
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
});

// Close the modal when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"; // Hide the modal
  }
});

// Navigate to the previous image
prevButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the modal from closing
  const prevIndex = (currentIndex - 1 + artworkImages.length) % artworkImages.length;
  updateModalImage(prevIndex);
});

// Navigate to the next image
nextButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the modal from closing
  const nextIndex = (currentIndex + 1) % artworkImages.length;
  updateModalImage(nextIndex);
});


// Art Prints Page Script
document.addEventListener("DOMContentLoaded", () => {
  const artworkSelection = document.querySelector(".artwork-selection");
  const productSelection = document.querySelector(".product-selection");
  const sizeSelect = document.getElementById("size");
  const orientationSelect = document.getElementById("orientation");
  const previewViewport = document.getElementById("3d-viewport");
  const checkoutButton = document.getElementById("checkout-button");

  let selectedArtwork = null;
  let selectedProduct = null;

  // Load artwork thumbnails
  const artworks = [
    "img/artwork/1.png",
    "img/artwork/2.png",
    "img/artwork/3.png",
    // Add more artwork paths here
  ];

  artworks.forEach((artwork, index) => {
    const img = document.createElement("img");
    img.src = artwork;
    img.alt = `Artwork ${index + 1}`;
    img.addEventListener("click", () => {
      selectedArtwork = artwork;
      document.querySelectorAll(".artwork-selection img").forEach(img => img.classList.remove("selected"));
      img.classList.add("selected");
      updatePreview();
    });
    artworkSelection.appendChild(img);
  });

  // Handle product selection
  productSelection.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      selectedProduct = button.getAttribute("data-product");
      updatePreview();
    });
  });

  // Handle customization changes
  sizeSelect.addEventListener("change", updatePreview);
  orientationSelect.addEventListener("change", updatePreview);

  // Update the 3D preview
  function updatePreview() {
    if (selectedArtwork && selectedProduct) {
      const size = sizeSelect.value;
      const orientation = orientationSelect.value;

      // Generate a URL for the 3D preview (replace with your 3D rendering logic)
      const previewUrl = `https://example.com/3d-preview?artwork=${selectedArtwork}&product=${selectedProduct}&size=${size}&orientation=${orientation}`;
      previewViewport.src = previewUrl;
    }
  }

  // Proceed to checkout
  checkoutButton.addEventListener("click", () => {
    if (selectedArtwork && selectedProduct) {
      alert("Proceeding to checkout with your custom print!");
      // Redirect to checkout page or handle payment
    } else {
      alert("Please select an artwork and a product.");
    }
  });
});



// Memory Match Game Logic
const memoryGame = document.querySelector(".memory-game");
const congratsMessage = document.getElementById("congrats-message");

// Array of image paths (each image appears twice for matching)
const images = [
  "img/memory/1.png",
  "img/memory/2.png",
  "img/memory/3.png",
  "img/memory/4.png",
  "img/memory/5.png",
  "img/memory/6.png",
  "img/memory/7.png",
  "img/memory/8.png",
  "img/memory/9.png",
  "img/memory/10.png",
];

// Duplicate the images to create pairs
const cards = [...images, ...images];

// Shuffle the cards
cards.sort(() => Math.random() - 0.5);

// Create the cards dynamically
cards.forEach((image, index) => {
  const card = document.createElement("div");
  card.classList.add("memory-card");
  card.dataset.id = index;

  const frontFace = document.createElement("img");
  frontFace.classList.add("front-face");
  frontFace.src = image;
  frontFace.alt = `Memory Card ${index + 1}`;

  const backFace = document.createElement("div");
  backFace.classList.add("back-face");

  card.appendChild(frontFace);
  card.appendChild(backFace);
  memoryGame.appendChild(card);
});

// Game Logic
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // First card flipped
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // Second card flipped
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.querySelector(".front-face").src === secondCard.querySelector(".front-face").src) {
    // Match found
    disableCards();
    checkGameOver();
  } else {
    // No match
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkGameOver() {
  const flippedCards = document.querySelectorAll(".flip");
  if (flippedCards.length === cards.length) {
    // All cards matched
    congratsMessage.classList.add("visible");
  }
}

// Add event listeners to cards
const memoryCards = document.querySelectorAll(".memory-card");
memoryCards.forEach(card => card.addEventListener("click", flipCard));


// Contact Form Submission
const contactForm = document.querySelector('form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}