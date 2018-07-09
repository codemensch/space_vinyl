$(document).ready(function(){
  let vinyl = $.getJSON("https://archive.org/details/georgeblood?&sort=-downloads&page=5", function(data){

  });
  console.log(vinyl);
});