(function () {
  "use strict";

  let viewDate = new Date(); // controls which month the grid shows
  let selectedDate = null; // {year, month, day} of the clicked cell, or null

  // Index matches Lunar#getYearZhiIndex() (0=Rat/Zi .. 11=Pig/Hai)
  const ZODIAC_ICON = ["rat","ox","tiger","rabbit","loong","snake","horse","sheep","monkey","rooster","dog","pig"];

  function zodiacIconPath(zhiIndex) {
    return "assets/zodiac/" + ZODIAC_ICON[zhiIndex] + ".png";
  }

  function syncLibraryLanguage() {
    I18n.setLanguage(currentLang === "zh" ? "chs" : "en");
  }

  function formatSolarDate(solar) {
    if (currentLang === "zh") {
      return `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日`;
    }
    return `${t("monthNames")[solar.getMonth() - 1]} ${solar.getDay()}, ${solar.getYear()}`;
  }

  function formatWeekday(solar) {
    const idx = solar.getWeek(); // 0 = Sunday
    const name = t("weekdaysShort")[idx];
    return currentLang === "zh" ? `星期${["日","一","二","三","四","五","六"][idx]}` : name;
  }

  function formatLunarMonthDay(lunar, short) {
    if (currentLang === "zh") {
      return lunar.getMonthInChinese() + "月" + lunar.getDayInChinese();
    }
    const leap = lunar.getMonth() < 0;
    const m = Math.abs(lunar.getMonth());
    if (short) return (leap ? "L" : "") + m + "/" + lunar.getDay();
    return (leap ? "Leap " : "") + "Month " + m + ", Day " + lunar.getDay();
  }

  function formatLunarYear(lunar) {
    if (currentLang === "zh") {
      return lunar.getYearInGanZhi() + "年";
    }
    return lunar.getYearGan() + " " + lunar.getYearZhi() + " Year";
  }

  // English names the library leaves in Chinese (its weekday-rule festivals and
  // two lunar ones) or gets wrong.
  const FESTIVAL_EN = {
    "龙头节": "Dragon Head Festival",
    "重阳节": "Double Ninth Festival",
    "母亲节": "Mother's Day",
    "父亲节": "Father's Day",
    "世界住房日": "World Habitat Day",
    "全国中小学生安全教育日": "National School Safety Education Day",
    "全国助残日": "National Day for Helping the Disabled",
    "全民国防教育日": "National Defense Education Day",
    "Luna New Year": "Lunar New Year",
    "International Worker's Day": "International Workers' Day",
    "Begging Festival": "Qixi Festival",
    "All Saints' Eve": "Halloween",
  };
  const HAS_CJK = /[㐀-鿿]/;

  // Not shown in either language. Thanksgiving is already shown by the US
  // holiday list below.
  const FESTIVAL_HIDDEN = ["感恩节", "建党节", "Party's Day"];

  // Solar-term names, in the usual English translations, where the library's differ
  const SOLAR_TERM_EN = {
    "Spring Beginning": "Beginning of Spring",
    "Awakening from Hibernation": "Awakening of Insects",
    "Fresh Green": "Pure Brightness",
  };

  function localizeSolarTerm(name) {
    return (currentLang === "en" && SOLAR_TERM_EN[name]) || name;
  }

  function localizeFestival(name) {
    if (FESTIVAL_HIDDEN.includes(name)) return null;
    if (currentLang !== "en") return name;
    if (Object.prototype.hasOwnProperty.call(FESTIVAL_EN, name)) return FESTIVAL_EN[name];
    // anything else still in Chinese is a future library addition; hide it
    // rather than mix languages
    return HAS_CJK.test(name) ? null : name;
  }

  function collectFestivals(solar, lunar, includeMinor) {
    const list = [];
    lunar.getFestivals().forEach(f => list.push(f));
    // Jan 1 / Dec 25 are covered by the more precise US federal holiday list below.
    const md = solar.getMonth() + "-" + solar.getDay();
    if (md !== "1-1" && md !== "12-25") {
      solar.getFestivals().forEach(f => list.push(f));
    }
    if (includeMinor && currentLang === "zh") {
      lunar.getOtherFestivals().forEach(f => list.push(f));
      solar.getOtherFestivals().forEach(f => list.push(f));
    }
    return list.map(localizeFestival).filter(f => f);
  }

  // ---------- US federal holidays ----------
  // weekday: 0=Sun .. 6=Sat. rule types: 'fixed' (month/day), 'nth' (nth weekday
  // of month), 'last' (last weekday of month).
  const US_HOLIDAYS = [
    { en: "New Year's Day", zh: "元旦", rule: { type: "fixed", month: 1, day: 1 } },
    { en: "Martin Luther King Jr. Day", zh: "马丁·路德·金纪念日", rule: { type: "nth", month: 1, weekday: 1, n: 3 } },
    { en: "Washington's Birthday", zh: "总统日（华盛顿诞辰纪念日）", rule: { type: "nth", month: 2, weekday: 1, n: 3 } },
    { en: "Memorial Day", zh: "阵亡将士纪念日", rule: { type: "last", month: 5, weekday: 1 } },
    { en: "Juneteenth", zh: "六月节", rule: { type: "fixed", month: 6, day: 19 } },
    { en: "Independence Day", zh: "美国独立日", rule: { type: "fixed", month: 7, day: 4 } },
    { en: "Labor Day", zh: "美国劳动节", rule: { type: "nth", month: 9, weekday: 1, n: 1 } },
    { en: "Columbus Day", zh: "哥伦布日", rule: { type: "nth", month: 10, weekday: 1, n: 2 } },
    { en: "Veterans Day", zh: "退伍军人节", rule: { type: "fixed", month: 11, day: 11 } },
    { en: "Thanksgiving Day", zh: "感恩节", rule: { type: "nth", month: 11, weekday: 4, n: 4 } },
    { en: "Christmas Day", zh: "圣诞节", rule: { type: "fixed", month: 12, day: 25 } },
  ];

  function nthWeekdayOfMonth(year, month, weekday, n) {
    const first = new Date(year, month - 1, 1);
    const day = 1 + ((7 + weekday - first.getDay()) % 7) + (n - 1) * 7;
    return new Date(year, month - 1, day);
  }

  function lastWeekdayOfMonth(year, month, weekday) {
    const lastDay = new Date(year, month, 0).getDate();
    const last = new Date(year, month - 1, lastDay);
    return new Date(year, month - 1, lastDay - ((last.getDay() - weekday + 7) % 7));
  }

  function holidayDateForYear(year, rule) {
    if (rule.type === "fixed") return new Date(year, rule.month - 1, rule.day);
    if (rule.type === "nth") return nthWeekdayOfMonth(year, rule.month, rule.weekday, rule.n);
    return lastWeekdayOfMonth(year, rule.month, rule.weekday);
  }

  // Federal holidays falling on a fixed date are observed the nearest weekday
  // when they land on a weekend (Sat -> Fri before, Sun -> Mon after).
  function observedDate(date) {
    if (date.getDay() === 6) return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    if (date.getDay() === 0) return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    return date;
  }

  function usHolidaysForYear(year) {
    const map = new Map();
    const add = (date, label) => {
      const key = (date.getMonth() + 1) + "-" + date.getDate();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(label);
    };
    US_HOLIDAYS.forEach(h => {
      const actual = holidayDateForYear(year, h.rule);
      const label = currentLang === "zh" ? h.zh : h.en;
      add(actual, label);
      if (h.rule.type === "fixed") {
        const obs = observedDate(actual);
        if (obs.getTime() !== actual.getTime()) {
          add(obs, label + (currentLang === "zh" ? "（观察日）" : " (observed)"));
        }
      }
    });
    return map;
  }

  function usHolidaysFor(yearMap, month, day) {
    return yearMap.get(month + "-" + day) || [];
  }

  // ---------- Date card (shared by "Today" and "Selected Date") ----------
  function renderDateCard(prefix, solar, lunar) {
    document.getElementById(prefix + "Solar").textContent = formatSolarDate(solar);
    document.getElementById(prefix + "Weekday").textContent = formatWeekday(solar);
    document.getElementById(prefix + "Lunar").textContent =
      formatLunarYear(lunar) + " · " + formatLunarMonthDay(lunar, false);
    document.getElementById(prefix + "GanZhi").textContent =
      (currentLang === "zh" ? "生肖：" : "Zodiac: ") + lunar.getYearShengXiao() +
      "  ·  " + (currentLang === "zh" ? "日干支：" : "Day: ") + lunar.getDayInGanZhi();

    const zodiacIcon = document.getElementById(prefix + "ZodiacIcon");
    zodiacIcon.src = zodiacIconPath(lunar.getYearZhiIndex());
    zodiacIcon.alt = lunar.getYearShengXiao();

    const extraParts = [];
    const jq = localizeSolarTerm(lunar.getJieQi());
    if (jq) {
      extraParts.push(`<span class="tag tag-term">${t("solarTerm")}: ${jq}</span>`);
    }
    const fests = collectFestivals(solar, lunar, true);
    fests.forEach(f => extraParts.push(`<span class="tag tag-festival">${f}</span>`));
    const holidays = usHolidaysFor(usHolidaysForYear(solar.getYear()), solar.getMonth(), solar.getDay());
    holidays.forEach(h => extraParts.push(`<span class="tag tag-holiday">${h}</span>`));
    document.getElementById(prefix + "Extra").innerHTML = extraParts.join(" ");
  }

  function renderToday() {
    syncLibraryLanguage();
    const solar = Solar.fromDate(new Date());
    const lunar = solar.getLunar();
    renderDateCard("today", solar, lunar);
    document.getElementById("favicon").href = zodiacIconPath(lunar.getYearZhiIndex());
  }

  function renderSelected() {
    if (!selectedDate) return;
    syncLibraryLanguage();
    const solar = Solar.fromYmd(selectedDate.year, selectedDate.month, selectedDate.day);
    const lunar = solar.getLunar();
    renderDateCard("selected", solar, lunar);
    document.getElementById("selectedCard").hidden = false;
  }

  function selectDate(year, month, day) {
    selectedDate = { year, month, day };
    renderSelected();
    renderCalendar();
    document.getElementById("selectedCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ---------- Month calendar ----------
  const YEAR_MIN = 1900;
  const YEAR_MAX = 2100;

  function populateCalendarSelectors(year, month) {
    const monthSel = document.getElementById("monthSelect");
    monthSel.innerHTML = "";
    t("monthNames").forEach((name, i) => {
      const opt = document.createElement("option");
      opt.value = i + 1;
      opt.textContent = name;
      monthSel.appendChild(opt);
    });
    monthSel.value = month;

    const yearSel = document.getElementById("yearSelect");
    const suffix = currentLang === "zh" ? "年" : "";
    yearSel.innerHTML = "";
    for (let y = YEAR_MIN; y <= YEAR_MAX; y++) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y + suffix;
      yearSel.appendChild(opt);
    }
    yearSel.value = year;
  }

  function renderCalendar() {
    syncLibraryLanguage();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth() + 1; // 1-12

    populateCalendarSelectors(year, month);

    const weekdaysRow = document.getElementById("calWeekdays");
    weekdaysRow.innerHTML = "";
    t("weekdaysShort").forEach(w => {
      const el = document.createElement("div");
      el.className = "weekday-cell";
      el.textContent = w;
      weekdaysRow.appendChild(el);
    });

    const grid = document.getElementById("calGrid");
    grid.innerHTML = "";

    const firstOfMonth = new Date(year, month - 1, 1);
    const startWeekday = firstOfMonth.getDay(); // 0 Sun
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

    const todayReal = new Date();
    const isCurrentMonthShown = todayReal.getFullYear() === year && todayReal.getMonth() + 1 === month;

    // The grid can spill into the adjacent year at either edge, so cache maps per year seen.
    const holidayMapsByYear = {};
    const getHolidayMap = (y) => holidayMapsByYear[y] || (holidayMapsByYear[y] = usHolidaysForYear(y));

    const totalCells = 42;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "day-cell";

      let cellYear = year, cellMonth = month, dayNum, otherMonth = false;
      if (i < startWeekday) {
        dayNum = daysInPrevMonth - startWeekday + i + 1;
        cellMonth = month - 1 || 12;
        cellYear = month - 1 ? year : year - 1;
        otherMonth = true;
      } else if (i >= startWeekday + daysInMonth) {
        dayNum = i - startWeekday - daysInMonth + 1;
        cellMonth = month === 12 ? 1 : month + 1;
        cellYear = month === 12 ? year + 1 : year;
        otherMonth = true;
      } else {
        dayNum = i - startWeekday + 1;
      }

      if (otherMonth) cell.classList.add("other-month");
      if (i % 7 === 0 || i % 7 === 6) cell.classList.add("weekend");

      const solar = Solar.fromYmd(cellYear, cellMonth, dayNum);
      const lunar = solar.getLunar();

      if (!otherMonth && isCurrentMonthShown && dayNum === todayReal.getDate()) {
        cell.classList.add("is-today");
      }
      if (selectedDate && selectedDate.year === cellYear && selectedDate.month === cellMonth && selectedDate.day === dayNum) {
        cell.classList.add("is-selected");
      }

      const lunarLabel = lunar.getDay() === 1
        ? (currentLang === "zh" ? lunar.getMonthInChinese() + "月" : "M" + Math.abs(lunar.getMonth()))
        : (currentLang === "zh" ? lunar.getDayInChinese() : String(lunar.getDay()));

      const fests = collectFestivals(solar, lunar);
      const holidays = usHolidaysFor(getHolidayMap(cellYear), cellMonth, dayNum);
      const jq = localizeSolarTerm(lunar.getJieQi());
      const isLunarNewYear = lunar.getMonth() === 1 && lunar.getDay() === 1;

      cell.innerHTML = `
        <div class="day-num">${dayNum}</div>
        <div class="day-lunar">${lunarLabel}</div>
        ${isLunarNewYear ? `<img class="zodiac-icon-xs" src="${zodiacIconPath(lunar.getYearZhiIndex())}" alt="${lunar.getYearShengXiao()}" title="${lunar.getYearShengXiao()}">` : ""}
        ${jq ? `<div class="day-tag term">${jq}</div>` : ""}
        ${holidays.length ? `<div class="day-tag holiday" title="${holidays.join(", ")}">${holidays[0]}</div>` : ""}
        ${fests.length ? `<div class="day-tag fest" title="${fests.join(", ")}">${fests[0]}</div>` : ""}
      `;
      cell.addEventListener("click", () => selectDate(cellYear, cellMonth, dayNum));
      grid.appendChild(cell);
    }
  }

  function renderAll() {
    applyStaticTranslations();
    renderToday();
    renderCalendar();
    renderSelected();
  }

  // ---------- Events ----------
  document.getElementById("btnEn").addEventListener("click", () => setLang("en"));
  document.getElementById("btnZh").addEventListener("click", () => setLang("zh"));

  function setLang(lang) {
    currentLang = lang;
    document.getElementById("btnEn").classList.toggle("active", lang === "en");
    document.getElementById("btnZh").classList.toggle("active", lang === "zh");
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    renderAll();
  }

  document.getElementById("prevMonth").addEventListener("click", () => {
    const nd = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    if (nd.getFullYear() < YEAR_MIN) return;
    viewDate = nd;
    renderCalendar();
  });
  document.getElementById("nextMonth").addEventListener("click", () => {
    const nd = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    if (nd.getFullYear() > YEAR_MAX) return;
    viewDate = nd;
    renderCalendar();
  });
  document.getElementById("prevYear").addEventListener("click", () => {
    const ny = viewDate.getFullYear() - 1;
    if (ny < YEAR_MIN) return;
    viewDate = new Date(ny, viewDate.getMonth(), 1);
    renderCalendar();
  });
  document.getElementById("nextYear").addEventListener("click", () => {
    const ny = viewDate.getFullYear() + 1;
    if (ny > YEAR_MAX) return;
    viewDate = new Date(ny, viewDate.getMonth(), 1);
    renderCalendar();
  });
  document.getElementById("monthSelect").addEventListener("change", (e) => {
    viewDate = new Date(viewDate.getFullYear(), parseInt(e.target.value, 10) - 1, 1);
    renderCalendar();
  });
  document.getElementById("yearSelect").addEventListener("change", (e) => {
    viewDate = new Date(parseInt(e.target.value, 10), viewDate.getMonth(), 1);
    renderCalendar();
  });
  document.getElementById("gotoToday").addEventListener("click", () => {
    viewDate = new Date();
    renderCalendar();
  });

  // init
  (function init() {
    setLang("zh");
  })();

})();
