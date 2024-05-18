function filterProducts(category) {
    var productCards = document.querySelectorAll('.product-card');
    var buttons = document.querySelectorAll('.sidebar button');

    // Tampilkan atau sembunyikan produk berdasarkan kategori
    productCards.forEach(function(card) {
        if (category === 'all') {
            card.style.display = 'block';
        } else if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Tambahkan atau hapus kelas 'active' pada tombol yang diklik
    buttons.forEach(function(button) {
        if (button.getAttribute('data-category') === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function toggleBookmark(imgElement) {
    const filledBookmarkSrc = 'bookmark fill.png';  // Path to the filled bookmark image
    const emptyBookmarkSrc = 'bookmark.png';         // Path to the original bookmark image

    if (imgElement.src.includes(emptyBookmarkSrc)) {
        imgElement.src = filledBookmarkSrc;
        imgElement.classList.add('filled');
    } else {
        imgElement.src = emptyBookmarkSrc;
        imgElement.classList.remove('filled');
    }
}
