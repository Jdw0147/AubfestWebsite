import { lotteryImages, fetchLotteryImages } from './lotteryImages.js';

const grid = document.getElementById('lottery-grid');
const addImageModal = document.getElementById('add-image-modal');
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const imageListContainer = document.getElementById('image-list-container');
const submitImagesBtn = document.getElementById('submit-images-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

let selectedFiles = [];


// --- Edit Modal Elements ---
let editModalOverlay, editModalBox, editModalImg, editModalFilename, editModalPhotog, editModalSave, editModalCancel;
function ensureEditModal() {
  if (editModalOverlay) return;
  editModalOverlay = document.createElement('div');
  editModalOverlay.className = 'edit-modal-overlay';
  editModalOverlay.style.display = 'none';
  editModalOverlay.innerHTML = `
    <div class="edit-modal-box">
      <img class="edit-modal-img" src="" alt="" />
      <div class="edit-modal-filename"></div>
      <label for="edit-modal-photog">Photographer</label>
      <input type="text" id="edit-modal-photog" class="edit-modal-photog" />
      <div class="edit-modal-actions">
        <button class="save-btn">Save</button>
        <button class="cancel-btn">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(editModalOverlay);
  editModalBox = editModalOverlay.querySelector('.edit-modal-box');
  editModalImg = editModalOverlay.querySelector('.edit-modal-img');
  editModalFilename = editModalOverlay.querySelector('.edit-modal-filename');
  editModalPhotog = editModalOverlay.querySelector('.edit-modal-photog');
  editModalSave = editModalOverlay.querySelector('.save-btn');
  editModalCancel = editModalOverlay.querySelector('.cancel-btn');
}

function openEditModal(imgObj) {
  ensureEditModal();
  editModalImg.src = `/images/lottery/${imgObj.filename}`;
  editModalImg.alt = imgObj.filename;
  editModalFilename.textContent = imgObj.filename;
  editModalPhotog.value = imgObj.photographer || '';
  editModalOverlay.style.display = 'flex';
  editModalSave.disabled = false;
  editModalSave.textContent = 'Save';

  function close() {
    editModalOverlay.style.display = 'none';
    editModalSave.onclick = null;
    editModalCancel.onclick = null;
  }
  editModalCancel.onclick = close;
  editModalOverlay.onclick = (e) => { if (e.target === editModalOverlay) close(); };
  editModalSave.onclick = async () => {
    editModalSave.disabled = true;
    editModalSave.textContent = 'Saving...';
    try {
      const res = await fetch('/admin/lottery/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ filename: imgObj.filename, photographer: editModalPhotog.value })
      });
      const data = await res.json();
      if (data.success) {
        close();
        renderGrid();
      } else {
        alert('Edit failed: ' + (data.error || 'Unknown error'));
        editModalSave.disabled = false;
        editModalSave.textContent = 'Save';
      }
    } catch (err) {
      alert('Edit error.');
      editModalSave.disabled = false;
      editModalSave.textContent = 'Save';
    }
  };
}

async function renderGrid() {
  await fetchLotteryImages();
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
    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.title = 'Edit photographer';
    editBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.3 9.3-2.83.71.71-2.83 9.3-9.3zM3 17h14v2H3v-2z" fill="currentColor"/></svg>';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      openEditModal(imgObj);
    };
    card.appendChild(editBtn);
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&minus;';
    delBtn.title = 'Delete image';
    delBtn.onclick = async (e) => {
      e.stopPropagation();
      if (confirm(`Delete ${imgObj.filename} from lottery?`)) {
        delBtn.disabled = true;
        delBtn.textContent = '...';
        try {
          const res = await fetch('/admin/lottery/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ filename: imgObj.filename })
          });
          const data = await res.json();
          if (data.success) {
            renderGrid();
          } else {
            alert('Delete failed: ' + (data.error || 'Unknown error'));
            delBtn.disabled = false;
            delBtn.textContent = '&minus;';
          }
        } catch (err) {
          alert('Delete error.');
          delBtn.disabled = false;
          delBtn.textContent = '&minus;';
        }
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
submitImagesBtn && submitImagesBtn.addEventListener('click', async () => {
  if (!selectedFiles.length) return;
  submitImagesBtn.disabled = true;
  submitImagesBtn.textContent = 'Uploading...';

  // Prepare form data
  const formData = new FormData();
  selectedFiles.forEach((file, idx) => {
    formData.append('images', file);
    formData.append('photographers', file.photographer || '');
  });

  try {
    const res = await fetch('/admin/lottery/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    const data = await res.json();
    if (data.success) {
      alert('Images uploaded!');
      addImageModal.style.display = 'none';
      selectedFiles = [];
      imageListContainer.innerHTML = '';
      submitImagesBtn.style.display = 'none';
      renderGrid();
    } else {
      alert('Upload failed.');
    }
  } catch (err) {
    alert('Upload error.');
  }
  submitImagesBtn.disabled = false;
  submitImagesBtn.textContent = 'Add to Library';
});
