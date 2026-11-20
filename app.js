/* الأمن السيبراني في 10 دقائق — منطق الموقع */
(function () {
  "use strict";

  /* ---------- الشعار ---------- */
  var LOGO = '<img src="assets/logo.webp" alt="10 دقائق — خارطة طريق الأمن السيبراني، من الصفر إلى الاحتراف" width="900" height="684">';
  var LOGO_SMALL = '<img src="assets/logo-small.webp" alt="10 دقائق — خارطة طريق الأمن السيبراني" width="300" height="228">';

  /* ---------- أيقونات المستويات ---------- */
  var S = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  var ICONS = {
    start:  S + '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    pc:     S + '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    os:     S + '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18"/><path d="m7 12 3 2-3 2M12 16h4"/></svg>',
    net:    S + '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="#fff"/></svg>',
    bug:    S + '<rect x="7" y="7" width="10" height="13" rx="5"/><path d="M9 4l1.5 3M15 4l-1.5 3M3 12h4M17 12h4M4 18l3-2M20 18l-3-2M4 7l3 2M20 7l-3 2M12 11v8"/></svg>',
    shield: S + '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    job:    S + '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    play:   S + '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5 3.5-5 3.5z" fill="#fff"/></svg>'
  };
  function icon(lv) { return '<div class="app-ic">' + (ICONS[lv.icon] || ICONS.play) + '</div>'; }

  /* ---------- الشريط العلوي ---------- */
  var NI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var top = document.getElementById("top");
  if (top) top.innerHTML =
    '<a class="logo" href="index.html" aria-label="الصفحة الرئيسية">' + LOGO_SMALL + '</a>' +
    '<nav class="top-nav" aria-label="القائمة الرئيسية">' +
      '<a href="index.html#map" class="on">' + NI + '<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/></svg><span>المبتدئ</span></a>' +
      '<a class="soon" aria-disabled="true">' + NI + '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg><span>المتوسط</span><small>قريبًا</small></a>' +
      '<a class="soon" aria-disabled="true">' + NI + '<circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 7.2v9.6M18 11.2c0 4-6 3-12 6"/></svg><span>المتقدم</span><small>قريبًا</small></a>' +
      '<a class="soon" aria-disabled="true">' + NI + '<circle cx="12" cy="9" r="5.5"/><path d="m8.8 13.6-1.3 7 4.5-2.4 4.5 2.4-1.3-7"/></svg><span>الشهادات</span><small>قريبًا</small></a>' +
    '</nav>' +
    '<a class="btn btn-small start-btn" href="level.html?l=b0">ابدأ الآن</a>';
  var hl = document.getElementById("hero-logo"); if (hl) hl.innerHTML = LOGO;
  var yr = document.getElementById("year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- حفظ التقدّم (في هذا المتصفح فقط) ---------- */
  var KEY = "arcyber-done", done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { done = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }
  function countDone(lv) { return lv.lessons.filter(function (r) { return done[r[0]]; }).length; }
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  var TOTAL = 0; LEVELS.forEach(function (lv) { TOTAL += lv.lessons.length; });

  /* ---------- نافذة الدرس ---------- */
  var overlay = document.getElementById("overlay"), cur = null, onChange = function () {};
  function openLesson(lv, r) {
    cur = r[0];
    var p = overlay.querySelector(".panel"); p.style.setProperty("--c", lv.color);
    document.getElementById("p-track").textContent = lv.name + " · " + lv.title + " · الدرس " + r[0];
    document.getElementById("p-title").textContent = r[1];
    var vid = VIDEOS[r[0]], box = document.getElementById("p-video");
    box.innerHTML = vid
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vid) + '" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen title="' + esc(r[1]) + '"></iframe>'
      : '<div class="ph"><div>🎬</div>سيُضاف فيديو هذا الدرس قريبًا</div>';
    var lab = document.getElementById("p-lab"); lab.hidden = !r[2];
    lab.textContent = "🔒 لهذا الدرس مختبر تطبيقي — سيتوفر قريبًا.";
    paintBtn(); overlay.hidden = false; document.body.style.overflow = "hidden";
  }
  function paintBtn() {
    var b = document.getElementById("p-done");
    b.textContent = done[cur] ? "✔ تمّ — إلغاء" : "وضع علامة: تمّ";
    b.classList.toggle("is-done", !!done[cur]);
  }
  function closePanel() { overlay.hidden = true; document.body.style.overflow = ""; }
  if (overlay) {
    document.getElementById("p-close").onclick = closePanel;
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closePanel(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) closePanel(); });
    document.getElementById("p-done").onclick = function () {
      if (done[cur]) delete done[cur]; else done[cur] = 1;
      save(); paintBtn(); onChange();
    };
  }

  /* ---------- الصفحة الرئيسية: خريطة الطريق ---------- */
  var map = document.getElementById("map");
  if (map) {
    var chips = document.getElementById("chips");
    LEVELS.forEach(function (lv) {
      var a = document.createElement("a"); a.href = "#" + lv.id; a.style.setProperty("--c", lv.color);
      a.innerHTML = "<i></i>" + esc(lv.name); chips.appendChild(a);
    });

    var nodes = {};
    function card(lv, flip) {
      var el = document.createElement("div"); el.className = "lv" + (flip ? " flip" : ""); el.id = lv.id;
      el.style.setProperty("--c", lv.color);
      var items = lv.lessons.map(function (r) {
        return '<a class="fl-item" data-n="' + esc(r[0]) + '" href="level.html?l=' + lv.id + '&n=' + encodeURIComponent(r[0]) + '"><span class="fl-dot"></span><span>' + esc(r[0]) + " · " + esc(r[1]) + (r[2] ? " 🔒" : "") + "</span></a>";
      }).join("");
      el.innerHTML =
        '<a class="lv-card" href="level.html?l=' + lv.id + '"><span class="badge">' + esc(lv.name) + "</span>" + icon(lv) +
        "<h2>" + esc(lv.title) + '</h2><div class="lv-meta"></div><div class="lv-bar"><i></i></div>' +
        (lv.jobReady ? '<div class="job">' + esc(lv.jobReady) + "</div>" : "") + "</a>" +
        '<div class="flyout"><div class="flyout-card"><div class="fl-head">' + esc(lv.name) + " · " + esc(lv.title) + "</div>" + items + "</div></div>";
      nodes[lv.id] = el; return el;
    }
    // الجذع: 0 ثم 1 ثم 2 — ثم فرعان: 3 و 4 — ثم 5 ثم 6 ثم الهدف
    [0, 1, 2].forEach(function (i) { map.appendChild(card(LEVELS[i])); });
    var br = document.createElement("div"); br.className = "branches";
    br.appendChild(card(LEVELS[3], false)); br.appendChild(card(LEVELS[4], true)); map.appendChild(br);
    [5, 6].forEach(function (i) { map.appendChild(card(LEVELS[i])); });
    var goal = document.createElement("div"); goal.className = "goal"; goal.id = "goal";
    goal.innerHTML = "<span>🎯</span>أنهيت مرحلة المبتدئ — المرحلة المتوسطة قريبًا"; map.appendChild(goal);

    function paint() {
      var n = 0;
      LEVELS.forEach(function (lv) {
        var d = countDone(lv), t = lv.lessons.length, el = nodes[lv.id]; n += d;
        el.querySelector(".lv-meta").textContent = t + " دروس · " + d + " / " + t + " مكتمل";
        el.querySelector(".lv-bar i").style.width = (100 * d / t) + "%";
        el.querySelector(".lv-card").classList.toggle("done", d === t);
        el.querySelectorAll(".fl-item").forEach(function (a) { a.classList.toggle("done", !!done[a.dataset.n]); });
      });
      document.getElementById("progress-text").textContent = n + " / " + TOTAL + " درسًا";
      document.getElementById("bar-fill").style.width = (100 * n / TOTAL) + "%";
    }
    paint();

    // رسم الخطوط بين البطاقات
    var road = document.getElementById("road"), svg = document.getElementById("road-lines");
    var LINKS = [["b0", "b1"], ["b1", "b2"], ["b2", "b3"], ["b2", "b4"], ["b3", "b5"], ["b4", "b5"], ["b5", "b6"], ["b6", "goal", 1]];
    function draw() {
      var R = road.getBoundingClientRect(), out = "";
      LINKS.forEach(function (k) {
        var a = (nodes[k[0]] || document.getElementById(k[0])).getBoundingClientRect();
        var bEl = nodes[k[1]] || document.getElementById(k[1]), b = bEl.getBoundingClientRect();
        var x1 = a.left + a.width / 2 - R.left, y1 = a.bottom - R.top, x2 = b.left + b.width / 2 - R.left, y2 = b.top - R.top, m = (y1 + y2) / 2;
        var lv = LEVELS.filter(function (l) { return l.id === k[1]; })[0] || LEVELS[6];
        out += '<path d="M' + x1 + " " + y1 + " C" + x1 + " " + m + " " + x2 + " " + m + " " + x2 + " " + y2 + '" fill="none" stroke="' + lv.color + '" stroke-width="2.5" stroke-opacity=".7"' + (k[2] ? ' stroke-dasharray="6 6"' : "") + "/>";
      });
      svg.innerHTML = out;
    }
    draw(); window.addEventListener("resize", draw);
    if (document.fonts) document.fonts.ready.then(draw);
    window.addEventListener("pageshow", function () {
      try { done = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {} paint();
    });
  }

  /* ---------- تثبيت التطبيق على الهاتف ---------- */
  (function () {
    if ("serviceWorker" in navigator) window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
    var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (standalone) return;                                   // مثبّت بالفعل
    var ua = navigator.userAgent, isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var isMobile = isIOS || /android|mobile/i.test(ua);
    var deferred = null, DKEY = "arcyber-install-later";

    var box = document.createElement("div"); box.className = "install"; box.hidden = true;
    box.setAttribute("role", "dialog"); box.setAttribute("aria-labelledby", "in-title");
    box.innerHTML =
      '<div class="install-card">' +
        '<button class="close" type="button" aria-label="إغلاق">&times;</button>' +
        '<img src="icons/icon-192.png" alt="" width="64" height="64">' +
        '<h3 id="in-title">ثبّت التطبيق على هاتفك</h3>' +
        '<p>افتح الدروس بلمسة واحدة من الشاشة الرئيسية، بملء الشاشة، ودون البحث عن الرابط.</p>' +
        '<div class="in-ios" hidden><ol>' +
          '<li>اضغط زر <b>المشاركة</b> <span class="in-ic">⬆︎</span> في أسفل Safari</li>' +
          '<li>اختر <b>«إضافة إلى الشاشة الرئيسية»</b> ➕</li>' +
          '<li>اضغط <b>«إضافة»</b></li></ol></div>' +
        '<div class="in-other" hidden><ol>' +
          '<li>افتح قائمة المتصفح <b>⋮</b></li>' +
          '<li>اختر <b>«تثبيت التطبيق»</b> أو <b>«إضافة إلى الشاشة الرئيسية»</b></li></ol></div>' +
        '<button class="btn btn-full in-go" type="button">تثبيت الآن</button>' +
        '<button class="in-later" type="button">لاحقًا</button>' +
      '</div>';
    document.body.appendChild(box);
    var go = box.querySelector(".in-go");

    function show() {
      box.querySelector(".in-ios").hidden = !(isIOS && !deferred);
      box.querySelector(".in-other").hidden = !(!isIOS && !deferred);
      go.hidden = !deferred;
      box.hidden = false;
    }
    function hide(later) {
      box.hidden = true;
      if (later) try { localStorage.setItem(DKEY, Date.now()); } catch (e) {}
    }
    box.querySelector(".close").onclick = function () { hide(true); };
    box.querySelector(".in-later").onclick = function () { hide(true); };
    box.addEventListener("click", function (e) { if (e.target === box) hide(true); });
    go.onclick = function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.finally(function () { deferred = null; hide(false); });
    };

    // زر دائم في الشريط العلوي
    var btn = document.createElement("button"); btn.type = "button"; btn.className = "btn btn-small install-btn";
    btn.textContent = "📲 تثبيت"; btn.onclick = show;
    var topBar = document.getElementById("top"); if (topBar && isMobile) topBar.appendChild(btn);

    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; if (topBar && !btn.parentNode) topBar.appendChild(btn); });
    window.addEventListener("appinstalled", function () { hide(false); if (btn.parentNode) btn.remove(); });

    // تظهر النافذة تلقائيًا على الهاتف بعد ثانيتين (ولا تعود قبل 3 أيام إذا اخترت «لاحقًا»)
    var last = 0; try { last = +localStorage.getItem(DKEY) || 0; } catch (e) {}
    if (isMobile && Date.now() - last > 3 * 864e5) setTimeout(function () { if (overlay && !overlay.hidden) return; show(); }, 2000);
  })();

  /* ---------- صفحة المستوى ---------- */
  var list = document.getElementById("level-list");
  if (list) {
    var q = new URLSearchParams(location.search), idx = 0;
    LEVELS.forEach(function (l, i) { if (l.id === q.get("l")) idx = i; });
    var lv = LEVELS[idx];
    document.body.style.setProperty("--c", lv.color);
    document.title = lv.title + " · الأمن السيبراني في 10 دقائق";
    document.getElementById("lv-badge").textContent = lv.name;
    document.getElementById("lv-title").textContent = lv.title;
    document.getElementById("lv-desc").textContent = lv.desc;

    lv.lessons.forEach(function (r) {
      var b = document.createElement("button"); b.type = "button"; b.className = "ls"; b.dataset.n = r[0];
      b.style.setProperty("--c", lv.color);
      b.innerHTML = '<div class="app-ic" style="--c:' + lv.color + '">' + ICONS.play + "</div>" +
        '<div class="ls-txt"><b>' + esc(r[1]) + "</b><span>الدرس " + esc(r[0]) + " · 10 دقائق</span></div>" +
        '<div class="tags"><span class="tag' + (VIDEOS[r[0]] ? "" : " soon") + '">' + (VIDEOS[r[0]] ? "درس" : "قريبًا") + "</span>" +
        (r[2] ? '<span class="tag lab">🔒 مختبر</span>' : "") + "</div>";
      b.onclick = function () { openLesson(lv, r); };
      list.appendChild(b);
    });

    function paintLv() {
      var d = countDone(lv), t = lv.lessons.length;
      document.getElementById("lv-meta").textContent = t + " دروس · " + d + " / " + t + " مكتمل";
      document.querySelector("#lv-bar i").style.width = (100 * d / t) + "%";
      list.querySelectorAll(".ls").forEach(function (b) { b.classList.toggle("done", !!done[b.dataset.n]); });
    }
    paintLv(); onChange = paintLv;

    var nav = document.getElementById("lv-nav"), prev = LEVELS[idx - 1], next = LEVELS[idx + 1], h = "";
    h += prev ? '<a href="level.html?l=' + prev.id + '" style="--c:' + prev.color + '">→ ' + esc(prev.name + " · " + prev.title) + "</a>" : "<span></span>";
    h += next ? '<a href="level.html?l=' + next.id + '" style="--c:' + next.color + '">' + esc(next.name + " · " + next.title) + " ←</a>" : "";
    nav.innerHTML = h;

    // فتح درس مباشرة من الرابط: level.html?l=b1&n=1.2
    var n = q.get("n");
    lv.lessons.forEach(function (r) { if (r[0] === n) openLesson(lv, r); });
  }
})();
