const menuBtn= document.querySelector(".btn-menu");
const menuContent= document.querySelector(".menu-content");


// Evento click para cerrar el menu al clickar fuera de el
window.document.addEventListener("click",(event)=>{
if(!menuContent.contains(event.target) && !menuBtn.contains(event.target)){
    closeMenu();
}
})

// Evento para cerrar al presionar la tecla Escape
window.document.addEventListener("keydown",(event)=>{
    if(event.key==="Escape"){
        closeMenu();
    }
})
// Evento click en el Menu para mostrar y ocultar el contenido
menuBtn.addEventListener("click", ()=>{
    toggleMenu();
})

//Función para abrir el menú
function openMenu(){
    menuContent.classList.add("show");
    //Actualiza el aria-expanded
    menuBtn.setAttribute("aria-expanded", "true")
    menuContent.focus();
}

//Función para cerrar el menú
function closeMenu(){
    menuContent.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false")
}
// Función para alternar entre abierto y cerrado

function toggleMenu(){
    const ariaExpanded = menuBtn.getAttribute('aria-expanded')==="true"
    if(ariaExpanded){
        closeMenu();
    }else{
        openMenu();
    }
}
