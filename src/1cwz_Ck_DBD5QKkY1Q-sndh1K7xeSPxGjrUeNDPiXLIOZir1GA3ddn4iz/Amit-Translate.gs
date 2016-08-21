//
// https://ctrlq.org/code/19899-google-translate-languages
//


function onEdit(e) {
  
  try {
    
    var cell = e.range.getA1Notation();
    
    if ( e.value && (cell === "A6" || cell === "E6") ) {
      
      var sheet = e.source.getActiveSheet();
      var data = sheet.getRange("C4:G5").getValues();
      
      var langA  = getLanguage(data[1][0]);
      var langB  = getLanguage(data[1][4]);
      
      if (langA === "" || langB === "") {
        Browser.msgBox("Please select the languages of participants from the dropdowns in cell C5 and G5");
        return;
      }
      
      if (langA === langB) {
        Browser.msgBox("Please select a different language for each chat participant");
        return;
      }
      
      var userA = data[0][0];
      var userB = data[0][4];
      
      var colA, colB;
      
      if (cell === "A6") {
        colA = userA + ": " + e.value;
        colB = userA + ": " + LanguageApp.translate(e.value, langA, langB);
      } else {
        colA = userB + ": " + LanguageApp.translate(e.value, langB, langA);
        colB = userB + ": " + e.value;
      }
      
      sheet.appendRow([colA, "", "", "", colB]);
      
      e.range.clearContent();
      
    }
  } catch (error) {
    Browser.msg(error.toString());
  }
}

//
// https://ctrlq.org/code/19909-google-translate-api
//



/* Written by Amit Agarwal */
/* web: ctrlq.org          */
 
function xdoGet(e) {
 
  var sourceText = ''
  if (e.parameter.q){
    sourceText = e.parameter.q;
  }
  
  var sourceLang = 'auto';
  if (e.parameter.source){
    sourceLang = e.parameter.source;
  }
 
  var targetLang = 'ja';
  if (e.parameter.target){
    targetLang = e.parameter.target;
  }
  
  /* Option 1 */
  
  var translatedText = LanguageApp.translate(sourceText, sourceLang, targetLang)
  
  /* Option 2 */  
  
  var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
  
  var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  
  translatedText = result[0][0][0];
  
  var json = {
    'sourceText' : sourceText,
    'translatedText' : translatedText
  };
  
  // set JSONP callback
  var callback = 'callback';
  if(e.parameter.callback){
    callback = e.parameter.callback
  }
  
  // return JSONP
  return ContentService
           .createTextOutput(callback + '(' + JSON.stringify(json) + ')')
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

