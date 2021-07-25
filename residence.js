let numPic = 8;
let currentPic = 0;
let currentVid = 0;
const imageArray = [];
const videoArray = [];
const paralaxArray = [];
var lastScrollTop = 0;
const SAFETY_MARGIN = 150;
var detector;

document.addEventListener("DOMContentLoaded", function () {
    const imageList = document.querySelectorAll('.image_item, .video_item');
     const options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.1
    }

    // const targetNode = document.getElementById('pictures');

    // // Options for the observer (which mutations to observe)
    // const config = { attributes: true, childList: true, subtree: true };
    
    // // Callback function to execute when mutations are observed
    // const callback = function(mutationsList, observer) {
    //     // Use traditional 'for loops' for IE 11
    //     for(const mutation of mutationsList) {
    //         if (mutation.type === 'childList') {
    //             console.log('A child node has been added or removed.');
    //         }
    //         else if (mutation.type === 'attributes') {
    //             console.log('The ' + mutation.attributeName + ' attribute was modified.');
    //         }
    //     }

    // };
    
    // // Create an observer instance linked to the callback function
    // const observer = new MutationObserver(callback);
    
    // // Start observing the target node for configured mutations
    // observer.observe(targetNode, config);


    detector = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            let newDiv;
            if (entry.isIntersecting) {
                let isUpper = entry.boundingClientRect.y < entry.rootBounds.y;
                let curScroll;
                if ($(entry.target).find('img,video').first().is(paralaxArray[0].elements[0])) {
                    newDiv = prependPicture(true);
                } else if ($(entry.target).find('img,video').first().is(paralaxArray[paralaxArray.length - 1].elements[0])) {
                    //disableScrolling();
                    var block = document.querySelector('.pic_frame');
                    var lastScrollHeight = block.scrollHeight;
                    
                    newDiv = appendPicture(true);
                    //enableScrolling();
                    block.scrollTop += (block.scrollHeight-lastScrollHeight);
                }
                // }
                console.log(entry);
            }
            //console.log(entry);
            if (newDiv) {
                detector.observe(newDiv);
            }

        })
    }, options);


    Array.from(imageList, item => {
        imageArray.push({
            class: item.className,
            link: item.dataset.link
        });
    });
    shuffle(imageArray);

    // const videoList = document.querySelectorAll('.video_item');

    // Array.from(videoList, item => {
    //     videoArray.push(item.dataset.link);
    // });
    // shuffle(videoArray);

    // numPic = numPic > imageArray.length ? imageArray.length : numPic;
    const picWrapper = document.querySelector('.pic_frame');
    if (picWrapper) {
        for (let ind = 0; ind < numPic; ind++) {
            appendPicture();

        }


    }
    
});

window.onload = () => {
    const addedList = document.querySelectorAll('.image_element');

    Array.from(addedList, item => {
        detector.observe(item);
    });
}

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

function appendPicture(shift = false) {
    const picElement = document.querySelector('.image_element');
    const picWrapper = document.querySelector('.pic_frame');
    if (picElement && shift) {
        detector.unobserve(picElement);
        picElement.remove();
    }
    if (currentPic + 1 > imageArray.length - 1) {
        currentPic = 0
    }
    const newDiv = createElement(currentPic, true);
    picWrapper.append(newDiv);
    const imdToParallax = newDiv.firstChild; //querySelector('img');
    makeParallax(true, imdToParallax, shift);
    currentPic += 1;

    return newDiv;

}

function prependPicture(shift = false) {
    const picElement = document.querySelector('.image_element:last-child');
    const picWrapper = document.querySelector('.pic_frame');
    if (picElement && shift) {
        detector.unobserve(picElement);
        picElement.remove();
    }
    if (currentPic - 1 < 0) {
        currentPic = imageArray.length - 1;
    }
    const newDiv = createElement(currentPic, true);
    picWrapper.prepend(newDiv);
    const imdToParallax = newDiv.firstChild; //querySelector('img');
    makeParallax(false, imdToParallax, shift);
    currentPic -= 1;
    return newDiv;
}

function createElement(ind) {
    const picWrapper = document.querySelector('.pic_frame');
    let div = document.createElement('div');
    div.className = "image_element";
    let newImg;
    if (imageArray[ind].class.includes('image_item')) {
        newImg = document.createElement('img');

    } else {
        newImg = document.createElement('video');
        newImg.muted = true;
        newImg.autoplay = true;
        newImg.setAttribute('type', "video/mp4")

    }
    newImg.src = imageArray[ind].link;
    div.style.position = "relative";
    setPosition(div);

    div.append(newImg);
    return div;

}

function setPosition(element) {
    const newWidth = getRandomInt(30, 80);
    element.style.width = newWidth + "%";
    element.style.height = (newWidth * 9 / 16) + "%";
    element.style.left = getRandomInt(0, 100 - newWidth) + "%";

}

function makeParallax(append, element, shift) {
    if (element) {
        const container = document.querySelector('.pic_frame');
        const newParallax = new simpleParallax(element, {
            customContainer: container,
            customWrapper: '.image_element',
            scale: 2.3,
            orientation: 'down'
        });
        if (append) {
            paralaxArray.push(newParallax);
            if (shift) {
                paralaxArray[0].destroy();
                paralaxArray.shift();
            }
        } else {
            paralaxArray.unshift(newParallax);
            if (shift) {
                paralaxArray[paralaxArray.length-1].destroy();
                paralaxArray.pop();
            }
        }

        paralaxArray.push(newParallax);
        if (shift) {
            paralaxArray[0].destroy();
            paralaxArray.shift();
        }
    }
}

function disableScrolling(){
    var block = document.querySelector('.pic_frame');
    var x=block.scrollX;
    var y=block.scrollY;
    block.onscroll=function(){block.scrollTo(x, y);};
}

function enableScrolling(){
    var block = document.querySelector('.pic_frame');
    block.onscroll=function(){};
}

