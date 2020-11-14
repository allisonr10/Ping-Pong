//Elementos
let vbtIniciar;
let vbola;
let vcpu;
let vjogador;
let vpaineltxtPontos;
//controle de animação
var game, frames;

//Posições

let posBolaX, posBolaY;
let posjogadorX, posjogadorY;
let poscpuX, poscpuY;

//variavel para botões do teclado

let dirJy;

//Posições Iniciais

let posicaoInicialJogadorX = 180,
  posicaoInicialCpuY = 180,
  posBolaInicialX = 475,
  posBolaInicialY = 240;

//Variaveis de tamanho

let campoX = 0,
  campoY = 0,
  campolargura = 960,
  campoaltura = 500;

let barralargura = 20,
  barraaltura = 140,
  bolalargura = 20,
  bolaaltura = 20;

//Direção
let bolaX, bolaY;
let cpuY = 0;

//Velocidade

let velBola, velCpu, velJogador;

//Controle

let pontos = 0;
let tecla;
let jogo = false;

function controleJogador() {
  if (jogo) {
    posjogadorY += velJogador * dirJy;
    vjogador.style.top = posjogadorY + 'px';
  }
}

function teclaDown() {
  tecla = event.keyCode;
  if (tecla == 38) {
    // tecla para cima
    dirJy -= 1;
  } else if (tecla == 40) {
    //tecla para baixo
    dirJy += 1;
  }
}

function teclaUp() {
  tecla = event.keyCode;
  if (tecla == 38) {
    // tecla para cima
    dirJy = 0;
  } else if (tecla == 40) {
    //tecla para baixo
    dirJy = 0;
  }
}

//controle animação

function game() {
  if (jogo) {
    controleJogador();
  }
  frames = requestAnimationFrame(game);
}

//Inicia Jogo

function iniciaJogo() {
  if (!jogo) {
    cancelAnimationFrame(frames); // tem que cancelar antes de iniciar outra chama de animação
    jogo = true;
    dirJy = 0;
    posBolaX = posBolaInicialX;
    posBolaY = posBolaInicialY;
    posjogadorY = 0;
    poscpuY = posicaoInicialCpuY;
    game();
  }
}

// Inicializar as variaveis

function Inicializa() {
  velBola = velCpu = velJogador = 8;
  vbtIniciar = document.getElementById('btIniciar');
  vbtIniciar.addEventListener('click', iniciaJogo);
  vjogador = document.getElementById('dvJogador');
  vcpu = document.getElementById('dvCpu');
  vbola = document.getElementById('dvBola');
  vpaineltxtPontos = document.getElementById('txtPontos');
  document.addEventListener('keydown', teclaDown);
  document.addEventListener('keyup', teclaUp);
}

window.addEventListener('load', Inicializa);