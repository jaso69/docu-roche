const login = localStorage.getItem('login')
console.log(login)
if (!login) window.location.replace('./login.html')