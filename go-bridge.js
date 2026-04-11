/**
 * Тільки для go.html: після повного завантаження сторінки — Lead, потім редірект у Telegram.
 * Якщо fbq ще недоступний — короткий poll; якщо так і не завантажився — редірект через 5 с.
 */
(function () {
  var TELEGRAM_URL = "https://t.me/+58oLkZvlFJJhNjdi";
  var REDIRECT_MS_OK = 3000;
  var REDIRECT_MS_SLOW = 5000;
  var FBQ_WAIT_MS = 2000;
  var FBQ_TICK_MS = 100;

  var secEl = document.getElementById("bridge-sec");
  var label = document.getElementById("bridge-countdown");
  var timerId;

  function goTelegram() {
    if (timerId) clearInterval(timerId);
    if (label) label.textContent = "Відкриваємо Telegram…";
    window.location.href = TELEGRAM_URL;
  }

  var bridgeBtn = document.getElementById("bridge-now");
  if (bridgeBtn) bridgeBtn.addEventListener("click", goTelegram);

  function startCountdown(totalSec) {
    var sec = totalSec;
    if (secEl) secEl.textContent = String(sec);
    timerId = setInterval(function () {
      sec -= 1;
      if (secEl) secEl.textContent = String(Math.max(0, sec));
    }, 1000);
  }

  function scheduleRedirect(ms) {
    setTimeout(function () {
      goTelegram();
    }, ms);
  }

  function fireLead() {
    try {
      if (typeof fbq === "function") fbq("track", "Lead");
    } catch (e) {}
  }

  window.addEventListener("load", function () {
    var deadline = Date.now() + FBQ_WAIT_MS;

    function finish(ms) {
      var sec = Math.ceil(ms / 1000);
      fireLead();
      startCountdown(sec);
      scheduleRedirect(ms);
    }

    function tryAfterPixel() {
      if (typeof fbq === "function") {
        finish(REDIRECT_MS_OK);
        return;
      }
      if (Date.now() >= deadline) {
        finish(REDIRECT_MS_SLOW);
        return;
      }
      setTimeout(tryAfterPixel, FBQ_TICK_MS);
    }

    tryAfterPixel();
  });
})();
