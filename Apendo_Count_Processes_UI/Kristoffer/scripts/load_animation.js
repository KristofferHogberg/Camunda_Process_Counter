// selecting loading div
const loader = document.querySelector('#loading');

// showing loading
function displayLoading() {
  loader.classList.add('display');
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove('display');
  }, 3000);
}

// hiding loading
function hideLoading() {
  loader.classList.remove('display');
}


$('.message a').click(function(){
  $('container-form').animate({height: "toggle", opacity: "toggle"}, "slow");
});