const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");
let isPlaying = true;
let indexSong = 0;
//const musics = ["Dancing Queen.mp3","Happy New Year.mp3","I Have A Dream.mp3","Money Money Money.mp3"];
const musics = [
    {
        id: 1,
        title: "Happy New Year-ABBA",
        file: "Happy New Year.mp3",
        image: "https://i.pinimg.com/originals/1f/d2/fc/1fd2fce541e0246384cd62c1200e8a44.jpg",
    },
    {
        id: 2,
        title: "Dancing Queen-ABBA",
        file: "Dancing Queen.mp3",
        image: "https://static.stereogum.com/uploads/2019/10/ABBA-Dancing-Queen-1570816662-520x516.jpeg",
    },

    {
        id: 3,
        title: "I Have A Dream-ABBA",
        file: "I Have A Dream.mp3",
        image: "https://m.media-amazon.com/images/I/71hfZJPAgrL._SL1200_.jpg",
    },
    {
        id: 4,
        title: "Money Money Money-ABBBA",
        file: "Money Money Money.mp3",
        image: "https://i.ytimg.com/vi/Zqcf1r1zBxc/maxresdefault.jpg",
    },
    {
        id: 5,
        title: "Season in the Sun-Westlife",
        file: "Westlife Seasons In The Sun.mp3",
        image: "https://c-fa.cdn.smule.com/rs-s83/arr/02/ff/1102e19a-b7ad-4c02-926a-deaa46b2d665_1024.jpg",
    },
];

let timer;

nextBtn.addEventListener("click", function (){
    changeSong(1);
});
prevBtn.addEventListener("click", function (){
    changeSong(-1);
});
song.addEventListener("ended",handleEndedSong);
function handleEndedSong(){
    changeSong(1);
}
function changeSong(dir) {
    if (dir ==1){
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;

    } else if (dir == -1) {
        indexSong--;
        if (indexSong<0) {
            indexSong = musics.length -1;
        }
        isPlaying = true;
    }
    init(indexSong);
    //song.setAttribute("src", `Musicfile/${musics[indexSong].file}`);
    playPause();
}
playBtn.addEventListener("click", playPause);
function playPause(){
    if (isPlaying){
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer,500);
    } else {
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play" ></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}
function displayTimer() {
    const {duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if(!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}
function formatTimer(number){
    const minutes = Math.floor(number/60);
    const second = Math.floor(number-minutes * 60);
    return `${minutes}:${second}`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
}
function init(indexSong) {

    song.setAttribute("src",`Music file/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;

}
displayTimer();
init(indexSong);
