const products = [
    {
        name: "Polytron 2 Door Fridge",
        category: "Kitchen Electronics",
        brand: "Polytron",
        price: 10000,
        capacity: "140 W",
        image: "kulkas.png",
    },
    {
        name: "Philips LED Lamp",
        category: "Home Electronics",
        brand: "Philips",
        price: 2000,
        capacity: "5 W",
        image: "lampu.png",
    },
    {
        name: "Sharp 32 Inch LED Smart TV",
        category: "Televisions",
        brand: "Sharp",
        price: 15000,
        capacity: "60 W",
        image: "tv.png",
    },
    {
        name: "Kels 600 Ml Madison",
        category: "Kitchen Electronics",
        brand: "Kels",
        price: 5000,
        capacity: "300 W",
        image: "kopi.png",
    },
    {
        name: "Kels 19 Ltr Denver Oven",
        category: "Kitchen Electronics",
        brand: "Kels",
        price: 7000,
        capacity: "400 W",
        image: "oven.png",
    },
    {
        name: "Daikin Set Air Cond",
        category: "Air Conditioner",
        brand: "Daikin",
        price: 20000,
        capacity: "800 W",
        image: "ac.png",
    },
    // Tambahkan produk lain sesuai kebutuhan
];

document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.querySelector('.product-list');

    function renderProducts(products) {
        productContainer.innerHTML = ''; // Bersihkan kontainer produk terlebih dahulu
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Capacity: ${product.capacity}</p>
                <div class="button-container">
                    <button>View</button>
                </div>
            `;
            productContainer.appendChild(productItem);
        });
    }

    renderProducts(products);

    const filterButton = document.getElementById('openFilterPopup');
    const filterPopup = document.getElementById('filterPopup');
    const closePopup = document.getElementById('closePopup');

    filterButton.addEventListener('click', function () {
        filterPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', function () {
        filterPopup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == filterPopup) {
            filterPopup.style.display = 'none';
        }
    });

    function setupDropdown(selectMenuId) {
        const selectMenu = document.getElementById(selectMenuId);
        const selectBtn = selectMenu.querySelector('.select-btn');
        const options = selectMenu.querySelectorAll('.option');
        const sBtnText = selectMenu.querySelector('.sBtn-text');

        selectBtn.addEventListener('click', () => {
            selectMenu.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                let selectedOption = option.querySelector('.option-text').innerText;
                sBtnText.innerText = selectedOption;
                selectMenu.classList.remove('active');
            });
        });

        window.addEventListener('click', (e) => {
            if (!selectMenu.contains(e.target)) {
                selectMenu.classList.remove('active');
            }
        });
    }

    setupDropdown('category-select-menu');
    setupDropdown('brand-select-menu');
    setupDropdown('market-price-select-menu');

    const applyFilterButton = document.getElementById('applyFilterButton');

    applyFilterButton.addEventListener('click', () => {
        const selectedCategory = document.querySelector('#category-select-menu .sBtn-text').innerText;
        const selectedBrand = document.querySelector('#brand-select-menu .sBtn-text').innerText;
        const selectedPrice = document.querySelector('#market-price-select-menu .sBtn-text').innerText;

        let filteredProducts = products;

        if (selectedCategory !== 'Category') {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        if (selectedBrand !== 'Brand') {
            filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
        }

        if (selectedPrice === 'Lowest') {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        } else if (selectedPrice === 'Highest') {
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }

        renderProducts(filteredProducts);
        filterPopup.style.display = 'none';
    });
});
