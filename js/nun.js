if(!bigPictureList) var bigPictureList = [];

// pictures engine
var bigPicture = {

    _idpict: 0,//current picture
    _maxId: bigPictureList.length -1,
  
    init: function(){
      $('.big-picture').css('backgroundImage', 'url("../img/' + bigPictureList[this._idpict] + '")');
    },

    prev: function(){
        var newId = this._idpict ? this._idpict -1 : this._maxId;
        this.goto(newId);
    },

    next: function(){
        var newId = this._idpict<this._maxId ? this._idpict +1 : 0;
        this.goto(newId);
    },

    goto: function(id){
        $('.big-picture').css('backgroundImage', 'url("../img/' + bigPictureList[id] + '")');
        this.animateTransition();
        $('.bullet-on').removeClass('bullet-on');
        $('.bullet-nav-'+id).addClass('bullet-on');
        this._idpict = id;
    },

    animateTransition: function(){
        $('.'+this._className)
            .stop()
            .css('opacity', 0)
            .animate({
                opacity: 1
            }, 2000);
    }
};

// init first picture
bigPicture.init();

// preload pictures (works?)
$(window).load(function(){
    //$.loadImages(bigPictureList);
    bigPictureList.forEach(function(element, index, array){
        $('<img/>')[0].src = 'img/'+element;
    });
});

// generate the bullet points nav
bigPictureList.forEach(function(element, index, array){
    var bulletClass= index==0 ? "bullet-on":"";
    $('.bullet-points-nav').append('<li class="' + bulletClass + ' bullet-nav-' + index + '" onclick="bigPicture.goto(' + index + ')"></li>');
});

// go to next big picture all 10s
var nextBPInterval = setInterval("bigPicture.next()", 10000);


// menu
var aPanels = ['teasing', 'about-us', 'products', 'store', 'contact', 'press'];
var currentPanel = 0;
function changePanelTo(idPanel) {

    // for contact panel
    $('.contact-form').show();
    $('.message-ok').remove();

    if(idPanel == currentPanel) {
        // click on current panel, hide it
        $('.' + aPanels[idPanel] + '-box').fadeOut(500);
        // then show again the teasing panel
        $('.' + aPanels[0] + '-box').fadeIn(500);
        currentPanel = 0;
    }
    else {
        $('.' + aPanels[0] + '-box').hide();
        $('.' + aPanels[currentPanel] + '-box').fadeOut(500);
        $('.' + aPanels[idPanel] + '-box').fadeIn(500);
        currentPanel = idPanel;
    }
}
$('.about-us-btn').on('click', function() {
    changePanelTo(1);
});
$('.products-btn').on('click', function() {
    changePanelTo(2);
});
$('.store-btn').on('click', function() {
    changePanelTo(3);
});
$('.contact-btn').on('click', function() {
    changePanelTo(4);
});
$('.press-btn').on('click', function() {
    changePanelTo(5);
});


// send message
var sendMessage = {

    _sending: false,

    send: function() {
        if(!sendMessage._sending) {
            var data = {
                interest: $('#contact-form-interest').val(),
                areyou: $('#contact-form-areyou').val(),
                email: $('#contact-form-email').val(),
                subject: $('#contact-form-subject').val(),
                message: $('#contact-form-message').val(),
            };
            $.ajax({
                url: 'controller.php?action=send_msg',
                method: 'POST',
                data: data,
                beforeSend: function() {
                    sendMessage._sending = true;
                },
                complete: function() {
                    sendMessage._sending = false;
                },
                success: function(result) {
                    $('.contact-form').hide();
                    if(result == 'ok') {
                        $('.contact-box').append('<p class="info-box-catch-txt message-ok">Message sent successfully!</p>');
                    }
                    else {
                        $('.contact-box').append('<p class="info-box-catch-txt message-ok">An error occurred!</p>');
                    }
                },
                error: function() {
                    $('.contact-form').hide();
                    $('.contact-box').append('<p class="info-box-catch-txt message-ok">An error occurred!</p>');
                }
            });
        }
    }

}

$("#contact-form").submit(function(){
    sendMessage.send();
});
