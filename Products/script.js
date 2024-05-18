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

function addBookmark(productId) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (!bookmarks.includes(productId)) {
        bookmarks.push(productId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

function removeBookmark(productId) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(id => id !== productId);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
