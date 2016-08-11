// Using twitter to get bearer token
// http://stackoverflow.com/questions/16676002/using-twitter-to-get-bearer-token

/*
I found the solution after wasting many hours. This error will rise because of the base64 encoding using Unicode. Just change the UNICODE to UTF8, and nothing else.

Final code:

WebRequest request = WebRequest.Create("https://api.twitter.com/oauth2/token");

string consumerKey = "31111111111111111111";
string consumerSecret = "1111111111111111111111A";
string consumerKeyAndSecret = String.Format("{0}:{1}", consumerKey, consumerSecret);

request.Method = "POST";   
request.Headers.Add("Authorization", String.Format("Basic {0}", Convert.ToBase64String(Encoding.UTF8.GetBytes(consumerKeyAndSecret))));

request.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";

string postData = "grant_type=client_credentials";
byte[] byteArray = Encoding.UTF8.GetBytes(postData);
request.ContentLength = byteArray.Length;
Stream dataStream = request.GetRequestStream();
dataStream.Write(byteArray, 0, byteArray.Length);
dataStream.Close();

WebResponse response = request.GetResponse();

*/