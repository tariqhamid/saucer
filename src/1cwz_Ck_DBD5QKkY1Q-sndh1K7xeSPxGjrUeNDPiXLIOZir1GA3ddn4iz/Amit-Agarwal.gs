//
// https://ctrlq.org/code/19871-get-post-requests-google-script
//


function doGet(e) {
/*

  // <script src="URL_OF_YOUR_SCRIPT?start=1325437200&end=1325439000&prefix=alert"></script>
  
  var events = CalendarApp.getEvents(
    new Date(Number(request.parameters.start) * 1000),
    new Date(Number(request.parameters.end) * 1000));
  var result = {
    available: events.length == 0
  };
  return ContentService.createTextOutput(
    request.parameters.prefix + '(' + JSON.stringify(result) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
*/

  
  if(typeof e !== 'undefined')
    return ContentService.createTextOutput(JSON.stringify(e.parameter))

}
 
function doPost(e) {
  
  if(typeof e !== 'undefined')
    return ContentService.createTextOutput(JSON.stringify(e.parameter));
  
}
 
function testPOST() {
  
  var url = ScriptApp.getService().getUrl();
  
  var payload =
      {
        "name" : "labnol",
        "blog" : "ctrlq",
        "type" : "post",
      };
  
  var options =
      {
        "method"  : "POST",
        "payload" : payload,   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
  
  var result = UrlFetchApp.fetch(url, options);
  
  if (result.getResponseCode() == 200) {
    
    var params = JSON.parse(result.getContentText());
    
    Logger.log(params.name);
    Logger.log(params.blog);
    
  }
  
}
 
function testGET() {
  
  var queryString = "?name=labnol&blog=ctrlq&type=get";
  
  var url = ScriptApp.getService().getUrl() + queryString;
  
  var options =
      {
        "method"  : "GET",   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
    
  var result = UrlFetchApp.fetch(url, options);
  
  if (result.getResponseCode() == 200) {
  
    Logger.log(result.getContentText());

    var params = JSON.parse(result.getContentText());
    
    Logger.log(params.name);
    Logger.log(params.blog);
    
  }  
}
 
