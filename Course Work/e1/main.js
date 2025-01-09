// Fetch the JSON data and store it globally
fetch('./resources/image-info.json')
  .then(response => response.json())
  .then(data => {
    // Store the images array globally
    window.images = data.images;

    /* // Initialize event listeners for image containers after data is loaded
    document.querySelectorAll('.container').forEach((container, index) => {
      container.addEventListener('mouseover', () => displayInfo(index + 1));
    }); */
  });

// Function to increment and display count
function count() {
  let countElement = document.getElementById("count");
  let currentText = countElement.textContent || countElement.innerText;
  let currentCount = parseInt(currentText) || 0;
  countElement.textContent = currentCount + 1;
}

// Function to display image information
function displayInfo(id) {
  window.image = window.images[id - 1];
  if (!image) {
    console.error(`No image data found for ID: ${id}`);
    return;
  }

  let text = `
        <p class="title">${image.title}</p>
        <p class="artist">${image.artist}p</p>
        <p class="year">${image.year}</p>
    `;
  console.log(text);
  document.getElementById(id).innerHTML = text;
}


  
function selectImage(id){
  window.image = window.images[id - 1];
  
  // Set image source
  const photoElement = document.getElementById('photo');
  photoElement.src = `resources/${image.src}`;
  
  // Set photo info
  document.getElementById('photo-title').textContent = image.name;
  document.getElementById('photo-artist').textContent = image.artist;
  document.getElementById('photo-year').textContent = image.year;
  
  // Apply the dominant color
  const dominantColor = image.dominantColor;
  const photoInfo = document.getElementById('photo-info');
  photoInfo.style.backgroundColor = dominantColor;
}
  

// Expose functions globally
window.count = count;
window.displayInfo = displayInfo;


