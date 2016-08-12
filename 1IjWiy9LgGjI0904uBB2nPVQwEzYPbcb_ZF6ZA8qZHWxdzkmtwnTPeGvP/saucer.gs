/*

{"Project key (deprecated)":"MUZanSQRlvJgBUXsWbpV2YkMeTNx2jEzZ",
 "Project key":"MUZanSQRlvJgBUXsWbpV2YkMeTNx2jEzZ",
 "Script ID":"1IjWiy9LgGjI0904uBB2nPVQwEzYPbcb_ZF6ZA8qZHWxdzkmtwnTPeGvP",
 "fileNames":["LinkedIn.gs","code.gs","Service.gs","Facebook.gs","Twitter.gs",
              "Twit-CS.gs","Google.gs","FB2.gs","BetterLogger.gs","Cache.gs",
              "utils.gs","DriveAccess.gs","utils2.gs","addItem.gs","Index.html",
              "SelfTest.html","Picker.html","code2.gs","DoGet.gs","Top.html","SelfTest0.html"]}]

*/
function test_saucer_getSourceStub()
{
  var data = {"Project key (deprecated)":"MUZanSQRlvJgBUXsWbpV2YkMeTNx2jEzZ","Project key":"MUZanSQRlvJgBUXsWbpV2YkMeTNx2jEzZ","Script ID":"1IjWiy9LgGjI0904uBB2nPVQwEzYPbcb_ZF6ZA8qZHWxdzkmtwnTPeGvP","fileNames":["LinkedIn.gs","code.gs","Service.gs","Facebook.gs","Twitter.gs","Twit-CS.gs","Google.gs","FB2.gs","BetterLogger.gs","Cache.gs","utils.gs","DriveAccess.gs","utils2.gs","addItem.gs","Index.html","SelfTest.html","Picker.html","code2.gs","DoGet.gs","Top.html","SelfTest0.html","Saucer.gs"]}

  var val = saucer_getSourceStub( data )
  
  Logger.log(val)
}

function saucer_getSourceStub(data)
{
    // return 'abc'
    return Saucer_.getSourceStub(data)
}


Saucer_ = {

// written by Tariq Hamid [ https://github.com/tariqhamid ]
// 


getSource : function (fileNames) {

    this.listCode(fileNames)

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

},

getSourceStub : function(data)
{
    return this.getSource(data.fileNames)
},



listCode : function (fileNames)
{
    var id = ScriptApp.getScriptId()
    //var url = ScriptApp.getService().getUrl()
    var folder = DriveApp.getFoldersByName('src');
    if(folder.hasNext()) {
        Logger.log('File already exists')
        folder = folder.next()
        var folder2 = folder.getFoldersByName(id);
        if(folder2.hasNext()) {
            folder = folder2.next()
        }
        else
        {
            folder = folder.createFolder(id);        
        }
    } else {
        folder = DriveApp.createFolder('src').createFolder(id);
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



}