let numPic = 5;
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
let currentVid = 0;
const imageArray = [];
const videoArray = [];

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
            createElement(ind);
        }
    //setInterval(changePicture, 2000);    
    }
    
     const media = document.querySelector('video');
    // const mediaWrapper = document.querySelector('.video_wrapper');
    // setPosition(mediaWrapper);
    media.play();
    media.addEventListener('ended', () => {
        //setPosition(mediaWrapper);
        document.querySelector('.video_wrapper').style.display = 'none';
        setTimeout(() => {
            currentVid++;
            if (currentVid > videoArray.length -1) {
                currentVid = 0;
            }
            const sourceVid = document.querySelector('.video_wrapper video');
            sourceVid.setAttribute("src", videoArray[currentVid]);
            document.querySelector('.video_wrapper').style.display = 'block';
            media.load();
            media.play();
        }, 1500);
        //media.play();
    });
    // $('#listpic').endless({

    //     direction:'vertical', //Direction : up (infinite top scrolling), down (infinite bottom scrolling), vertical (infinite top and bottom scrolling)
        
    //     scrollbar:'enable', //Enable or disable the scrollbar
        
    //     prepend:function(){alert("there isn't the boundary at the top");}, //Running when content is prepended
        
    //     append:function(){alert("there isn't the boundary at the bottom");}, //Running when content is appended
        
    //     n_prepend:function(){alert("you are now at the top");}, //Running when content in duplicate is removed and that you come from the top
        
    //     n_append:function(){alert("you are now at the bottom");} //Running when content in duplicate is removed and that you come from the bottom
        
    //     });

    // $('.image_list').infiniteScroll({
    //     // options
    //     path: '.pagination__next',
    //     append: '.image_item',
    //     history: false,
    //   });
    //$('#listpic').jscroll();

    const div = document.getElementById( "pictures" );
   
    div.addEventListener( "scroll", function() {
        //var wrapper = document.querySelector('.pic_wrapper');
      const max_scroll = this.scrollHeight - this.clientHeight;
      const current_scroll = this.scrollTop;
      const bottom = 100;
      if ( current_scroll + bottom >= max_scroll ) {
      
        changePicture();
      }
    } );

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
    div.style.position = "relative";
    setPosition(div);
    
    currentPic = ind+1;
    picWrapper.append(div);

}
function setPosition(element) {
    const position = matrix[getRandomInt(0, matrix.length)];
    const newWidth = getRandomInt(30, 80);
    element.style.width = newWidth + "%";
    element.style.height = (newWidth * 9 /16) + "%";
    element.style.left = getRandomInt(0, 100 -newWidth) + "%";
    
}