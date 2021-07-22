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
const paralaxArray = [];
var lastScrollTop = 0;
const SAFETY_MARGIN = 150;

document.addEventListener("DOMContentLoaded", function () {
        const imageList = document.querySelectorAll('.image_item, .video_item');

        Array.from(imageList, item => {
                imageArray.push({
                        class: item.className,
                        link: item.dataset.link});
                }); shuffle(imageArray);

            // const videoList = document.querySelectorAll('.video_item');

            // Array.from(videoList, item => {
            //     videoArray.push(item.dataset.link);
            // });
            // shuffle(videoArray);

            // numPic = numPic > imageArray.length ? imageArray.length : numPic;
            const picWrapper = document.querySelector('.pic_frame');
            if (picWrapper) {
                for (let ind = 0; ind < numPic; ind++) {
                    // const newDiv = createElement(ind, false);
                    // picWrapper.append(newDiv);
                    appendPicture();

                }
                //setInterval(changePicture, 2000);    
            }

            // const media = document.querySelector('video');
            // media.play();
            // media.addEventListener('ended', () => {
            //     document.querySelector('.video_wrapper').style.display = 'none';
            //     setTimeout(() => {
            //         currentVid++;
            //         if (currentVid > videoArray.length - 1) {
            //             currentVid = 0;
            //         }
            //         const sourceVid = document.querySelector('.video_wrapper video');
            //         sourceVid.setAttribute("src", videoArray[currentVid]);
            //         document.querySelector('.video_wrapper').style.display = 'block';
            //         media.load();
            //         media.play();
            //     }, 1500);
            // });

            // window.addEventListener('scroll', function () {
            //     console.log('wi scroll');
            // })

            const div = document.getElementById("pictures");

            div.addEventListener("scroll", function () {
                var wrapper = document.querySelector('.pic_frame');
                //const st = window.pageYOffset || document.documentElement.scrollTop;
                const max_scroll = this.scrollHeight - this.clientHeight;
                const st = this.scrollTop;
                const bottom = 100;
                if (st > lastScrollTop) {
                    if (st + bottom >= max_scroll) {

                        appendPicture(true);
                    }
                } else if (st < lastScrollTop) {
                    if (st - bottom <= 0) {
                        prependPicture(true);
                    }
                }
                lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

                let scrollBottom = this.scrollHeight - this.scrollTop - this.clientHeight;
                if (scrollBottom <= 0) {
                    this.scrollBy(0,-50);
                }
                if (st <= 0) {
                    this.scrollBy(0,50);
                } 
                
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

    function appendPicture(shift = false) {
        const picElement = document.querySelector('.image_element');
        const picWrapper = document.querySelector('.pic_frame');
        if (picElement && shift) {
            picElement.remove();
        }
        if (currentPic + 1 > imageArray.length - 1) {
            currentPic = 0
        }
        const newDiv = createElement(currentPic, true);
        picWrapper.append(newDiv);
        const imdToParallax = newDiv.firstChild; //querySelector('img');
        if (imdToParallax) {
        const container = document.querySelector('.pic_frame');
        const newParallax = new simpleParallax(imdToParallax, {
            customContainer: container,
            customWrapper: '.image_element',
            scale: 2.3,
            orientation: 'down'
        });
        paralaxArray.push(newParallax);
        if (shift) {
            paralaxArray[0].destroy();
            paralaxArray.shift();
        }
    }
    currentPic += 1;

}

function prependPicture(shift = false) {
    const picElement = document.querySelector('.image_element:last-child');
    const picWrapper = document.querySelector('.pic_frame');
    if (picElement && shift) {
        picElement.remove();
    }
    if (currentPic - 1 < 0) {
        currentPic = imageArray.length - 1;
    }
    const newDiv = createElement(currentPic, true);
    picWrapper.prepend(newDiv);
    const imdToParallax = newDiv.firstChild;   //querySelector('img');
    if (imdToParallax) {
        const container = document.querySelector('.pic_frame');
        const newParallax = new simpleParallax(imdToParallax, {
            customContainer: container,
            customWrapper: '.image_element',
            scale: 2.3,
            orientation: 'down'
        });
        paralaxArray.push(newParallax);
        if (shift) {
            paralaxArray[0].destroy();
            paralaxArray.shift();
        }
    }
    currentPic -= 1;

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
    // div.style.backgroundImage = "url(" + imageArray[ind] + ")";
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