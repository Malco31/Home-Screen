let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const music_list = [
    {
        img : 'images/Metro-Boomin.webp',
        name : 'Around Me',
        artist : 'Don Toliver',
        music : 'music/Around Me.mp3'
    },
    {
        img : 'images/Mark_Morrison_Return_Of_the_Mack_Album_Cover.jpeg',
        name : 'Return of The Mack',
        artist : 'Mack Morrison',
        music : 'music/Returnofthemack.mp3'
    },
    {
        img : 'images/CasinoJizzle.jpeg',
        name : '40 Bars (Freestyle)',
        artist : 'Casino Jizzle',
        music : 'music/40 Bars (Freestyle).mp3'
    },
    {
        img : 'images/BigScarr.jpeg',
        name : 'I Would Keep Goin',
        artist : 'Big Scarr',
        music : 'music/Big Scarr - I Would Keep Goin (AUDIO).mp3'
    },
    {
        img : 'images/ESTGEECover.jpeg',
        name : 'Lick Back Remix',
        artist : 'EST Gee',
        music : 'music/EST Gee - Lick Back Remix (feat. Future, Young Thug) [Official Audio].mp3'
    },
    {
        img : 'images/LilDouble0.jpeg',
        name : 'HMP',
        artist : 'Lil Double O',
        music : 'music/Lil Double 0 - HMP (Official Audio).mp3'
    },
    {
        img : 'images/JID-The-Forever-Story.webp',
        name : 'Kody Blu 31',
        artist : 'J.I.D',
        music : 'music/JID - Kody Blu 31 (Official Audio).mp3'
    },
    {
        img : 'images/RemembertheTime.png',
        name : 'Remember the Time',
        artist : 'Michael Jackson',
        music : 'music/Michael Jackson - Remember The Time (Official Video).mp3'
    },
    {
        img : 'images/Metro-Boomin.webp',
        name : 'Too Many Nights',
        artist : 'Don Toliver',
        music : 'music/Too Many Nights.mp3'
    },
    {
        img : 'images/Metro-Boomin.webp',
        name : 'Metro Spider',
        artist : 'Young Thug',
        music : 'music/Metro Spider.mp3'
    },
    {
        img : 'images/Allfallsdown.jpeg',
        name : 'All Falls Down',
        artist : 'Kanye West',
        music : 'music/All Falls Down.mp3'
    },
    {
        img : 'images/SnowonDaBluff.jpeg',
        name : 'Snow on Tha Bluff',
        artist : 'J.Cole',
        music : 'music/J. Cole - Snow On Tha Bluff (Official Audio).mp3'
    },
    {
        img : 'images/JID-The-Forever-Story.webp',
        name : '2007',
        artist : 'J.I.D',
        music : 'music/2007.mp3'
    },
    {
        img : 'images/JID-The-Forever-Story.webp',
        name : 'Sistanem',
        artist : 'J.I.D',
        music : 'music/JID - Sistanem (Official Audio).mp3'
    },
    {
        img : 'images/amilli.jpg',
        name : 'A Milli',
        artist : 'Lil Wayne',
        music : 'music/A Milli.mp3'
    },
    {
        img : 'images/j.cole.jpg',
        name : 'No Role Modelz',
        artist : 'J.Cole',
        music : 'music/No Role Modelz.mp3'
    },
    {
        img : 'images/spanishsong.jpg',
        name : 'Fue Mejor',
        artist : 'Kali Uchis',
        music : 'music/Kali Uchis - Fue Mejor ft.SZA (Lyrics).mp3'
    },
    {
        img : 'images/lilbaby.png',
        name : 'Pop Out',
        artist : 'Lil Baby',
        music : 'music/Lil Baby, Nardo Wick - Pop Out (Lyric Video).mp3'
    },
    {
        img : 'images/carter5.jpg',
        name : 'Mona Lisa',
        artist : 'Lil Wayne',
        music : 'music/Lil Wayne - Mona Lisa ft. Kendrick Lamar.mp3'
    },
    {
        img : 'images/mariahthescientist.jpg',
        name : 'Brain',
        artist : 'Mariah the Scientist',
        music : 'music/Mariah the Scientist - Brain (Audio).mp3'
    },
    {
        img : 'images/gospel.jpg',
        name : 'The Best in Me',
        artist : 'Marvin Sapp',
        music : 'music/Marvin Sapp- The Best In Me (LyricsSong).mp3'
    },
    {
        img : 'images/moneytrees.jpg',
        name : 'Money Trees',
        artist : 'Kendrick Lamar',
        music : 'music/Money Trees.mp3'
    },
    {
        img : 'images/popsmoke.jpg',
        name : 'Got it on Me',
        artist : 'Pop Smoke',
        music : 'music/POP SMOKE - GOT IT ON ME (OFFICIAL VIDEO).mp3'
    },
    {
        img : 'images/youngboy.jpg',
        name : 'Umm Hmm',
        artist : 'NBA Youngboy',
        music : 'music/NBA Youngboy - Umm Hmm [Official Audio].mp3'
    },
    {
        img : 'images/TooHotCover.jpeg',
        name : 'Too Hot',
        artist : 'NLE Choppa',
        music : 'music/NLE Choppa - Too Hot (feat. Moneybagg Yo) [Official Music Video].mp3'
    },
    {
        img : 'images/sZa.jpg',
        name : 'Kill Bill',
        artist : 'SZA',
        music : 'music/SZA - Kill Bill (Audio).mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// document.addEventListener("keydown", function(event) {
//     if (event.code === "Space" || event.code === "F8") {
//         if(curr_track.paused){
//             curr_track.play();
//             playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
//         }else{
//             curr_track.pause();
//             playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
//         }
//     }
// })

const data = [
    { name: 'John', age: 30, group: 'A' },
    { name: 'Mary', age: 25, group: 'B' },
    { name: 'Mike', age: 20, group: 'A' },
    { name: 'Jane', age: 15, group: 'C' },
    { name: 'Peter', age: 25, group: 'B' }
  ];
  
  // while loop
let len = data.length, count = 0;
while(len--) {
    console.log(data[count]);
    count++;
}