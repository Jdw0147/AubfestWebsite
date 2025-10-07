// Dynamically fill the left and right flair stacks with squares to match the main content height
(function() {
  var leftStack = document.getElementById('flair-stack-left');
  var rightStack = document.getElementById('flair-stack-right');
  var mainCol = document.querySelector('.about-main-column');
  if (!leftStack || !rightStack || !mainCol) return;

  // List of available images (update as you add images)
  var lotteryImages = [
    'ellie-1.jpg',
    'ellie-2.jpg',
    'ellie-3.jpg',
    'ellie-4.jpg',
    'ellie-5.jpg',
    'ellie-6.jpg',
    'ellie-7.jpg',
    'hannah-1.jpg',
    'hannah-2.jpg',
    'hannah-3.jpg',
    'hannah-4.jpg',
    'hannah-5.jpg',
    'hannah-6.jpg',
    'hannah-7.jpg',
    'hannah-8.jpg',
    'hannah-9.jpg',
    'hannah-10.jpg',
    'hannah-11.jpg',
    'hannah-12.jpg',
    'hannah-13.jpg',
    'hannah-14.jpg',
    'hannah-15.jpg',
    'hannah-16.jpg',
    'regis-1.jpg',
    'regis-2.jpg',
    'regis-3.jpg',
    'regis-4.jpg',
    'regis-5.jpg',
    'regis-6.jpg',
    'regis-7.jpg',
    'warren-1.jpg',
    'warren-2.jpg',
    'warren-3.jpg',
    'warren-4.jpg',
    'warren-5.jpg',
    'warren-6.jpg',
    'warren-7.jpg',

    // Add more filenames as you add them to /images/lottery
  ];

  // If you have no images, use a placeholder
  if (lotteryImages.length === 0) return;

  // Get the computed height of the main content column
  function getMainHeight() {
    return mainCol.offsetHeight;
  }

  // Calculate how many squares fit vertically (with gap)
  // Always use 15 squares per stack
  function getNumSquares() {
    return 11;
  }

  // Pick n unique random images from the list
  function pickUniqueImages(n) {
    var arr = lotteryImages.slice();
    var result = [];
    for (var i = 0; i < n; i++) {
      if (arr.length === 0) arr = lotteryImages.slice();
      var idx = Math.floor(Math.random() * arr.length);
      result.push(arr[idx]);
      arr.splice(idx, 1);
    }
    return result;
  }

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

  function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function fillStacks() {
  leftStack.innerHTML = '';
  rightStack.innerHTML = '';
  var num = getNumSquares();
  var images = lotteryImages.slice();
  shuffleArray(images);
  var leftImgs = images.slice(0, num);
  var rightImgs = images.slice(num, num * 2);
  for (var i = 0; i < num; i++) {
    if (leftImgs[i]) leftStack.appendChild(createFlairSquare(leftImgs[i]));
    if (rightImgs[i]) rightStack.appendChild(createFlairSquare(rightImgs[i]));
  }
}
  // Fill on load
  window.addEventListener('load', fillStacks);
})();
