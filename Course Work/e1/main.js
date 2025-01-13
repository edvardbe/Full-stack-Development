// Fetch the JSON data and store it globally
fetch('./resources/image-info.json')
  .then(response => response.json())
  .then(data => {
    // Store the images array globally
    window.images = data.images;

  });

// Function to increment and display count
function count() {
  let countElement = document.getElementById("count");
  let currentText = countElement.textContent || countElement.innerText;
  let currentCount = parseInt(currentText) || 0;
  countElement.textContent = currentCount + 1;
}

function hideShowSmiley() {
  const smiley = document.getElementById('smiley');
  if (smiley.style.display === 'none') {
    smiley.style.display = 'block';
  } else {
    smiley.style.display = 'none';
  }
}

// Function to display image information
function displayInfo(id) {
  window.image = window.images[id - 1];
  if (!image) {
    console.error(`No image data found for ID: ${id}`);
    return;
  }

  // Here i decided to use a different template than list, in contrast to what the task suggested
  let text = `
        <p class="title">${image.title}</p>
        <p class="artist">${image.artist}p</p>
        <p class="year">${image.year}</p>
    `;
  document.getElementById(id).innerHTML = text;
  const domColor = image.domColor;
  console.log(domColor);
  if(hexToRGBAverage(domColor) > 127){
    document.body.style.color = 'black';
  }
  else{
    document.body.style.color = 'white';
  }
  
  document.body.style.backgroundColor = domColor;
}

function hexToRGBAverage(hex){
  // Remove the
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const avg = (r + g + b) / 3;
  return avg;
}
  

// Expose functions globally
window.hideShowSmiley = hideShowSmiley;
window.count = count;
window.displayInfo = displayInfo;


