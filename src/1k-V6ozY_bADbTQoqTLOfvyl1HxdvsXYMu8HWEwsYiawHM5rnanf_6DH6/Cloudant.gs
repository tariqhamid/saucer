function testCloudant()
{
  var data =    { "docs":[{"season":"summer","weather":"usually warm and sunny"},
                          {"season":"winter","weather":"usually cold and snowy"},
                          {"season":"spring","weather":"cool with rain and sun"},
                          {"season":"autumn","weather":"breezes"}] }
  
  var data2 =    { "docs": [] }
  
  var dataResponse = syncWithDB(data)
  //Logger.log(dataResponse.getAllHeaders().toSource());
  //Logger.log(dataResponse.getContentText());
  //data = JSON.parse(dataResponse.getContentText());
  
  var headers = processHeaders(dataResponse)
  jsonToSheet(headers)
  
  //var activSpSh = SpreadsheetApp.openById('1IpRz7suYv63ioIJ7kpVVjS_L_Ur9_8dFDgaHQXhP7og')
  // Feuille répertoires créés
  //var foldersSh = activSpSh.getActiveSheet();
  //SpreadsheetApp.open('embedded function')
  
  var out = JSON.parse(dataResponse.getContentText())
  jsonToSheet(out)


  Logger.log('Finished')
}

function jsonToSheet(out)
{
  var activSpSh = SpreadsheetApp.getActiveSpreadsheet();
  var doc = activSpSh.getSheetByName('Prototype')
  var lastRow = doc.getLastRow() + 1;

  var cell = doc.getRange('a' + lastRow);
  var index = 0;
  for (var i in out) {
    var value = out[i];
    cell.offset(index, 0).setValue(i);
    cell.offset(index, 1).setValue(value);
    index++;
  }
}

//Send Google Apps Script data to a Couch DB database
function syncWithDB(data){
  var username  = PropertiesService.getScriptProperties().getProperty('user');
  var password  = PropertiesService.getScriptProperties().getProperty('pass');
  var url       = 'https://' + username + '.cloudant.com/fred/_bulk_docs'
  var params = {
    "method"  : "post", 
    "contentType":"application/json",
    "validateHttpsCertificates" :false,
    "payload" : JSON.stringify(data),
    "headers":{ 
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + password)
    },
    muteHttpExceptions:false
  }
  var dataResponse;
  //var data;
  try {
      dataResponse = UrlFetchApp.fetch(url, params);
  } catch(e){
     Logger.log(e)
  }
  
  return dataResponse
}

function processHeaders(response)
{
  var cookies = response.getAllHeaders()["Set-Cookie"];
  for (iCookie in cookies) {
     Logger.log(cookies[iCookie]);
  }


  var AllHeaders =  response.getAllHeaders();
  for (var prop in AllHeaders) {
  
    Logger.log(prop + ' : ' + AllHeaders[prop])
  
    if (prop.toLowerCase() == "set-cookie") {
      // if there's only one cookie, convert it into an array:
      var myArray = [];
      if ( Array.isArray(AllHeaders[prop]) ) {
        myArray=AllHeaders[prop];
      } else {
        myArray[0]=AllHeaders[prop];
      }
      // now process the cookies
      myArray.forEach(function(cookie) {  
         Logger.log(cookie);
      });
      break;
    }
  }
  
  return AllHeaders
}


// https: //github.com/kelvinn/qs-google-apps-script-couchdb/blob/master/Databases.gs
function saveToCouchDB(data) {
  var COUCHDB_USERNAME = PropertiesService.getScriptProperties().getProperty('user');
  var COUCHDB_PASSWORD = PropertiesService.getScriptProperties().getProperty('pass');
  var COUCHDB_DATABASE = "fred";
  var url = 'https://' + COUCHDB_USERNAME + '.cloudant.com/' + COUCHDB_DATABASE + '/_bulk_docs?successStatus=201';
  var params = {
    "method": "post",
    "contentType": "application/json",
    //"validateHttpsCertificates": false,
    //"docs": JSON.stringify(data),
    
    "docs":[
      {"season":"summer","weather":"usually warm and sunny"},
      {"season":"winter","weather":"usually cold and snowy"},
      {"season":"spring","weather":"cool with rain and sun"},
      {"season":"autumn","weather":"breezes"}],
    
    "headers": {
      "Authorization": "Basic " + Utilities.base64Encode(COUCHDB_USERNAME + ":" + COUCHDB_PASSWORD)
    }
  }
  params.muteHttpExceptions = false
  return UrlFetchApp.fetch(url, params);
}

