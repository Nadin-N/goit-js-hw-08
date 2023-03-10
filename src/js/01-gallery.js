import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';

const galleryListEl = document.querySelector('.gallery');

const createGalleryMarkUp = array =>
  array
    .map(
      ({
        preview,
        original,
        description,
      }) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
`
    )
    .join('');

const showMarkup = () => {
  galleryListEl.innerHTML = createGalleryMarkUp(galleryItems);
};
showMarkup();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

// Change code below this line

console.log(galleryItems);
