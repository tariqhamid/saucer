// http://kapler.cz/automaticke-statistiky-videi-diky-google-sheets-apps-script-a-youtube-data-api/

/**
* Helping function for testing return values from single channel. Ctrl+Enter to see the log
**/
function testChannel() {
 var videos = getVideos ('TefalCZSK')
 Logger.log(videos[0]);
}


/**
* Ad Update menu during Spreadsheet open
**/
function onOpenKapler() {
 var ui = SpreadsheetApp.getUi();
 // Or DocumentApp or FormApp.
 ui.createMenu('Aktualizace')
 .addItem('Aktualizace aktuálního listu', 'updateCurrentSheet')
 .addItem('Aktualizace všech videí', 'updateAllSheets')
 .addToUi();
}


/**
* Update videos and formats on all sheets in active Spreadsheet.
**/
function updateAllSheets () {
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheets = ss.getSheets();
 
 for (var n = 0; n < sheets.length ; n++ ) {
 var sheet = ss.getSheets()[n];
 updateSheetVideos(sheet);
 updateSheetStyle(sheet);
 }
}

/**
* Update videos and formats on current sheet.
**/
function updateCurrentSheet() {
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getActiveSheet();
 updateSheetVideos(sheet);
 updateSheetStyle(sheet);
 
}

/**
* Update videos on given sheet with videos from the YouTube channels with the same channel URL as sheet name
*
* @param {object} Spreadsheet Sheet
*/
function updateSheetVideos(sheet) {
 var sheetName = sheet.getName();
 var videos = (getVideos (sheetName));
 // if there is no YouTube channel that match the sheet name, return back (so we can have helping sheets)
 if (typeof videos === 'undefined') return;
 
 var columnNames = ['URL',
 'Thumbnail',
 'Title',
 'Description',
 'Tags',
 'Published at',
 'Views',
 'Likes',
 'Dislikes',
 'Comments',
 'Favorites',
 ];
 
 // we want to clear only the columns, that will be updated, not all sheet
 // this way we can add formulas to adjoining columns and keep them intact after update
 var lastColumn = "abcdefghijklmnopqrstuvwxyz".charAt(columnNames.length-1);
 sheet.getRange("A:"+lastColumn).clearContent();
 
 //fill column names to first row 
 sheet.getRange(1, 1, 1, columnNames.length).setValues([columnNames]) ;
 
 //put all the values to single array for later single call update, what is much faster then update row one by one
 var values = [];
 videos.forEach (function (video) {
 var tags = video.snippet.tags;
 tags = (typeof tags === 'undefined') ? '' : tags.join(', ');
 values.push([ "https://www.youtube.com/watch?v="+video.id,
 //'=image("https://i.ytimg.com/vi/'+video.id+'/default.jpg")', //"default" is restricted object name, so it would need this ugly way to use default (small) size of thumbnail
 '=image("'+video.snippet.thumbnails.medium.url+'")', //instead we use "medium" format
 video.snippet.title,
 video.snippet.description,
 tags,
 new Date(video.snippet.publishedAt),
 video.statistics.viewCount,
 video.statistics.likeCount,
 video.statistics.dislikeCount,
 video.statistics.commentCount,
 video.statistics.favoriteCount,
 ]);
 });
 sheet.getRange(2, 1, videos.length , values[0].length).setValues(values);
}


/**
* Update styles and formats of given sheet. Not very sexy, but it fits the needs
*
* @param {object} SpreadsheetApp Sheet
**/
function updateSheetStyle(sheet) {
 var sheetName = sheet.getName();
 sheet.getDataRange().setVerticalAlignment("middle");
 sheet.setColumnWidth(1, 310);
 sheet.setColumnWidth(2, 120); //this will affect the size of thumbnail
 sheet.setColumnWidth(3, 300);
 sheet.setColumnWidth(4, 400);
 sheet.setColumnWidth(5, 200);
 sheet.autoResizeColumn(6);
 sheet.autoResizeColumn(7);
 sheet.autoResizeColumn(8);
 sheet.autoResizeColumn(9);
 sheet.autoResizeColumn(10);
 sheet.autoResizeColumn(11);
 sheet.getRange("F:F").setNumberFormat('d.m.yyyy');
 sheet.getRange("G:K").setNumberFormat('#,##0');
 sheet.getRange("C:E").setWrap(true);
 sheet.getRange("1:1").setFontWeight("bold");
 sheet.getRange("C:C").setFontWeight("bold");
 for(var i=2; i<=sheet.getLastRow()-1; i++){
 sheet.setRowHeight(i, 90); //this will affect the size of thumbnail
 };
}



/**
* Return YouTube videos details for given channel
*
* @param {string} username YouTube channel name (username) - see channel URL
* @return Array representing key params of YouTube videos in given channel
*/
function getVideos(username) {
 var results = YouTube.Channels.list('contentDetails', {forUsername: username});
 var array = [];
 if (results.pageInfo.getTotalResults() == 0) return;
 var item = results.items[0];
 // Get the playlist ID, which is nested in contentDetails, as described in the
 // Channel resource: https://developers.google.com/youtube/v3/docs/channels
 var playlistId = item.contentDetails.relatedPlaylists.uploads;
 
 var nextPageToken = '';
 
 // This loop retrieves a set of playlist items and checks the nextPageToken in the
 // response to determine whether the list contains additional items. It repeats that process
 // until it has retrieved all of the items in the list.
 while (nextPageToken != null) {
 var playlistResponse = YouTube.PlaylistItems.list('contentDetails', {
 playlistId: playlistId,
 maxResults: 50,
 pageToken: nextPageToken
 });
 //get all ids (max 50) from given playlist response and joint them
 var ids = []
 ids = playlistResponse.items.map(function(video) {
 return video.contentDetails.getVideoId();
 })
 ids = ids.join(',');
 //get snippet and statistics data for given ids and add them to array
 var data = YouTube.Videos.list('snippet, statistics', {id: ids});
 array = array.concat(data.items);
 nextPageToken = playlistResponse.nextPageToken;
 }
 
 return array;
}