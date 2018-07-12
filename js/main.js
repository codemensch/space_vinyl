$(document).ready(function(){
  (function(){
    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe);
    var vintageIframe = document.getElementById('vintage-widget'),
        vintage       = SC.Widget(vintageIframe);
    var rocketIframe = document.getElementById('rocket-widget'),
        rocket       = SC.Widget(rocketIframe);    

    widget.bind(SC.Widget.Events.READY, function() {      
      
    });

    vintage.bind(SC.Widget.Events.READY, function() {
     
    });

    rocket.bind(SC.Widget.Events.READY, function() {
     
    });

  }());
});