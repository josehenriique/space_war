const arena = document.querySelector('.arena')
const obstaclesArea = document.querySelector('.obstacles')
const player = document.querySelector('.player')
const start = document.querySelector('.play')

let saltoPlayer = 20
let saltoObject = 10
let arenaWidth = arena.getBoundingClientRect().width
let arenaHeight = arena.getBoundingClientRect().height

let animation, create, trash, fail
let play = false
let score = 0

function setCreate(){
  create = setInterval(function (){

    let posX = Math.round(Math.random() * Math.round(arenaWidth - 40))
    obstaclesArea.innerHTML += 
    `<div class="obstacle" style="top:${10}px; left:${posX}px">
      <img src="./assets/villain.png" alt="">
    </div>` 

  }, 250)
}

function setAnimation(){
  animation = setInterval(function (){
    
    let obstacles = document.querySelectorAll('.obstacle')
    
    for (i of obstacles){
      let posY = i.getBoundingClientRect().y
      i.style.top = (posY + saltoObject) + "px"
    }
    
  }, 60)
}

function setDelete(){
  trash = setInterval(function (){

    let obstacles = document.querySelectorAll('.obstacle')

    for (i of obstacles){
      if (i.getBoundingClientRect().y >= arenaHeight - 20){
        i.style.display = 'none'
        score += 1
      }
    }

  }, 10)
}

function setFail(){
  fail = setInterval(function (){

    let obstacles = document.querySelectorAll('.obstacle')

    for (i of obstacles){

      let obsPosX = Math.round(i.getBoundingClientRect().x)
      let obsPosY = Math.round(i.getBoundingClientRect().y)

      let playerPosX = Math.round(player.getBoundingClientRect().x)
      let playerPosY = Math.round(player.getBoundingClientRect().y)

      if (((obsPosX - 50) < playerPosX && playerPosX < (obsPosX + 50)) && ((obsPosY - 50) < playerPosY && playerPosY < (obsPosY + 50))){
        console.log('PERDEU')
        stopGame()
      }

    }

  }, 10)
}

function startGame(){
  setAnimation()
  setCreate()
  setDelete()
  setFail()

  play = true
}

function stopGame(){
  clearInterval(animation)
  clearInterval(create)
  clearInterval(trash)
  clearInterval(fail)

  play = false

  console.log("SCORE: ", score)
  setTimeout(() => {
    location.reload()
  }, 3000)
}

start.addEventListener('click', () => {
  if(play == false){
    startGame()
  } else {
    stopGame()
  }
})

document.addEventListener('keydown', (e) => {

  
  let x = player.getBoundingClientRect().x
  let y = player.getBoundingClientRect().y

  let key = e.keyCode
  
  switch (key) {
    case 37:
      // Esquerda
      if (x > 20){
        player.style.left = (x - saltoPlayer) + 'px'
      }
      break;

    case 38:
      // Cima
      if (y > 20){
        player.style.top = (y - saltoPlayer) + 'px'
      }
      break;

    case 39:
      // Direita
      if (x < (arenaWidth - 50)){
        player.style.left = (x + saltoPlayer) + 'px'
      }
      break;

    case 40:
      // Baixo
      if (y < (arenaHeight - 50)){
        player.style.top = (y + saltoPlayer) + 'px'
      } 
      break;

    default:
      break;
  }
})