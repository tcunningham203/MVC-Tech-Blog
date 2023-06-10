document.addEventListener("DOMContentLoaded", function() {
  // Get the page wrapper element
  const pageWrapper = document.getElementById('page-wrapper');
  // Get the loading spinner element
  const loadingSpinner = document.querySelector('.spinner-wrapper');

  // Function to show the page content with a fade-in effect
  const showPageContent = () => {
    // Remove the loading spinner
    loadingSpinner.style.display = 'none';

    // Set the opacity to 1 to show the page content with a fade-in transition
    pageWrapper.style.opacity = '1';
    pageWrapper.style.transition = 'opacity 1s ease';
    console.log('Page content displayed');
  };

  // Hide the page content initially
  pageWrapper.style.opacity = '0';

  // Set a minimum duration of 0.4 seconds for the spinner animation
  const minimumDuration = 800; // milliseconds

  // Variable to track when the minimum duration has elapsed
  let minimumDurationElapsed = false;

  // Variable to track when all images have finished loading
  let allImagesLoaded = false;

  // Check if the page has been loaded before
  const isFirstLoad = !localStorage.getItem('pageLoaded');

  // Function to handle the minimum duration timeout
  const minimumDurationTimeout = () => {
    minimumDurationElapsed = true;
    checkLoadingComplete();
  };

  // Function to check if both the minimum duration and image loading are complete
  const checkLoadingComplete = () => {
    if (minimumDurationElapsed && allImagesLoaded) {
      showPageContent();
      // Store the page load status in localStorage for subsequent visits
      if (isFirstLoad) {
        localStorage.setItem('pageLoaded', 'true');
      }
    }
  };

  // Set a timeout for the minimum duration only on first load
  if (isFirstLoad) {
    setTimeout(minimumDurationTimeout, minimumDuration);
  } else {
    minimumDurationElapsed = true;
  }

  // Add load event listener to each image
  const images = document.querySelectorAll('img');
  let loadedImages = 0;

  const imageLoaded = () => {
    loadedImages++;
    console.log(`Image loaded (${loadedImages}/${images.length})`);
    if (loadedImages === images.length) {
      // All images have finished loading
      allImagesLoaded = true;
      checkLoadingComplete();
    }
  };

  // Check if images are already loaded
  if (images.length > 0) {
    images.forEach((image) => {
      if (image.complete) {
        imageLoaded();
      } else {
        // Add load event listener to each image
        image.addEventListener('load', imageLoaded);
      }
    });
  } else {
    // No images on the page
    allImagesLoaded = true;
    checkLoadingComplete();
  }

  console.log('JavaScript code executed');
});
