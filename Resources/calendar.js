var win = Titanium.UI.currentWindow;
var currentWindow = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';
var feed = 'http://politicalfiber.com/app/new_cal_feed.php';
Titanium.UI.iPhone.appBadge=Titanium.UI.iPhone.appBadge-1;

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
            var title = item.getElementsByTagName("title").item(0).text;
            var row = Ti.UI.createTableViewRow({height:60, hasChild:true,});
            var label = Ti.UI.createLabel({
                text:title,
				color:'#444444',
                left:20,
                top:5,
                bottom:5,
                right:20,          
            });
            row.add(label);
            data[x++] = row;
            row.url = item.getElementsByTagName("description").item(0).text;
			row.heading = item.getElementsByTagName("title").item(0).text;
        }

        var tableview = Titanium.UI.createTableView({data:data,top:40,rowBackgroundColor:'white',backgroundColor:'white',});
        Titanium.UI.currentWindow.add(tableview);
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
        tableview.addEventListener('click',function(e)
        
        {
            var w = Ti.UI.createWindow({title:e.row.heading});
            var textView = Ti.UI.createView({
				layout:'vertical',
				backgroundColor:'#ffffff',
				height: 'auto',
				left:'0',
				top:'0',
			});
            w.add(textView);
			var l1 = Ti.UI.createLabel({
				text:e.row.url,
				color:'black',
				height:'auto',
				left:20,
				top:20,
				bottom:60,
				right:20,
			});
			textView.add(l1);
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
