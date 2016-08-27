_Cushion = {}

_Cushion.urlPrefix = "https://amber.cloudant.com"

_Cushion.login = function (servername, username, password)
{
  var url       = 'https://' + servername + '.cloudant.com/_session'
  Synergy.url   = 'https://' + servername + '.cloudant.com/'
  
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

      cookies = dataResponse.getAllHeaders()['Set-Cookie']
      Synergy.cookie(cookies)
      
      CacheService.getUserCache().put('cookies', cookies)
      
  } catch(e){
     Logger.log(e)
  }
  
  return dataResponse
}


_Cushion.allDbs = function()
{
  opt = {
    "method" : "get",
    "User-Agent" : "Mozilla/5.0",
    "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language" : "en-US,en;q=0.5",
    "headers": {
      "Cookie": Synergy.cookie()
    },
    "followRedirects" : false    
  };
  
  var url       =  Synergy.url + '_all_dbs'

  response = UrlFetchApp.fetch(url, opt);
  
  var dbs = JSON.parse(response.getContentText())

  return dbs
}

_Cushion.showDbs = function(dbs)
{
  var standardGetRequestOptions = {
    "method"  : "get",
    "contentType":"application/json",
    "validateHttpsCertificates" :false,
    //"payload" : JSON.stringify({"name":"amber", "source":"", "target" : "", "type":"user", "roles": [],     "_id": "org.couchdb.user:" + username }),
    //payload: "[]",
    
    "headers":{
      "Content-Type" : "application/json",
      "Cookie": Synergy.cookie()
      // "Authorization": "Basic " + Utilities.base64Encode(username + ":" + password)
    },
    muteHttpExceptions:false
  }
  for(var i in dbs)
  {
     Logger.log(dbs[i])

     url       = Synergy.url + dbs[i] + "/_all_docs?limit=20"
     
     Logger.log(url)

     response = UrlFetchApp.fetch(url, standardGetRequestOptions);

     jsonToSheet({name : dbs[i]})
     out = JSON.parse(response.getContentText())
     jsonToSheet(out.rows)
  }

}


_Cushion.logout = function ()
{
  return _Cushion.request("DELETE", "_session",
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded",
                    "X-CouchDB-WWW-Authenticate": "Cookie"}
            }

         )
}


_Cushion.request = function (method, uri, options) {
  options = typeof (options) == 'object' ? options : {}
  options.headers = typeof (options.headers) == 'object' ? options.headers : {}
  options.headers["Content-Type"] = options.headers["Content-Type"] || options.headers["content-type"] || "application/json"
  options.headers["Accept"] = options.headers["Accept"] || options.headers["accept"] || "application/json"
  
  options.muteHttpExceptions = true
  
  if (Synergy.cookie())
      options.headers["Cookie"] = Synergy.cookie()
  
  options["method"] = method

  var url       =  Synergy.url + uri

  var val 
  try {
    val = UrlFetchApp.fetch(url, options)
  }
  catch (e)
  {
    return e
  }
  
  return val
}

//                 Cushion.createUser('alice5','123')
// see https://gist.github.com/weilu/10445007
/*
Cushion.createUser = function (name, password)
{
    var div = document.createElement("div")
    div.id = "createUser"
    document.body.appendChild(div)

    QQ.current.push(function ()
    {
        Cushion.get('/_users/org.couchdb.user:' + name)
    },
            "GET" + '/_users/org.couchdb.user:' + name)

    QQ.current.push(
            function ()
            {
                if (QQ.current.req.responseText)
                {
                    var err = JSON.parse(QQ.current.req.responseText)
                    if (err && err.error === "not_found")
                    {
                        var hashAndSalt = generatePasswordHash2(password)
                        QQ.current.push(
                                function () {
                                    Cushion.put("/_users/org.couchdb.user:" + name,
                                            JSON.stringify({
                                                name: name,
                                                password_sha: hashAndSalt[0],
                                                salt: hashAndSalt[1],
                                                password_scheme: 'simple',
                                                type: 'user',
                                                roles: []   // "roles": ["my-role"], 
                                                
                                            })
                                            )
                                },
                                "PUT /_users/org.couchdb.user:"
                                )

                        QQ.current.processQueue()
                    }
                }
                QQ.current.processQueue()
            },
            "Cushion.createUser->waitFirst"
            )

    QQ.current.processQueue()
}
*/

_Cushion.createUser = function (name, password)
{
  var ret

  var response = _Cushion.request('GET', '_users/org.couchdb.user:' + name)
  
  if (response.getContentText())
  {
      var err = JSON.parse(response.getContentText())
      if (err.error === "not_found")
      {
          var hashAndSalt = generatePasswordHash2(password)
          var options = {}
          options['payload'] = JSON.stringify({
                                 name: name,
                                 password_sha: hashAndSalt[0],
                                 salt: hashAndSalt[1],
                                 password_scheme: 'simple',
                                 type: 'user',
                                 roles: []   // "roles": ["my-role"], 
                      })
          
          ret = _Cushion.request('put','_users/org.couchdb.user:' + name, options)
          
          Logger.log(ret.getContentText())
      }
  }
  
  return ret
}


function test_login()
{
  var username  = PropertiesService.getScriptProperties().getProperty('user')
  var password  = PropertiesService.getScriptProperties().getProperty('pass')
  
  
if (0)
{
  _Cushion.login(username, username, password)
  
  var dbs = _Cushion.allDbs(username)
  
  jsonToSheet(dbs)
  
  _Cushion.showDbs(dbs)
  
  var ret = _Cushion.logout()
  jsonToSheet({"logout":""})
  jsonToSheet(JSON.parse(ret))

  jsonToSheet({})
  jsonToSheet({"login":"test5"})
  ret = _Cushion.login('amber','test5','test4')
  jsonToSheet(JSON.parse(ret))
  jsonToSheet({"logout":""})         
  ret = _Cushion.logout()
  jsonToSheet(JSON.parse(ret))
}
  
  _Cushion.login(username, username, password)
  _Cushion.createUser('alice9','123')
}

