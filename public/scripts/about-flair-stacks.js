// Dynamically fill the left and right flair stacks with squares to match the main content height
(function() {
  var leftStack = document.getElementById('flair-stack-left');
  var rightStack = document.getElementById('flair-stack-right');
  var mainCol = document.querySelector('.about-main-column');
  if (!leftStack || !rightStack || !mainCol) return;

  // List of available images (update as you add images)
  var lotteryImages = [
    'ellie-1.JPG',
    'ellie-2.JPG',
    'ellie-3.JPG',
    'ellie-4.JPG',
    'ellie-5.JPG',
    'ellie-6.JPG',
    'ellie-7.JPG',
    'hannah-1.JPG',
    'hannah-2.JPG',
    'hannah-3.JPG',
    'hannah-4.JPG',
    'hannah-5.JPG',
    'hannah-6.JPG',
    'hannah-7.JPG',
    'hannah-8.JPG',
    'hannah-9.JPG',
    'hannah-10.JPG',
    'hannah-11.JPG',
    'hannah-12.JPG',
    'hannah-13.JPG',
    'hannah-14.JPG',
    'hannah-15.JPG',
    'hannah-16.JPG',
    'regis-1.JPG',
    'regis-2.JPG',
    'regis-3.JPG',
    'regis-4.JPG',
    'regis-5.JPG',
    'regis-6.JPG',
    'regis-7.JPG',
    'warren-1.jpg',
    'warren-2.jpg',
    'warren-3.jpg',
    'warren-4.jpg',
    'warren-5.jpg',
    'warren-6.jpg',
    'warren-7.jpg',
    'caroline-1.jpg',
    'carrington-1.jpg',
    'carrington-2.jpg',
    'carrington-3.jpg',
    'carrington-4.jpg',
    'carrington-5.jpg',
    'carrington-6.jpg',
    'carrington-7.jpg',
    'carrington-8.jpg',
    'carrington-9.jpg',
    'carrington-10.jpg',
    'carrington-11.jpg',
    'carrington-12.jpg',
    'carrington-13.jpg',
    'carrington-14.jpg',
    'nordista-1.JPG',
    'nordista-2.JPG',
    'nordista-3.JPG',
    'nordista-4.JPG',
    'nordista-5.JPG',
    'nordista-6.JPG',
    'nordista-7.JPG',
    'nordista-8.JPG',
    'piper-1.jpeg',
    'piper-2.jpeg',
    'piper-3.jpeg',
    'piper-4.jpeg',
    'piper-5.jpeg',
    'trey-1.jpg',
    'trey-2.jpg',
    'trey-3.jpg',
    'trey-4.jpg',
    'trey-5.jpg',
    'trey-6.jpg',
    'justin-1.jpg',
    'justin-2.jpg',
    'justin-3.jpg',

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
