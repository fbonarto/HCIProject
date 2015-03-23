$(document).ready(function() {
  var createMarkticleButton = function() {
  var styles = 'position: fixed; z-index: 9999; bottom: 20px; left: 20px;';
$('body').append('Mark me!');
};
$(document).on('click', '#markticle_button', function() {
    var title = document.title;
    var url = window.location.href;
console.log(title + ': ' + url);
});
createMarkticleButton();
});
