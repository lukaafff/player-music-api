//url API
  const url = "https://api-music-pearl.vercel.app/musicas";
  
  //selectors
  const tocando = document.querySelector(".tocando");
  const img_musica = document.querySelector(".img-musica");
  const nome = document.querySelector(".nome");
  const artista = document.querySelector(".artista");
  const audio = document.querySelector("audio");
  
  const btnProximaMusica = document.querySelector("#btnProximaMusica");
  const btnAnteriorMusica = document.querySelector("#btnAnteriorMusica");
  const btnVoltarMusicaTocando = document.querySelector("#btnVoltarMusicaTocando");
  const btnListaMusicas = document.querySelector("#btnListaMusicas");
  
  const lista = document.querySelector("#lista-musicas");
  
  const duracao = document.querySelector('.duracao');
  const final = document.querySelector('.final');
  
  let progress = document.querySelector('#progress');
  let song = document.querySelector('#song');
  let ctrIcon = document.querySelector('#ctrIcon');
  
  //variaveis
  let musicas = [];
  let musicaAtual = 0;
  
  //pegar dados da API
  async function carregarMusicas() {
      try {
        const resposta = await fetch(url);
        musicas = await resposta.json();
        mostrarMusicaAtual();
      } catch (error) {
        console.error(error);
      }
  
      //lista de musicas
      lista.classList.add("ocultar"); // Oculta a lista de músicas inicialmente
      lista.innerHTML = ""; // Limpa a lista antes de adicionar as músicas
  
      musicas.forEach((musica, index) => {
        const item = document.createElement("li");
        item.innerText = `${musica.nome} - ${musica.artista}`;
  
        item.addEventListener("click", () => {
          musicaAtual = index; // Atualiza a música atual com o índice clicado
          mostrarMusicaAtual();
          voltarMusicaTocando();
          carregarAudio();
        });
  
        lista.appendChild(item);
    });
  
    mostrarMusicaAtual();
  
    }
  
    //mostrar musica tocando atual
  function mostrarMusicaAtual() {
      const musica = musicas[musicaAtual];
  
      img_musica.src = musica.foto;
      nome.innerText = musica.nome;
      artista.innerText = musica.artista;
      audio.src = musica.audio;
  }
  
  function playMusica() {
    song.play();
    ctrIcon.classList.remove("bx-play");
    ctrIcon.classList.add("bx-pause");
  }
  
  //ir para proxima musica
  function proximaMusica() {
      musicaAtual++;
      if (musicaAtual >= musicas.length) {
        musicaAtual = 0;
      }
      mostrarMusicaAtual();
      carregarAudio();
    }
  
    //ir para a musica anterior
    function anteriorMusica() {
      musicaAtual--;
      if (musicaAtual < 0) {
        musicaAtual = musicas.length - 1;
      }
      mostrarMusicaAtual();
      carregarAudio();
    }
    
  
    function listaMusicas() {
      lista.classList.toggle("ocultar"); // Adiciona ou remove a classe "ocultar" da lista de músicas
      tocando.classList.toggle("ocultar"); 
    }
  
    function voltarMusicaTocando(){
      tocando.classList.remove("ocultar");
      lista.classList.add("ocultar")
    }
  
   //carregar metadados das musicas
    song.onloadedmetadata = function() {
    song.pause();
    progress.max = song.duration;
    progress.value = song.currentTime;
    duracao.innerText = formatTime(song.currentTime);
    final.innerText = formatTime(song.duration);
  
    //atualizar metadados das musicas
    song.ontimeupdate = function() {
      progress.value = song.currentTime;
      duracao.innerText = formatTime(song.currentTime);
    };
  };
  
    //formatar tempo em minutos e segundos
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${padZero(minutes)}:${padZero(seconds)}`;
    }
    
    //colocar 0 a esquerda para assim sempre ter 2 digitos
    function padZero(number) {
      return number.toString().padStart(2, '0');
    }
    
  //tocar e pausar a musica
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
  
  //verifica se a musica esta tocando e atualiza a barra de progresso
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
  
  
  //muda o icone de play e plause caso musica estaja ou nao tocando
  progress.addEventListener("input", function() {
    song.currentTime = progress.value;
    duracao.innerText = formatTime(song.currentTime);
  });
  
  function carregarAudio(){
      // Adiciona o evento de carregamento da mídia
    audio.addEventListener('loadeddata', () => {
      playMusica();
    });
  
  }
   
  btnProximaMusica.addEventListener("click", proximaMusica);
  btnAnteriorMusica.addEventListener("click", anteriorMusica);
  btnVoltarMusicaTocando.addEventListener("click", voltarMusicaTocando);
  btnListaMusicas.addEventListener("click", listaMusicas);
  
  carregarMusicas();
  
