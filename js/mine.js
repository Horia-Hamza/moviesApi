let stripToggelMenu = document.querySelector(".strip-toggel-menu");
let navTabMenu = document.querySelector(".nav-tab-menu");
let stripHeaderNav = document.querySelector('.strip-header-nav');
let openItem = document.getElementById('openItem');
// let moviesList = [];
let moviesArray=[];
let nowPlaying =document.querySelector('.nowPlaying');
let popular =document.querySelector('.popular');
let topRated =document.querySelector('.topRated');
let trending =document.querySelector('.trending');
let upComing =document.querySelector('.upComing');
let allMoviesInput = document.getElementById('allMovies');
let wordInput = document.getElementById('word');
let nameInput = document.getElementById('name');
let namealert = document.getElementById('namealert');
let emailInput = document.getElementById('email');
let emailalert = document.getElementById('emailalert');
let phoneInput = document.getElementById('phone');
let phonealert = document.getElementById('phonealert');
let ageInput = document.getElementById('age');
let ageAlert = document.getElementById('agealert');
let passwordInput = document.getElementById('password');
let passwordAlert = document.getElementById('passwordalert');
let rePasswordInput = document.getElementById('rePassword');
let repasswordalert = document.getElementById('repasswordalert');
let submitBtn = document.getElementById('submitBtn')

// add events
stripToggelMenu.addEventListener('click' , addClass );
nowPlaying.addEventListener('click' ,  function(){
    getnowPlaying() });
popular.addEventListener('click' ,  function(){
    getnowPlaying() });
trending.addEventListener('click' ,  function(){
    getTrindingMovies() });
upComing.addEventListener('click' ,  function(){
    getupComing() });
allMoviesInput.addEventListener('input', function(){
    searchApi(this.value)
    })
wordInput.addEventListener('input', function(){
    searchDisplayMovie(this.value)
     })

// functions
function addClass(){
    navTabMenu.classList.add("open-menu");
    navTabMenu.classList.remove("close-menu");
    let navTabMenuWidth = $('.nav-tab-menu').outerWidth()
    if($('.strip-header-nav').css('left')=='0px'){
        $('.strip-header-nav').css({'left':navTabMenuWidth})
        openItem.classList.remove('fa-bars');
        openItem.classList.add('fa-xmark');
    }
    else{
        $('.strip-header-nav').css({'left':'0px'});
        navTabMenu.classList.remove("open-menu");
        navTabMenu.classList.add("close-menu");
        openItem.classList.remove('fa-xmark');
        openItem.classList.add('fa-bars');
    }
    }
     async function getnowPlaying(){
    let api =await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=d5d736319f5aeae04d8589ffa0da7c5e&language=en-US&page=1`);
     let finalResult = await api.json();
     moviesArray=finalResult.results;
     displayMovie(moviesArray);
    }
    async function getpopular(){
        let api =await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d5d736319f5aeae04d8589ffa0da7c5e&language=en-US&page=1`);
         let finalResult = await api.json();
         moviesArray=finalResult.results;
         displayMovie(moviesArray);
    }
    async function getToprated(){
            let api =await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=d5d736319f5aeae04d8589ffa0da7c5e&language=en-US&page=1`);
             let finalResult = await api.json();
             moviesArray=finalResult.results;
             displayMovie(moviesArray);
    }
    async function getupComing(){
                let api =await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=d5d736319f5aeae04d8589ffa0da7c5e&language=en-US&page=1`);
                 let finalResult = await api.json();
                 moviesArray=finalResult.results;
                 displayMovie(moviesArray);
    }
    async function getTrindingMovies(){
        let api =await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=d5d736319f5aeae04d8589ffa0da7c5e`);
         let finalResult = await api.json();
         moviesArray=finalResult.results;
         displayMovie(moviesArray);
    }
    getTrindingMovies()
    function displayMovie(moviesList){
        let container=``;
        for(i=0 ; i<moviesList.length;i++){
            container+=`    <div class="col-md-4 p-2">
            <div class="post position-relative rounded h-100">
              <img src="https://image.tmdb.org/t/p/w500${moviesList[i].poster_path}" class="w-100 rounded " alt="">
              <div class="imgLayer d-flex justify-content-center align-items-center rounded">
                <div class="layerInner text-center text-white p-2">
                 <h2>${moviesList[i].title}</h2>
                 <p>${moviesList[i].overview}</p>
                 <p>rate: ${moviesList[i].vote_average}</p>
                 <p>${moviesList[i].release_date}</p>
                </div>
              </div>
            </div>
      
          </div>`  ;
        }
        document.querySelector('.row').innerHTML=container;
    }
    async function searchApi(searchTearm){
    let api = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d5d736319f5aeae04d8589ffa0da7c5e&query=${searchTearm}t&language=en-US&page=1`);
    let finalResult = await api.json();
    moviesArray=finalResult.results;
    displayMovie(moviesArray);
    }
    async  function searchDisplayMovie(searchTerm){
    let searchArray;
    let searchDisplay=[];
    await getTrindingMovies()
    searchArray= moviesArray

        for(var i = 0 ; i<searchArray.length ; i++)
        {
            if(searchArray[i].title.includes(searchTerm)==true)
            {
                searchDisplay.push(searchArray);
            }
        }
        displayMovie(searchDisplay);
    }


// validation functions
let nameRegex = /^[A-Z][a-z]{2,8}$/
nameInput.onkeyup=function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        namealert.classList.add("d-none");
    return true;
}else{
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    namealert.classList.remove("d-none");
   return false;
}

}



var emailRejex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
emailInput.onkeyup=function isEmailValid(){
    if(emailRejex.test(emailInput.value)){
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        emailalert.classList.add("d-none");
    return true;
}else{
    namealert.classList.add("is-invalid");
    namealert.classList.remove("is-valid");
    emailalert.classList.remove("d-none");
   return false;
}
}
let phoneRejex = /^(002)?(010|012|011)[0-9]{8}$/
phoneInput.onkeyup=function isPhoneValid(){
    if(phoneRejex.test(phoneInput.value)){
        phoneInput.classList.add("is-valid");
        phoneInput.classList.remove("is-invalid");
        phonealert.classList.add("d-none");
    return true;
}else{
    phoneInput.classList.add("is-invalid");
    phoneInput.classList.remove("is-valid");
    phonealert.classList.remove("d-none");
   return false;
}
}
let ageRejex = /^([1-7][0-9]|80)$/
ageInput.onkeyup=function isAgeValid(){
    if(ageRejex.test(ageInput.value)){
        ageInput.classList.add("is-valid");
        ageInput.classList.remove("is-invalid");
        ageAlert.classList.add("d-none");
    return true;
}else{
    ageInput.classList.add("is-invalid");
    ageInput.classList.remove("is-valid");
    ageAlert.classList.remove("d-none");
   return false;
}
}
let passwordRegex = /^^[a-zA-Z0-9]{4,8}$/
passwordInput.onkeyup=function isPasswordValid(){
    if(passwordRegex.test(passwordInput.value)){
        passwordInput.classList.add("is-valid");
        passwordInput.classList.remove("is-invalid");
        passwordAlert.classList.add("d-none");
    return true;

}else{
    passwordInput.classList.add("is-invalid");
    passwordAlert.classList.remove("is-valid");
    passwordAlert.classList.remove("d-none");
   return false;
}
}

rePasswordInput.onkeyup=function isRePassValid(){
    if(passwordInput.value==rePasswordInput.value){
        rePasswordInput.classList.add("is-valid");
        rePasswordInput.classList.remove("is-invalid");
        repasswordalert.classList.add("d-none");
    return true;
}else{
    rePasswordInput.classList.add("is-invalid");
    rePasswordInput.classList.remove("is-valid");
    repasswordalert.classList.remove("d-none");
   return false;
}
}

function validSubmitBtn (){

if (isNameValid()==true&& isEmailValid()==true&& isPhoneValid()==true&&
 isAgeValid()==true&&isPasswordValid()==true&& isRePassValid()==true){
    submitBtn.removeAttribute("disabled");
 }
}
