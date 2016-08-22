// http://www.thelacunablog.com/how-login-website-google-script.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A%20TheLacunaBlog%20(The%20Lacuna%20Blog)
//
/**   Published by Subigya Nepal on 09/08/2014    **/

function loginToSite(){
  var url = "enter login URL here"; //change this.
  var payload = {
    "username":"enteryourusername", //change this.
    "password":"enteryourpassword" //and change this. done. no need to enter anything elsewhere.
  }; 
  var opt = {
    "payload":payload,
    "method":"post",
    "followRedirects" : false
  };
  var response = UrlFetchApp.fetch(encodeURI(url),opt);
  if ( response.getResponseCode() == 200 ) { //could not log in.
    var result = "Couldn't login. Please make sure your username/password is correct.";
  } 
  else if ( response.getResponseCode() == 303 ) { //login was successful. you might receive 302 response code as well depending upon the site. So try changing it to 302.
     var result = "Logged in successfully";
     var cookie = response.getAllHeaders()['Set-Cookie'];     
     var header = {
       'Cookie':cookie[1] //taking the second cookie because when redirected, a new cookie is set. If the page does not redirect, you might need to use cookie[0] here. Try it out yourself!
     };
  }
Logger.log(result);
}