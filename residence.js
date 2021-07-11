let numPic = 8;
// const matrix = [
//     [0, 0, 75, 75],
//     [0, 0, 50, 50],
//     [0, 0, 25, 25],
//     [25, 0, 50, 75],
//     [25, 0, 25, 50],
//     [25, 0, 0, 25],
//     [50, 0, 25, 75],
//     [50, 0, 0, 50],
//     [75, 0, 0, 75],
//     [0, 25, 75, 50],
//     [0, 25, 50, 25],
//     [0, 25, 25, 0],
//     [25, 25, 50, 50],
//     [25, 25, 25, 25],
//     [25, 25, 0, 0],
//     [50, 25, 25, 50],
//     [50, 25, 0, 25],
//     [0, 50, 75, 25],
//     [0, 50, 50, 0],
//     [25, 50, 50, 25],
//     [25, 50, 25, 0],
//     [75, 50, 0, 25],
//     [0, 75, 75, 0],
//     [25, 75, 50, 0],
//     [50, 75, 25, 0],
//     [75, 75, 0, 0]
// ];
let currentPic = 0;
let currentVid = 0;
const imageArray = [];
const videoArray = [];
var lastScrollTop = 0;
const SAFETY_MARGIN = 150;

document.addEventListener("DOMContentLoaded", function () {
    const imageList = document.querySelectorAll('.image_item');

    Array.from(imageList, item => {
        imageArray.push(item.dataset.link);
    });
    shuffle(imageArray);

    const videoList = document.querySelectorAll('.video_item');

    Array.from(videoList, item => {
        videoArray.push(item.dataset.link);
    });
    shuffle(videoArray);

    // numPic = numPic > imageArray.length ? imageArray.length : numPic;
    const picWrapper = document.querySelector('.pic_wrapper');
    if (picWrapper) {
        for (let ind = 0; ind < numPic; ind++) {
            const newDiv = createElement(ind);
            picWrapper.append(newDiv);

        }
        //setInterval(changePicture, 2000);    
    }

    const media = document.querySelector('video');
    media.play();
    media.addEventListener('ended', () => {
        document.querySelector('.video_wrapper').style.display = 'none';
        setTimeout(() => {
            currentVid++;
            if (currentVid > videoArray.length - 1) {
                currentVid = 0;
            }
            const sourceVid = document.querySelector('.video_wrapper video');
            sourceVid.setAttribute("src", videoArray[currentVid]);
            document.querySelector('.video_wrapper').style.display = 'block';
            media.load();
            media.play();
        }, 1500);
    });

    window.addEventListener('scroll', function() {
        console.log('wi scroll');
      })

    const div = document.getElementById("pictures");

    div.addEventListener("scroll", function () {
        var wrapper = document.querySelector('.pic_wrapper');
        //const st = window.pageYOffset || document.documentElement.scrollTop;
        const max_scroll = this.scrollHeight - this.clientHeight;
        const st = this.scrollTop;
        const bottom = 100;
        if (st > lastScrollTop) {           
            if (st + bottom >= max_scroll) {

                appendPicture();
            }
        } else if (st < lastScrollTop) {
            if (st -bottom <= 0) {
                prependPicture();
            }
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

    //     scrollPos = $(this).scrollTop(),
    //     docHeight = $(document.body).height(),
    //     winHeight = $(window).height(),
    //     lowerLimit = SAFETY_MARGIN,
    //     higherLimit = docHeight - SAFETY_MARGIN;

    //      // Scrolling too high
    // if( scrollPos <= lowerLimit ){

    //     // Move content to top;
    //     //$(lastDiv).prependTo(document.body);
    //     prependPicture();
    //     // Adjust scroll position to compensate
    //     // for the new content at the top
    //     //$(window).scrollTop(scrollPos + $(lastDiv).height());

    // }

    // // Scrolling too low
    // else if( scrollPos + winHeight >= higherLimit ){

    //     // Move content to bottom
    //     //$(firstDiv).appendTo(document.body);
    //     appendPicture();
    //     // Adjust scroll position to compensate
    //     // for the missing content at the top
    //    // $(window).scrollTop(scrollPos - $(firstDiv).height());
    // } 

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

function appendPicture() {
    const picElement = document.querySelector('.image_element');
    const picWrapper = document.querySelector('.pic_wrapper');
    picElement.remove();
    if (currentPic + 1 > imageArray.length - 1) {
        currentPic = 0
    }
    const newDiv = createElement(currentPic);
    picWrapper.append(newDiv);
    currentPic += 1;

}

function prependPicture() {
    const picElement = document.querySelector('.image_element:last-child');
    const picWrapper = document.querySelector('.pic_wrapper');
    picElement.remove();
    if (currentPic - 1 < 0) {
        currentPic = imageArray.length-1;
    }
    const newDiv = createElement(currentPic);
    picWrapper.prepend(newDiv);
    currentPic -= 1;

}

function createElement(ind) {
    const picWrapper = document.querySelector('.pic_wrapper');
    let div = document.createElement('div');
    div.className = "image_element";
    div.style.backgroundImage = "url(" + imageArray[ind] + ")";
    div.style.position = "relative";
    setPosition(div);
    return div;
    //currentPic = ind+1;
    // picWrapper.append(div);

}

function setPosition(element) {
    //const position = matrix[getRandomInt(0, matrix.length)];
    const newWidth = getRandomInt(30, 80);
    element.style.width = newWidth + "%";
    element.style.height = (newWidth * 9 / 16) + "%";
    element.style.left = getRandomInt(0, 100 - newWidth) + "%";

}