var bigPicturesList = ['photobck01.jpg', 'photobck02.jpg', 'photobck03.jpg', 'photobck04.jpg', 'photobck05.jpg', 'photobck06.jpg'];

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

var bigPicture = {

    _idpict: 1,
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
        $('.big-picture').removeClass(this._className+this._idpict).addClass(this._className+newId);
        this.animateTransition();
        $('.bullet-on').removeClass('bullet-on');
        $('.bullet-nav-'+i).addClass('bullet-on');
        this._idpict = newId;
    },

    animateTransition: function(){
        $('.big-picture')
            .stop()
            .css('opacity', 0)
            .animate({
                opacity: 1
            }, 2000);
    }
};

$('.about-us-btn').on('click', function() {
    $('.contact-box').hide();
    $('.about-us-box').fadeToggle();
    $('.teasing-box').hide();
});

$('.contact-btn').on('click', function() {
    $('.about-us-box').hide();
    $('.contact-box').fadeToggle();
    $('.teasing-box').hide();
});

var teasingDisplay = function(){
    if($('.info-box:visible')) {
        console.log('A');
        $('.teasing-box').hide();
    } else {
        console.log('B');
        $('.teasing-box').show();
    }
}