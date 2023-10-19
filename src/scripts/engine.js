/*
DESENVOLVEDOR: Thales Cardoso
GITHUB: https://github.com/thalesacardoso
LINKEDIN: https://www.linkedin.com/in/thalesacardoso/
DATA: 19/10/2023
*/

const state = {
   score: {
      playerScore: 0,
      computerScore: 0,
      scoreBox: document.getElementById("score_points")
   },
   cardSprites: {
      avatar: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      type: document.getElementById("card-type"),
   },
   fieldCards: {
      player: document.getElementById("player-field-card"),
      computer: document.getElementById("computer-field-card"),
   },
   actions: {
      button: document.getElementById("next-duel")
   }
}

const cardData = [
   {
      id: 0,
      name: "Blue Eyes White Dragon",
      type: "Paper",
      img: "./src/assets/icons/dragon.png",
      winOf: [1],
      loseOf: [2]
   },
   {
      id: 1,
      name: "Dark Magician",
      type: "Rock",
      img: "./src/assets/icons/magician.png",
      winOf: [2],
      loseOf: [0]
   },
   {
      id: 2,
      name: "Exodia",
      type: "Scissors",
      img: "./src/assets/icons/exodia.png",
      winOf: [0],
      loseOf: [1]
   }
]

const playerSides = {
   player1: "player-cards",
   playerBox: document.getElementById("player-cards"),
   computer: "computer-cards",
   computerBox: document.getElementById("computer-cards"),
}



// =====================   FUNÇÃO INICIAL DO JOGO   ================

function init() {
   drawCards(5, playerSides.player1);
   drawCards(5, playerSides.computer);

   playMusic()
}

// Compra as cartas para os jogadores
async function drawCards(cardNumbers, fieldSide) {

   for (let i = 0; i < cardNumbers; i++) {
      // Pega as cartas com ID aleatório
      const randomIdCard = await getRandomCardId();

      // Cria as cartas de acordo com o ID gerado para cada Jogador
      const cardImage = await createCardImage(randomIdCard, fieldSide);

      // Insere as cartas no tabuleiro
      document.getElementById(fieldSide).appendChild(cardImage);
   }
}


// Função que gera o ID aleatório das cartas
async function getRandomCardId() {
   const randomIndex = Math.floor(Math.random() * cardData.length)

   // Retorna o número gerado
   return cardData[randomIndex].id;
}


async function createCardImage(idCard, fieldSide) {

   // Cria a carta no documento HTML e no tabuleiro
   const cardImage = document.createElement("img");
   cardImage.setAttribute("src", "./src/assets/icons/card-back.png")
   cardImage.setAttribute("data-id", idCard);
   cardImage.classList.add("card");

   // Funções das cartas do Jogador 1
   if (fieldSide === playerSides.player1) {

      // Chama a função quando passa o mouse em cima de uma carta
      cardImage.addEventListener("mouseover", () => {
         drawSelectCard(idCard);
      })

      // Chama a função quando clica com o mouse em cima de uma carta
      cardImage.addEventListener("click", () => {
         setCardsField(cardImage.getAttribute("data-id"));
      })
   }

   return cardImage;
}


// =====================   FUNCIONALIDADE DO JOGO   ================


// Mostra ao lado esquerdo do tabuleiro, as informações da carta que o mouse estiver em cima dela. 
async function drawSelectCard(id) {
   state.cardSprites.avatar.src = cardData[id].img;
   state.cardSprites.name.innerText = cardData[id].name;
   state.cardSprites.type.innerText = cardData[id].type;
}


// Chama as funções quando clica em cima de uma carta no tabuleiro do jogador 1
async function setCardsField(cardId) {

   // Remove todas as cartas do tabuleiro
   await removeAllCardsImage();

   // O computador escolhe uma carta aleatória e joga no centro do tabuleiro 
   let computerCardId = await getRandomCardId();

   // Mostra as informações das cartas ao centro do tabuleiro
   showInfoCards(cardId, computerCardId);

   // Verifica quem venceu a batalha
   let duelResults = await checkDuelResults(cardId, computerCardId)

   // Atualiza a pontuação no jogo
   await updateScore();

   // Mostra o botão para continuar jogando
   await drawButton(duelResults);

}


// Limpa as cartas do tabuleiro
async function removeAllCardsImage() {

   // Seleciona o tabuleiro do jogador
   let cards = playerSides.playerBox;

   // Seleciona todas as cartas que aparecem no tabuleiro do jogador
   let img = cards.querySelectorAll("img");

   img.forEach((img) => {
      // remove todas as cartas selecionadas
      img.remove();
   })


   // Seleciona o tabuleiro do Computador
   cards = playerSides.computerBox;

   // Seleciona todas as cartas que aparecem no tabuleiro do computador
   img = cards.querySelectorAll("img");

   img.forEach((img) => {
      // remove todas as cartas selecionadas
      img.remove();
   })

}


// Verifica o resultado do duelo
async function checkDuelResults(playerCardId, computerCardId) {

   // Recebe os dados da carta de cada um e armazena nas variáveis
   const player = cardData[playerCardId];
   const computer = cardData[computerCardId];

   // Resultado padrão
   let result = 'Draw'

   // Se a carta do jogador vencer ele ganha 1 ponto
   if (player.winOf.includes(computer.id)) {
      playAudio('win');
      state.score.playerScore++
      result = 'Win'
   }

   // Se a carta do jogador perder, o computador ganha 1 ponto
   if (player.loseOf.includes(computer.id)) {
      playAudio('lose');
      state.score.computerScore++
      result = 'Lose'
   }

   return result;
}


// Atualiza a pontuação dentro do jogo
async function updateScore() {

   // Recebe os pontos armazenados na memória
   let playerResult = state.score.playerScore;
   let computerResult = state.score.computerScore;

   // Insere os pontos dentro do HTML
   const results = state.score.scoreBox;
   results.innerText = `Win: ${playerResult} | Lose: ${computerResult}`
}


// Mostra o botão do duelo
async function drawButton(result) {

   const btn = state.actions.button
   btn.style.display = 'block'
   btn.innerText = result;

}


// Esconde o botão do duelo
async function hideButton() {

   // Esconde o botão
   const btn = state.actions.button
   btn.style.display = 'none'

   // Esconde as cartas do centro do tabuleiro
   state.fieldCards.player.src = './src/assets/icons/card-back.png';
   state.fieldCards.computer.src = './src/assets/icons/card-back.png';
}


// Limpa as informações do lado esquerdo do tabuleiro
async function clearInfo() {

   state.cardSprites.avatar.src = './src/assets/icons/card-front.png';
   state.cardSprites.name.innerText = 'Name:';
   state.cardSprites.type.innerText = 'Type:';

}


// Mostra as informações das cartas ao centro do tabuleiro
async function showInfoCards(cardId, computerCardId) {
   // Mostra as informações da carta escolhida pelo jogador no centro do tabuleiro
   state.fieldCards.player.style.display = "block";
   state.fieldCards.player.src = cardData[cardId].img;

   // Mostra as informações da carta escolhida pelo Computador no centro do tabuleiro
   state.fieldCards.computer.style.display = "block";
   state.fieldCards.computer.src = cardData[computerCardId].img;
}


// Reinicia o duelo
async function resetDuel() {

   clearInfo();
   removeAllCardsImage();
   hideButton()
   init();

}


// =====================   FUNÇÕES DE AUDIO   ================

async function playAudio(name) {
   const audio = new Audio(`./src/assets/audios/${name}.wav`)
   audio.play();
}

async function playMusic() {
   const bgm = document.getElementById('bgm');
   bgm.play();
   bgm.volume = 0.5;
}


init()