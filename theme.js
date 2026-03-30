(function () {
  var KEY = "krm-theme";
  var root = document.documentElement;

  function apply(theme) {
    if (theme !== "light" && theme !== "dark") theme = "dark";
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}

    var meta = document.getElementById("meta-theme-color");
    if (meta) meta.setAttribute("content", theme === "light" ? "#eef3fb" : "#050914");

    var apple = document.getElementById("meta-apple-status");
    if (apple) apple.setAttribute("content", theme === "light" ? "default" : "black-translucent");

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var label = theme === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }
  }

  document.getElementById("theme-toggle")?.addEventListener("click", function () {
    apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  apply(root.getAttribute("data-theme") || "dark");
})();
