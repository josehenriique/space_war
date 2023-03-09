const arena = document.querySelector('.arena')
const obstaclesArea = document.querySelector('.obstacles')
const player = document.querySelector('.player')
const start = document.querySelector('.play')

let salto = 20
let arenaWidth = arena.getBoundingClientRect().width
let arenaHeight = arena.getBoundingClientRect().height

function getBelowElements(el){
  const sourceBounding = el.getBoundingClientRect();
  let belowElements = [];
  console.log(sourceBounding)

  for (const currentElement of document.all){
    const targetBounding = currentElement.getBoundingClientRect();

    if (!(sourceBounding.right < targetBounding.left ||
          sourceBounding.left > targetBounding.right ||
          sourceBounding.bottom < targetBounding.top ||
          sourceBounding.top > targetBounding.bottom)){

            belowElements = [...belowElements, currentElement]

          }
    
    console.log(belowElements)
  }
}

getBelowElements(player)


// Movimento do player

document.addEventListener('keydown', (e) => {
  
  let x = player.getBoundingClientRect().x
  let y = player.getBoundingClientRect().y

  let key = e.keyCode
  
  switch (key) {
    case 37:
      // Esquerda
      if (x > 20){
        player.style.left = (x - salto) + 'px'
      }
      break;

    case 38:
      // Cima
      if (y > 20){
        player.style.top = (y - salto) + 'px'
      }
      break;

    case 39:
      // Direita
      if (x < (arenaWidth - 50)){
        player.style.left = (x + salto) + 'px'
      }
      break;

    case 40:
      // Baixo
      if (y < (arenaHeight - 50)){
        player.style.top = (y + salto) + 'px'
      } 
      break;

    default:
      break;
  }
})