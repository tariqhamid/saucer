// Helper Functions

// Remove spaces from something
// You want to remove all the whitespaces from a string.
function Dewhitespace(str) 
{
return str.replace(/s+/, '');
}

// Formatting something for use in a URL
// A term with spaces seems to be giving you trouble. Try using this function to change its format to a URL query string.
function URLEncode(str) 
{
  return encodeURIComponent(str);
}

function include(filename) 
{
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}


function test_include()
{
    var t = include('FB2')
}