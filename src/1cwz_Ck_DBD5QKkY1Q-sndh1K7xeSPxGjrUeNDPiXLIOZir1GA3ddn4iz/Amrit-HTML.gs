//
// https://ctrlq.org/code/19348-htmlservice-google-apps-script
//

// Code.js
function xxxxxxdoGet() {
  var html = HtmlService.createTemplateFromFile("textbrowser").evaluate();
  html.setTitle("Text Browser - Digital Inspiration")
  return html;  
}
 
function getHTML(url) {
  try {
    var response = UrlFetchApp.fetch(url);
  } catch (e) {
    return "Sorry but Google couldn't fetch the requested web page. "
      + "Please try another URL!<br />" 
      + "<small>" + e.toString() + "</small>";
  }
  return response.getContentText();
}
 

