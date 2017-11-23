// Set up button

function openUnread() {
  var currentTab = browser.tabs.query({
    currentWindow: true, active: true
  });

  currentTab.then(function (tabs) {
        var reloading = browser.tabs.reload(tabs[0].id);
        reloading.then(function() {
            browser.tabs.sendMessage(
                tabs[0].id,
                {
                    "ReportLinks" : true
                }
            )
        });
    }, onError);
    var allTabs = browser.tabs.query({
        currentWindow : true
    });
    allTabs.then(function (tabs) {
        var foundActive = false;
        for (let tab of tabs) {
            if (foundActive) {
                browser.tabs.update(tab.id, { active: true });
                break;
            } else if (tab.active) {
                foundActive = true;
            }
        }
    })
}



function onError(error) {
  console.log(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(openUnread);

// Listen for new urls to open
browser.runtime.onMessage.addListener(newUrl);

function newUrl(urlToCheck) {
    // Check url and open tab if unread
    var gettingVisits = browser.history.getVisits({
      url: urlToCheck.url
    });
    gettingVisits.then(function(visits) {
        if (visits.length == 0) {
            var creating = browser.tabs.create({
                url: urlToCheck.url,
                active: false
            });
            creating.then(onCreated);
        }
    });
}
