(function() {
  function openUnreadNow(msg) {
      $("a.title:not([rel='nofollow'])").each(function() {
        browser.runtime.sendMessage({"url": this.href});
      })
  }

  browser.runtime.onMessage.addListener(openUnreadNow);

})();
