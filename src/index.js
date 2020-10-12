(function () {
  const { readCSV } = require('./csvReader');

  // select the app element
  const app = document.querySelector('#app');

  // create a file input element and append it to the app
  const fileUploader = document.createElement('input');
  fileUploader.setAttribute('type', 'file');
  app.appendChild(fileUploader);

  // listen to the file input changes and run a function to read the file uploaded
  fileUploader.addEventListener('change', readCSV);
})();
