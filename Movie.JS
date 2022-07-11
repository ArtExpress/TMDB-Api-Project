const API_KEY = 'b36fe2ec9427d7935223cf9570917d43&language=en-US&sort_by=vote_average&append_to_response=images&include_image_language=en,null'
const API_URL = 'https://api.themoviedb.org/3/movie/${movie_id}?b36fe2ec9427d7935223cf9570917d43'
const API_POP = `${API_URL}/discover/movie?sort_by=popularity.&api_key=${API_KEY}`
const IMG_URL = `https://image.tmdb.org/t/p/w500/`

const moviecontainerEl = document.querySelector('.movie__card--container')

async function apiCall() {

    const movieId = localStorage.getItem('id')
    const movie = await fetch (`https://api.themoviedb.org/3/movie/${movieId}?api_key=b36fe2ec9427d7935223cf9570917d43&language=en-US`)
    const movieData = await movie.json() 
    console.log(movieData)
    
    
    
    moviecontainerEl.innerHTML = movieData.Search.map(response => 
        `<div class="info__container">
    <img class="movie__img--page" src="./Assets/No-image-found.jpg">
    <div class="movie__description">
        <h2>${response.title}</h2>
        <p>${response.overview}</p>
        <span class="green">9.8</span>
    </div>
    </div>
    <div class="movie__info--page">
        <p>Year: </p>
        <p>Actors: </p>
        <p>Genre: </p>
    </div>`).join('')
}

apiCall()

//function moviecontainerHTML(results) {
 //   return `<div class="info__container">
 //   <img class="movie__img--page" src="./Assets/No-image-found.jpg">
 //   <div class="movie__description">
 //       <h2>${results.title}</h2>
 //       <p>Movie Description</p>
 //       <span class="green">9.8</span>
 //   </div>
  //  </div>
  //  <div class="movie__info--page">
  //      <p>Year: </p>
 //       <p>Actors: </p>
 //       <p>Genre: </p>
 //   </div>`
//}