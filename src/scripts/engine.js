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


function init() {
   console.log(cardData)
}

init()