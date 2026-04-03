let slider = document.querySelectorAll(".slide");

let index = 0;

function changeSlide(){
    slider[index].classList.remove("active");
    index++;

    if(index == slider.length){
        index = 0;
    }
    slider[index].classList.add("active");
}
setInterval(changeSlide, 2000);


function searchProducts(){
    let input = document.getElementById()

}