import { lotteryImages } from './lotteryImages.js';

const grid = document.getElementById('lottery-grid');
const addImageModal = document.getElementById('add-image-modal');
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const imageListContainer = document.getElementById('image-list-container');
const submitImagesBtn = document.getElementById('submit-images-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

let selectedFiles = [];

function renderGrid() {
  grid.innerHTML = '';
  // Add card
  const addCard = document.createElement('div');
  addCard.className = 'lottery-card add-card';
  addCard.innerHTML = '<span>+</span><span class="add-label">Add image</span>';
  addCard.title = 'Add image';
  addCard.onclick = () => {
    selectedFiles = [];
    imageListContainer.innerHTML = '';
    submitImagesBtn.style.display = 'none';
    addImageModal.style.display = 'flex';
  };
  grid.appendChild(addCard);

  // Image cards
  lotteryImages.forEach((imgObj, idx) => {
    const card = document.createElement('div');
    card.className = 'lottery-card';
    const image = document.createElement('img');
    image.src = `/images/lottery/${imgObj.filename}`;
    image.alt = imgObj.filename;
    card.appendChild(image);
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&minus;';
    delBtn.title = 'Delete image';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Delete ${imgObj.filename} from lottery?`)) {
        alert('Delete functionality coming soon!');
      }
    };
    card.appendChild(delBtn);
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderGrid);

// Modal logic
if (dropArea && fileInput && imageListContainer && submitImagesBtn && closeModalBtn) {
  // Open file dialog on drop area click
  dropArea.addEventListener('click', () => fileInput.click());

  // Drag & drop
  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.background = '#e3e3e3';
  });
  dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.style.background = '#f7f7f7';
  });
  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.background = '#f7f7f7';
    handleFiles(e.dataTransfer.files);
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  // Close modal
  closeModalBtn.addEventListener('click', () => {
    addImageModal.style.display = 'none';
  });
}

function handleFiles(fileList) {
  selectedFiles = Array.from(fileList).map(f => Object.assign(f, { photographer: '' }));
  imageListContainer.innerHTML = '';
  if (selectedFiles.length > 0) {
    submitImagesBtn.style.display = 'block';
  } else {
    submitImagesBtn.style.display = 'none';
  }
  selectedFiles.forEach((file, idx) => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '1.2rem';
    row.style.background = '#f7f7f7';
    row.style.borderRadius = '10px';
    row.style.marginBottom = '1rem';
    row.style.padding = '0.7rem 1rem';

    // Image preview
    const img = document.createElement('img');
    img.style.width = '64px';
    img.style.height = '64px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    img.src = URL.createObjectURL(file);
    row.appendChild(img);

    // Filename
    const fname = document.createElement('span');
    fname.textContent = file.name;
    fname.style.flex = '1';
    fname.style.fontWeight = '600';
    fname.style.color = '#392F5A';
    row.appendChild(fname);

    // Photographer field
    const photogInput = document.createElement('input');
    photogInput.type = 'text';
    photogInput.placeholder = 'Photographer';
    photogInput.style.fontSize = '1rem';
    photogInput.style.padding = '0.4em 0.7em';
    photogInput.style.borderRadius = '6px';
    photogInput.style.border = '1.5px solid #392F5A';
    photogInput.style.minWidth = '120px';
    photogInput.style.marginLeft = '0.5rem';
    row.appendChild(photogInput);

    // Store photographer value on input
    photogInput.addEventListener('input', (e) => {
      selectedFiles[idx].photographer = e.target.value;
    });

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.title = 'Remove';
    removeBtn.style.marginLeft = '0.7rem';
    removeBtn.style.background = '#AE1C33';
    removeBtn.style.color = '#fff';
    removeBtn.style.border = 'none';
    removeBtn.style.borderRadius = '50%';
    removeBtn.style.width = '32px';
    removeBtn.style.height = '32px';
    removeBtn.style.fontSize = '1.2rem';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.display = 'flex';
    removeBtn.style.alignItems = 'center';
    removeBtn.style.justifyContent = 'center';
    removeBtn.addEventListener('click', () => {
      selectedFiles.splice(idx, 1);
      handleFiles(selectedFiles);
    });
    row.appendChild(removeBtn);

    imageListContainer.appendChild(row);
  });
}

// (Future) Submit handler for uploading images
submitImagesBtn && submitImagesBtn.addEventListener('click', () => {
  // For now, just close modal and clear
  addImageModal.style.display = 'none';
  selectedFiles = [];
  imageListContainer.innerHTML = '';
  submitImagesBtn.style.display = 'none';
  alert('Image upload functionality coming soon!');
});
