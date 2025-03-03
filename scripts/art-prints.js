document.addEventListener('DOMContentLoaded', () => {
    // State management
    let state = {
        selectedArtwork: null,
        selectedProduct: null,
        size: 'medium',
        material: 'matte',
        frame: 'none',
        fitToAspectRatio: false
    };

    // Price configuration
    const prices = {
        products: {
            poster: { base: 19.99, name: 'Poster' },
            canvas: { base: 39.99, name: 'Canvas' },
            framed: { base: 49.99, name: 'Framed Print' },
            metal: { base: 59.99, name: 'Metal Print' }
        },
        sizes: {
            small: { price: 0, name: '8" x 10"' },
            medium: { price: 10, name: '16" x 20"' },
            large: { price: 25, name: '24" x 36"' },
            xlarge: { price: 40, name: '36" x 48"' }
        },
        frames: {
            none: { price: 0, name: 'No Frame' },
            black: { price: 29.99, name: 'Black Frame' },
            white: { price: 29.99, name: 'White Frame' },
            wood: { price: 39.99, name: 'Natural Wood Frame' }
        }
    };

    // DOM Elements
    const artworkGrid = document.getElementById('artworkGrid');
    const productCards = document.querySelectorAll('.product-card');
    const sizeSelect = document.getElementById('size');
    const materialSelect = document.getElementById('material');
    const frameSelect = document.getElementById('frame');
    const previewImage = document.getElementById('previewImage');
    const checkoutButton = document.getElementById('checkoutButton');
    const sizeIndicator = document.querySelector('.preview-size-indicator');

    // Add to the existing DOM Elements
    const aspectRatioFitButton = document.createElement('button');
    aspectRatioFitButton.className = 'aspect-ratio-fit';
    aspectRatioFitButton.textContent = 'Fit to Image';
    document.querySelector('.customization-options').appendChild(aspectRatioFitButton);

    // Calculate aspect ratio
    function calculateAspectRatio(img) {
        return img.naturalWidth / img.naturalHeight;
    }

    // Load artwork thumbnails
    function loadArtworks() {
        const artworks = [
            'img/artwork/1.png',
            'img/artwork/2.png',
            'img/artwork/3.png',
            'img/artwork/4.png',
            'img/artwork/5.png',
            'img/artwork/6.png',
            'img/artwork/7.png',
            'img/artwork/8.png',
            'img/artwork/9.png',
            'img/artwork/10.png',
            'img/artwork/11.png',
            'img/artwork/12.png'
        ];

        artworks.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Artwork ${index + 1}`;
            img.addEventListener('click', () => selectArtwork(img, src));
            artworkGrid.appendChild(img);
        });
    }

    // Select artwork
    function selectArtwork(imgElement, src) {
        artworkGrid.querySelectorAll('img').forEach(img => {
            img.classList.remove('selected');
        });
        imgElement.classList.add('selected');
        state.selectedArtwork = src;

        // Reset aspect ratio fit when new artwork is selected
        state.fitToAspectRatio = false;
        aspectRatioFitButton.classList.remove('active');

        updatePreview();
        updateCheckoutButton();
    }

    // Handle size selection
    sizeSelect.addEventListener('change', (e) => {
        state.size = e.target.value;
        updatePreview();
        updatePricing();
    });

    // Update preview
    function updatePreview() {
        if (state.selectedArtwork) {
            previewImage.src = state.selectedArtwork;
            previewImage.style.display = 'block';
            
            const previewFrame = document.getElementById('previewFrame');
            previewFrame.className = 'preview-frame';
            
            if (state.fitToAspectRatio) {
                const img = new Image();
                img.onload = () => {
                    const aspectRatio = calculateAspectRatio(img);
                    previewFrame.style.width = '100%';
                    previewFrame.style.height = `${(100 / aspectRatio)}%`;
                };
                img.src = state.selectedArtwork;
            } else {
                previewFrame.style.width = '100%';
                previewFrame.style.height = '100%';
            }
            
            // Apply product-specific styles
            switch(state.selectedProduct) {
                case 'canvas':
                    previewFrame.classList.add('canvas');
                    break;
                    
                case 'framed':
                    previewFrame.classList.add('framed');
                    if (state.frame !== 'none') {
                        previewFrame.classList.add(state.frame);
                    }
                    break;
                    
                case 'metal':
                    previewFrame.classList.add('metal');
                    break;
                    
                default: // poster
                    previewFrame.style.backgroundColor = '#ffffff';
                    break;
            }
            
            // Update size indicator
            const dimensions = prices.sizes[state.size].name;
            let productInfo = prices.products[state.selectedProduct]?.name || '';
            if (state.frame !== 'none' && state.selectedProduct === 'framed') {
                productInfo += ` with ${prices.frames[state.frame].name}`;
            }
            
            sizeIndicator.textContent = `${dimensions} - ${productInfo}`;
        }
    }

    // Update pricing
    function updatePricing() {
        if (!state.selectedProduct) return;

        const basePrice = prices.products[state.selectedProduct].base;
        const sizePrice = prices.sizes[state.size].price;
        const framePrice = state.selectedProduct === 'framed' ? prices.frames[state.frame].price : 0;

        document.getElementById('basePrice').textContent = `$${basePrice.toFixed(2)}`;
        document.getElementById('sizePrice').textContent = `$${sizePrice.toFixed(2)}`;
        document.getElementById('framePrice').textContent = `$${framePrice.toFixed(2)}`;

        const total = basePrice + sizePrice + framePrice;
        document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
    }

    // Update checkout button state
    function updateCheckoutButton() {
        const isValid = state.selectedArtwork && state.selectedProduct;
        checkoutButton.disabled = !isValid;
    }

    // Handle checkout
    checkoutButton.addEventListener('click', () => {
        const orderDetails = {
            artwork: state.selectedArtwork,
            product: state.selectedProduct,
            size: state.size,
            material: state.material,
            frame: state.frame,
            total: parseFloat(document.getElementById('totalPrice').textContent.replace('$', ''))
        };

        console.log('Processing order:', orderDetails);
        alert('Proceeding to checkout! This would typically redirect to your payment processor.');
    });

    // Add frame selection event listener
    frameSelect.addEventListener('change', (e) => {
        state.frame = e.target.value;
        updatePreview();
        updatePricing();
    });

    // Update frame options based on product
    function updateFrameOptions() {
        frameSelect.innerHTML = '';
        let options = [];
        
        // Always add 'No Frame' option
        options.push({ value: 'none', text: 'No Frame' });
        
        if (state.selectedProduct === 'framed') {
            options = options.concat([
                { value: 'black', text: 'Black Frame' },
                { value: 'white', text: 'White Frame' },
                { value: 'wood', text: 'Natural Wood Frame' }
            ]);
        }
        
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            frameSelect.appendChild(opt);
        });
    }

    // Add product selection event listeners
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            productCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selectedProduct = card.dataset.product;
            
            // Update frame visibility and options
            const frameGroup = frameSelect.closest('.option-group');
            if (frameGroup) {
                if (state.selectedProduct === 'framed') {
                    frameGroup.classList.add('visible');
                } else {
                    frameGroup.classList.remove('visible');
                }
            }
            
            // Update material and frame options
            updateMaterialOptions();
            updateFrameOptions();
            
            // Reset frame to none if not a framed product
            if (state.selectedProduct !== 'framed') {
                state.frame = 'none';
            }
            
            updatePreview();
            updatePricing();
            updateCheckoutButton();
        });
    });

    // Function to update material options based on selected product
    function updateMaterialOptions() {
        materialSelect.innerHTML = '';
        let options = [];
        
        switch(state.selectedProduct) {
            case 'poster':
                options = [
                    { value: 'matte', text: 'Matte Paper' },
                    { value: 'glossy', text: 'Glossy Paper' }
                ];
                break;
            case 'canvas':
                options = [
                    { value: 'canvas', text: 'Standard Canvas' },
                    { value: 'premium', text: 'Premium Canvas' }
                ];
                break;
            case 'framed':
                options = [
                    { value: 'matte', text: 'Matte Paper' },
                    { value: 'glossy', text: 'Glossy Paper' },
                    { value: 'canvas', text: 'Canvas' }
                ];
                break;
            case 'metal':
                options = [
                    { value: 'brushed', text: 'Brushed Metal' },
                    { value: 'glossy', text: 'Glossy Metal' }
                ];
                break;
        }
        
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            materialSelect.appendChild(opt);
        });
        
        state.material = options[0].value;
    }

    // Add aspect ratio fit button handler
    aspectRatioFitButton.addEventListener('click', () => {
        state.fitToAspectRatio = !state.fitToAspectRatio;
        aspectRatioFitButton.classList.toggle('active', state.fitToAspectRatio);
        updatePreview();
    });

    // Initialize the page
    loadArtworks();
    updateCheckoutButton();
    updatePricing();
}); 