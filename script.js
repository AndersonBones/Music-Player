var mp3 = document.getElementsByTagName("audio")[0];

var play_icon = document.getElementsByClassName('bi bi-play-fill')[0];
var volume_icon = document.getElementsByClassName("bi bi-volume-down-fill")[0];

var play_button = document.getElementsByClassName("play-button")[0];
var timingMusic = document.getElementById("timing");
var DurationMusic = 0;
let indexMusic = 0;

var srcMusic = document.getElementsByTagName('source')[0];
var volume_controler = document.getElementById("volume-controler");

var artist = document.getElementById("artist");
var titleMusic = document.getElementById("title-music");

var current_Time_value = document.getElementById("current-time-value");
var duration_value = document.getElementById("duration-value");


var musics = [
    {
        src:'./Musics/5 Minutes Alone.mp3',
        title:'5 Minutes Alone',
        artist:'Pantera'
    },

    {
        src:'./Musics/Black Is The Soul.mp3',
        title:'Black Is The Soul',
        artist:'KoRn'
    },

    {
        src:'./Musics/Blind.mp3',
        title:'Blind',
        artist:'KoRn'
    },

    {
        src:'./Musics/Du Hast.mp3',
        title:'Du Hast',
        artist:'Rammstein'
    },

    {
        src:'./Musics/Falling Away from Me.mp3',
        title:'Falling Away from Me',
        artist:'KoRn'
    },

    {
        src:'./Musics/Feel Invincible.mp3',
        title:'Feel Invicible',
        artist:'Skillet'
    },

    {
        src:'./Musics/Indestructible.mp3',
        title:'Indestructible.mp3',
        artist:'Disturbed'
    },

    {
        src:'./Musics/Refuse Resist.mp3',
        title:'Refuse Resist.mp3',
        artist:'Sepultura'
    },

    {
        src:'./Musics/Summer.mp3',
        title:'Summer',
        artist:'Calvin Harris'
    },

    {
        src:'./Musics/Symphonia.mp3',
        title:'Symphonia',
        artist:'Alok'
    },

    {
        src:'./Musics/Under Control.mp3',
        title:'Under Control (feat. Hurts)',
        artist:'Calvin Harris & Alesso'
    },

    {
        src:'./Musics/Vermilion Pt. 2.mp3',
        title:'Vermilion Pt. 2',
        artist:'Slipknot'
    },

    {
        src:'./Musics/Whistle.mp3',
        title:'Whistle',
        artist:'Flo Rida'
    },

];



UpdateInfoMusic();

mp3.onloadeddata = function(){ 
    DurationMusic = Math.round(mp3.duration); /* Armazena a duração da musica atual*/
    timingMusic.setAttribute('max',DurationMusic); /* configura o atributo 'max' com o valor de duração da musica atual */
}

function changePlayIcon(){ /* modifica os icones play e pause */
    play_icon.classList.toggle('bi-play-fill');
    play_icon.classList.toggle('bi-pause-fill');
}

function changeAttribute(element,attribute, value){ /* modifica um atributo de um elemento especificado */
    element.setAttribute(attribute, value);
}

function UpdateInfoMusic(){ /* atualiza as informações da música atual */
    
    if(musics[indexMusic].title.length > 20 || musics[indexMusic].artist.length > 20){  
        artist.style.fontSize = '17px';
        titleMusic.style.fontSize = '15px';

        artist.innerText = musics[indexMusic].artist;
        titleMusic.innerText = musics[indexMusic].title;
    }
    else{
        titleMusic.style.fontSize = '18px';
        artist.style.fontSize = '20px';
        
        artist.innerText = musics[indexMusic].artist;
        titleMusic.innerText = musics[indexMusic].title;
    }
}

function PlayMusic(){ /* configura a inicialização da musica */
    mp3.play(); /* inicia a musica */
    changePlayIcon(); /* modifica o icone */
    changeAttribute(play_button, 'onclick', 'PauseMusic()');  /* modifica o valor do onclick do botão play */

    Volume(); /* atualiza o volume */
}


setInterval(() => { /* a cada 1 segundo incrementa o value do timinigMusic com a posição atual da musica */
    timingMusic.value = Math.round(mp3.currentTime);
    current_Time_value.innerText = formatSecondsAsTime(Math.round(mp3.currentTime));
    duration_value.innerText = formatSecondsAsTime(Math.round(mp3.duration));

    if(formatSecondsAsTime(Math.round(mp3.currentTime)) == formatSecondsAsTime(Math.round(mp3.duration))){
        NextMusic();
    }
},1000);



function PauseMusic(){ /* configura o pause da musica */
    mp3.pause(); /* pausa a musica */
    changePlayIcon(); /* modifica o icone*/
    changeAttribute(play_button, 'onclick', 'PlayMusic()'); /* modifica o valor do onclick do botão pause */
   
}   


function NextMusic(){ /* alterna para a proxima musica */
    mp3.load(); /* recarrega a musica atual */

    indexMusic+=1; /* incrementa o indice da música */
    
    if(indexMusic > musics[indexMusic].src.length-1){ /* se o indice ultrapassar a ultima musica, retorna para a primeira musica */
        indexMusic = 0;
    }

    changeAttribute(srcMusic, 'src', musics[indexMusic].src); /* atualiza o caminho da musica */
    UpdateInfoMusic(); /* atualiza as informações da musica  */

    if(play_button.getAttribute('onclick') == 'PauseMusic()'){ /* se o botão pause estiver visível */
        PlayMusic(); /* inicia a musica */
        changePlayIcon(); /* atualiza as informações da musica */
    
    }
    
    timingMusic.value = 0; /* zera o timingMusic*/
    
}


function BackMusic(){ /* alterana para a musica anterior */
    mp3.load(); /* recarrega a musica atual */
    indexMusic-=1; /* decrementa o indice da música */

    if(indexMusic < 0){ 
        indexMusic = 0;
    }

    changeAttribute(srcMusic, 'src', musics[indexMusic].src);
    UpdateInfoMusic();

    if(play_button.getAttribute('onclick') == 'PauseMusic()'){
        PlayMusic();
        changePlayIcon();
        
    }

    timingMusic.value = 0;
  
}


function SetTiming(){
    mp3.currentTime = timingMusic.value;
    if(mp3.paused == false){
        mp3.play();

    }    
}



function Volume(){

    if(volume_icon.getAttribute('class') == 'bi bi-volume-down-fill' || volume_icon.getAttribute('class') == 'bi bi-volume-up-fill' || volume_controler.value > 0){
        mp3.volume = volume_controler.value/100;
    }


    if(mp3.volume > 0.60){
        changeAttribute(volume_icon, 'class', 'bi bi-volume-up-fill');
    }

    if(mp3.volume < 0.60){
        changeAttribute(volume_icon, 'class', 'bi bi-volume-down-fill');
    }

    if(mp3.volume == 0){
        changeAttribute(volume_icon, 'class', 'bi bi-volume-mute-fill');
    }

}


function formatSecondsAsTime(secs, format) { /* configura o time da musica */
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  
    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }
  
    return min + ':' + sec;
  }
