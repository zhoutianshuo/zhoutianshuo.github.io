// Simple bilingual dictionary + helpers for the lunar calendar site.
const I18N = {
  en: {
    todayTitle: "Today",
    selectedTitle: "Selected Date",
    gregorian: "Gregorian",
    lunar: "Lunar",
    goToday: "Today",
    solarTerm: "Solar Term",
    prevYear: "Previous year",
    nextYear: "Next year",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    weekdaysShort: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  },
  zh: {
    todayTitle: "今天",
    selectedTitle: "选定日期",
    gregorian: "公历",
    lunar: "农历",
    goToday: "回到今天",
    solarTerm: "节气",
    prevYear: "上一年",
    nextYear: "下一年",
    prevMonth: "上个月",
    nextMonth: "下个月",
    weekdaysShort: ["日","一","二","三","四","五","六"],
    monthNames: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  }
};

let currentLang = "en";

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    el.title = t(key);
  });
  document.title = currentLang === "zh" ? "农历与公历查询" : "Lunar & Gregorian Calendar";
  document.getElementById("siteTitle").textContent = currentLang === "zh"
    ? "农历与公历查询"
    : "Lunar & Gregorian Calendar";
}
