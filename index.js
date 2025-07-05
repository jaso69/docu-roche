const login = localStorage.getItem('login')
if (!login) window.location.replace('./login.html')

const logout = document.querySelector('#logout')
logout.addEventListener('click', () => {
    window.localStorage.clear()
    window.location.replace('./login.html')
})

const auditorioButton = document.querySelector('#auditorio')
const m32rButton = document.querySelector('#m32r')
const sq5Button = document.querySelector('#sq5')
const salonButton = document.querySelector('#salon')

const auditorioImg = document.querySelector('#auditorioImg')
const m32rImg = document.querySelector('#m32rImg')
const sq5Img = document.querySelector('#sq5Img')
const salonImg = document.querySelector('#salonImg')

salonButton.addEventListener('mouseover', () => {
    salonImg.classList.remove('cerrar')
    salonImg.classList.add('abrir') 
})

salonButton.addEventListener('mouseout', () => {
    salonImg.classList.remove('abrir')
    salonImg.classList.add('cerrar')  
})

sq5Button.addEventListener('mouseover', () => {
    sq5Img.classList.remove('cerrar')
    sq5Img.classList.add('abrir') 
})

sq5Button.addEventListener('mouseout', () => {
    sq5Img.classList.remove('abrir')
    sq5Img.classList.add('cerrar')  
})

m32rButton.addEventListener('mouseover', () => {
    m32rImg.classList.remove('cerrar')
    m32rImg.classList.add('abrir') 
})

m32rButton.addEventListener('mouseout', () => {
    m32rImg.classList.remove('abrir')
    m32rImg.classList.add('cerrar')  
})

auditorioButton.addEventListener('mouseover', () => {
    auditorioImg.classList.remove('cerrar')
    auditorioImg.classList.add('abrir') 
})

auditorioButton.addEventListener('mouseout', () => {
    auditorioImg.classList.remove('abrir')
    auditorioImg.classList.add('cerrar')  
})