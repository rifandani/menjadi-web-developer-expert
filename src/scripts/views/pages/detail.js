import UrlParser from '../../routes/url-parser';
import Spinner from '../templates/spinner';
import RestaurantSource from '../../data/resto-source';
import restoDetail from '../templates/resto-detail';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import PostReview from '../../utils/post-review';
import { initSwalError } from '../../utils/swal-initiator';
import { sendDataToWebsocket } from '../../utils/websocket-initiator';
import favRestoIdb from '../../data/resto-idb';

const Detail = {
  async render() {
    return `
      <div class="container">
        <div id="loading"></div>

        <div class="like" id="likeButtonContainer"></div>

        <div id="main-container">
          <h2 class="title-container">Resto Detail</h2>

          <section id="detail-resto"></section>

          <div class="form-review">
            <form autocomplete="on">
              <div class="mb-3">
                <label for="name-input" class="form-label">Name</label>
                <input type="text" class="form-control" name="name-input" id="name-input" minlength="3" placeholder="Your name..." required>
              </div>

              <div class="mb-3">
                <label for="review-input" class="form-label">Review</label>
                <input type="text" class="form-control" name="review-input" id="review-input" minlength="3" placeholder="Your review..." required>
              </div>

              <button id="submit-review" type="submit" class="submit-btn">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  // Fungsi ini akan dipanggil setelah render()
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const loading = document.querySelector('#loading');
    const mainContainer = document.querySelector('#main-container');
    const detailContainer = document.querySelector('#detail-resto');

    // change main display to spinner
    mainContainer.style.display = 'none';
    loading.innerHTML = Spinner();

    try {
      const data = await RestaurantSource.getRestaurantDetail(url.id);

      // use the detail data
      console.info(data);
      detailContainer.innerHTML += restoDetail(data.restaurant);

      // init like button
      LikeButtonPresenter.init({
        data,
        favRestoIdb,
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
      });

      // change spinner display to main
      mainContainer.style.display = 'block';
      loading.style.display = 'none';

      // review form
      const btnSubmitReview = document.querySelector('#submit-review');
      const nameInput = document.querySelector('#name-input');
      const reviewInput = document.querySelector('#review-input');

      btnSubmitReview.addEventListener('click', async (e) => {
        e.preventDefault();

        // POST review
        await PostReview(url, nameInput.value, reviewInput.value);

        // Send message to websocket server
        sendDataToWebsocket({
          name: nameInput.value,
          review: reviewInput.value,
        });

        // clear form input
        nameInput.value = '';
        reviewInput.value = '';
      });
    } catch (err) {
      console.error(err);

      mainContainer.style.display = 'block';
      loading.style.display = 'none';
      detailContainer.innerHTML = `Error: ${err.message}`;
      initSwalError(err.message);
    }
  },
};

export default Detail;
