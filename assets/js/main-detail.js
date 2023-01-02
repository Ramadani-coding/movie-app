const API_KEY = "api_key=65033a57054070d09d7cef3625fa4db4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

let id = "";
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
  id = value;
}

let id_query = `/movie/${id}?`;
let cest = `/movie/${id}/credits?`;
let final_url = BASE_URL + id_query + API_KEY;
let final_url_cest = BASE_URL + cest + API_KEY;

apiRequestCall(final_url);
apiRequestCallCest(final_url_cest);

function apiRequestCallCest(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.send();
  xhr.onload = function () {
    var res = xhr.response;
    var convertedJson = JSON.parse(res);

    // Get the cast array from the response
    const cast = convertedJson.cast;

    // Create an HTML element for each cast member
    const castElements = cast.map((member) => {
      let imgSrc = IMG_URL + member.profile_path;
      if (!member.profile_path) {
        imgSrc = "https://via.placeholder.com/160x213";
      }
      return `<div class="cast">
                        <img src="${imgSrc}" alt="${member.name}" />
                        <div class="label">
                          <labe>${member.name}</labe>
                        </div>
                      </div>`;
    });

    // Join the HTML elements into a single string
    const castList = castElements.join("");

    // Insert the cast list into the page
    document.getElementById("movie-display-cast").innerHTML = castList;
  };
  xhr.onerror = function () {
    window.alert("Cannot Get");
  };
}

function apiRequestCall(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.send();
  xhr.onload = function () {
    document.getElementById("movie-display").innerHTML = "";
    var res = xhr.response;
    var convertedJson = JSON.parse(res);
    let { title, poster_path, vote_average, release_date, runtime, overview, genres, credits } = convertedJson;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    document.getElementById("movie-display").innerHTML = `
          <figure class="movie-detail-banner">
              <img src="${poster_path ? IMG_URL + poster_path : "https://via.placeholder.com/1080x1580"}" alt="${title}" />

              <button class="play-btn">
                <ion-icon name="play-circle-outline"></ion-icon>
              </button>
            </figure>

            <div class="movie-detail-content">

              <h1 class="h1 detail-title">${title}</h1>

              <div class="meta-wrapper">
                <div class="badge-wrapper">

                  <div class="badge badge-outline">HD</div>
                </div>

                <div class="ganre-wrapper">
                  ${convertedJson.genres.map((genre) => `<a href="#">${genre.name}</a>`).join(", ")}
                </div>
                

                <div class="date-time">
                  <div>
                    <ion-icon name="calendar-outline"></ion-icon>

                    <time datetime="2021">${release_date}</time>
                  </div>

                  <div>
                    <ion-icon name="time-outline"></ion-icon>

                    <time datetime="PT115M">${hours} jam ${minutes} menit</time>
                  </div>
                </div>
              </div>

              <p class="storyline">${overview}</p>

              

              <div class="details-actions">
                <button class="share">
                  <ion-icon name="share-social"></ion-icon>

                  <span>Share</span>
                </button>

               

                <button class="btn btn-primary">
                  <ion-icon name="play"></ion-icon>

                  <span>Watch Now</span>
                </button>
              </div>

              <a href="${IMG_URL + poster_path}" download class="download-btn">
                <span>Download</span>

                <ion-icon name="download-outline"></ion-icon>
              </a>
            </div>
          
          
          
          
          `;
  };
  xhr.onerror = function () {
    window.alert("Cannot Get");
  };
}

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));
