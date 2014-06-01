// pictures list
var bigPicturesList = ['photobck01.jpg', 'photobck02.jpg', 'photobck03.jpg', 'photobck04.jpg', 'photobck05.jpg', 'photobck06.jpg'];

// pictures engine
var bigPicture = {

    _idpict: 1,//actual picture
    _className: 'big-picture',
    _maxId: bigPicturesList.length,

    prev: function(){
        var newId = this._idpict>1 ? this._idpict -1 : this._maxId;
        this.goto(newId);
    },

    next: function(){
        var newId = this._idpict<this._maxId ? this._idpict +1 : 1;
        this.goto(newId);
    },
                       
    goto: function(i){
        var newId = i;
        $('.'+this._className).removeClass(this._className+this._idpict).addClass(this._className+newId);
        this.animateTransition();
        $('.bullet-on').removeClass('bullet-on');
        $('.bullet-nav-'+i).addClass('bullet-on');
        this._idpict = newId;
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

// preload pictures ?
$(window).load(function(){
    //$.loadImages(bigPicturesList);
    bigPicturesList.forEach(function(element, index, array){
        $('<img/>')[0].src = 'img/'+element;
    });
});

// generate the bullet points nav
bigPicturesList.forEach(function(element, index, array){
    var bulletClass= index==0 ? "bullet-on":"";
    $('.bullet-points-nav').append('<li class="'+bulletClass+' bullet-nav-'+(index+1)+'" onclick="bigPicture.goto('+(index+1)+')"></li>');
});

// go to next big picture all 10s
var nextBPInterval = setInterval("bigPicture.next()", 10000);

// about & contact menu
$('.about-us-btn').on('click', function() {
    $('.contact-box').hide();
    $('.about-us-box').fadeToggle();
    $('.teasing-box').hide();
});
$('.contact-btn').on('click', function() {
    $('.about-us-box').hide();
    $('.contact-form').show();
    $('.message-ok').remove();
    $('.contact-box').fadeToggle();
    $('.teasing-box').hide();
});

// send message
var sendMessage = {
    
    _sending: false,
    
    send: function() {
        if(!sendMessage._sending) {
            var email = $('#contact-form-email').val();
            var subject = $('#contact-form-subject').val();
            var message = $('#contact-form-message').val();
            console.log(email, subject, message);
            $.ajax({
                url: 'controller.php?action=send_msg',
                method: 'POST',
                data: 'email='+email+'&subject='+subject+'&message='+message,
                beforeSend: function() {
                    sendMessage._sending = true;
                },
                complete: function() {
                    sendMessage._sending = false;
                },
                success: function() {
                    $('.contact-form').hide();
                    $('.contact-box').append('<p class="info-box-catch-txt message-ok">Message sent successfully!</p>');
                }
            });
        }
    }
    
}

$("#contact-form").submit(function(){
    sendMessage.send();
});