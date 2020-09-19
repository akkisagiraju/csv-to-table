function readCSV(event) {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function (e) {
    const fileContent = e.target.result;
    parseCSV(fileContent);
  };
}

function parseCSV(fileContent) {
  const rows = getAllRows(fileContent);
  const columnTitles = rows[0].split(',');
  const dataRows = rows.slice(1);
  console.log(dataRows);
  createTable(columnTitles);
}

function getAllRows(fileContent) {
  return fileContent.split('\r\n');
}

function makeTableColumnNamesHTML(columnTitles) {
  let tableDataCells = '';
  for (let column of columnTitles) {
    tableDataCells = tableDataCells + `<td>${column}</td>`;
  }
  return tableDataCells;
}

function makeTableRowsHTML(dataRows) {}

function createTable(columnTitles) {
  const table = `
    <table class="result-table">
      <thead>
        <tr>
        ${makeTableColumnNamesHTML(columnTitles)}
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  `;
  const app = document.querySelector('#app');
  app.insertAdjacentHTML('beforeend', table);
}

module.exports = { readCSV };
