// Dynamically fill the left and right flair stacks with squares to match the main content height
(function() {

  // Get references to the left and right flair stack containers and the main column
  var leftStack = document.getElementById('flair-stack-left');
  var rightStack = document.getElementById('flair-stack-right');
  var mainCol = document.querySelector('.about-main-column');
  // Exit if any required element is missing
  if (!leftStack || !rightStack || !mainCol) return;

  // Fetches lottery flair image filenames from the server
  function fetchLotteryImagesFromJSON() {    
    return fetch('/lottery/images')
      .then(res => res.json())
      .then(data => {
        // If the response is successful and contains images, return their filenames
        if (data.success && Array.isArray(data.images)) {
          return data.images.map(img => img.filename);
        }
        // Otherwise, return an empty array
        return [];
      })
      // On error, return empty array
      .catch(() => []);
  }

  // Determines how many flair squares to show based on the current page
  function getNumSquares() {
    // Adjust number of squares for specific pages
    if (window.location.pathname.includes('/involved')) {
      return 7;
    } else if (window.location.pathname.includes('/photos')) {
      return 5;
    }
    // Default number for other pages
    return 10;
  }

  // Creates a flair square DOM element for a given image source
  function createFlairSquare(imgSrc) {
    var square = document.createElement('div');
    square.className = 'about-flair-square';
    var container = document.createElement('div');
    container.className = 'flair-img-container';
    var img = document.createElement('img');
    img.className = 'flair-img';
    img.src = '/images/lottery/' + imgSrc;
    img.alt = 'Aubfest flair';
    var overlay = document.createElement('div');
    overlay.className = 'flair-img-overlay';
    container.appendChild(img);
    container.appendChild(overlay);
    square.appendChild(container);
    return square;
  }

  // Shuffles an array in place
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Fills the left and right stacks with flair squares
  function fillStacksDynamic() {
    fetchLotteryImagesFromJSON().then(lotteryImages => {
      // Clear existing squares
      leftStack.innerHTML = '';
      rightStack.innerHTML = '';
      if (!lotteryImages.length) {

        // Show a fallback message if no images
        var msg = document.createElement('div');
        msg.textContent = 'No flair images available.';
        msg.style.color = '#AE1C33';
        leftStack.appendChild(msg.cloneNode(true));
        rightStack.appendChild(msg);
        return;
      }
      var num = getNumSquares();
      var images = lotteryImages.slice();
      shuffleArray(images);
      var leftImgs = images.slice(0, num);
      var rightImgs = images.slice(num, num * 2);
      for (var i = 0; i < num; i++) {
        if (leftImgs[i]) leftStack.appendChild(createFlairSquare(leftImgs[i]));
        if (rightImgs[i]) rightStack.appendChild(createFlairSquare(rightImgs[i]));
      }
    });
  }

  window.addEventListener('load', fillStacksDynamic);
})();
