const root = document.documentElement;
const slider = document.querySelector("#feet-slider");
const feetOutput = document.querySelector("#feet-output");
const meterOutput = document.querySelector("#meter-output");
const formula = document.querySelector("#formula");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const metaTheme = document.querySelector('meta[name="theme-color"]');

function updateConversion() {
    const feet = Number(slider.value);
    const meters = feet * 0.3048;
    feetOutput.textContent = `${feet} ft`;
    meterOutput.innerHTML = `${meters.toFixed(2)} <small>m</small>`;
    formula.textContent = `${feet} ft × 0.3048`;
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    root.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
    themeIcon.textContent = isDark ? "☾" : "☼";
    themeLabel.textContent = isDark ? "Dark" : "Light";
    metaTheme.setAttribute("content", isDark ? "#17201c" : "#f5f1e8");
    localStorage.setItem("feet-meter-theme", theme);
}

slider.addEventListener("input", updateConversion);
themeToggle.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const savedTheme = localStorage.getItem("feet-meter-theme");
if (savedTheme === "dark" || savedTheme === "light") applyTheme(savedTheme);
updateConversion();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}