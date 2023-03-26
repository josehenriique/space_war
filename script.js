const arena = document.querySelector('.arena')
const obstaclesArea = document.querySelector('.obstacles')
const player = document.querySelector('.player')
const start = document.querySelector('.play')
const scoreScreen = document.querySelector('#score')

const cols = document.querySelectorAll(".column[data-order]")

let saltoPlayer = 10
let saltoObject = 10
let timeCriation = 300
let timePattern = 400

let arenaWidth = arena.getBoundingClientRect().width
let arenaHeight = arena.getBoundingClientRect().height

let animation, create, trash, fail
let play = false
let score = 0

let createInfo = true

const shapeLibrary = {
  1: {
    name: "arrow",
    pattern: [
      [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, true, false, true, false, false, false, false, false, false],
      [false, false, false, false, false, true, false, false, false, true, false, false, false, false, false],
      [false, false, false, false, true, false, false, false, false, false, true, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    ]
  },
  2: {
    name: "altered",
    pattern: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
  },
  3: {
    name: "double-arrow",
    pattern: [
      [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, true, false, true, false, false, false, false, false, false],
      [false, false, false, false, false, true, false, false, false, true, false, false, false, false, false],
      [false, false, false, false, true, false, false, false, false, false, true, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      [false, false, false, false, true, false, false, false, false, false, true, false, false, false, false],
      [false, false, false, false, false, true, false, false, false, true, false, false, false, false, false],
      [false, false, false, false, false, false, true, false, true, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
    ]
  }
}


async function constructorShape(){

  // Verificando se o shape possui mais de uma linha ou não

  let index = Math.floor(Math.random() * Object.keys(shapeLibrary).length + 1)  
  let pattern = shapeLibrary[index].pattern

  let isSimple = null

  if (pattern[0] === false || pattern[0] === true){
    console.log("simples")
    isSimple = true
  } else {
    console.log('complex')
    isSimple = false
  }

  if (isSimple == true){

    for (i in pattern){
      if (pattern[i] == true){
        cols[i].innerHTML += `
        <div class="obstacle">
          <img src="./assets/villain.png" alt="">
        </div>
        `
      }
    }

    await delay(1000)
    setCreate()

  } else {
    
    async function loopDelay(){

      for (list of pattern){
        for (i in list){
          if (list[i] == true){
            cols[i].innerHTML += `
            <div class="obstacle">
              <img src="./assets/villain.png" alt="">
            </div>
            `
          }
        }
        await delay(timePattern) // Essa função da um atraso usando o "Promise"
      }

      await delay(1000)
      setCreate()
    }
    
    loopDelay()
    
  }
}

function setCreate(){
  create = setInterval(function (){

    let coluna = cols[Math.floor(Math.random() * cols.length)]

    coluna.innerHTML += `
    <div class="obstacle">
      <img src="./assets/villain.png" alt="">
    </div>`

  }, timeCriation)

}

function setPattern(){

  pattern = setInterval(function(){
    if (score != 0 && score % 50 == 0){
      clearInterval(create)
      setTimeout(async function teste(){
        await constructorShape()
      }, 1000)
    }
  }, 300)

}

function setAnimation(){
  animation = setInterval(function (){
    
    let obstacles = document.querySelectorAll('.obstacle')
    
    for (i of obstacles){
      let posY = i.getBoundingClientRect().y
      i.style.top = (posY + saltoObject) + "px"
    }
    
  }, 50)
}

function setDelete(){
  trash = setInterval(function (){

    let obstacles = document.querySelectorAll('.obstacle')

    for (i of obstacles){
      if (i.getBoundingClientRect().y >= arenaHeight - 20){
        // Excluindo o obstaculo
        i.parentNode.removeChild(i)

        // Somando pontuação
        score += 1
        scoreScreen.textContent = String(score).padStart(3, "0")

      }
    }

  }, 100)
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

// Função responsável pelo delay do shape
function delay(seg){
  let time = seg
  return new Promise(res => setTimeout(res, time))
}

// Iciando o jogo
function startGame(){
  setAnimation()
  setCreate()
  setDelete()
  setFail()
  setPattern()

  play = true
}

// Parando o jogo
function stopGame(){
  clearInterval(animation)
  clearInterval(create)
  clearInterval(trash)
  clearInterval(fail)
  clearInterval(pattern)

  play = false

  console.log("SCORE: ", score)
  setTimeout(() => {
    location.reload()
  }, 3000)
}

// Funcionalidade do botão
start.addEventListener('click', () => {
  if(play == false){
    startGame()
  } else {
    stopGame()
  }
})

// Mapeamento do teclado

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
document.addEventListener('keyup', (e) => {

  
  let x = player.getBoundingClientRect().x
  let y = player.getBoundingClientRect().y

  let key = e.keyCode
  
  switch (key) {
    case 37:
      // Esquerda
      if (x > 20){
        player.style.left = (x - saltoPlayer/2) + 'px'
      }
      break;

    case 38:
      // Cima
      if (y > 20){
        player.style.top = (y - saltoPlayer/2) + 'px'
      }
      break;

    case 39:
      // Direita
      if (x < (arenaWidth - 50)){
        player.style.left = (x + saltoPlayer/2) + 'px'
      }
      break;

    case 40:
      // Baixo
      if (y < (arenaHeight - 50)){
        player.style.top = (y + saltoPlayer/2) + 'px'
      } 
      break;

    default:
      break;
  }
})