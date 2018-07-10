$(document).ready(function(){
  (function(){
    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.READY, function() {
      widget.play();
      
      // get current level of volume
      widget.getVolume(function(volume) {
        console.log('current volume value is ' + volume);
      });
      // set new volume level
      widget.setVolume(50);
      // get the value of the current position
    });

  }());
});