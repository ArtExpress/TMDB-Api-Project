// Key b36fe2ec9427d7935223cf9570917d43
//Popular Api https://api.themoviedb.org/3/movie/550?api_key=b36fe2ec9427d7935223cf9570917d43
//primary_release_year=2010&sort_by=vote_average
//sort_by=popularity.


const API_KEY = 'b36fe2ec9427d7935223cf9570917d43&language=en-US&sort_by=vote_average&append_to_response=images&include_image_language=en,null'
const API_URL = 'https://api.themoviedb.org/3/trending/movie/week?'
const API_POP = `${API_URL}/discover/movie?sort_by=popularity.&api_key=${API_KEY}`
const IMG_URL = `https://image.tmdb.org/t/p/w500/`

async function apiCall() {
    const movies = await fetch (`${API_POP}`)
    const moviesData = await movies.json() 
    const spotlightEL = document.querySelector('.spotlight__movies')
    const modalEl = document.querySelector('.modal__movies--container')

 

    spotlightEL.innerHTML = moviesData.results.map((results) => spotlightHTML(results)).join('')
    modalEl.innerHTML = moviesData.results.map((results) => modalHTML(results)).join('')
    console.log(moviesData)

    const modalOverlay = document.querySelector('.modal__overlay')
    const modalOpen = document.querySelector('.modal__open')
    const modalClose = document.querySelector('.modal__close--btn')
    modalOpen.addEventListener('click', function() {
        modalOverlay.classList.toggle('modal__open')
    })
    modalClose.addEventListener('click', function() {
        modalOverlay.classList.remove('modal__open')
    })

}

apiCall()

function showMovie(id) {
    localStorage.setItem('id', id)
    window.location.href = `${window.location.origin}/TMDB%20Project/movie.html` 
}

function spotlightHTML (results) {
    return `<div class="movie" onclick="showMovie('${results.id}')">
    <figure>
        <img class="movie__img" src="${IMG_URL + results.poster_path}" alt="${results.title}">
    </figure>
    <div class="movie__overview">
        ${results.overview}
    </div>
    <div class="movie__info">
        <span class="${getColor(results.vote_average)}">${results.vote_average.toFixed(1) * 10 + '%'}</span>
        <p class="movie__title">${results.title}</p>
        <p>${results.release_date}</p>
    </div>
    </div>`
}

function modalHTML (results) {
    return `<div class="movie modal__movie" onclick="showMovie(${results.title})">
    <figure>
        <img class="movie__img modal__movie--image" src="${IMG_URL + results.poster_path}" alt="${results.title}">
    </figure>
    <div class="movie__overview">
    ${results.overview}
    </div>
    <div class="movie__info modal__movie--info">
        <span class="${getColor(results.vote_average)}">${results.vote_average.toFixed(1) * 10 + '%'}</span>
        <p class="movie__title">${results.title}</p>
        <p class="movie__year">${results.release_date}</p>
    </div>
    </div>`
}




function getColor(vote) {
    if(vote>= 8){
        return 'green'
    } else if (vote >= 6){
        return 'darkorange'
    } else {
        return 'red'
    }
}
