//============ Variáveis ==============================================================================================================

var vbtIniciar;
var vbola;
var vmachine;
var vjogador;
var vpainelTp;
var vpainelTpM;
//=========== Variáveis de controle da animação ===========================================================================================

var game,
  frames;

//========= Variáveis para posições =======================================================================================================

// Posicionamento da bola
var posBolaX;
var posBolaY;
//posicionamento jogador e máquina.
var posJogadorX;
var posJogadorY;
var posMachineX;
var posMachineY;

//======= Variáveis de eventos ============================================================================================================

var dirJy;

//======= Variáveis para guardar posições iniciais ========================================================================================

var posJogIniY = 180;
var posMachineIniY = 180;
var posBolaIniX = 475;
var posBolaIniY = 240;
var posJogIniX = 10;
var posMachineIniX = 930;

//======= Variáveis de tamanhos ============================================================================================================

var campoX = 0;
var campoY = 0;
var campoW = 960;
var campoH = 500;
var barraW = 20;
var barraH = 140;
var bolaW = 20;
var bolaH = 20;

//========= Variáveis controles da direção jogador e bola ==================================================================================

var bolaX;
var bolaY;
var machY = 0;

//======== Variáveis de controle de velocidade =================================================================================================

var velBola;
var velMachine;
var velJogador;

//======= Variáveis de controle =================================================================================================================

var pontos = 0;
var pontosM = 0;
var tecla;
var jogo = false;

//====== Função de controle do jogador =========================================================================================================
function controlaJog() {


  if (jogo) { // se jogo rolando
    posJogadorY += velJogador * dirJy;
    if ((posJogadorY + barraH >= campoH) || (posJogadorY <= 0)) { // limita a movimentação de barra na area da div
      posJogadorY += (velJogador * dirJy) * -1;
    }
    vjogador.style.top = posJogadorY + "px";
  } // END if 1

} // END controlaJog

//====== Função de controle da máqunia =========================================================================================================
function controlaMachine() {

  if (jogo) {
    if ((posBolaX > (campoW / 2)) && (bolaX > 0)) {
      // Movimentar máquina

      if ((posBolaY + (bolaH / 2)) > ((posMachineY + (barraH / 2)) + velMachine)) {
        // Mover para baixo
        if ((posMachineY + barraH) <= campoH) {

          posMachineY += velMachine; // move a máquina

        } // End if
      } else if ((posBolaY + (bolaH / 2)) < (posMachineY + (barraH / 2)) - velMachine) {
        // Mover para cima
        if (posMachineY >= 0) {

          posMachineY -= velMachine; // move a máquina

        } // end if

      } // end else if
    } else {
      //Posicionar máquina no centro
      if ((posMachineY + (barraH / 2)) < (campoH / 2)) {
        posMachineY += velMachine;
      } else if ((posMachineY + (barraH / 2)) > (campoH / 2)) {
        posMachineY -= velMachine;
      } //end else 2
    } // end else 
    vmachine.style.top = posMachineY + "px";
  }


} //controlaMachine

//====== Função de controle da bola =========================================================================================================
function controlaBola() {

  posBolaX += velBola * bolaX;
  posBolaY += velBola * bolaY;

  //colisão com jogador
  if ((posBolaX <= posJogadorX + barraW) && ((posBolaY + bolaH) >= posJogadorY) && (posBolaY <= posJogadorY + barraH)) {

    bolaY = (((posBolaY + (bolaH / 2)) - (posJogadorY + (barraH / 2))) / 22) / 2; //alterando os valores dos denominadores altera a velocidade de acordo com região de colisão.
    bolaX *= -1;

  }
  //colisão com máquina
  if ((posBolaX >= posMachineX - barraW) && ((posBolaY + bolaH) >= posMachineY) && (posBolaY <= posMachineY + barraH)) {

    bolaY = (((posBolaY + (bolaH / 2)) - (posMachineY + (barraH / 2))) / 22) / 2; //alterando os valores dos denominadores altera a velocidade de acordo com região de colisão.
    bolaX *= -1;

  }
  //Controle de colisão com os limites
  if ((posBolaY >= 480) || (posBolaY <= 0)) {

    bolaY *= -1;

  } // END IF
  //saio da tela direite ponto jogador
  if (posBolaX >= (campoW - bolaW)) { // se fizer um ponto reinicia as posições iniciais

    velBola = 0;
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY;
    posMachineY = posMachineIniY;
    pontos++; // ponto do jogador
    vpainelTp.value = pontos; // atualiza painel
    jogo = false;
    vjogador.style.top = posJogadorY + "px";
    vmachine.style.top = posMachineY + "px";

  } else if (posBolaX <= 0) { //saio da tela esquerda ponto da máquina

    velBola = 0;
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY;
    posMachineY = posMachineIniY;
    pontosM++;
    //pontos--; // ponto da máquina
    vpainelTpM.value = pontosM; // atualiza painel
    jogo = false;
    vjogador.style.top = posJogadorY + "px";
    vmachine.style.top = posMachineY + "px";
  } // End else

  vbola.style.top = posBolaY + "px";
  vbola.style.left = posBolaX + "px";

} // controlaBola

//====== Função Que verifica vitória  ======================================================================================================
function vitoria() {

  if (jogo) { // se jogo true
    // ganha quem fizer 12 pontos primeiro 
    if (pontos == 12) {
      alert("Você ganhou");

      jogo = false;
      pontos = 0;
      pontosM = 0;
      vpainelTpM.value = 0;
      vpainelTp.value = 0;
    } else if (pontosM == 12) {
      alert("Você perdeu");

      jogo = false;
      pontos = 0;
      pontosM = 0;
      vpainelTpM.value = 0;
      vpainelTp.value = 0;
    } // end else

  } // end if


} //end vitoria
//====== Função de controle de tecla Dw ======================================================================================================
function teclaDw() { // tecla pressionada

  tecla = event.keyCode; // armazena o código da tecla pressionada
  if (tecla == 38) { // 38 código da tecla para cima do teclado
    dirJy = -1;
  } else if (tecla == 40) { // 40 código da tecla para baixo do teclado
    dirJy = +1;
  } // END else if 1


} // END teclaDw

//======= Função de controle de tecla up =================================================================================================================
function teclaUp() { // tecla liberada

  tecla = event.keyCode; // armazena o código da tecla pressionada
  if (tecla == 38) { // 38 código da tecla para cima do teclado
    dirJy = 0;
  } else if (tecla == 40) { // 40 código da tecla para baixo do teclado
    dirJy = 0;
  }

} //END teclaUp

//====== Função de controle da animação =====================================================================================================
function game() {

  if (jogo) {
    controlaJog();
    controlaBola();
    controlaMachine();
    vitoria();
  } // END if 1
  frames = requestAnimationFrame(game);
} // END game

//====== Função pra inicializar jogadas ========================================================================================================
function iniciaJogo() {

  if (!jogo) {
    velBola = 8;
    velMachine = 8;
    velJogador = 8;
    cancelAnimationFrame(frames);
    jogo = true;
    dirJy = 0;
    bolaY = 0;
    if ((Math.random() * 10) < 5) { // Sorteio da direção inicial da bola
      bolaX = -1;
    } else {
      bolaX = 1;
    }
    posJogadorX = 10;
    posMachineX = 930;
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorX = posJogIniX;
    posMachineX = posMachineIniX;
    posJogadorY = posJogIniY;
    posMachineY = posMachineIniY;
    game();
  } // end if 1

} // END iniciaJogo

//====== Função de inicialização dos componentes do game ===================================================================================
function inicializar() {
  alert("Para jogar utilize as teclas para cima e para baixo.\nVence quem fizer 12 pontos primeiro");
  velBola = 8;
  velMachine = 8;
  velJogador = 8;
  pontos = 0;
  pontosM = 0;
  vbtIniciar = document.getElementById("btIniciar");
  vbtIniciar.addEventListener("click", iniciaJogo);
  vjogador = document.getElementById("dvJogador");
  vmachine = document.getElementById("dvMachine");
  vbola = document.getElementById("dvBola");
  vpainelTp = document.getElementById("txtPontosJ");
  vpainelTpM = document.getElementById("txtPontosM");
  document.addEventListener("keydown", teclaDw); // tecla pressionada keydown
  document.addEventListener("keyup", teclaUp); // tecla liberada keyup

} // END inicializar

window.addEventListener("load", inicializar);