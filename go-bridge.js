/**
 * go.html: після повного load — Lead, потім відлік і редірект у Telegram.
 * Pixel уже в <head> вище; тут лише Lead і таймер.
 */
(function () {
  var TELEGRAM_URL = "https://t.me/+58oLkZvlFJJhNjdi";
  var REDIRECT_MS_OK = 3000;
  var REDIRECT_MS_NO_FBQ = 5000;

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
    setTimeout(goTelegram, ms);
  }

  window.addEventListener("load", function () {
    var hasFbq = typeof window.fbq === "function";
    var ms = hasFbq ? REDIRECT_MS_OK : REDIRECT_MS_NO_FBQ;

    try {
      if (hasFbq) fbq("track", "Lead");
    } catch (e) {}

    startCountdown(Math.ceil(ms / 1000));
    scheduleRedirect(ms);
  });
})();
