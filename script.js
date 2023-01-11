let arrow = document.querySelectorAll("arrow")

for (var i = 0; i< arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
        console.log(e)
    });
}