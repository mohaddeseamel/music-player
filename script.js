'use strict'
const image             = document.querySelector('img');
const title             = document.getElementById('title');
const artist            = document.getElementById('artist');
const music             = document.querySelector('audio');
const prevBtn           = document.getElementById('prev');
const playBtn           = document.getElementById('play');
const nextBtn           = document.getElementById('next');
const progressContainer = document.getElementById('progressContainer');
const progress          = document.getElementById('progress');
const currentTimeEl     = document.getElementById('current-time');
const durationEl          = document.getElementById('duration');

//music

const songs = [
    {
        name:'Jacinto-1',
        displayName:'Electric chill machine',
        artist:'Jacinto Design'
    },
    {
        name:'Jacinto-2',
        displayName:'seven Nation Army (Remix)',
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:'front Row (Remix)',
        artist:'Metric/Jacinto Design'  
    }
]



//check playMusic
let isPlaying = false;

//play music
function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play' , 'fa-pause');
    playBtn.setAttribute('title' , 'pause')
    music.play()
}

//pause music
function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause' , 'fa-play');
    music.pause()
}

//play or pause music eventListener
playBtn.addEventListener('click' , () => (isPlaying ? pauseMusic() : playMusic()));


//update Dom

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpg`;
}

//current song

let songIndex = 0;

//prev song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}


//next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

loadSong(songs[songIndex]);

//update progressBar & time
function updateProgressBar(e){
    if(isPlaying){
        const {duration , currentTime} = e.srcElement;

        //update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        //delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
//set progress Bar
function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth;
    console.log(width);
    const clickX = e.offsetX;
    console.log(clickX);
    const {duration} = music;
    console.log(clickX/width);
    console.log((clickX/width)* duration);
    music.currentTime = (clickX/width)* duration;
}

//Event Listener

prevBtn.addEventListener('click' , prevSong);
nextBtn.addEventListener('click' , nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);