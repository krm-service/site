/**
 * /go: після повного завантаження сторінки (load) — затримка 300 ms → Lead;
 * окремо через 2500 ms від того ж load — редірект у Telegram.
 * Діагностика: у консолі typeof fbq === "function"; у Network — facebook.com/tr?id=...
 */
(function () {
  var TELEGRAM_URL = "https://t.me/+58oLkZvlFJJhNjdi";
  var LEAD_AFTER_LOAD_MS = 300;
  var REDIRECT_AFTER_LOAD_MS = 2500;

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

  window.addEventListener("load", function () {
    startCountdown(Math.ceil(REDIRECT_AFTER_LOAD_MS / 1000));

    setTimeout(function () {
      try {
        if (typeof fbq === "function") fbq("track", "Lead");
      } catch (e) {}
    }, LEAD_AFTER_LOAD_MS);

    setTimeout(function () {
      goTelegram();
    }, REDIRECT_AFTER_LOAD_MS);
  });
})();
