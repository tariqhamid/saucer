// http://stackoverflow.com/questions/28026840/how-can-i-use-google-apps-scripts-urlfetchapp-to-login-to-a-third-party-website

function Tvg() {
  var payload =
      { "loginType":"tvgup",
        "accountField" : "00000",             //not the actual account number
        "pinField" : "0000",                  // not the actual password
        "stateAbbr" : "AK", 
      };
  var options =
      {
        "method" : "post",
        "payload" : payload,
        "followRedirects" : false
      };
  var login = UrlFetchApp.fetch("https://www.tvg.com/login" , options);
  var sessionDetails = login.getAllHeaders()['Set-Cookie'];
  Logger.log(sessionDetails);
}