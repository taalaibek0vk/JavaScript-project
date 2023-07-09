// GMAIL
const emailInput = document.querySelector('#emailInput')
const emailCheck = document.querySelector('#emailCheck')
const emailResult = document.querySelector('.emailResult')

const regExp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
emailCheck.onclick = () => {
  if (regExp.test(emailInput.value)) {
    emailResult.innerHTML = 'Удалось найти аккаунт'
    emailResult.style.color = 'green'
  } else {
    emailResult.innerHTML = 'Не удалось найти аккаунт'
    emailResult.style.color = 'red'
  }
}


// MOVE BLOCK
const box = document.querySelector('.child_block')
let positionX = 0
let positionY = 0

const move = () => {
  if (positionX <= 449 && positionY <= 0) {
    positionX += 2
    box.style.left = `${positionX}px`
    setTimeout(move, 10)
  } else if (positionX >= 449 && positionY <= 449) {
    positionY += 2
    box.style.top = `${positionY}px`
    setTimeout(move, 10)
  } else if (positionX >= 0 && positionY >= 449) {
    positionX -= 2
    box.style.left = `${positionX}px`
    setTimeout(move, 10)
  } else if (positionX <= 449 && positionY >= 0) {
    positionY -= 2
    box.style.top = `${positionY}px`
    setTimeout(move, 10)
  }
}
move()


// COUNTER BLOCK
const startBtn = document.querySelector('.start')
const stopBtn = document.querySelector('.stop');
const resumeBtn = document.querySelector('.resume')
const clearBtn = document.querySelector('.clear')
const counter = document.querySelector('#time').style.color = 'yellow'

let sec = 0;
let interval;

const start = () => {
  const begin = () => {
    sec++;
    time.innerHTML = sec;
  }
  begin()
  interval = setInterval(begin, 1000)
}

const stop = () => { clearInterval(interval); }
const resume = () => { start() }
const clear = () => {
  clearInterval(interval);
  sec = 0;
  time.innerHTML = sec;
}

startBtn.onclick = () => start()
stopBtn.onclick = () => stop()
resumeBtn.onclick = () => resume()
clearBtn.onclick = () => clear()



// MODAL
// 3 пункт
const modalShow = setTimeout(() => {
  document.querySelector('.modal')
  modal.style.display = 'block'
}, 10000)

// 4 пункт
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')

const openModal = () => {
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  modal.style.display = 'none'
  document.body.style.overflow = ''
}
modalTrigger.onclick = () => openModal()
closeModalButton.onclick = () => closeModal()
modal.onclick = (event) => event.target === modal && closeModal()

// 2 пункт
const scrollOpenModal = () => {
  const scrollPosition = document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollPosition + windowHeight >= scrollHeight) {
    openModal()
  }
}
window.addEventListener('scroll', scrollOpenModal)



// SOM-BLOCK
const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const euro = document.querySelector('#euro')

const convert = (element, targetElement, targetElement2) => {
  element.oninput = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "change.json")
    request.setRequestHeader("Content-type", "application/json")
    request.send()
    request.onload = () => {
      const response = JSON.parse(request.response)
      if (element === som) {
        targetElement.value = (element.value / response.usd).toFixed(2)
        targetElement2.value = (element.value / response.euro).toFixed(2)
      } else if (element === usd) {
        targetElement.value = (element.value * response.usd).toFixed(2)
        targetElement2.value = (element.value / 1.09).toFixed(2)
      } else if (element === euro) {
        targetElement.value = (element.value * response.euro).toFixed(2)
        targetElement2.value = (element.value * 1.09).toFixed(2)
      }
      if (element.value === '') {
        targetElement.value = ''
        targetElement2.value = ''
      }
    }
  }
}

convert(som, usd, euro)
convert(usd, som, euro)
convert(euro, som, usd)



// FETCH BLOCK

// 1 Пункт
const card = document.querySelector('.card')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

let count = 1
const request = fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(data => {
    card.innerHTML = `
          <h3>${data.title}</h3>
          <h4>${data.id}</h4>
          <br>
          <h4>${data.completed}</h4>
        `
  })

btnNext.onclick = () => {
  if (count <= 199) {
    count++
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
      .then(response => response.json())
      .then(data => {
        card.innerHTML = `
          <h3>${data.title}</h3>
          <h4>${data.id}</h4>
          <br>
          <h4>${data.completed}</h4>
        `
      })
  }
}
btnPrev.onclick = () => {
  if (count >= 2) {
    count--
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
      .then(response => response.json())
      .then(data => {
        card.innerHTML = `
          <h3>${data.title}</h3>
          <h4>${data.id}</h4>
          <br>
          <h4>${data.completed}</h4>
        `
      })
  }
}

// 2 Пункт
// const fetchRequest = fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(data => console.log(data))
