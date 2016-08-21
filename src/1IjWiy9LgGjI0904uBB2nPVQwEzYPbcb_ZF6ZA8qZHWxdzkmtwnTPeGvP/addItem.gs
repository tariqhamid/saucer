

// How can I add multiple inputs from an HTML UI to a Google Spreadsheet?
// http://stackoverflow.com/questions/34325826/how-can-i-add-multiple-inputs-from-an-html-ui-to-a-google-spreadsheet


function openInputDialog() {
  var html = HtmlService.createHtmlOutputFromFile('Index')
  return HtmlService.createHtmlOutputFromFile('Index')
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi()
  .showModalDialog(html, 'Add Item');
}

function itemAdd() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  sheet.appendRow(["  ", 'category', 'item', 'manupub', 'details', 'quantity']);
}