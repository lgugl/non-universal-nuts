var bigPicture = {

    _idpict: 1,
    _className: 'big-picture',
    _maxId: 10,

    prev: function(){
        var newId = this._idpict>1 ? this._idpict -1 : this._maxId;
        $('.big-picture').removeClass(this._className+this._idpict).addClass(this._className+newId);
        this.animateTransition();
        this._idpict = newId;
    },

    next: function(){
        var newId = this._idpict<this._maxId ? this._idpict +1 : 1;
        $('.big-picture').removeClass(this._className+this._idpict).addClass(this._className+newId);
        this.animateTransition();
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
    $('.about-us-box').toggle();
});

$('.contact-btn').on('click', function() {
    $('.about-us-box').hide();
    $('.contact-box').toggle();
});