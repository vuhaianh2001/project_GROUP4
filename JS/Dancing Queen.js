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
        title: "Dancing Queen-ABBA",
        file: "Dancing Queen.mp3",
       image: "https://photo2.tinhte.vn/data/attachment-files/2021/04/5429498_tinhte-dancing_queen_hit_duy_nhat_abba_dat_top_1_tai_my-cover.jpg",
    },
    {
        id: 2,
        title: "Happy New Year-ABBA",
        file: "Happy New Year.mp3",
        image: "https://b00b26fa-a-9cdd8475-s-sites.googlegroups.com/a/sinhvien.hoasen.edu.vn/onedayonesongonestory/nhac-us-uk/136happynewyear-abba-1980/10885416_1551562591748866_1423960818998912774_n.jpg?attachauth=ANoY7cpLp0KThbYwqxcQ1ngN5mDvyKL9dLWthp81dixM-LDfgfpwFb6X-H49JjsK1LQ5gzkz9BF1uiy6uTaA-_Vz89piRojwSrPnRJcpoiurHhFtd_QyvSrfSD1b6M5XEz3E3UU0y2l-spnRLsvn49Q22eZbePzaByhZYNw7I3kgG2RrpcNSb7ecilbottU_jGsENciFbufll0z80xvq2hmFphCNDsm8LKlQeTWdkL4raRhq9fFz3NJ0GOQzwObf7rDWw4ja0M8E33mHWDCBfjS0pE1w8BtfOpxRreLQbLdGHj9NArRXGR0sHahOeNUWNlHJjtsoVFKs6Xtig6tO-DsPwGduDoYQ7g%3D%3D&attredirects=0",
    },
    {
        id: 3,
        title: "I Have A Dream-ABBA",
        file: "I Have A Dream.mp3",
        image: "https://upload.wikimedia.org/wikipedia/en/8/84/I_Have_A_Dream.jpg",
    },
    {
        id: 4,
        title: "Money Money Money-ABBBA",
        file: "Money Money Money.mp3",
        image: "https://note-store.com/upload/iblock/228/Money_-money_-money.png",
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

    song.setAttribute("src",`Musicfile/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;

}
displayTimer();
init(indexSong);
