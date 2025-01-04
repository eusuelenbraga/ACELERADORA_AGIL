document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');

    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }
            return response.json();
        })
        .then(photos => {
            photos.forEach(photo => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.setAttribute('data-keywords', photo.title.toLowerCase());

                item.innerHTML = `
                    <img src="${photo.thumbnailUrl}" alt="${photo.title}">
                    <div class="caption">${photo.title}</div>
                `;

                gallery.appendChild(item);
            });
        })
        .catch(error => console.error('Erro ao carregar as fotos:', error));
});

function filterImages() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(searchInput)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
