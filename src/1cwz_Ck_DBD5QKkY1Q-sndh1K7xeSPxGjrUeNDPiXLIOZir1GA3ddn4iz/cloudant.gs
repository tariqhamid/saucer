
    function testCloudant()
    {

      // var response = UrlFetchApp.fetch("http://www.google.com/");
      // Logger.log(response.getContentText());
      
      // var data = [{team: 'pakistan'}]
      
      var data =    { "docs":[{"season":"summer","weather":"usually warm and sunny"},
                              {"season":"winter","weather":"usually cold and snowy"},
                              {"season":"spring","weather":"cool with rain and sun"},
                              {"season":"autumn","weather":"breezes"}] }
      
      var data2 =    { "docs": [] }
      
      //var ret = saveToCouchDB(data)
      
      var ret = syncWithDB(data)
  
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
  try {
      dataResponse = UrlFetchApp.fetch(url, params);
  } catch(e){
     Logger.log(e)
  }

  Logger.log('Finished')
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

