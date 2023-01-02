"use strict";

const API_KEY = "api_key=65033a57054070d09d7cef3625fa4db4";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const URL_SERIES = BASE_URL + "/trending/tv/week?" + API_KEY;
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const populer = document.getElementById("populer");
const series = document.getElementById("series");
const genre = document.getElementById("genre");
const tagsEl = document.getElementById("tags");

getmovies(API_URL);
getSeries(URL_SERIES);
getGenre(API_URL);
var selectedGenre = [];
setGenre();

function setGenre() {
  tagsEl.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      getGenre(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
      highlightselection();
    });
    tagsEl.append(t);
  });
}

function highlightselection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });

  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
}

function getGenre(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showGenre(data.results);
      } else {
        genre.innerHTML = `<h1 class="no-results">Tidak Ada Movie Yang Ditemukan!!!</h1>`;
      }
    });
}

function getmovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showmovies(data.results);
    });
}

function getSeries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showSeries(data.results);
    });
}

function showGenre(data) {
  genre.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("genre");
    movieEl.innerHTML = `
    <li>
                  <div class="movie-card-genre">
                    <a href="movie-details.html?id=${id}">
                      <figure class="card-banner">
                        <img src="${poster_path ? IMG_URL + poster_path : "https://via.placeholder.com/1080x1580"}" alt="${title}" />
                      </figure>
                    </a>

                    <div class="title-wrapper">
                      <a href="movie-details.html?id=${id}">
                        <h3 class="card-title">${title}</h3>
                      </a>

                      </div>
                      <div class="title-wrapper">
                        <time datetime="2022">${release_date}</time>
                      </div>

                    <div class="card-meta">
                      <div class="badge badge-outline">HD</div>

                      

                      <div class="${getColor(vote_average)}">
                        <ion-icon name="star"></ion-icon>

                        <data>${vote_average}</data>
                      </div>
                    </div>
                  </div>
                </li>
    `;
    genre.appendChild(movieEl);
  });
}

function showSeries(data) {
  series.innerHTML = "";
  data.forEach((movie) => {
    const { name, poster_path, vote_average, first_air_date, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("series");
    movieEl.innerHTML = `
    <li>
                  <div class="movie-card">
                    <a href="./series-details.html?id=${id}">
                      <figure class="card-banner">
                        <img src="${IMG_URL + poster_path}" alt="${name}" />
                      </figure>
                    </a>

                    <div class="title-wrapper">
                      <a href="./series-details.html?id=${id}">
                        <h3 class="card-title">${name}</h3>
                      </a>

                      </div>
                      <div class="title-wrapper">
                        <time datetime="2022">${first_air_date}</time>
                      </div>

                    <div class="card-meta">
                      <div class="badge badge-outline">HD</div>

                      

                      <div class="${getColor(vote_average)}">
                        <ion-icon name="star"></ion-icon>

                        <data>${vote_average}</data>
                      </div>
                    </div>
                  </div>
                </li>
    `;
    series.appendChild(movieEl);
  });
}

function showmovies(data) {
  populer.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <li>
                  <div class="movie-card ">
                    <a href="movie-details.html?id=${id}">
                      <figure class="card-banner">
                        <img src="${IMG_URL + poster_path}" alt="${title}" />
                      </figure>
                    </a>

                    <div class="title-wrapper">
                      <a href="movie-details.html?id=${id}">
                        <h3 class="card-title">${title}</h3>
                      </a>

                      </div>
                      <div class="title-wrapper">
                        <time datetime="2022">${release_date}</time>
                      </div>

                    <div class="card-meta">
                      <div class="badge badge-outline">HD</div>


                      <div class="${getColor(vote_average)}">
                        <ion-icon name="star"></ion-icon>

                        <data>${vote_average}</data>
                      </div>
                    </div>
                  </div>
                </li>
    `;
    populer.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "rating";
  } else {
    return "red";
  }
}

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}

/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");
});

/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");
});
