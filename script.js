
/* Por enquanto, só é possível adicionar novas musicas manualmente, modificando o objeto 'AudioTracks' */
/* Para adicionar novas musicas: */
/* # Adicione o caminho da nova música na propriedade 'src' do objeto AudioTracks */
/* # Adicione o titulo da nova música na propriedade 'title' do objeto AudioTracks */
/* # Adicione o nome do artista da nova música na propriedade 'artist' do objeto AudioTracks */
/* os valores das propriedades src, title e artist devem estar em ordem */

var mp3 = document.getElementsByTagName("audio")[0];
var play_btn = document.getElementsByClassName('bi bi-play-fill')[0];
var volume_btn = document.getElementsByClassName("bi bi-volume-down-fill")[0];
var button = document.getElementsByClassName("play-button")[0];
var input = document.getElementById("timing");
var timeMusic;
var source = document.getElementsByTagName('source')[0];
var volume = document.getElementById("volume-controler");
var artist = document.getElementById("artist");
var titleMusic = document.getElementById("title");
let indexMusic = 0;

var AudioTracks = {
    src:['./Musics/5 Minutes Alone.mp3','./Musics/Black Is The Soul.mp3', './Musics/Falling Away from Me.mp3', './Musics/Feel Invincible.mp3', "./Musics/Refuse Resist.mp3", './Musics/Vermilion Pt. 2.mp3'],
    title:['5 Minutes Alone','Black Is The Soul','Falling Away from Me','Feel Invicible', 'Refuse / Resist', 'Vermilion, Pt 2'],
    artist:['Pantera','KoRn','KoRn','Skillet', 'Sepultura', 'Slipknot'],
}

changeInfoMusic();

mp3.onloadeddata = function(){
    timeMusic = Math.round(mp3.duration);
    input.setAttribute('max', timeMusic);
}


function TimeMusic(){
    var frame = setInterval(() => {
        input.value = Math.round(mp3.currentTime);
        
    },1000);
}


function changePlayIcon(){
    play_btn.classList.toggle('bi-play-fill');
    play_btn.classList.toggle('bi-pause-fill');
}

function changeAttribute(element,attribute, value){
    element.setAttribute(attribute, value);
    
}

function changeInfoMusic(){
    artist.innerText = AudioTracks.artist[indexMusic];
    titleMusic.innerText = AudioTracks.title[indexMusic];
}

function PlayMusic(){
    mp3.play();
    changePlayIcon();
    changeAttribute(button, 'onclick', 'PauseMusic()');

    if(mp3.paused == false){
        TimeMusic();
    }
    Volume();
}   


function PauseMusic(){
    mp3.pause();
    changePlayIcon();
    changeAttribute(button, 'onclick', 'PlayMusic()');
   
}   


function NextMusic(){
    mp3.load();

    indexMusic+=1;
    
    if(indexMusic > AudioTracks.src.length-1){
        indexMusic = 0;
    }

    changeAttribute(source, 'src', AudioTracks.src[indexMusic]);
    changeInfoMusic();

    if(button.getAttribute('onclick') == 'PauseMusic()'){
        PlayMusic();
        changePlayIcon();
    
    }
    
    input.value = 0;
   
}


function BackMusic(){
    mp3.load();
    indexMusic-=1;

    if(indexMusic < 0){
        indexMusic = 0;
    }

    changeAttribute(source, 'src', AudioTracks.src[indexMusic]);
    changeInfoMusic();

    if(button.getAttribute('onclick') == 'PauseMusic()'){
        PlayMusic();
        changePlayIcon();
        
    }

    input.value = 0;
  
}


function SetTiming(){
    mp3.currentTime = input.value;

    if(mp3.paused == false){
        mp3.play();

    }    
}


function Volume(){
    mp3.volume = volume.value/100;

    if(mp3.volume > 0.60){
        changeAttribute(volume_btn, 'class', 'bi bi-volume-up-fill');
    }

    if(mp3.volume < 0.60){
        changeAttribute(volume_btn, 'class', 'bi bi-volume-down-fill');
    }

    if(mp3.volume == 0){
        changeAttribute(volume_btn, 'class', 'bi bi-volume-mute-fill');
    }

}