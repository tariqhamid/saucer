_Cushion = {}

_Cushion.urlPrefix = "https://amber.cloudant.com"

_Cushion.login = function (name, password, onSuccessFn, onErrorFn)
{
    _Cushion.singletonXMLHttpRequest = null
    var namePass;
    namePass = "name=" + encodeURIComponent(name) + ( password ? "&password=" + encodeURIComponent(password) : '')
    var last_req = _Cushion.request("POST", "/_session",
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded",
                    "X-CouchDB-WWW-Authenticate": "Cookie"},
                body: namePass
            },
            onSuccessFn,
            onErrorFn,
            true
            )

    return last_req
}

function test_login()
{
  var username  = PropertiesService.getScriptProperties().getProperty('user')
  var password  = PropertiesService.getScriptProperties().getProperty('pass')

  var url       = 'https://' + username + '.cloudant.com/_session'
  
  var namePass = "name=" + encodeURI(username) + ( password ? "&password=" + encodeURI(password) : '')
  
  var params = {
    "method"  : "post", 
    "contentType":"application/x-www-form-urlencoded",
    "validateHttpsCertificates" :false,
    "payload" : namePass,
    "headers":{ 
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CouchDB-WWW-Authenticate": "Cookie"
    },
    muteHttpExceptions:false
  }
  
  var dataResponse;
  var cookies;
  try {
      dataResponse = UrlFetchApp.fetch(url, params)

      var headers = processHeaders(dataResponse)
      jsonToSheet(headers)
      
      Logger.log('----------')
      Logger.log(headers['Set-Cookie'])
      Logger.log('----------')
      
      cookies = headers['Set-Cookie']

      var out = JSON.parse(dataResponse.getContentText())
      jsonToSheet(out)
      
  } catch(e){
     Logger.log(e)
  }
  
  Logger.log('finished test_login')
  
  
  //---------------------------------
  
  // curl -u username:password https://account.cloudant.com/all_dbs
  // FYI via this you are using basic auth. When you use the _session endpoint, you are using the HTTP cookie mechanism
  // i.e. extract the AuthSession cookie value returned from the post response and use that via the --cookie AuthSession=extractedvalue 
  // in your subsequent curl calls without the need for
  
  var headers = dataResponse.getAllHeaders();
  var cookies = headers['Set-Cookie']; 
  for (var i = 0; i < cookies.length; i++) {
    cookies[i] = cookies[i].split( ';' )[0];
  };


  opt = {
    "method" : "get",
    "User-Agent" : "Mozilla/5.0",
    "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language" : "en-US,en;q=0.5",    
    "headers": {
      "Cookie": cookies
    },
    "followRedirects" : false    
  };
  response = UrlFetchApp.fetch("https://edas.info/addTopic.php?c=19349", opt);
  var resp1=response.getContentText();  
  Logger.log(resp1);  
  
}

/*
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
  //var data;
  try {
      dataResponse = UrlFetchApp.fetch(url, params);
  } catch(e){
     Logger.log(e)
  }
  
  return dataResponse
}
*/