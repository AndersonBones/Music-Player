
/* Por enquanto só é possível adicionar novas musicas manualmente, modificando o objeto 'AudioTracks' */
/* Para adicionar novas musicas: */

/* #1 Adicione o caminho da nova música na propriedade 'src' do objeto AudioTracks (ela deve estar na pasta 'Musics') */
/* #2 Adicione o titulo da nova música na propriedade 'title' do objeto AudioTracks */
/* #3 Adicione o nome do artista da nova música na propriedade 'artist' do objeto AudioTracks */

/* os valores das propriedades src, title e artist devem estar em ordem com a música */



var mp3 = document.getElementsByTagName("audio")[0];
var play_icon = document.getElementsByClassName('bi bi-play-fill')[0];
var volume_icon = document.getElementsByClassName("bi bi-volume-down-fill")[0];
var play_button = document.getElementsByClassName("play-button")[0];
var timingMusic = document.getElementById("timing");
var DurationMusic = 0;
var srcMusic = document.getElementsByTagName('source')[0];
var volume_controler = document.getElementById("volume-controler");
var artist = document.getElementById("artist");
var titleMusic = document.getElementById("title-music");
let indexMusic = 0;

var AudioTracks = {
    src:['./Musics/5 Minutes Alone.mp3','./Musics/Black Is The Soul.mp3', './Musics/Blind.mp3',
    './Musics/Du Hast.mp3','./Musics/Falling Away from Me.mp3', './Musics/Feel Invincible.mp3', './Musics/Indestructible.mp3',
    "./Musics/Refuse Resist.mp3", './Musics/Summer.mp3','./Musics/Symphonia.mp3','./Musics/Under Control.mp3',
    './Musics/Vermilion Pt. 2.mp3', './Musics/Whistle.mp3'],
    
    title:['5 Minutes Alone','Black Is The Soul','Blind','Du Hast','Falling Away from Me','Feel Invicible', 'Indestructible',
    'Refuse / Resist', 'Summer','Symphonia','Under Control (feat. Hurts)','Vermilion, Pt 2','Whistle'],

    artist:['Pantera','KoRn','KoRn','Rammstein','KoRn','Skillet', 'Disturbed','Sepultura', 'Calvin Harris', 'Alok','Calvin Harris & Alesso','Slipknot', 'Flo Rida'],
}

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
    if(AudioTracks.title[indexMusic].length > 20 || AudioTracks.artist[indexMusic].length > 20){
        titleMusic.style.fontSize = '12px';
        artist.style.fontSize = '15px';

        artist.innerText = AudioTracks.artist[indexMusic];
        titleMusic.innerText = AudioTracks.title[indexMusic];
    }
    else{
        titleMusic.style.fontSize = '15px';
        artist.style.fontSize = '18px';
        
        artist.innerText = AudioTracks.artist[indexMusic];
        titleMusic.innerText = AudioTracks.title[indexMusic];
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
        
},1000);



function PauseMusic(){ /* configura o pause da musica */
    mp3.pause(); /* pausa a musica */
    changePlayIcon(); /* modifica o icone*/
    changeAttribute(play_button, 'onclick', 'PlayMusic()'); /* modifica o valor do onclick do botão pause */
   
}   


function NextMusic(){ /* alterna para a proxima musica */
    mp3.load(); /* recarrega a musica atual */

    indexMusic+=1; /* incrementa o indice da música */
    
    if(indexMusic > AudioTracks.src.length-1){ /* se o indice ultrapassar a ultima musica, retorna para a primeira musica */
        indexMusic = 0;
    }

    changeAttribute(srcMusic, 'src', AudioTracks.src[indexMusic]); /* atualiza o caminho da musica */
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

    changeAttribute(srcMusic, 'src', AudioTracks.src[indexMusic]);
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