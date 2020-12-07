// Const declaration

// const dropdownMenu = document.getElementById('dropdown-menu');

let year = (new Date()).getFullYear();
localStorage.setItem('year', year)
// Simulate an HTTP redirect:
window.location.replace(year + ".html");
console.log(year);