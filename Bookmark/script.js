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