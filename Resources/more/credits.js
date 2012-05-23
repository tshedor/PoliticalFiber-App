var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/credits');
	});

var tv = Ti.UI.createTableView({minRowHeight:80,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'The Political Fiber Staff includes Editor Brianne Pfannenstiel, Online Editor Kelly Stroda and Knight Chair and Professor of Journalism, Adviser Pam Fine. This app was produced by Tim Shedor.';
var tixt2 = 'This app is made up of code, images, and other parts that are protected by the Creative Commons license and the Open Source License, produced by the Open Source Initiative. The issues icon (appearing above the Issues tabs) was produced by The Working Group (www.theworkinggroup.ca). The calendar icon (appearing above the Calendar tab) was  produced by PixelPress Media Design (www.pixelpressicons.com). The barcode scanning tool was written with foundational code from the ZBar proejct.';
var taxt2 = 'This app is made up of code, images, and other parts that are protected by the Creative Commons license and the Open Source License, produced by the Open Source Initiative. The issues icon (appearing above the Issues tab) was produced by The Working Group (www.theworkinggroup.ca). The calendar icon (appearing above the Calendar tab) was produced by PixelPress Media Design (www.pixelpressicons.com). The barcode scanning tool was written with foundational code from M-Way Solutions.';

var data = [];

	var row = Ti.UI.createTableViewRow({height:'auto',className:"row"});
	
	var textView = Ti.UI.createView({
		height:'auto',
		layout:'vertical',
		left:20,
		top:20,
		bottom:60,
		right:20
	});
	
	var l1 = Ti.UI.createLabel({
		text:text1,
		color:'black',
		height:'auto'
	});
	textView.add(l1);
if (Titanium.Platform.name == 'android') {
	var l2 = Ti.UI.createLabel({
		text:taxt2,
		top:10,
		color:'black',
		height:'auto',
		bottom:20,
	});
	textView.add(l2);
};
if (Titanium.Platform.name == 'iPhone OS') {
	var l2 = Ti.UI.createLabel({
		text:tixt2,
		top:10,
		color:'black',
		height:'auto'
	});
	textView.add(l2);
};

	
	row.add(textView);

	data.push(row);

tv.setData(data);

win.add(tv);