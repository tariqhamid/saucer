// https://gist.github.com/greenido/27106154f257b9e454ba


/**
* YouTube Dashboard Stats Example
* Fetch stats on videos and channel by using YT APIs.
*  1. It using the ATOM feeds - v1.
*  2. For the channel we are using the v3 version of the API.
*
* @Author: Ido Green | @greenido | +Greenido
* @Date: Aug 2014
*
* @see: 
* https://developers.google.com/youtube/analytics/v1/code_samples/apps-script
* https://developers.google.com/youtube/analytics/sample-requests#channel-time-based-reports
* https://developers.google.com/apis-explorer/#p/youtubeAnalytics/v1/youtubeAnalytics.reports.query
*/

//
// A Helper function to extract the ID of our video
// It works both on version of links:
// 1. https://www.youtube.com/watch?v=BuHEhmp47VE
// 2. http://youtu.be/BuHEhmp47VE
//
function extractVideoID() {
  var curSheet = SpreadsheetApp.getActiveSheet();
  var ytLinks = curSheet.getRange("D:D");
  var totalRows = ytLinks.getNumRows();
  var ytVal = ytLinks.getValues();
  // let's run on the rows
  for (var i = 1; i <= totalRows - 1; i++) {
    var curLink = ytVal[i][0];
    if (curLink == "") {
      break;
    }
    
    var videoID = "";
    var inx1 = curLink.indexOf('watch?v=') + 8;
    if (inx1 == 7) {
      // check if it's the short format: http://youtu.be/75EuHl6CSTo
      if (curLink != "" && curLink.indexOf("youtu.be") > 0) {
        videoID = curLink.substr(16, curLink.length);  
      }
    }
    else {
      // we have the link in this format: https://www.youtube.com/watch?v=YIgSucMNFAo
      var inx2 = curLink.indexOf("&", inx1);
      
      if (inx2 > inx1) {
        videoID = curLink.substr(inx1, inx2-inx1);
      } else {
        videoID = curLink.substr(inx1, curLink.length);
      }
    }
    
    curSheet.getRange("E" + (i+1)).setValue(videoID);
  }
  var htmlMsg = HtmlService
  .createHtmlOutput('<h3>Done - Please check the IDs on Column D:D</h3>').setTitle('YT Dashboard Example').setWidth(450).setHeight(300);
  SpreadsheetApp.getActiveSpreadsheet().show(htmlMsg);
}

//
// Run on all the rows and according to the video ID fetch the feed
//
function fetchAllData() {
  var start = new Date().getTime();
  
  var curSheet = SpreadsheetApp.getActiveSheet();
  var ytIds = curSheet.getRange("E:E");
  var totalRows = ytIds.getNumRows();
  var ytVal = ytIds.getValues();
  var errMsg = "<h4>Errors:</h4> <ul>";
  // let's run on the rows after the header row
  for (var i = 1; i <= totalRows - 1; i++) {
    // e.g. for a call: https://gdata.youtube.com/feeds/api/videos/YIgSucMNFAo?v=2&prettyprint=true
    if (ytVal[i] == "") {
      Logger.log("We stopped at row: " + (i+1));
      break;
    }
    var link = "https://gdata.youtube.com/feeds/api/videos/" + ytVal[i] + "?v=2&prettyprint=true";
    try {
      fetchYTdata(link, i+1);
    }
    catch (err) {
      errMsg += "<li>Line: " + i + " we could not fetch data for ID: " + ytVal[i] + "</li>";
      Logger.log("*** ERR: We have issue with " + ytVal[i] + " On line: " + i);
    }
  }
  if (errMsg.length < 24) {
    // we do not have any errors at this run
    errMsg += "<li> All good for now </li>";
  }
  var end = new Date().getTime();
  var execTime = (end - start) / 1000;
  var htmlApp = HtmlService
  .createHtmlOutput('<h2>Done updating!</h2><p>It took us: '+ execTime + 'sec. to update: ' +
                    (i+1) + ' videos</p>' + errMsg).setTitle('YT Stats').setWidth(450).setHeight(450);
   SpreadsheetApp.getActiveSpreadsheet().show(htmlApp);
}


//
// Read YT stats data on our videos and fill the sheet with the data
//
function fetchYTdata(url, curRow) {
   //var url = 'https://gdata.youtube.com/feeds/api/videos/Eb7rzMxHyOk?v=2&prettyprint=true';
   var rawData = UrlFetchApp.fetch(url).getContentText();
   //Logger.log(rawData);
                           
  // published <published>2014-05-09T06:22:52.000Z</published>
   var inx1 = rawData.indexOf('published>') + 10;
   var inx2 = rawData.indexOf("T", inx1);
   var publishedDate = rawData.substr(inx1, inx2-inx1);
  
   // viewCount='16592'
   var inx1 = rawData.indexOf('viewCount') + 11;
   var inx2 = rawData.indexOf("'/>", inx1);
   var totalViews = rawData.substr(inx1, inx2-inx1);
  
   // <yt:duration seconds='100'/>
   var inx1 = rawData.indexOf('duration seconds') + 18;
   var inx2 = rawData.indexOf("'/>", inx1);
   var durationSec = rawData.substr(inx1, inx2-inx1);
  
   Logger.log(curRow + ") TotalViews: " + totalViews + " durationSec: " + durationSec);
   
  // update the sheet
  var ss = SpreadsheetApp.getActiveSheet();
  ss.getRange("C" + curRow).setValue(publishedDate);
  ss.getRange("G" + curRow).setValue(totalViews);
  ss.getRange("H" + curRow).setValue(durationSec);
  
 }
 
//
// Our custom menu 
//
function onOpenYT() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{ name : "Update Stats", functionName : "fetchAllData"},
                 { name : "Extract Video IDs", functionName : "extractVideoID"}
                ];
  spreadsheet.addMenu("YT Dashboard", entries);
};