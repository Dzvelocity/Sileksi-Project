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

document.addEventListener("DOMContentLoaded", function () {
    const categoryButton = document.querySelector('.sidebar button:nth-child(1)');
    const filterButton = document.querySelector('.sidebar button:nth-child(2)');
    const sortbyButton = document.querySelector('.sidebar button:nth-child(3)');
    const categoryPanel = document.getElementById('categoryPanel');
    const filterPanel = document.getElementById('filterPanel');
    const sortbyPanel = document.getElementById('sortbyPanel');

    categoryButton.addEventListener('click', function () {
        togglePanel(categoryPanel, categoryButton);
        hideOtherPanels(filterPanel, sortbyPanel);
    });

    filterButton.addEventListener('click', function () {
        togglePanel(filterPanel, filterButton);
        hideOtherPanels(categoryPanel, sortbyPanel);
    });

    sortbyButton.addEventListener('click', function () {
        togglePanel(sortbyPanel, sortbyButton);
        hideOtherPanels(categoryPanel, filterPanel);
    });

    function togglePanel(panel, button) {
        if (panel.classList.contains('show')) {
            panel.classList.remove('show');
            button.classList.remove('active');
        } else {
            panel.classList.add('show');
            button.classList.add('active');
        }
    }

    function hideOtherPanels(...panels) {
        panels.forEach(panel => {
            panel.classList.remove('show');
        });
        document.querySelectorAll('.sidebar button').forEach(button => {
            button.classList.remove('active');
        });
    }

    // Close the panel if clicked outside
    window.addEventListener('click', function(event) {
        if (!categoryPanel.contains(event.target) && !categoryButton.contains(event.target) &&
            !filterPanel.contains(event.target) && !filterButton.contains(event.target) &&
            !sortbyPanel.contains(event.target) && !sortbyButton.contains(event.target)) {
            categoryPanel.classList.remove('show');
            filterPanel.classList.remove('show');
            sortbyPanel.classList.remove('show');
            document.querySelectorAll('.sidebar button').forEach(button => {
                button.classList.remove('active');
            });
        }
    });

    // Adding close icon functionality
    const closeIcons = document.querySelectorAll('.close-icon');
    closeIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            const panel = event.target.closest('.panel');
            const button = document.querySelector(`.sidebar button[data-panel="${panel.id}"]`);
            togglePanel(panel, button);
        });
    });
});
