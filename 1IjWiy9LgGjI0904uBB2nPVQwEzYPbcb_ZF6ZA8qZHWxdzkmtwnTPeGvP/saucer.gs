/** This is the Apps Script method these API examples will be calling.
 *
 *  It requires the following scope list, which must be used when authorizing
 *  the API:
 *    https://www.googleapis.com/auth/spreadsheets
 */

/**
 * Return a list of sheet names in the Spreadsheet with the given ID.
 * @param {String} a Spreadsheet ID.
 * @return {Array} A list of sheet names.
 */
function getSheetNames(sheetId,data) {
  var ss = SpreadsheetApp.openById(sheetId);
  var sheets = ss.getSheets();
  return sheets.map(function(sheet) {
        return [sheet.getName(), JSON.stringify(data)]
  });
}

function getSource(fileNames) {

    // fileNames = ["Code.gs","WriteToFirebase.html","TargetScript.gs"]
    listCode(fileNames)

    return fileNames.map( function(fileName) {
        var f = fileName.split('.')
        var prefix = f[0]    
        var suffix = f[1]
        if (suffix == 'gs')
        {
           return ScriptApp.getResource(prefix).getDataAsString()
        } else if (suffix == 'html')
        {
           var html = HtmlService.createTemplateFromFile(fileName).getRawContent()  // .evaluate()
           return html
        }
      }
     )

}

function getSourceStub(data)
{
    //return 'Hello Nika !!!'
    return getSource(data.fileNames)
}


// ["LinkedIn.gs","code.gs","Service.gs","Facebook.gs","Twitter.gs","Twit-CS.gs","Google.gs","FB2.gs","BetterLogger.gs","Cache.gs","utils.gs","DriveAccess.gs","utils2.gs","addItem.gs","Index.html","SelfTest.html","Picker.html","code2.gs","DoGet.gs","Top.html","SelfTest0.html","saucer.gs"]
function testListCode()
{
    var fileNames = ["LinkedIn.gs","code.gs","Service.gs","Facebook.gs","Twitter.gs","Twit-CS.gs","Google.gs","FB2.gs","BetterLogger.gs","Cache.gs","utils.gs","DriveAccess.gs","utils2.gs","addItem.gs","Index.html","SelfTest.html","Picker.html","code2.gs","DoGet.gs","Top.html","SelfTest0.html","saucer.gs"]
    var result =  getSource(fileNames)
}


function listCode(fileNames)
{
    var id = ScriptApp.getScriptId()
    //var url = ScriptApp.getService().getUrl()
    var folder = DriveApp.getFoldersByName('src');
    if(folder.hasNext()) {
        Logger.log('File already exists')
        folder = folder.next()
        folder = folder.getFoldersByName(id);
        if(folder.hasNext()) {
            folder = folder.next()
        }
    } else {
        var folder = DriveApp.createFolder('src').createFolder(id);
        Logger.log('New folder created!');
      
    }
    
    // var srcFolder = DriveApp.createFolder('src')
    for (var i = 0; i < fileNames.length; i++)
    {
      var f = fileNames[i].split('.')
      var name     = f[0]
      var fileName = fileNames[i]
      var files = folder.getFilesByName(fileName)
      if(files.hasNext()) {
          // Logger.log('File already exists')
          var aFile = files.next()
          folder.removeFile(aFile)
      }
      
      //text = ''
      //text = ScriptApp.getResource(name).getDataAsString()
      //folder.createFile(fileName, text)
      
      
      if (f[1] == 'gs')
      {
           folder.createFile(fileName, ScriptApp.getResource(name).getDataAsString())
      } else if (f[1] == 'html')
      {
           var html = HtmlService.createTemplateFromFile(fileName).getRawContent()  // .evaluate()
           folder.createFile(fileName, html)
      }
      
    }

}
