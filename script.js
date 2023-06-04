const url = "https://api-music-pearl.vercel.app/musicas";

const container = document.querySelector(".container");
const musicaDiv = document.querySelector(".musica");
const img_musica = document.querySelector(".img-musica");
const nome = document.querySelector(".nome");
const artista = document.querySelector(".artista");
const audio = document.querySelector("audio");

const btnProximaMusica = document.querySelector("#btnProximaMusica");
const btnAnteriorMusica = document.querySelector("#btnAnteriorMusica");

const duracao = document.querySelector('.duracao');
const final = document.querySelector('.final');

let progress = document.querySelector('#progress');
let song = document.querySelector('#song');
let ctrIcon = document.querySelector('#ctrIcon');

let musicas = [];
let musicaAtual = 0;

async function carregarMusicas() {
    try {
      const resposta = await fetch(url);
      musicas = await resposta.json();
      mostrarMusicaAtual();
    } catch (error) {
      console.error(error);
    }
  }

function mostrarMusicaAtual() {
    const musica = musicas[musicaAtual];

    img_musica.src = musica.foto;
    nome.innerText = musica.nome;
    artista.innerText = musica.artista;
    audio.src = musica.audio;

}

function proximaMusica() {
    musicaAtual++;
    if (musicaAtual >= musicas.length) {
      musicaAtual = 0;
    }
    mostrarMusicaAtual();
  }

  function anteriorMusica() {
    musicaAtual--;
    if (musicaAtual <= musicas.length) {
      musicaAtual = 0;
    }
    mostrarMusicaAtual();
  }

  song.onloadedmetadata = function() {
    song.pause();
    progress.max = song.duration;
    progress.value = song.currentTime;
    duracao.innerText = formatTime(song.currentTime);
    final.innerText = formatTime(song.duration);
  };
  
  song.ontimeupdate = function() {
    progress.value = song.currentTime;
    duracao.innerText = formatTime(song.currentTime);
  };
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }
  
  function padZero(number) {
    return number.toString().padStart(2, '0');
  }
  

function playPause() {
    if(ctrIcon.classList.contains("bx-pause")){
        song.pause();
        ctrIcon.classList.remove("bx-pause");
        ctrIcon.classList.add("bx-play");
    }
    else{
        song.play();
        ctrIcon.classList.remove("bx-play");
        ctrIcon.classList.add("bx-pause");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    },500)
}

  progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrIcon.classList.remove("bx-play");
    ctrIcon.classList.add("bx-pause");
}


btnProximaMusica.addEventListener("click", proximaMusica);

btnAnteriorMusica.addEventListener("click", anteriorMusica);

carregarMusicas();
