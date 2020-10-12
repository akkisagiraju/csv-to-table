function readCSV(event) {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function (e) {
    const fileContent = e.target.result;
    parseCSV(fileContent);
  };
}

// change the split logic
// when ignore commas that are between single or double quotes

function parseCSV(fileContent) {
  const rows = getAllRows(fileContent);
  const columnTitles = rows[0].split(','); // row split logic
  const dataRows = rows.slice(1);
  createTable(columnTitles, dataRows);
}

function getAllRows(fileContent) {
  return fileContent.split('\r\n');
}

function makeTableCellsFromRow(rowContents) {
  // doing the same thing as the function below this but with <tr />
  let tableHeadDataCells = '';
  for (let content of rowContents) {
    tableHeadDataCells = tableHeadDataCells + `<td>${content}</td>`;
  }
  return tableHeadDataCells;
}

function makeTableRowsFromData(dataRows) {
  let tableRowHTML = '';
  for (let row of dataRows) {
    tableRowHTML = tableRowHTML + `<tr>${makeTableCellsFromRow(csvRowSplitter(row))}</tr>`; // row split logic - repeated as above
  }
  return tableRowHTML;
}

function csvRowSplitter(row) {
  let cellStart = 0;
  let cellEnd = 0;
  let cellsList = [];
  for (let i = 0; i < row.length; i++) {
    if (row[i] === ',') {
      cellStart = i + 1;
      cellEnd = i;
      console.log(i);
    }
  }
  return row.split(',')
}

function createTable(columnTitles, dataRows) {
  const table = `
    <table class="result-table">
      <thead>
        <tr>
          ${makeTableCellsFromRow(columnTitles)}
        </tr>
      </thead>
      <tbody>
        ${makeTableRowsFromData(dataRows)}
      </tbody>
    </table>
  `;
  const app = document.querySelector('#app');
  app.insertAdjacentHTML('beforeend', table);
}

module.exports = { readCSV };
