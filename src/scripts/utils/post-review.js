import RestaurantSource from '../data/resto-source';

const PostReview = async (url, name, review) => {
  const dataInput = {
    id: url.id,
    name,
    review,
  };

  const reviewContainer = document.querySelector('.detail-review');
  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const newReview = `
    <div class="detail-review-item">
      <div class="review-header">
        <p class="review-name">${name}</p>

        <p class="review-date">${date}</p>
      </div>

      <div class="review-body">
        ${review}
      </div>
    </div>
  `;

  // POST review
  const reviewResponse = await RestaurantSource.postRestaurantReview(dataInput);
  console.log(
    '🚀 ~ file: post-review.js ~ line 33 ~ PostReview ~ reviewResponse',
    reviewResponse,
  );

  // append newReview to the review container
  reviewContainer.innerHTML += newReview;
};

export default PostReview;
