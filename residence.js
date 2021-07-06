let numPic = 10;
const matrix = [
    [0, 0, 75, 75],
    [0, 0, 50, 50],
    [0, 0, 25, 25],
    [25, 0, 50, 75],
    [25, 0, 25, 50],
    [25, 0, 0, 25],
    [50, 0, 25, 75],
    [50, 0, 0, 50],
    [75, 0, 0, 75],
    [0, 25, 75, 50],
    [0, 25, 50, 25],
    [0, 25, 25, 0],
    [25, 25, 50, 50],
    [25, 25, 25, 25],
    [25, 25, 0, 0],
    [50, 25, 25, 50],
    [50, 25, 0, 25],
    [0, 50, 75, 25],
    [0, 50, 50, 0],
    [25, 50, 50, 25],
    [25, 50, 25, 0],
    [75, 50, 0, 25],
    [0, 75, 75, 0],
    [25, 75, 50, 0],
    [50, 75, 25, 0],
    [75, 75, 0, 0]
];
let currentPic = 0;
const imageArray = [];


document.addEventListener("DOMContentLoaded", function () {
    const imageList = document.querySelectorAll('.image_item');
    
    Array.from(imageList, item => {
        imageArray.push(item.dataset.link);
    });
    shuffle(imageArray);
    numPic = numPic > imageArray.length ? imageArray.length : numPic;
    const picWrapper = document.querySelector('.pic_wrapper');
    if (picWrapper) {
        for (let ind = 0; ind < numPic; ind++) {
            createElement(ind);
            // let div = document.createElement('div');
            // div.className = "image_element";
            // div.style.backgroundImage ="url(" + imageArray[ind] + ")";
            // div.style.position ="absolute";
            // const position = matrix[getRandomInt(0,matrix.length)];
            // div.style.left =position[0] + "%";
            // div.style.top =position[0]+ "%";
            // div.style.right =position[0] + "%";
            // div.style.bottom =position[0]+ "%" ;
            // currentPic =ind;
            // picWrapper.append(div);
        }
    setInterval(changePicture, 2000);    
    }
    
    const media = document.querySelector('video');
    const mediaWrapper = document.querySelector('.video_wrapper');
    setPosition(mediaWrapper);
    media.play();
    media.addEventListener('ended', () => {
        setPosition(mediaWrapper);
        media.play();
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function changePicture() {
    const picElement = document.querySelector('.image_element');
    const picWrapper = document.querySelector('.pic_wrapper');
    picElement.remove();
    if (currentPic+1 > imageArray.length-1) {
        currentPic = 0
    }    
    createElement(currentPic);
   

}

function createElement( ind) {
    const picWrapper = document.querySelector('.pic_wrapper');
    let div = document.createElement('div');
    div.className = "image_element";
    div.style.backgroundImage = "url(" + imageArray[ind] + ")";
    div.style.position = "absolute";
    setPosition(div);
    // const position = matrix[getRandomInt(0, matrix.length)];
    // div.style.left = position[0] + "%";
    // div.style.top = position[1] + "%";
    // div.style.right = position[2] + "%";
    // div.style.bottom = position[3] + "%";
    currentPic = ind+1;
    picWrapper.append(div);

}
function setPosition(element) {
    const position = matrix[getRandomInt(0, matrix.length)];
    element.style.left = position[0] + "%";
    element.style.top = position[1] + "%";
    element.style.right = position[2] + "%";
    element.style.bottom = position[3] + "%"; 
}