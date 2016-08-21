//
// https://ctrlq.org/code/19852-combine-rss-feeds-json
//

function RSSMashup() {
  
  var RSS = [
    "http://feeds.labnol.org/labnol", 
    "http://podgallery.org/feed", 
    "http://hundredzeros.com/feed"
  ];
  
  for (var i=0; i<RSS.length; i++) {
    
    var url    = RSS[i];
    var result = UrlFetchApp.fetch(RSS[i]);
    var feed   = result.getContentText();
    var xml    = Xml.parse(feed, false);  
    var items  = xml.getElement().getElement("channel").getElements("item");
    
    var data = [];
    
    for (var j=0; j<items.length; j++) {
      var utc = new Date(items[j].getElement("pubDate").getText());
      var item = {
        title: items[j].getElement("title").getText(),
        link: items[j].getElement("link").getText(),
        timestamp: utc.getTime().toString(),
        source: url
      };
      data.push(item);
    }
    
    var json = JSON.stringify(data);
        
    Logger.log(json);
    
  }
  
}
 