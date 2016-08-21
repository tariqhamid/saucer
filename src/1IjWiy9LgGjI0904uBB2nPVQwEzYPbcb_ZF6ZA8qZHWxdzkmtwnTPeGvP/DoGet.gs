//
// https://script.google.com/macros/s/AKfycbyBgmk-zyu0xlzOTdpSjLPTniQcXFjGeSbKivXBj8VBPdqLlE4/exec
//

function doGet(e)
{
  
  // return ContentService.createTextOutput('Hello, world!')
  
  //var html = HtmlService.createHtmlOutputFromFile('SelfTest').getContent()
  //return ContentService.createTextOutput(html)

  // return HtmlService.createHtmlOutputFromFile('SelfTest')
  
  
  //var template = HtmlService.createTemplateFromFile('SelfTest')
  //return template.evaluate()
  
  //return HtmlService.createTemplateFromFile('Top').evaluate()
 
 
  var html = HtmlService.createTemplateFromFile("SelfTest").evaluate()
  html.setTitle("Webpage Title")
  return html
  
  
  // https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/ideService


}