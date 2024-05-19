document.addEventListener('DOMContentLoaded', () => {
    const bookmarkIcon = document.getElementById('bookmark');
    bookmarkIcon.addEventListener('click', () => {
        bookmarkIcon.classList.toggle('clicked');
    });
});
