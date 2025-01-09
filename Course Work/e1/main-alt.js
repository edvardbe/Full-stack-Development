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
  let image = window.images[id - 1];
  /* if (!image) {
    console.error(`No image data found for ID: ${id}`);
    return;
  } */

  let imageName = image.name;
  let artistName = image.artist;
  let year = image.year;
  let text = `${imageName}, ${artistName}, ${year}`;
  document.getElementById(id).innerText = text;
}

// Expose functions globally
window.count = count;
window.displayInfo = displayInfo;
