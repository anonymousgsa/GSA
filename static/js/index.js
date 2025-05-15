window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}




let currentSliderIndex = 0;
const sliderContainers = [
    "slider1-container_teaser",
    "slider2-container_teaser"
];

function toggleSliders() {
    // Hide the current slider
    document.getElementById(sliderContainers[currentSliderIndex]).style.display = "none";

    // Move to the next slider (loop back after last)
    currentSliderIndex = (currentSliderIndex + 1) % sliderContainers.length;

    // Show the new slider
    document.getElementById(sliderContainers[currentSliderIndex]).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("toggle-slider").addEventListener("click", toggleSliders);

      // GIF Synchronization: Force all GIFs to start at the same time
      const gifs = document.querySelectorAll(".sync-gif");
  
      function restartGifs() {
          gifs.forEach(gif => {
              let src = gif.src;
              gif.src = ""; // Clear src
              gif.offsetHeight; // Trigger reflow
              gif.src = src; // Reload GIF
          });
      }
  
      // Restart GIFs on page load
      setTimeout(restartGifs, 500); // Small delay to ensure loading
  
      // Optional: Restart GIFs every few seconds to keep them in sync
      setInterval(restartGifs, 10000); // Adjust time as needed
  });
  





$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

