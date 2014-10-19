// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
/*var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {

  $(window).on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler", this._handleWheel);
  $(document).on("mousewheel.UserScrollDisabler touchmove.UserScrollDisabler", this._handleWheel);
  $(document).on("keydown.UserScrollDisabler", function(event) {
      t._handleKeydown.call(t, event);
    });
    
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
  $('body').bind('touchmove', function(e){e.preventDefault()});
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    $('body').unbind('touchmove');
}*/

var UserScrollDisabler = function() {

  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  // left: 37, up: 38, right: 39, down: 40
  this.scrollEventKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  this.$window = $(window);
  this.$document = $(document);

};
UserScrollDisabler.prototype = {

  disable_scrolling : function() {
    var t = this;
    t.$window.on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler", this._handleWheel);
    t.$document.on("mousewheel.UserScrollDisabler touchmove.UserScrollDisabler", this._handleWheel);
    t.$document.on("keydown.UserScrollDisabler", function(event) {
      t._handleKeydown.call(t, event);
    });
    t.$document.ontouchmove = function(e){ 
        e.preventDefault(); 
   }
  },

  enable_scrolling : function() {
    var t = this;
    t.$window.off(".UserScrollDisabler");
    t.$document.off(".UserScrollDisabler");
    t.$document.ontouchmove = function(e){ 
     return true; }
  },

  _handleKeydown : function(event) {
    for (var i = 0; i < this.scrollEventKeys.length; i++) {
      if (event.keyCode === this.scrollEventKeys[i]) {
        event.preventDefault();
        return;
      }
    }
  },

  _handleWheel : function(event) {
    event.preventDefault();
  }

};


var disabler = new UserScrollDisabler();
