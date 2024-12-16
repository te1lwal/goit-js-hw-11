import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.error({
      message: 'Please enter a search term.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      class: 'custom-toast-error',
    });
    return;
  }

  clearGallery();
  showLoader(loader);

  fetchImages(query)
    .then(data => {
      hideLoader(loader); 
      if (data.hits.length === 0) {
        iziToast.warning({
          message: 'Sorry, there are no images matching your search query.',
          position: 'topRight',
          backgroundColor: '#ef4040',
          class: 'custom-toast-error',
        });
        return;
      }

      renderGallery(data.hits);
    })

    .catch(error => {
      hideLoader(loader);
      iziToast.error({
        message: 'Something went wrong. Please try again.',
        position: 'topRight',
        backgroundColor: '#ef4040',
        class: 'custom-toast-error',
      });
      console.error(error);
    });
});