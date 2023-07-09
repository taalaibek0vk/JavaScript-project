// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color
}

const setRandomColors = () => {
  buttonsColor.forEach((buttonColor) => {
    buttonColor.innerHTML = generateRandomColor()
    buttonColor.onclick = (event) => javaScript.style.color = event.target.innerHTML
  })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
  if (event.code.toLowerCase() === 'space') {
    event.preventDefault()
    setRandomColors()
  }
}

// SLIDER BLOCK

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0

const hideSlide = () => {
  slides.forEach((slide) => {
    slide.style.opacity = 0
    slide.classList.remove('active_slide')
  })
}
const showSlide = (i = 0) => {
  slides[i].style.opacity = 1
  slides[i].classList.add('active_slide')
}

hideSlide()
showSlide(index)


const autoSlider = (i = 0) => {
  setInterval(() => {
    i++
    if (i > slides.length - 1) {
      i = 0
    }
    hideSlide()
    showSlide(i)
  }, 10000)
}

next.onclick = () => {
  index < slides.length - 1 ? index++ : index = 0
  hideSlide()
  showSlide(index)
}

prev.onclick = () => {
  index > 0 ? index-- : index = slides.length - 1
  hideSlide()
  showSlide(index)
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
// modal.onclick = (event) => event.target === modal && closeModal()

// POST DATA

const form = document.querySelector('form')

const postdata = (form) => {
  form.onsubmit = (event) => {
    event.preventDefault()
    const request = new XMLHttpRequest()
    request.open('POST', 'server.php')
    request.setRequestHeader('Content-type', 'application/json')

    const formData = new formData(form)
    const obj = {}
    formData.forEach((item, i) => {
      obj[i] = item
    })
    const json = JSON.stringify(obj)
    request.send(json)
    request.onload = () => {
      if (request.status === 200) {
        console.log(request.response);
      } else {
        console.log('ERROR')
      }
    }
  }
}
postdata(form)

const scrollOpenModal = () => {
  const scrollPosition = document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollPosition + windowHeight >= scrollHeight) {
    openModal()
  }
}
window.addEventListener('scroll', scrollOpenModal)

