const assert = require('assert');

Feature('Review Resto');

// Perintah berjalan sebelum tiap metode tes dijalankan
Before(({ I }) => {
  // root URL : http:localhost:9000
  I.amOnPage('/');
});

Scenario('Post resto review', async ({ I }) => {
  const reviewText = 'Automated reviewww';

  // URL: /
  I.seeElement('.card a');
  I.click(locate('.card a').first());

  // URL: /resto/:id
  I.seeElement('.form-review form');
  I.fillField('name-input', 'E2E testing');
  I.fillField('review-input', reviewText);
  I.click('#submit-review');

  // after submit review
  // I.refreshPage();
  I.waitForResponse('https://restaurant-api.dicoding.dev/review');
  const lastReview = locate('.review-body').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert.strictEqual(reviewText, lastReviewText.trim());
});
