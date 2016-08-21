// LICENSES http://www.apache.org/licenses/LICENSE-2.0
var DOC_ID = '<INSERT_SPREADSHEET_DOC_ID>';
var SHEET_NAME = 'Sheet1';
         
/**
 * Add a row of data to a sheet.
 * @param {Object} parameters passed from script.
 * @return {Object} result.
 */
function setData(parameters) {
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
   
  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById(DOC_ID);
    var sheet = doc.getSheetByName(SHEET_NAME);
     
    // we'll assume header is in row 1 but you can override with header_row the parameters
    var headRow = parameters.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers){
      if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else if (headers[i] == "Email"){ // special case if you include a 'email' column
        row.push(Session.getEffectiveUser().getEmail());
      } else { // else use header name to get data
        row.push(parameters[headers[i]]);
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return all the from the sheet data
    return getData();
  } catch(e){
    // if error return this
    return {"result": JSON.stringify(e)};
  } finally { //release lock
    lock.releaseLock();
  }
}
 
/**
 * Get rows of data from a sheet.
 * @return {Object} result.
 */
function getData() {
  // get our source data
  var doc = SpreadsheetApp.openById(DOC_ID);
  var sheet = doc.getSheetByName(SHEET_NAME);
  var numRows = sheet.getLastRow()-1;
  if (numRows > 20) { //optional to limit rows returned
    numRows = 20;
  }
  var data = sheet.getRange(2, 1, numRows, sheet.getLastColumn()).getValues();
  // get sheet headers to build object array
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  // simple replace space with underscore
  headers = headers.map(function(p) { return p.replace(/\s+/g, '_'); });
  var result = [];
  // loop through the rows and build object arrary
  // looping in reverse to get newest data first
  for (var r = data.length - 1; r >= 0; r--){
    var row = data[r];
    var record = {};
    for (var h in headers){
      var type = typeof row[h];
      // for this tutorial if the column name is Email obscure the result
      if (headers[h] == "Email"){
        row[h] = obscureEmail_(row[h]);
      }
      // Execution API can only return basic types (strings, arrays, objects, numbers and booleans)
      // As we are delaing with Google Sheet data we only need to detect dates
      if (row[h] instanceof Date){;
        row[h] = String(row[h]);
      }
      record[headers[h]] = row[h];
    }
    result.push(record);
  }
  return {"comments":result};
}
/**
 * Obscure emails to firstLetter...@domain.
 * @param {String} email to obscure
 * @return {String} obscured email.
 */
function obscureEmail_(email){
  return email.charAt(0)+'.....@'+email.replace(/.*@/, "");
}