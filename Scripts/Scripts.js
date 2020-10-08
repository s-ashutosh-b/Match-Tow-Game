onload = () => {
  create_game()
  game_init()
}

const create_game = () => {

  const CELL = document.querySelectorAll(`main div.game-area div.row`)

  const IMAGES = [
    `chumma`,
    `fire`,
    `Laughing-with-tears`,
    `love-eyes`,
    `pirate`,
    `sunglasses`,
  ]

  let IMAGE_NUMBER
  let exCode = 0

  CELL.forEach(_CELL => {
    IMAGE_NUMBER = Math.floor(Math.random() * 6)
    for (let i = 0; i < 6; i++) {
      if (IMAGE_NUMBER > 5) {
        IMAGE_NUMBER = 0
      }
      let TILE_IMAGE = IMAGES[IMAGE_NUMBER++]
      //console.log(TILE_IMAGE);
      _CELL.innerHTML += `
  <div class="col">
    <div class="Tile TILE_CLOSED" data-image-type="${TILE_IMAGE}" data-tile-number="${exCode++}">
      <div class="frontFace"></div>
      <div class="backFace" style="background: url('../Images/${TILE_IMAGE}.png'); background-size: cover; background-repeat: no-repeat; background-position: center;"></div>
    </div>
  </div>
  `
    }
  })


}

const game_init = () => {
  const TILE = document.querySelectorAll(`main div.game-area div.row div.col div.Tile`)

  let TILE_CLICKED = false

  let PATH_1 = null
  let PATH_2 = null

  let DATA_IMAGE_FIRST = null
  let DATA_IMAGE_SECOND = null

  let ACTIVE_TILE_FIRST = null
  let ACTIVE_TILE_SECOND = null

  let SCORE = 0


  const ALERT_ELEMENT = document.querySelector(`footer span.Alert`)
  const SCORE_ELEMENT = document.querySelector(`header span.score-display span.Score`)

  SCORE_ELEMENT.innerHTML = `${SCORE}`

  const _TILE_CHECK = (e) => {

    if (TILE_CLICKED == false && DATA_IMAGE_FIRST == null && DATA_IMAGE_SECOND == null) {
      TILE_CLICKED = true
      PATH_1 = e.path[0]
      if (!PATH_1.classList.contains(`Completed`)) {
        ACTIVE_TILE_FIRST = PATH_1.getAttribute(`data-tile-number`)
        DATA_IMAGE_FIRST = PATH_1.getAttribute(`data-image-type`)
        PATH_1.style.transform = `rotateY(180deg)`
      } else {
        DATA_RESET()
      }

    } else if (TILE_CLICKED == true) {
      TILE_CLICKED = false
      PATH_2 = e.path[0]
      if (!PATH_2.classList.contains(`Completed`)) {
        ACTIVE_TILE_SECOND = PATH_2.getAttribute(`data-tile-number`)
        DATA_IMAGE_SECOND = PATH_2.getAttribute(`data-image-type`)
        PATH_2.style.transform = `rotateY(180deg)`
      } else {
        PATH_1.style.transform = `none`
      }

      if (ACTIVE_TILE_SECOND != ACTIVE_TILE_FIRST) {
        if (DATA_IMAGE_FIRST == DATA_IMAGE_SECOND) {
          SCORE += 10
          ALERT_ELEMENT.innerHTML = `Score Gained: 10`
          SCORE_ELEMENT.innerHTML = `${SCORE}`
          ALERT_ELEMENT.style.color = `lightgreen`
          PATH_1.classList.add(`Completed`)
          PATH_2.classList.add(`Completed`)
          PATH_1.removeEventListener(`click`, _TILE_CHECK)
          PATH_2.removeEventListener(`click`, _TILE_CHECK)
          DATA_RESET()
        } else {
          SCORE--
          ALERT_ELEMENT.innerHTML = `Score Lost: 1 <br /> Try again!`
          SCORE_ELEMENT.innerHTML = `${SCORE}`
          ALERT_ELEMENT.style.color = `yellow`
          setTimeout(() => {
            PATH_1.style.transform = `none`
            PATH_2.style.transform = `none`
            DATA_RESET()
          }, 1000);
        }
      } else {
        SCORE--
        ALERT_ELEMENT.innerHTML = `Score lost: 1<br />Same Tile Clicked. Try Again!`
        SCORE_ELEMENT.innerHTML = `${SCORE}`
        ALERT_ELEMENT.style.color = `orange`
        setTimeout(() => {
          PATH_1.style.transform = `none`
          PATH_2.style.transform = `none`
          DATA_RESET()
        }, 1000);
      }
    }
  }

  const DATA_RESET = () => {
    DATA_IMAGE_FIRST = null
    DATA_IMAGE_SECOND = null
    ACTIVE_TILE_FIRST = null
    ACTIVE_TILE_SECOND = null
    TILE_CLICKED = false
  }


  TILE.forEach((_TILE) => _TILE.addEventListener(`click`, _TILE_CHECK))
}

