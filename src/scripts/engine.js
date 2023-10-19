/*
DESENVOLVEDOR: Thales Cardoso
GITHUB: https://github.com/thalesacardoso
LINKEDIN: https://www.linkedin.com/in/thalesacardoso/
DATA: 
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

async function removeAllCardsImage(){
   let cards = playerSides.playerBox;
   // Seleciona todas as tags img de dentro dos cards acima
   let img = cards.querySelectorAll("img");
   img.forEach((img) => {
      // remove todas os elementos
      img.remove();
   })

   cards = playerSides.computerBox;
   // Seleciona todas as tags img de dentro dos cards acima
   img = cards.querySelectorAll("img");
   img.forEach((img) => {
      // remove todas os elementos
      img.remove();
   })
   
}


async function setCardsField(id) {
   await removeAllCardsImage();

   let computerCardId = await getRandomCardId();

   state.fieldCards.player.style.display  = "block";
   state.fieldCards.computer.style.display  = "block";

   state.fieldCards.player.src = cardData[id].img;
   state.fieldCards.computer.src = cardData[computerCardId].img;
 
   let duelResults = await checkDuelResults(id , computerCardId)

}


async function drawSelectCard(id) {
   state.cardSprites.avatar.src = cardData[id].img;
   state.cardSprites.name.innerText = cardData[id].name;
   state.cardSprites.type.innerText = cardData[id].type;
}


// Pega a carta de forma aleatória através de um ID dinâmico
async function getRandomCardId() {
   const randomIndex = Math.floor(Math.random() * cardData.length)
   return cardData[randomIndex].id;
}


async function createCardImage(idCard, fieldSide) {
   const cardImage = document.createElement("img");
   cardImage.setAttribute("src", "./src/assets/icons/card-back.png")
   cardImage.setAttribute("data-id", idCard);
   cardImage.classList.add("card");

   if (fieldSide === playerSides.player1) {
      cardImage.addEventListener("mouseover", () => {
         drawSelectCard(idCard);
      })

      cardImage.addEventListener("click", () => {
         setCardsField(cardImage.getAttribute("data-id"));
      })
   }

   return cardImage;
}


async function drawCards(cardNumbers, fieldSide) {

   for (let i = 0; i < cardNumbers; i++) {
      // Pega o ID da carta
      const randomIdCard = await getRandomCardId();

      // Cria as imagens de forma dinâmica
      const cardImage = await createCardImage(randomIdCard, fieldSide);

      document.getElementById(fieldSide).appendChild(cardImage);
   }
}

function tocarMusica(){
   const bgm = document.getElementById('bgm');
   bgm.play();
   bgm.volume = 1
}


function init() {
   drawCards(5, playerSides.player1);
   drawCards(5, playerSides.computer);

   tocarMusica()
}



init()