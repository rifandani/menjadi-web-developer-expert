import 'regenerator-runtime';
// css
import '../styles/normalize.css';
import '../styles/root.css';
import '../styles/nav.css';
import '../styles/header.css';
import '../styles/main.css';
import '../styles/footer.css';
import '../styles/responsive.css';
// json
import DATA from '../DATA.json';
console.log(DATA);

// toggle nav
document.querySelector('.menu').addEventListener('click', function () {
  document.querySelector('.nav-list').classList.toggle('nav-list-block');
});

function getRestaurants(data) {
  let restoHTML = '';

  data.restaurants.forEach((resto, i) => {
    restoHTML += `
      <div tabindex="0" class="card">
        <div class="img-container">
          <img tabindex="0" class="card-image" alt="${resto.name}" src="${resto.pictureId}"/>
          <span tabindex="0" class="card-rating">
            <i title="ratings" class="fa fa-star"></i>
            <span>${resto.rating}</span>
          </span>
        </div>

        <div tabindex="0" class="card-content">
          <p class="card-content-title">${resto.name} - ${resto.city}</p>
          <p class="truncate">${resto.description}</p>
        </div>
      </div>
      `;
  });

  // append to DOM
  document.getElementById('explore-restaurant').innerHTML = restoHTML;
}

getRestaurants(DATA);
