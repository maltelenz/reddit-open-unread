
self.port.on("open-url", openUrl);

function openUrl(url) {
  window.open(url);
}

$("a.title").not("[rel]").each(function() {
self.port.emit("url-to-check", this.href);
})

