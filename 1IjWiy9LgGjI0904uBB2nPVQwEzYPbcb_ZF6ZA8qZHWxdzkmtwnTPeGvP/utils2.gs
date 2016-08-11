/*   
   All code apart from getPlusones()
   Copyright 2011 Martin Hawksey 

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

function getFacebookLike(url){
  try {
    var options =
    {
      "method" : "get",
      "contentType" : "application/json"
    };
  var response = UrlFetchApp.fetch("https://api.facebook.com/method/fql.query?query=select%20like_count%20%20from%20link_stat%20where%20url=%22"+encodeURIComponent(url)+"%22&format=json", options);
  var results = JSON.parse(response.getContentText());
  var result = results[0];
  return result.like_count;
  } catch(e){
    Logger.log(e);
  }
  var err = "-";
return err;
}

function getFacebookShare(url){
  try {
    var options =
    {
      "method" : "get",
      "contentType" : "application/json"
    };
    var response = UrlFetchApp.fetch("https://api.facebook.com/method/fql.query?query=select%20share_count%20%20from%20link_stat%20where%20url=%22"+encodeURIComponent(url)+"%22&format=json", options);
    var results = JSON.parse(response.getContentText());
    var result = results[0];
    return result.share_count;
  } catch(e){
  
  }
  var err = "-";
return err;
}

function getFacebookComment(url){
  try {
    var options =
    {
      "method" : "get",
      "contentType" : "application/json"
    };
    var response = UrlFetchApp.fetch("https://api.facebook.com/method/fql.query?query=select%20comment_count%20%20from%20link_stat%20where%20url=%22"+encodeURIComponent(url)+"%22&format=json", options);
    var results = JSON.parse(response.getContentText());
    var result = results[0];
    return result.comment_count;
  } catch(e){
  
  }
  var err = "-";
return err;
}

function getTweetCount(url){
  try {
    var options =
        {
          "method" : "get",
          "contentType" : "application/json"
        };
     var response = UrlFetchApp.fetch("http://urls.api.twitter.com/1/urls/count.json?url="+encodeURI(url), options);
   var results = JSON.parse(response.getContentText());
   return results.count;
  } catch(e){
  
  }
  var err = "-";
return err;
}

function getTopsyCount(url){
  try {
    var options =
        {
          "method" : "get",
          "contentType" : "application/json"
        };
    var response = UrlFetchApp.fetch("http://otter.topsy.com/stats.json?url="+encodeURI(url), options);
    var results = JSON.parse(response.getContentText());
    return results.response.all;
  } catch(e){
    Logger.log(e);
  }
  var err = "-";
return err;
}


function getBuzzCount(url){
  try {
  var options =
      {
        "method" : "get",
        "contentType" : "application/json"
      };
    var response = UrlFetchApp.fetch("http://www.google.com/buzz/api/buzzThis/buzzCounter?url="+encodeURI(url)+"&callback=buzzData", options);
    var result = eval(response.getContentText());
    return result;
  } catch(e){
  
  }
  var err = "-";
return err;
}

function buzzData(arr){
  for (i in arr){
    var result = arr[i];
  }
  return(result);
}

function getLinkedInCount(url){
// ref http://justthatidontforget.blogspot.com/2011/04/script-to-get-linkedin-share-count-for.html
try{ 
  var options =
      {
        "method" : "get",
        "contentType" : "application/json"
      };
   // Below, adapted from "http://ctrlq.org/code/19710-social-share-counts" worked for me
   // HT Canturk Isci
    var response = UrlFetchApp.fetch("http://www.linkedin.com/countserv/count/share?format=json&url="+url); //CANO
    var result = JSON.parse(response.getContentText());
    return result;
  } catch(e){
  
  }
  var err = "-";
return err;
} 

function getDiggCount(url){
  try {
  var options =
      {
        "method" : "get",
        "contentType" : "application/json"
      };
    var response = UrlFetchApp.fetch("http://widgets.digg.com/buttons/count?url="+encodeURI(url)+"&callback=?", options);
    var __DBW={};
    __DBW.collectDiggs=function(e){result = e.diggs};
    eval(response.getContentText());
    return result;
  } catch(e){
  
  }
  var err = "-";
return err;
}

function getDeliciousCount(url){
  try {
    var options =
      {
        "method" : "get",
        "contentType" : "application/json"
      };
    var response = UrlFetchApp.fetch("http://feeds.delicious.com/v2/json/urlinfo/data?url="+url, options);
    var result = JSON.parse(response.getContentText());
    return result[0].total_posts;
  } catch(e){
  
  }
  var err = "-";
return err;
}

function getStumbleCount(url){
  try { 
  var options =
      {
        "method" : "get",
        "contentType" : "application/json"
      };
   var response = UrlFetchApp.fetch("http://www.stumbleupon.com/services/1.01/badge.getinfo?url="+encodeURI(url), options);
   var results = JSON.parse(response.getContentText());
   return results.result.views;
  } catch(e){
  
  }
  var err = "-";
return err;
}

function getPlusones(url){
// from http://www.tomanthony.co.uk/blog/google_plus_one_button_seo_count_api/
  try{
    var options =
      {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : '{"method":"pos.plusones.get","id":"p","params":{"nolog":true,"id":"'+url+'","source":"widget","userId":"@viewer","groupId":"@self"},"jsonrpc":"2.0","key":"p","apiVersion":"v1"}'
      };
    
   var response = UrlFetchApp.fetch("https://clients6.google.com/rpc?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ", options);
   var results = JSON.parse(response.getContentText());
   return results.result.metadata.globalCounts.count;
  } catch(e){
  
  }
  var err = "-";
return err;
}
