import { lotteryImages } from './lotteryImages.js';

const grid = document.getElementById('lottery-grid');

function renderGrid() {
  grid.innerHTML = '';
  // Add card
  const addCard = document.createElement('div');
  addCard.className = 'lottery-card add-card';
  addCard.innerHTML = '<span>+</span><span class="add-label">Add image</span>';
  addCard.title = 'Add image';
  addCard.onclick = () => alert('Add image functionality coming soon!');
  grid.appendChild(addCard);

  // Image cards
  lotteryImages.forEach((img, idx) => {
    const card = document.createElement('div');
    card.className = 'lottery-card';
    const image = document.createElement('img');
    image.src = `/images/lottery/${img}`;
    image.alt = img;
    card.appendChild(image);
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&minus;';
    delBtn.title = 'Delete image';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Delete ${img} from lottery?`)) {
        alert('Delete functionality coming soon!');
      }
    };
    card.appendChild(delBtn);
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderGrid);
