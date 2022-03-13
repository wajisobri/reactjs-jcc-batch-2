const menu = document.querySelector("#menu");
const drawerElement = document.querySelector("#drawer");
const close = document.querySelector("#close");


menu.addEventListener("click", event => {
    drawerElement.classList.toggle("open");
    event.stopPropagation();
});

close.addEventListener("click", event => {
    drawerElement.classList.remove("open");
    event.stopPropagation();
})