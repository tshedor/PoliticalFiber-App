var win = Titanium.UI.currentWindow;
var currentWindow = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';

// create table view data object
var data = [];
data.push(	{title:'Aggregated Links', hasChild:true, color:'black', test:'more/aggregated.js'});
data.push(	{title:'Enhanced Calendar', hasChild:true, color:'black', test:'more/enhanced_calendar.js'});
data.push(	{title:'About', hasChild:true, color:'black', test:'more/about.js'});
data.push(	{title:'Twitter', hasChild:true, color:'black', test:'more/twitter.js'});
data.push(	{title:'Feedback', hasChild:true, color:'black', test:'more/feedback.js'});
if (Titanium.Platform.name == 'android') {
	var titaniumBarcode = require('com.mwaysolutions.barcode');
	data.push({title:'Scan Code', hasChild:true, color:'black', scan_android:'seefunctionbelow'});
};
if (Titanium.Platform.name == 'iPhone OS') {
	var TiBar = require('tibar');
	data.push({title:'Scan Code', hasChild:true, scan_iphone:'seefunctionbelowforiphone'});
};
data.push(	{title:'Credits', hasChild:true, color:'black', test:'more/credits.js'});


// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	color:'#444444',
	rowBackgroundColor:'white',
	backgroundColor:'white',
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
	if (e.rowData.sendin)
	{
		Titanium.Platform.openURL('sms:7852898351');
	}
	if (e.rowData.scan_android)
	{
    	titaniumBarcode.scan({
        success: function (data) {
          if(data && data.barcode) {
			var wb = Ti.UI.createWebView({
                    url: data.barcode
                });
                win1.add(wb);
                } 
            else {
            alert(JSON.stringify(data));
          }
        },

        error: function (err) {
          alert('Error while scanning: ' + err);
        },

        cancel: function () {
          alert('Scan cancelled');
        }
      });

	}
	if (e.rowData.scan_iphone)
	{
		TiBar.scan({
        // simple configuration for iPhone simulator
        configure: {
                classType: "ZBarReaderController", // ZBarReaderViewController, ZBarReaderController
			    sourceType: "Camera", // Library(C), Camera(VC), Album(C)
    			cameraMode: "Default", // Default, Sampling, Sequence
    			config:{
        			"showsCameraControls":true, // (VC)
        			"showsZBarControls":true,
        			"tracksSymbols":true, // the tracking rectangle that highlights barcodes
        			"enableCache":true,
        			"showsHelpOnFail":true,
        			"takesPicture":false
    			},
                symbol:{
        			"QR-Code":true,
        			"CODE-128":false,
        			"CODE-39":false,
        			"I25":false,
        			"DataBar":false,
        			"DataBar-Exp":false,
        			"EAN-13":false,
        			"EAN-8":false,
        			"UPC-A":false,
        			"UPC-E":false,
        			"ISBN-13":false,
        			"ISBN-10":false,
        			"PDF417":false
    		}
        },
        success:function(data){
            Ti.API.info('TiBar success callback!');
            if(data && data.barcode){
var wb = Ti.UI.createWebView({
                    url: data.barcode
                });
                win.add(wb);
            }
        },
    });
	}
});
// add table view to the window
Titanium.UI.currentWindow.add(tableview);
