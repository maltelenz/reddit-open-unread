var self = require("sdk/self");
let { search } = require("sdk/places/history");

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "open-unread-reddit",
  label: "Open All Unread",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: reloadTab
});

function urlVisited(urlin) {
	search(
	  { url: urlin + "*" },
	  { }
	).on("end", function (results) {
			if (results.length == 0) {
				// Not visited, open new page
				tabs.open({
					url: urlin,
					inBackground: true
				});
			}
		}
	);
}

function reloadTab(state) {
  tabs.activeTab.reload();
  tabs.activeTab.on("ready", handleClick);
}

function handleClick(state) {
  var worker = tabs.activeTab.attach({
      contentScriptFile: [self.data.url('jquery-2.2.1.min.js'),
                          self.data.url('open-unread.js')]
    });
  worker.port.on("url-to-check", function(response) {
    urlVisited(response);
  });

  var idx = tabs.activeTab.index;
  if (tabs.length > idx) {
    tabs[idx + 1].activate();
  }
}
