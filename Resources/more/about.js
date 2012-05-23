var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/about-bargains');
	});
win.backgroundColor = '#fff';

var tv = Ti.UI.createTableView({minRowHeight:50,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'Mission Statement';
var text2 = 'To provide University of Kansas students and other young Kansans with lively, high-quality reporting, analysis and conversation about the political issues that most affect them.';

var data = [];

	var row = Ti.UI.createTableViewRow({height:'auto',className:"row",});
	
	var textView = Ti.UI.createView({
		height:'auto',
		layout:'vertical',
		left:20,
		top:20,
		bottom:60,
		right:20,
	});
	
	var l1 = Ti.UI.createLabel({
		text:text1,
		height:'auto',
		color:'black',
		font:{fontWeight:'bold',fontSize:18},		
	});
	textView.add(l1);

	var l2 = Ti.UI.createLabel({
		text:text2,
		top:10,
		color:'black',
		height:'auto'
	});
	textView.add(l2);
	
	row.add(textView);

	data.push(row);

tv.setData(data);

win.add(tv);