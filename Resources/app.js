Titanium.UI.setBackgroundColor('#fff');
var window = Titanium.UI.currentWindow;
Titanium.UI.iPhone.appBadge=Titanium.UI.iPhone.appBadge-1;

//Set up analytics
Titanium.include('analytics.js');
var analytics = new Analytics('UA-27274618-1');
// Call the next function if you want to reset the analytics to a new first time visit.
// This is useful for development only and should not go into a production app.
//analytics.reset();

// The analytics object functions must be called on app.js otherwise it will loose it's context
Titanium.App.addEventListener('analytics_trackPageview', function(e){
	analytics.trackPageview('/app' + e.pageUrl);
});

Titanium.App.addEventListener('analytics_trackEvent', function(e){
	analytics.trackEvent(e.category, e.action, e.label, e.value);
});


// I've set a global Analytics object to contain the two functions to make it easier to fire the analytics events from other windows
Titanium.App.Analytics = {
	trackPageview:function(pageUrl){
		Titanium.App.fireEvent('analytics_trackPageview', {pageUrl:pageUrl});
	},
	trackEvent:function(category, action, label, value){
		Titanium.App.fireEvent('analytics_trackEvent', {category:category, action:action, label:label, value:value});
	}
}

// Starts a new session as long as analytics.enabled = true
// Function takes an integer which is the dispatch interval in seconds
analytics.start(10);
var tabGroup = Ti.UI.createTabGroup();

// create news window
var newswin = Ti.UI.createWindow({  
    title:'News',
//    tabBarHidden: true,
	url:'news/articles.js',
});

// craete newstab
var newstab = Ti.UI.createTab({  
    icon:'tabs/news.png',
    title:'News',
    window:newswin
});

// create issues window
var issueswin = Ti.UI.createWindow({  
    title:'Issues',
	url:'issues.js'
});


// craete tab2
var issuestab = Ti.UI.createTab({ 
    icon:'tabs/issues.png',
    title:'Issues',
    window:issueswin
});

// create calendar window
var calendarwin = Ti.UI.createWindow({  
    title:'Calendar',
	url:'calendar.js'
});

// craete calendartab
var calendartab = Ti.UI.createTab({ 
    icon:'tabs/calendar.png',
    title:'Calendar',
    window:calendarwin
});

// create aggregated window
var aggregatedwin = Ti.UI.createWindow({  
    title:'Aggregated',
	url:'aggregated.js'
});

// craete aggregatedtab
var aggregatedtab = Ti.UI.createTab({ 
    icon:'tabs/aggregated.png',
    title:'Aggregated',
    window:aggregatedwin
});

// create bargain window
var morewin = Ti.UI.createWindow({  
    title:'More',
	url:'more.js'
});

// craete bargaintab
var moretab = Ti.UI.createTab({  
    icon:'tabs/info.png',
    title:'More',
    window:morewin
});
newswin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/news');
});
issueswin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/issues');
});
calendarwin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/calendar');
});
aggregatedwin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/aggregated');
});
morewin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/more');
});
// add the tab to the tab group
tabGroup.addTab(newstab);
tabGroup.addTab(issuestab);
tabGroup.addTab(calendartab);
tabGroup.addTab(moretab);

//tabGroup.addEventListener('open', checkReminderToRate);
tabGroup.open();

function checkReminderToRate() {
    var now = new Date().getTime();
    var remindToRate = Ti.App.Properties.getString('RemindToRate');
    if (!remindToRate) {
        Ti.App.Properties.setString('RemindToRate', now);
    }
    else if (remindToRate < now) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Rate the UDK',
            message: 'Would you please rate the UDK app?',
            buttonNames: ['OK', 'Remind Me', 'Never'],
            cancel: 2
        });
        alertDialog.addEventListener('click', function(evt) {
            switch (evt.index) {
                case 0:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    // NOTE: replace this with your own iTunes link; also, this won't WON'T WORK IN THE SIMULATOR!
                    if (Ti.Android) {
                        Ti.Platform.openURL('https://market.android.com/details?id=com.udk.mobile');
                    }
                    else {
                        Ti.Platform.openURL('http://itunes.apple.com/us/app/the-university-daily-kansan/id453624902?ls=1&mt=8');
                    }
                    break;
                case 1:
                    // "Remind Me Later"? Ok, we'll remind them tomorrow when they launch the app.
                    Ti.App.Properties.setString('RemindToRate', now + (1000 * 60 * 60 * 24));
                    break;
                case 2:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    break;
            }
        });
        alertDialog.show();
    }
};