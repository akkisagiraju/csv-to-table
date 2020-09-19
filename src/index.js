const { readCSV } = require('./csvReader');

// select the app element
const app = document.querySelector('#app');

// create an file input element
const fileUploader = document.createElement('input');
fileUploader.setAttribute('type', 'file');

// append the file input to the app element
app.appendChild(fileUploader);

// listen to the file input changes and run a function to read the file uploaded
fileUploader.addEventListener('change', readCSV);
