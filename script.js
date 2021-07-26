var numPic = 8;
var currentPic = 0;
var imageArray = [];
var sceneArray = [];

jQuery(document).ready(function ($) {

    var controller = new ScrollMagic.Controller();

    $('.image_item, .video_item').each(function () {
        imageArray.push(this);
    });
    shuffle(imageArray);

    // build scene
    // var scene_up = new ScrollMagic.Scene({
    //         triggerElement: "#loader_up",
    //         triggerHook: 0,
    //         offset: "30px",
    //         reverse: true
    //     })
    //     .addTo(controller)
    //     .on("leave", function (e) {
    //         createElement('up', true);
    //         scene_up.update();
            
    //     })
    //     .addIndicators();

    var scene_down = new ScrollMagic.Scene({
            triggerElement: "#loader_down",
            triggerHook: "onEnter",
            offset: "-30px",
        })
        .addTo(controller)
        .on("enter", function (e) {
            createElement('down', true);
            scene_down.update();
            
        });
        //.addIndicators();

    // add some boxes to start with.
    addBoxes(8);
   

    $('#pictures').on('click', '.image_element > video', function(e) {
        console.log(e.target);
        var videoElement = e.target;
        if ($(videoElement).hasClass('active')) {
            $(videoElement).removeAttr('controls')
            $(videoElement).attr('muted', '');
            videoElement.muted = 1;
            $(videoElement).removeClass('active');
        } else {
            $(videoElement).removeAttr('muted')
            $(videoElement).attr('controls', '');
            $(videoElement).addClass('active');
            videoElement.pause();
            videoElement.currentTime = 0;
            videoElement.muted = 0;
            videoElement.load();
        }

    });

    
    // pseudo function to add new content. In real life it would be done through an ajax request.
    function addBoxes(amount) {
        for (i = 1; i <= amount; i++) {
            createElement('down', false);
        }
        // "loading" done -> revert to normal state
        scene_down.update(); // make sure the scene gets the new start position
    }


    function createElement(direction, remove) {
        // var loaderElement = $('#loader_down');
        var newElement;
        if ($(imageArray[currentPic]).hasClass('image_item')) {
            newElement = $('.templates .picture_element').clone();
            if (direction === 'up') {
                newElement.insertAfter($('#loader_up'));
            } else if (direction === 'down') {
                newElement.insertBefore($('#loader_down'));
               
            }
            newElement.children('img').attr('src', imageArray[currentPic].dataset.link);
            newElement.children('img').attr('data-width', imageArray[currentPic].dataset.width)
            newElement.children('img').attr('data-height', imageArray[currentPic].dataset.height)
        } else {
            newElement = $('.templates .video_element').clone();
            if (direction === 'up') {
                newElement.insertAfter($('#loader_up'));
            } else if (direction === 'down') {
                newElement.insertBefore($('#loader_down'));
            }
            newElement.children('video').attr('src', imageArray[currentPic].dataset.link);
        }
        setPosition(newElement);
        if (remove) {
            if (direction === 'up') {
                $('#pictures .image_element').last().remove();
                $('#pictures').scrollTop(newElement.outerHeight());
            } else if (direction === 'down') {
                $('#pictures .image_element').first().remove();
            }
        }
       
        if (currentPic + 1 > imageArray.length - 1) {
            currentPic = 0
        } else {
            currentPic++;
        }
        return newElement;

    }

    function setPosition(element) {
        var newWidth = getRandomInt(30, 80);
        var aspectRatio;
        element.css('position', 'relative');
        if (element.find('video').length) {
            element.css('width', newWidth + "%");
            element.css('height', (newWidth * 9 / 16) + "%");
        } else {
            if (element.find('img').attr('data-width') > 0) {
                aspectRatio = element.find('img').attr('data-height') / element.find('img').attr('data-width');
                if (aspectRatio < 1) {
                    element.css('width', newWidth + "%");
                    //element.css('height', (newWidth / aspectRatio) + "%");
                    element.css('height', "fit-content");
                    element.find('img').css('width', '100%');
                    element.find('img').css('height', 'auto');
                } else {
                    element.css('height', newWidth + "%");
                    //element.css('width', (newWidth * aspectRatio) + "%");
                    element.css('width', "fit-content");
                    element.find('img').css('height', '100%');
                    element.find('img').css('width', 'auto');
                }

            }
        }
        element.css('left', getRandomInt(0, 100 - newWidth) + "%");

        // const newWidth = getRandomInt(30, 80);
        // element.css('position', 'relative');
        // element.css('width', newWidth + "%");
        // element.css('height', (newWidth * 9 / 16) + "%");
        // element.css('left', getRandomInt(0, 100 - newWidth) + "%");

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

});
