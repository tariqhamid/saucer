function displayUsername() {
    var user_name = Session.getActiveUser().getUsername();
    Browser.msgBox("Hello, " + user_name);
}

function onOpen()
{
    onOpenSrc()
    onFBOpen()
    onLinkedInOpen()
}

function onOpenSrc() 
{
  SpreadsheetApp.getUi() 
      .createMenu('src stuff')
      .addItem('List Code', 'listCode')
      .addItem('Form Test - Open Dialog','openDialog')
      .addItem('Self Test - Open Dialog','selfDialog')
      .addToUi()
  
  
  SpreadsheetApp.getUi().createMenu('Picker')
      .addItem('Start', 'showPicker')
      .addToUi()
}

function selfDialog() 
{
  // https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit
  // var html = HtmlService.createHtmlOutputFromFile('SelfTest')
  
  //var html = HtmlService.createHtmlOutputFromFile('https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit')
  var html = HtmlService.createHtmlOutputFromFile('SelfTest')
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Dialog title');
}


function openDialog()
{
  var html = HtmlService.createHtmlOutputFromFile('Index');
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Dialog title');
}


function listCode()
{
    var filesArray = ['FB2','utils2']
    var text // = ScriptApp.getResource('FB2').getDataAsString()
    

    
    var folder = DriveApp.getFoldersByName('src');
    if(folder.hasNext()) {
        Logger.log('File already exists')
        folder = folder.next()
    } else {
        var folder = DriveApp.createFolder('src');
        Logger.log('New folder created!');
      
    }
    
    
    // var srcFolder = DriveApp.createFolder('src')
    for (var i = 0; i < filesArray.length; i++)
    {
      var name     = filesArray[i]
      var fileName = name + '.gs'
      var files = folder.getFilesByName(fileName)
      if(files.hasNext()) {
          // Logger.log('File already exists')
          var f = files.next()
          folder.removeFile(f)
      }
        
      text = ScriptApp.getResource(name).getDataAsString()
      folder.createFile(fileName, text)
    }
  
  

}


function test0()
{
  
  var cs = ScriptApp.AuthorizationStatus

  
  for( var name in ScriptApp ) {
    // name contains the property name that you want
    // point[name] contains the value
    
    Logger.log(name) 
    
    Logger.log(this[name])
    
    for( var name2 in this[name]) 
    {                                                                            
      Logger.log(name2)
      //ScriptApp.getResource(x)
      Logger.log('---------------') 
    } 
    
    Logger.log('=========================') 
    
  }
  

  // this.properties.forEach(function(x) { Logger.log(x) } )
  
  Object.getOwnPropertyNames(this).forEach(function(x) { Logger.log(x)                                                     
       Logger.log(this[x])
       //ScriptApp.getResource(x)                                                
  } )
  
  Object.getOwnPropertyNames(this).forEach(function(x) { Logger.log(x)                                                                     
       Logger.log(Object.getOwnPropertyNames(this))
       //ScriptApp.getResource(x)                                              
  } )
  
  
  Logger.log('=========================') 
  
  for( var name in this ) {
      // name contains the property name that you want
      // point[name] contains the value
    
      Logger.log(name) 
    
      Logger.log(this[name])
        
      for( var name2 in this[name]) 
      {                                                                            
          Logger.log(name2)
          //ScriptApp.getResource(x)                                          
      } 
    
      Logger.log('=========================') 
        
   }
  
   Logger.log(XmlService.getXmlNamespace())
   
   
   //Logger.log(HomeroomService)
   
   //Logger.log(HomeroomService.toString())
   
}  


function myFunction0() {
  
  // var g = google.script
  
  var x = ScriptApp
  var id = x.getScriptId() // 1iP9QWpzSg0J2sQ1BSRC2r1amf2dZ5Eczz8JL28vQwy72aXLF_kEgosW1
  
  
  var a = ScriptApp.getResource(id).getDataAsString()

  Logger.log( a )
  
  var s = ScriptApp.getProjectKey()
  //var as = ScriptApp.getResource('tariq-oauth2').getDataAsString()
  
  var codeBlob = ScriptApp.getService().getUrl()
  
  
  var y = ScriptApp.getResource('FB2').getDataAsString()
  
  
  // var x = HtmlService.getUserAgent()
  
  
  var cc = CacheService.getScriptCache().get('code.gs')
  
  
  var folders = DriveApp.getFolders().next().getName()
  var files   = DriveApp.getFiles()
  
  var p =  PropertiesService.getScriptProperties()
  
  var props = PropertiesService.getScriptProperties().getProperties()
  

  
  var keys = PropertiesService.getScriptProperties().getKeys()
  
  // var user = PropertiesService.getUserProperties().getKeys()
  
  
  Logger.log( ScriptProperties.getProperties() )

  
  
      Logger.log( PropertiesService.getScriptProperties().getKeys() )
  
  
    Logger.log( JSON.stringify(CacheService.getScriptCache().get('code')) )
  
    
    SpreadsheetApp.getUi()
  
    Logger.log( SpreadsheetApp.getActiveSpreadsheet().getBlob().getDataAsString() )

    
    Logger.log( SpreadsheetApp.getActiveDocument().getBody() )
               
               
    Logger.log(CacheService.getDocumentCache().get('code')   ) 
    
    Logger.log(CacheService.getUserCache().get('code')   ) 
    
    Logger.log('------------------')
    
   Logger.log(  CacheService.getScriptCache().get('code')  )
   
    Logger.log('------------------')
   
   
   Logger.log( ScriptApp.getProjectKey() )
   
      Logger.log( ScriptApp.getService().getUrl() )
   
 
   //Logger.log( ScriptApp.getResource( ''  ) )
      
      
   CacheService.getDocumentCache().getActiveDocument().getBlob().getDataAsString()
      
   SpreadsheetApp.getActiveDocument().getAs(MimeType.HTML).getDataAsString()
   
   Logger.log( ScriptApp.getResource(ScriptApp.getProjectKey()).getDataAsString() )

}



function testFetch()
{
   
   Logger.log( ScriptApp.getProjectKey() )
   
   
   //var t = HtmlService.createTemplateFromFile('Cache.gs').evaluate().getContent()
   Logger.log( ScriptApp.getOAuthToken() )
   Logger.log( ScriptApp.getScriptId() )
   

   //
   //var tt = HtmlService.createHtmlOutputFromFile('Cache')
   //   .setSandboxMode(HtmlService.SandboxMode.IFRAME)
   //   .getContent()
   

  
   var payload = "7|1|8|https://script.google.com/a/macros/hamid.com/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/|68128E6E045929A07D1D5B15A88C6787|_|getFileContent|j|4b4a88a8-c3c3-4a5a-8e1e-342fbe23d76c|MEjL-BvErse70a5cwWTFxag_JiAr4mIiA|k|1|2|3|4|1|5|5|6|7|8|0|0|"

   
   // curl 'https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/ideService' 
   // -H 'X-Same-Domain: 1' -H 'Origin: https://script.google.com' 
   // -H 'ScrTzFp: mg0r1g-3Cr1g0r2g-3Cr6g0r1g-3Cr1g0r1' 
   // -H 'X-Framework-Xsrf-Token: AJuLMu0CPpLY65m9TVuQR4rQSp-mjkArXA:1469668023729'
   // -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
   // -H 'Lib-id: MEjL-BvErse70a5cwWTFxag_JiAr4mIiA'
   // -H 'Content-Type: text/x-gwt-rpc; charset=UTF-8'
   // -H 'X-GWT-Module-Base: https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/'
   // -H 'X-GWT-Permutation: 353DF62C668D793B3C1BAAB9EA980184'
   // -H 'Referer: https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit?uiv=2&mid=ACjPJvEMg53xUKSQBXxg3Ng_cT8py5vtJyau3JffFmCunQ1BZsuxdunQfYsqL1XtbQfUJ5W61c0IcX-P8JxpxUn1GMKo1OIZ2-ub61GQS1s5JK1MTxtAXhf2NFFo99LhmepBwC9H5tTW-Lw'
   // -H 'mid: ACjPJvEMg53xUKSQBXxg3Ng_cT8py5vtJyau3JffFmCunQ1BZsuxdunQfYsqL1XtbQfUJ5W61c0IcX-P8JxpxUn1GMKo1OIZ2-ub61GQS1s5JK1MTxtAXhf2NFFo99LhmepBwC9H5tTW-Lw'
   // --data-binary '7|1|4|https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/|68128E6E045929A07D1D5B15A88C6787|_|getInitialEditorState|1|2|3|4|0|' --compressed
   
   
   var params =
   {
       "method": "POST",
     
       // muteHttpExceptions: true,
     
     
       headers: {

            'mid': 'ACjPJvEMg53xUKSQBXxg3Ng_cT8py5vtJyau3JffFmCunQ1BZsuxdunQfYsqL1XtbQfUJ5W61c0IcX-P8JxpxUn1GMKo1OIZ2-ub61GQS1s5JK1MTxtAXhf2NFFo99LhmepBwC9H5tTW-Lw'
       },

     

       payload:{"data" : payload},   
   };
  
   var url = 'https://script.google.com/a/macros/hamid.com/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit'

   var s = ScriptApp.getProjectKey()
   
   var response = UrlFetchApp.fetch(url, { followRedirects: true })
   var code     = response.getResponseCode()
   var contents = response.getContentText()
   
   
   // Add one line to use BetterLog
   // https://docs.google.com/spreadsheets/d/1mAcxMz4yeif70UKf44a4s0aFt4ayx69a6zmlabJwumE/pubhtml
   //Logger = BetterLog.useSpreadsheet('1mAcxMz4yeif70UKf44a4s0aFt4ayx69a6zmlabJwumE')
  
   //Now you can log and it will also log to the spreadsheet
   //Logger.log(contents)

   //resource-list
   //project-items-list
   var n = contents.indexOf('project-items')
   
   var doc = Xml.parse(response, true);
  

   
   
   //Logger.log(cont)
   
   var tok = ScriptApp.newStateToken()
   
   Logger.log('tok = ' + tok)

   var result = UrlFetchApp.fetch("https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/ideService", params) //takes 20 seconds to get

  
   var code = result.getResponseCode()

   var contents = result.getContentText() 
}



function ideService(user, pass)
{
  
  // 1. edit call  // _docs_flag_initialData={"info_params":{"token":"AJuLMu3XlTJ2_nSoPj7xxcwZLsrhz8arGg:1469908397571"}
  //               // "19":"AJuLMu3XlTJ2_nSoPj7xxcwZLsrhz8arGg:1469908397571"
  // 2. ideService call
  // //OK[3,100,0,0,99,'VY9EbJ_',18,-147,0,-20,18,98,16,97,0,3,14,'VY4GgJY',13,12,2,20,0,-20,18,96,16,95,0,3,14,'VY19UcJ',13,12,-21,0,-20,18,94,16,93,92,4,91,4,2,3,14,'VY187_T',13,12,-21,0,-20,18,90,16,89,38,4,1,3,14,'VY16eQD',13,12,-21,0,-20,18,88,16,87,86,4,85,4,84,4,83,4,82,4,81,4,80,4,79,4,78,4,77,4,76,4,75,4,12,3,14,'VYyxKCC',13,12,-21,0,-20,18,74,16,73,72,4,1,3,14,'VYyuxUV',13,12,-21,0,-20,18,71,16,70,69,4,68,4,67,4,66,4,4,3,14,'VYuXBq6',13,12,-21,0,-20,18,65,16,64,63,4,1,3,14,'VYtf9e8',13,12,-21,0,-20,18,62,16,61,60,4,38,4,2,3,14,'VYpUuiQ',13,12,-21,0,-20,18,59,16,58,57,4,8,4,56,4,55,4,54,4,5,3,14,'VYpTZtR',13,12,-21,0,-20,18,53,16,52,38,4,1,3,14,'VYPVfdY',13,12,-21,0,-20,18,51,16,50,38,4,1,3,14,'VYOg9Lk',13,12,-21,0,-20,18,49,16,48,47,4,8,4,46,4,45,4,4,3,14,'VYOfd9T',13,12,-21,0,-20,18,44,16,43,42,4,41,4,7,4,6,4,5,4,5,3,14,'VYOdd4a',13,12,-21,0,-20,18,40,16,39,38,4,1,3,14,'VYNYBdG',13,12,-21,0,-20,18,37,16,36,35,4,34,4,33,4,32,4,31,4,30,4,29,4,28,4,8,3,14,'VYNL_PJ',13,12,-21,0,-20,18,17,16,15,10,4,9,4,8,4,7,4,6,4,5,4,6,3,14,'VYK1KHh',13,12,17,3,0,27,26,14,0,1,1,1,25,24,-1,23,0,1,2,22,1,2,22,21,0,20,0,0,19,18,17,16,15,10,4,9,4,8,4,7,4,6,4,5,4,6,3,14,'VYK1KHh',13,12,11,10,4,9,4,8,4,7,4,6,4,5,4,6,3,0,2,1,["4","e","1d","18","run","reset","getService","authCallback","showSidebar","onLinkedInOpen","//\n// https://www.linkedin.com/developer/apps/4543533/auth\n//\n\nvar CLIENT_ID \x3D \x2777y1puq9y8a3qq\x27\nvar CLIENT_SECRET \x3D \x27x5km81bxRLEyWinW\x27\n\n\n/**\n * Authorizes and makes a request to the LinkedIn API.\n */\nfunction run() {\n  var service \x3D getService();\n  if (service.hasAccess()) {\n    // see: https://developer.linkedin.com/docs/fields/basic-profile\n    //var url \x3D \x27https://api.linkedin.com/v1/people/~?format\x3Djson\x27;\n    var url \x3D \x27https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url,email-address)?format\x3Djson\x27\n    var response \x3D UrlFetchApp.fetch(url, {\n      headers: {\n        \x27Authorization\x27: \x27Bearer \x27 + service.getAccessToken()\n      }\n    });\n    var result \x3D JSON.parse(response.getContentText());\n    Logger.log(JSON.stringify(result, null, 2));\n  } else {\n    var authorizationUrl \x3D service.getAuthorizationUrl();\n    Logger.log(\x27Open the following URL and re-run the script: %s\x27,\n        authorizationUrl);\n  }\n}\n\n/**\n * Reset the authorization state, so that it can be re-tested.\n */\nfunction reset() {\n  var service \x3D getService();\n  service.reset();\n}\n\n/**\n * Configures the service.\n */\nfunction getService() {\n  return OAuth2.createService(\x27LinkedIn\x27)\n      // Set the endpoint URLs.\n      .setAuthorizationBaseUrl(\x27https://www.linkedin.com/uas/oauth2/authorization\x27)\n      //.setAuthorizationBaseUrl(BASE_URL)\n\n      .setTokenUrl(\x27https://www.linkedin.com/uas/oauth2/accessToken\x27)\n\n      // Set the client ID and secret.\n      .setClientId(CLIENT_ID)\n      .setClientSecret(CLIENT_SECRET)\n\n      // Set the name of the callback function that should be invoked to complete\n      // the OAuth flow.\n      .setCallbackFunction(\x27authCallback\x27)\n  \n      .setParam(\x27login_hint\x27, Session.getActiveUser().getEmail())  // added\n\n      // Set the property store where authorized tokens should be persisted.\n      .setPropertyStore(PropertiesService.getUserProperties())\n  \n  \n      // Sets the login hint, which will prevent the account chooser screen\n      // from being shown to users logged in with multiple accounts.\n      .setParam(\x27login_hint\x27, Session.getActiveUser().getEmail())\n  \n  \n}\n\n/**\n * Handles the OAuth callback.\n */\nfunction authCallback(request) {\n  var service \x3D getService();\n  var authorized \x3D service.handleCallback(request);\n  if (authorized) {\n    return HtmlService.createHtmlOutput(\x27Success!\x27);\n  } else {\n    return HtmlService.createHtmlOutput(\x27Denied\x27);\n  }\n}\n\n//------------------\n\nfunction showSidebar() {\n  var service \x3D getService();\n  if (!service.hasAccess()) {\n\n    // see: https://developer.linkedin.com/docs/fields/basic-profile\n    //var url \x3D \x27https://api.linkedin.com/v1/people/~?format\x3Djson\x27;\n    var url \x3D \x27https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url,email-address)?format\x3Djson\x27\n    var response \x3D UrlFetchApp.fetch(url, {\n      headers: {\n        \x27Authorization\x27: \x27Bearer \x27 + service.getAccessToken()\n      }\n    });\n    var result \x3D JSON.parse(response.getContentText());\n    Logger.log(JSON.stringify(result, null, 2));\n    \n  } else {\n    // ...\n    var authorizationUrl \x3D service.getAuthorizationUrl();\n    var template \x3D HtmlService.createTemplate(\n        \x27\x3Ca href\x3D\"\x3C?\x3D authorizationUrl ?\x3E\" target\x3D\"_blank\"\x3EAuthorize\x3C/a\x3E. \x27 +\n        \x27Reopen the sidebar when the authorization is complete.\x27);\n    template.authorizationUrl \x3D authorizationUrl;\n    var page \x3D template.evaluate();\n    SpreadsheetApp.getUi().showSidebar(page);\n  }\n}\n\n//------------\n/**\n * Creates a menu entry in the Google Docs UI when the document is opened.\n */\nfunction onLinkedInOpen() {\n  SpreadsheetApp.getUi().createAddonMenu()\n      .addItem(\x27Start\x27, \x27showSidebar\x27)\n      .addToUi()\n}\n","f","1e","","LinkedIn","j","f382586a-6e74-4cc8-b9c9-aefb971b3272","MEjL-BvErse70a5cwWTFxag_JiAr4mIiA","k","g","b","a","5","i","c","project-id-2104291896494791115","https://script.google.com/a/macros/hamid.com/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit","onOpen","onOpenSrc","selfDialog","openDialog","listCode","test0","myFunction0","testFetch","code","a90eca26-188f-482a-aee8-8c03eeee9afa","myFunction","Service","9c053de5-7d01-434a-99db-8ff729d4a00f","FBauthCallback","logRedirectUri","Facebook","83e16c0e-f331-424e-a4fa-b68f5f576b92","listTweets","getTwitterService","authorizeTwitter","Twitter","5c6976f7-533d-4f01-8509-10d303c9fafb","Twit-CS","46038983-6192-4fef-9e40-a71105aa6c9f","Google","e221e31d-cd56-4ede-b755-d58f255d0472","onFBOpen","getFBService","showFBSidebar","makeRequest","FB2","4b4a88a8-c3c3-4a5a-8e1e-342fbe23d76c","myFunction2","BetterLogger","e0b21b53-cf2e-4b53-8b92-1562241faed8","getRssFeed","Cache","b4cc31a0-3c4e-43f3-a2bb-3c849774a709","Dewhitespace","URLEncode","include","test_include","utils","39843f1c-554c-4700-ba44-1c7bb50afb4a","ScanGoogleDrive","DriveAccess","046e963b-a3d2-4f34-b357-8c22a919520b","getFacebookLike","getFacebookShare","getFacebookComment","getTweetCount","getTopsyCount","getBuzzCount","buzzData","getLinkedInCount","getDiggCount","getDeliciousCount","getStumbleCount","getPlusones","utils2","dc642253-4084-4b32-8b7d-b16187e37f69","caja-gistfile1.html","1d2f1c91-d7a7-4272-8326-291b44428754","openInputDialog","itemAdd","addItem","1e829a73-77f0-4f5c-9c45-ed27fedcdd6d","Index","e61c7ca8-8712-48d8-8bdc-cf4b37477438","SelfTest","cb246c22-b521-45d1-b21c-545c83ace553","tariq-oauth2","6"],1,7]


  var expectedResponse = [3,100,0,0,99,'VY9EbJ_',18,-147,0,-20,18,98,16,97,0,3,14,
                          'VY4GgJY',13,12,2,20,0,-20,18,96,16,95,0,3,14,
                          'VY19UcJ',13,12,-21,0,-20,18,94,16,93,92,4,91,4,2,3,14,
                          'VY187_T',13,12,-21,0,-20,18,90,16,89,38,4,1,3,14,
                          'VY16eQD',13,12,-21,0,-20,18,88,16,87,86,4,85,4,84,4,83,4,82,4,81,4,80,4,79,4,78,4,77,4,76,4,75,4,12,3,14,
                          'VYyxKCC',13,12,-21,0,-20,18,74,16,73,72,4,1,3,14,
                          'VYyuxUV',13,12,-21,0,-20,18,71,16,70,69,4,68,4,67,4,66,4,4,3,14,
                          'VYuXBq6',13,12,-21,0,-20,18,65,16,64,63,4,1,3,14,
                          'VYtf9e8',13,12,-21,0,-20,18,62,16,61,60,4,38,4,2,3,14,
                          'VYpUuiQ',13,12,-21,0,-20,18,59,16,58,57,4,8,4,56,4,55,4,54,4,5,3,14,
                          'VYpTZtR',13,12,-21,0,-20,18,53,16,52,38,4,1,3,14,
                          'VYPVfdY',13,12,-21,0,-20,18,51,16,50,38,4,1,3,14,
                          'VYOg9Lk',13,12,-21,0,-20,18,49,16,48,47,4,8,4,46,4,45,4,4,3,14,
                          'VYOfd9T',13,12,-21,0,-20,18,44,16,43,42,4,41,4,7,4,6,4,5,4,5,3,14,
                          'VYOdd4a',13,12,-21,0,-20,18,40,16,39,38,4,1,3,14,
                          'VYNYBdG',13,12,-21,0,-20,18,37,16,36,35,4,34,4,33,4,32,4,31,4,30,4,29,4,28,4,8,3,14,
                          'VYNL_PJ',13,12,-21,0,-20,18,17,16,15,10,4,9,4,8,4,7,4,6,4,5,4,6,3,14,
                          'VYK1KHh',13,12,17,3,0,27,26,14,0,1,1,1,25,24,-1,23,0,1,2,22,1,2,22,21,0,20,0,0,19,18,17,16,15,10,4,9,4,8,4,7,4,6,4,5,4,6,3,14,
                          'VYK1KHh',13,12,11,10,4,9,4,8,4,7,4,6,4,5,4,6,3,0,2,1,
                          ["4","e","1d","18","run","reset","getService","authCallback","showSidebar",
                           "onLinkedInOpen","//\n// https://www.linkedin.com/developer/apps/4543533/auth\n//\n\nvar CLIENT_ID \x3D \x2777y1puq9y8a3qq\x27\nvar CLIENT_SECRET \x3D \x27x5km81bxRLEyWinW\x27\n\n\n/**\n * Authorizes and makes a request to the LinkedIn API.\n */\nfunction run() {\n  var service \x3D getService();\n  if (service.hasAccess()) {\n    // see: https://developer.linkedin.com/docs/fields/basic-profile\n    //var url \x3D \x27https://api.linkedin.com/v1/people/~?format\x3Djson\x27;\n    var url \x3D \x27https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url,email-address)?format\x3Djson\x27\n    var response \x3D UrlFetchApp.fetch(url, {\n      headers: {\n        \x27Authorization\x27: \x27Bearer \x27 + service.getAccessToken()\n      }\n    });\n    var result \x3D JSON.parse(response.getContentText());\n    Logger.log(JSON.stringify(result, null, 2));\n  } else {\n    var authorizationUrl \x3D service.getAuthorizationUrl();\n    Logger.log(\x27Open the following URL and re-run the script: %s\x27,\n        authorizationUrl);\n  }\n}\n\n/**\n * Reset the authorization state, so that it can be re-tested.\n */\nfunction reset() {\n  var service \x3D getService();\n  service.reset();\n}\n\n/**\n * Configures the service.\n */\nfunction getService() {\n  return OAuth2.createService(\x27LinkedIn\x27)\n      // Set the endpoint URLs.\n      .setAuthorizationBaseUrl(\x27https://www.linkedin.com/uas/oauth2/authorization\x27)\n      //.setAuthorizationBaseUrl(BASE_URL)\n\n      .setTokenUrl(\x27https://www.linkedin.com/uas/oauth2/accessToken\x27)\n\n      // Set the client ID and secret.\n      .setClientId(CLIENT_ID)\n      .setClientSecret(CLIENT_SECRET)\n\n      // Set the name of the callback function that should be invoked to complete\n      // the OAuth flow.\n      .setCallbackFunction(\x27authCallback\x27)\n  \n      .setParam(\x27login_hint\x27, Session.getActiveUser().getEmail())  // added\n\n      // Set the property store where authorized tokens should be persisted.\n      .setPropertyStore(PropertiesService.getUserProperties())\n  \n  \n      // Sets the login hint, which will prevent the account chooser screen\n      // from being shown to users logged in with multiple accounts.\n      .setParam(\x27login_hint\x27, Session.getActiveUser().getEmail())\n  \n  \n}\n\n/**\n * Handles the OAuth callback.\n */\nfunction authCallback(request) {\n  var service \x3D getService();\n  var authorized \x3D service.handleCallback(request);\n  if (authorized) {\n    return HtmlService.createHtmlOutput(\x27Success!\x27);\n  } else {\n    return HtmlService.createHtmlOutput(\x27Denied\x27);\n  }\n}\n\n//------------------\n\nfunction showSidebar() {\n  var service \x3D getService();\n  if (!service.hasAccess()) {\n\n    // see: https://developer.linkedin.com/docs/fields/basic-profile\n    //var url \x3D \x27https://api.linkedin.com/v1/people/~?format\x3Djson\x27;\n    var url \x3D \x27https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url,email-address)?format\x3Djson\x27\n    var response \x3D UrlFetchApp.fetch(url, {\n      headers: {\n        \x27Authorization\x27: \x27Bearer \x27 + service.getAccessToken()\n      }\n    });\n    var result \x3D JSON.parse(response.getContentText());\n    Logger.log(JSON.stringify(result, null, 2));\n    \n  } else {\n    // ...\n    var authorizationUrl \x3D service.getAuthorizationUrl();\n    var template \x3D HtmlService.createTemplate(\n        \x27\x3Ca href\x3D\"\x3C?\x3D authorizationUrl ?\x3E\" target\x3D\"_blank\"\x3EAuthorize\x3C/a\x3E. \x27 +\n        \x27Reopen the sidebar when the authorization is complete.\x27);\n    template.authorizationUrl \x3D authorizationUrl;\n    var page \x3D template.evaluate();\n    SpreadsheetApp.getUi().showSidebar(page);\n  }\n}\n\n//------------\n/**\n * Creates a menu entry in the Google Docs UI when the document is opened.\n */\nfunction onLinkedInOpen() {\n  SpreadsheetApp.getUi().createAddonMenu()\n      .addItem(\x27Start\x27, \x27showSidebar\x27)\n      .addToUi()\n}\n","f","1e","",
                           "LinkedIn","j","f382586a-6e74-4cc8-b9c9-aefb971b3272","MEjL-BvErse70a5cwWTFxag_JiAr4mIiA","k","g","b","a","5","i","c","project-id-2104291896494791115","https://script.google.com/a/macros/hamid.com/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit","onOpen","onOpenSrc","selfDialog","openDialog","listCode","test0","myFunction0","testFetch",
                           "code","a90eca26-188f-482a-aee8-8c03eeee9afa","myFunction",
                           "Service","9c053de5-7d01-434a-99db-8ff729d4a00f","FBauthCallback","logRedirectUri",
                           "Facebook","83e16c0e-f331-424e-a4fa-b68f5f576b92","listTweets","getTwitterService","authorizeTwitter",
                           "Twitter","5c6976f7-533d-4f01-8509-10d303c9fafb",
                           "Twit-CS","46038983-6192-4fef-9e40-a71105aa6c9f",
                           "Google","e221e31d-cd56-4ede-b755-d58f255d0472","onFBOpen","getFBService","showFBSidebar","makeRequest",
                           "FB2","4b4a88a8-c3c3-4a5a-8e1e-342fbe23d76c","myFunction2",
                           "BetterLogger","e0b21b53-cf2e-4b53-8b92-1562241faed8","getRssFeed",
                           "Cache","b4cc31a0-3c4e-43f3-a2bb-3c849774a709","Dewhitespace","URLEncode","include","test_include",
                           "utils","39843f1c-554c-4700-ba44-1c7bb50afb4a","ScanGoogleDrive","DriveAccess","046e963b-a3d2-4f34-b357-8c22a919520b","getFacebookLike","getFacebookShare","getFacebookComment","getTweetCount","getTopsyCount","getBuzzCount","buzzData","getLinkedInCount","getDiggCount","getDeliciousCount","getStumbleCount","getPlusones","utils2","dc642253-4084-4b32-8b7d-b16187e37f69","caja-gistfile1.html","1d2f1c91-d7a7-4272-8326-291b44428754","openInputDialog","itemAdd","addItem","1e829a73-77f0-4f5c-9c45-ed27fedcdd6d","Index","e61c7ca8-8712-48d8-8bdc-cf4b37477438","SelfTest","cb246c22-b521-45d1-b21c-545c83ace553","tariq-oauth2","6"],
                           1,7]


  var len = expectedResponse.length

  var params = {
  
    'method': 'GET',

    //'Upgrade-Insecure-Requests':1,
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
    muteHttpExceptions: false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  }
  
 
  
  
  // var response = UrlFetchApp.fetch("https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit", params)
  // var url = 'https://accounts.google.com'
  var url = 'https://accounts.google.com/login'
                
  var response = UrlFetchApp.fetch(url, params)

  
  var code     = response.getResponseCode()
  var contents = response.getContentText()
  Logger.log(contents)
  
  Logger = BetterLog.useSpreadsheet('1mAcxMz4yeif70UKf44a4s0aFt4ayx69a6zmlabJwumE')
  
  //Now you can log and it will also log to the spreadsheet
  Logger.log(contents)
  
  // var xml = XmlService.parse(contents, true)
  Logger.log(formString)
  
  var n = contents.indexOf('<form')
  var n2 = contents.indexOf('</form>') + 7
  
  var formString = contents.substring(n, n2)
  
  Logger.log(formString)
  
  var formDoc = Xml.parse(formString, true)
  //formDoc.getElements('input')
  //formDoc.getChildren('form')
  var formBody =formDoc.html.body.form.input
  var vals = {}
  var queryString = ''
  Logger.log("--------------")
  var queryString = ''
  for (var i = 0; i < formBody.length; i++)
  {
       vals[formBody[i].name] = formBody[i].value
       
       var str = formBody[i].value
       
       if (0 == str.indexOf('http'))
       {
            str = encodeURIComponent(formBody[i].value)
       }
       
       queryString = queryString + formBody[i].name + '=' + str
       
       if (i < formBody.length - 1)
           queryString = queryString + '&'
       
       Logger.log(formBody[i].name+ '=' + str)
       

  }
  Logger.log("--------------") 
  
  // for above loop
  /* --------------
  Page=PasswordSeparationSignIn
  GALX=sYPwHGADYkg
  gxf=AFoagUXahT-yl1jMZrt23p6pSuic-NIE_g:1470001196571
  continue=https%3A%2F%2Faccounts.google.com%2FManageAccount
  followup=https%3A%2F%2Faccounts.google.com%2FManageAccount        -- missing
  ProfileInformation=
  _utf8=☃
  bgresponse=js_disabled
  -------------- */


  
  // Page=PasswordSeparationSignIn
  // &GALX=DtVE_hA7OLU
  // &gxf=AFoagUWLgec-1CbaJNQ6jdWq-WaxJeV2iA%3A1469916177599
  // &continue=https%3A%2F%2Faccounts.google.com%2FManageAccount
  // &hl=en
  // &sacu=1
  // &ProfileInformation=APMTqunKQHdOpGTE-2O_qyJZYVi8RXI3Uj1KxRFTYv9wXwiht6fEwZHO1wTcZr9gYodG_5wZqD_h0CSSXwDoRd5WH_CVs5Uw_wW76xCjU99uGxE-iyMM7y4aS-29CtQPhUWrJ18JV5DUcW8UZ6wu4S-D-JNtILwtI7Rm73II-MZgAvMeYG9B-dsI4mDGw7wea-5c9Dc06x4Uqz3xln1YQsZ-net-yhuFjKz8GQSVLkCVCTPxu7_hgun4GcuLNW5fmy44mjgvwW_q
  // &_utf8=%E2%98%83
  // &bgresponse=%21oKOlo4JCgbrRPSEDIchEsX1KCrnQn_cCAAAARlIAAAAfmQFWXfqqIaisn5eidyRtG2uoHRqyg-OxYdOkU2PF3IXct3whwRl07b0ajSGLIuAVWCAM0aPissUYi6J6ZuIex_lmlNb0kkvL3Ej3Eer4QXKJ7GYqAj7T0oSWQHtsmmL0IJ6SRU27HATyHgPjb5BvphFgUnFsssexYApFEPt-fT0WSCB717HncV3c6m_8h-WRYUKUFwj3AJFGnwssYbYM8aAeYKwlyP-R2RKwlZPlD8YOTdg4TQehAMEHvsFde8ty_sHudBkrqt_IQS6d6JOzXWBkK-q3b_6N6Nrx6_MmAZ0_2ilBewLTBqzNjyp_gBINT1JKX-yi4YTImxudtTZYDfHNHTFbWX8Hh2xxj8MHFkXi9j7m2IoAU_ZDfXBZRcNs7gqIn6rae62HmrGp3q4KHtB041xMoh7gGz3b7tKjcSpjhlslNQyj1cTed5-FecXcg9_CBWH207XV
  // &pstMsg=1
  // &dnConn=
  // &checkConnection=youtube%3A246%3A1
  // &checkedDomains=youtube
  // &identifiertoken=
  // &identifiertoken_audio=
  // &identifier-captcha-input=
  // &Email=tariq%40hamid.com
  // &Passwd=french_grapes1..4
  // &PersistentCookie=yes
  // &rmShown=1
  

  
/*
   var payload =
   {
     "first" : "Jack",
     "last" : "Sparrow"
   };


    var options =
      {
        method:"POST",
        payload:{"data" : JSON.stringify(payload)},   
        followRedirects:true,
        muteHttpExceptions: false
      };
*/

  var options =
      {
        method:"POST",
        payload:{"data" : JSON.stringify(options)},   
        followRedirects:true,
        muteHttpExceptions: false
      }
      
  var response = UrlFetchApp.fetch(url, params)

  var params2 = {
  
    "method": "POST",
    "payload" : payload,
    muteHttpExceptions: false,
    headers:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     { 
           'Content-Type': 'text/x-gwt-rpc; charset=UTF-8',
           'Lib-id':'MEjL-BvErse70a5cwWTFxag_JiAr4mIiA',
           Origin:'https://script.google.com',
           Referer:'https://script.google.com/a/macros/hamid.com/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/edit',
           ScrTzFp:'mg0r1g-3Cr1g0r2g-3Cr6g0r1g-3Cr1g0r1',
           'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
           'X-Framework-Xsrf-Token':'AJuLMu3XlTJ2_nSoPj7xxcwZLsrhz8arGg:1469908397571' ,
           'X-GWT-Module-Base':'https://script.google.com/a/macros/hamid.com/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/',
           'X-GWT-Permutation':'353DF62C668D793B3C1BAAB9EA980184',
           'X-Same-Domain':'1'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
     }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  var response = UrlFetchApp.fetch("https://script.google.com/a/hamid.com/macros/d/MEjL-BvErse70a5cwWTFxag_JiAr4mIiA/gwt/ideService", params2)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  var code     = response.getResponseCode()
  var contents = response.getContentText()
  Logger.log(contents)
  
  
}


// get cookies:
// https://m.reddit.com/r/javascript/comments/3cvm0n/alternative_to_urlfetchapp_in_google_apps_script/
function getVoatCSRFToken() {
  var response = UrlFetchApp.fetch("https://voat.co");
  var cookies = response.getAllHeaders()["Set-Cookie"];

  for (iCookie in cookies) {
     Logger.log(cookies[iCookie]);
  }
}


/*

"2016-07-30 23:08:52:072 +0100 000277 INFO <form novalidate method=""post"" action=""https://accounts.google.com/AccountLoginInfo"" id=""gaia_loginform"">
  <input name=""Page"" type=""hidden"" value=""PasswordSeparationSignIn"">
  <input type=""hidden"" name=""GALX"" value=""wQakQCpywwQ"">
  <input type=""hidden"" name=""gxf"" value=""AFoagUU7qsfrEnKFHFSLPCW2xLRTow7nEw:1469916531878"">
  <input type=""hidden"" name=""continue"" value=""https://accounts.google.com/ManageAccount"">
  <input type=""hidden"" name=""followup"" value=""https://accounts.google.com/ManageAccount"">
  <input id=""profile-information"" name=""ProfileInformation"" type=""hidden"" value="""">
  <input type=""hidden"" id=""_utf8"" name=""_utf8"" value=""&#9731;""/>
  <input type=""hidden"" name=""bgresponse"" id=""bgresponse"" value=""js_disabled"">
  <div class=""form-panel first valid"" id=""gaia_firstform"">
  <div class=""slide-out "">
  <div class=""input-wrapper focused"">
  <div id=""identifier-shown"">
  <div>
  <label class=""hidden-label"" for=""Email"">
  Enter your email</label>
  <input id=""Email"" name=""Email"" placeholder=""Enter your email"" type=""email"" value="""" spellcheck=""false""
            
            
            autofocus>
  <input id=""Passwd-hidden"" type=""password"" spellcheck=""false"" class=""hidden"">
  </div>
  </div>
  <span role=""alert"" class=""error-msg"" id=""errormsg_0_Email""></span>
  </div>
<input id=""next"" name=""signIn"" class=""rc-button rc-button-submit"" type=""submit"" value=""Next"">
  <a class=""need-help""
        href=""https://accounts.google.com/signin/recovery?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&amp;ignoreShadow=0&amp;hl=en"">
  Need help?
  </a>
  </div>
  </div>
  </form>"

*/