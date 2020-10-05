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
  createTable(columnTitles, dataRows);
}

function getAllRows(fileContent) {
  return fileContent.split('\r\n');
}

function makeTableCellsFromRow(rowContents) {
  let tableHeadDataCells = '';
  for (let content of rowContents) {
    tableHeadDataCells = tableHeadDataCells + `<td>${content}</td>`;
  }
  return tableHeadDataCells;
}

function makeTableRowsHTML(dataRows) {
  let tableRowHTML = '';
  for (let row of dataRows) {
    tableRowHTML = tableRowHTML + `<tr>${makeTableCellsFromRow(row.split(','))}</tr>`;
  }

  return tableRowHTML;
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
        ${makeTableRowsHTML(dataRows)}
      </tbody>
    </table>
  `;
  const app = document.querySelector('#app');
  app.insertAdjacentHTML('beforeend', table);
}

module.exports = { readCSV };
