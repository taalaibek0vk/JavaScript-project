// REG EXP
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
    phoneResult.style.color = 'green'
  } else {
    phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
    phoneResult.style.color = 'red'
  }
}

// TAB SLIDER



// STOPWATCH
const minutesBlock = document.querySelector('#minutes'),
  secondsBlock = document.querySelector('#seconds'),
  mlSecondsBlock = document.querySelector('#ml-seconds'),
  startButton = document.querySelector('#start'),
  stopButton = document.querySelector('#stop'),
  resetButton = document.querySelector('#reset')

let interval
let minutes = 0
let seconds = 0
let mlSeconds = 0

const startTimer = () => {
  mlSeconds++
  mlSeconds <= 99 && (mlSecondsBlock.innerHTML = mlSeconds)
  mlSeconds == 100 && (mlSecondsBlock.innerHTML = '00')

  mlSecondsBlock.innerHTML = `0${mlSeconds}`
  mlSeconds > 9 && (mlSecondsBlock.innerHTML = mlSeconds)
  if (mlSeconds > 99) {
    seconds++
    secondsBlock.innerHTML = `0${seconds}`
    mlSeconds = 0
  }
  seconds > 9 && (secondsBlock.innerHTML = seconds)
  if (seconds > 59) {
    minutes++
    minutesBlock.innerHTML = `0${minutes}`
    seconds = 0
    secondsBlock.innerHTML = `0${seconds}`
  }
  minutes > 9 && (minutesBlock.innerHTML = minutes)
}

startButton.onclick = () => {
  clearInterval(interval)
  interval = setInterval(startTimer, 10)
}

stopButton.onclick = () => {
  clearInterval(interval)
}

resetButton.onclick = () => {
  clearInterval(interval)
  minutes = 0
  seconds = 0
  mlSeconds = 0
  minutesBlock.innerHTML = '00'
  secondsBlock.innerHTML = '00'
  mlSecondsBlock.innerHTML = '00'
}


const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')

const hideTabContent = () => {
  tabContent.forEach((item) => {
    item.style.display = 'none'
  })
  tabs.forEach((item) => {
    item.classList.remove('tab_content_item_active')
  })
}
const showTabContent = (i = 0) => {
  tabContent[i].style.display = 'block'
  tabs[i].classList.add('tab_content_item_active')
}
hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
  if (event.target.classList.contains('tab_content_item')) {
    tabs.forEach((item, index) => {
      if (event.target === item) {
        hideTabContent()
        showTabContent(index)
      }
    })
  }
}

let index = 0
const autoSlider = (i = 0) => {
  setInterval(() => {
    i++
    if (i > tabsParent.length) {
      i = 0
    }
    hideTabContent()
    showTabContent(i)
  }, 1000)
}

autoSlider(index)



// MODAL
const modalShow = setTimeout(() => {
  document.querySelector('.modal')
  modal.style.display = 'block'
}, 10000)


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

const scrollOpenModal = () => {
  const scrollPosition = document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollPosition + windowHeight >= scrollHeight) {
    openModal()
  }
}
window.addEventListener('scroll', scrollOpenModal)



// WEATHER BLOCK

const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const apiKey = 'e417df62e04d3b1b111abeab19cea714'
const citySearch = () => {
  const cityName = document.querySelector('.cityName')
  cityName.oninput = (event) => {
    const cityNameValue = event.target.value
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        city.innerHTML = data?.name || 'Город не найден!'
        temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '	&deg; C' : '.....'
      })
  }
}
citySearch()