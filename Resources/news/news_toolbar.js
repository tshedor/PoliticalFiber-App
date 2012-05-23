var win = Titanium.UI.currentWindow;

//
// HORIZONTAL SCROLLING TABS
//
var scrollView = Titanium.UI.createScrollView({
	contentWidth:160,
	contentHeight:40,
	top:0,
	left:40,
	height:40,
	width:'100%',
	backgroundColor:'#4bb392'
});

scrollView.addEventListener('scroll', function(e)
{
	Ti.API.info('x ' + e.x + ' y ' + e.y);

});

win.add(scrollView);

var articles = Titanium.UI.createLabel({
			text:'Articles',
			left: 10,
			height:30,
			color:'#fff',
		});
	articles.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/articles');
	});
	articles.addEventListener('click',function(e){
    	var articleswindow = Ti.UI.createWindow({
            url:"articles.js",
            title:"Articles"
    });
		Titanium.UI.currentTab.open(articleswindow,{animated:true});
	});
scrollView.add(articles);
var opinion = Titanium.UI.createLabel({
			text:'Opinion',
			left: 80,
			height:30,
			color:'#fff',
		});
	opinion.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/opinion');
	});
	opinion.addEventListener('click',function(e){
    	var opinionwindow = Ti.UI.createWindow({
            url:"opinion.js",
            title:"Opinion"
    });
		Titanium.UI.currentTab.open(opinionwindow,{animated:true});
	});
scrollView.add(opinion);
win.add(scrollView);
