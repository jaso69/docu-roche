const login = localStorage.getItem('login')
if (!login) window.location.replace('./login.html')

const logout = document.querySelector('#logout')
logout.addEventListener('click', () => {
    window.localStorage.clear()
    window.location.replace('./login.html')
})

