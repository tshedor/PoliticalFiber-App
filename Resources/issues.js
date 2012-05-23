var win = Titanium.UI.currentWindow;
var currentWindow = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';
var feed = 'http://politicalfiber.com/category/issues/feed/';

// create table view data object
var data = [];

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET",feed);
var actInd = Titanium.UI.createActivityIndicator({
    bottom:200,
    height:50,
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
    font: {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'},
    color: 'black',
    message: 'Loading...',
    width: 210
});
actInd.show();
	setTimeout(function()
	{
		actInd.hide();
	},2000);
win.add(actInd);
xhr.send();
xhr.onerror = function()
{
    actInd.hide();
};
xhr.onload = function()
{
    try
    {
        var doc = this.responseXML.documentElement;
        var items = doc.getElementsByTagName("item");
        var x = 0;
        var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);
			var thumbnails = item.getElementsByTagName("media:thumbnail");
			if (thumbnails && thumbnails.length > 0)
			{
				var media = thumbnails.item(0).getAttribute("url");
				var title = item.getElementsByTagName("title").item(0).text;
				var row = Ti.UI.createTableViewRow({height:80});
				var label = Ti.UI.createLabel({
					text:title,
					left:72,
					top:5,
					bottom:5,
					color:'#444444',
					right:5				
				});
				row.add(label);
				var img;
				if (Titanium.Platform.name == 'android') 
				{
					// iphone moved to a single image property - android needs to do the same
					img = Ti.UI.createImageView({
						image:media,
						left:5,
						height:60,
						width:60
					});

				}
				else
				{
					img = Ti.UI.createImageView({
						image:media,
						left:5,
						height:60,
						width:60
					});
					
				}
				row.add(img);
				data[x++] = row;
				row.heading = item.getElementsByTagName("title").item(0).text;
				row.url = item.getElementsByTagName("link").item(0).text;
				row.content = item.getElementsByTagName("content:encoded").item(0).text;
				row.author = item.getElementsByTagName("dc:creator").item(0).text;
			}
		}
        var tableview = Titanium.UI.createTableView({top:40,data:data,rowBackgroundColor:'white',backgroundColor:'white',});
        
        var refresh = Ti.UI.createView({
				height:40,
				width:'100%',
				layout:'vertical',
				left:0,
				top:0,
				backgroundColor:'#4bb392'
			});
 				var refresh_circle = Ti.UI.createImageView({
					image:'refresh.png',
					left:8,
					top:8,
					height:25,
					width:25
				});
			refresh.add(refresh_circle);
				
            refresh.addEventListener('click', function(){
				actInd.show();
					setTimeout(function()
					{
						actInd.hide();
					},1000);
    				chatbox.reload();
            		});
		win.add(refresh);
        Titanium.UI.currentWindow.add(tableview);
        tableview.addEventListener('click',function(e) {
            var w = Ti.UI.createWindow({title:e.row.heading});
            Titanium.App.Analytics.trackPageview('/issues/' + e.row.url);
            var wb = Ti.UI.createWebView({html:'<html><body><style type="text/css">img {width:100%;height:auto} body {font-family:Helvetica,Arial,sans-serif;width:85%;margin-left:7%;}h3 {color:#4bb392;} a {text-decoration:none;}</style><a href="' + e.row.url + '"><h3>' + e.row.heading + '</h3></a>' + e.row.content + '</body></html>'});
            w.add(wb);
            var b = Titanium.UI.createButton({
                title:'Close',
                style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            });
            w.setLeftNavButton(b);
            b.addEventListener('click',function()
            {
                w.close();
            });
            w.open({modal:true});
        });
    }
    catch(E)
    {
        alert(E);
    }
};
//xhr.send();
