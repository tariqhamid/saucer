//
// https://ctrlq.org/code/19630-bbc-weather-alerts
//


function Start() { 
    
    var link = 'http://www.bbc.co.uk/weather/YOUR_CITY_CODE';
 
  // Calcutta, India:  'http://www.bbc.co.uk/weather/1275004';
  // New Delhi, India: 'http://www.bbc.co.uk/weather/1261481';
  // Kansas, USA:      'http://www.bbc.co.uk/weather/4393217';
  // Tokyo, Japan:     'http://www.bbc.co.uk/weather/1850147';
 
    link = link.substring(link.indexOf("r/")+2,link.length);
    var url = 'http://open.live.bbc.co.uk/weather/feeds/en/'+link+'/3dayforecast.rss';
    var xml = UrlFetchApp.fetch(url).getContentText();
    
    xml = xml.substring(xml.indexOf("</image>")+34,xml.length);
    xml = xml.substring(0,xml.indexOf("</title>"));
    
    for(var i=0;i<4;i++)
        xml=xml.replace("°"," ");
 
    var forecast=xml.substring(0,xml.indexOf(','));
    
    var c = xml.replace("imum Temperature","");
    c = c.replace("imum Temperature","");
    var output=c.substring(c.indexOf("day:")+5,c.length);
    
    var now = new Date().getTime();
    CalendarApp.createEvent(output,new Date(now+60000),
                 new Date(now+60000)).addSmsReminder(0); 
 
}
 
function Install(){
    ScriptApp.newTrigger("Start")
        .timeBased()
        .atHour(5)
        .everyDays(1) 
        .create();
    
    ScriptApp.newTrigger("Start")
        .timeBased()
        .atHour(18)
        .everyDays(1) 
        .create();
}
 
function Uninstall() {
    var triggers = ScriptApp.getScriptTriggers();
    for (var i=0; i<triggers.length; i++) {
        ScriptApp.deleteTrigger(triggers[i]);
    }
}

