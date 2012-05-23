var win = Titanium.UI.currentWindow;

	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/aggregated');
	});
var actInd = Titanium.UI.createActivityIndicator({
    bottom:10,
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

var chatbox = Titanium.UI.createWebView({top:40,url:'http://politicalfiber.com/news-links/'});
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
win.add(chatbox);