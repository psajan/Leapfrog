var count = 0;
var w = 400;
var interval = 5000;
var imgWrapper = document.getElementById('image-wrapper');
var image = imgWrapper.getElementsByTagName("img");
imgWrapper.style.width = (image.length * w) + 'px';
//settinng image height and width and creating dots
for (i = 0; i < image.length; i++) {
    image[i].style.height = w + 'px';
    image[i].style.width = w + 'px';
    var div = document.createElement('div');
    div.id = i;
    div.classList.add("dot");
    document.getElementById('dots-container').appendChild(div);
}
var getDotWrapper = document.getElementById('dots-container');
var getDotDivs = getDotWrapper.getElementsByTagName("div");
//Assigning onclick events for each dots
for (i = 0; i < image.length; i++) {
    var dotIndex = "indicator(" + i + ")"
    getDotDivs[i].setAttribute("onclick", dotIndex);
}
div = document.getElementById("dots-container").children;

//Function for button click event
function prevnext(n) {
    if (count == 0 && n == -1) {
        count = image.length
    }
    if (count == image.length - 1 && n == 1) {
        count = -1;
    }
    slideshow(count = count + n);
}

//slide show 
function slideshow(count) {
    var limit = count * w;
    document.getElementById('image-wrapper').style.left = -(limit) + "px";
    getDotDivs[count].style.backgroundColor = "black";
}

//function for auto slideshow
setInterval(loop, 5000);

function loop() {
    getDotDivs[count].style.backgroundColor = "white";
    prevnext(1);
}

//Function called when dots are clicked
function indicator(id) {
    slideshow(id);
}

//Resetting the slideshow
function resetSlideshow() {
    clearInterval(slides);
}