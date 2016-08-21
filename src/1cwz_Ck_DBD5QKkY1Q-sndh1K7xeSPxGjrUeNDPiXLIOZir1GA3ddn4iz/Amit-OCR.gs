//
// https://ctrlq.org/code/20082-google-docs-ocr
//

function doOCR() {
  
  var image = UrlFetchApp.fetch('http://img.labnol.org/logo.png').getBlob();
 
  var file = {
    title: 'OCR File',
    mimeType: 'image/png'
  };
  
  // OCR is supported for PDF and image formats
  
  
  // file = DriveApp.getRootFolder().createFile(file, image, {ocr: true})
  file = Drive.Files.insert(file, image, {ocr: true});  //  DriveApp.addFile(child)
  
  // Print the Google Document URL in the console
  Logger.log("File URL: %s", file.embedLink);
}
 



//
// https://ctrlq.org/code/20128-extract-text-from-image-ocr
//
 
/* Credit: https://gist.github.com/tagplus5 */
 
function xxdoGet(request) {
 
  var status;
 
  if (request.parameters.url !== undefined && request.parameters.url !== "") {
 
    try {
 
      // Fetch the image data from the web
      var imageBlob = UrlFetchApp.fetch(request.parameters.url).getBlob();
 
      var resource = {
        title: imageBlob.getName(),
        mimeType: imageBlob.getContentType()
      };
 
      // OCR on .jpg, .png, .gif, or .pdf uploads
      var options = {
        ocr: true
      };
 
      var docFile = Drive.Files.insert(resource, imageBlob, options);
 
      var doc = DocumentApp.openById(docFile.id);
 
      // Extract the text body of the Google Document
      var text = doc.getBody().getText().replace("\n", "");
 
      // Send the document to trash
      Drive.Files.remove(docFile.id);
 
      status = text;
 
    } catch (error) {
 
      status = "ERROR: " + error.toString();
 
    }
 
  } else {
 
    status = "ERROR: No image url specified in the HTTP request";
  }
 
  return ContentService.createTextOutput(status);
 
}


//
// https://ctrlq.org/code/20128-extract-text-from-image-ocr
// 

/* Credit: https://gist.github.com/tagplus5 */
 
function doGet2(request) {
 
  var status;
 
  if (request.parameters.url !== undefined && request.parameters.url !== "") {
 
    try {
 
      // Fetch the image data from the web
      var imageBlob = UrlFetchApp.fetch(request.parameters.url).getBlob();
 
      var resource = {
        title: imageBlob.getName(),
        mimeType: imageBlob.getContentType()
      };
 
      // OCR on .jpg, .png, .gif, or .pdf uploads
      var options = {
        ocr: true
      };
 
      var docFile = Drive.Files.insert(resource, imageBlob, options);
 
      var doc = DocumentApp.openById(docFile.id);
 
      // Extract the text body of the Google Document
      var text = doc.getBody().getText().replace("\n", "");
 
      // Send the document to trash
      Drive.Files.remove(docFile.id);
 
      status = text;
 
    } catch (error) {
 
      status = "ERROR: " + error.toString();
 
    }
 
  } else {
 
    status = "ERROR: No image url specified in the HTTP request";
  }
 
  return ContentService.createTextOutput(status);
 
}
 

 