(() => {
  "use strict";

  const config = window.EVENT_CONFIG;
  const seating = window.SEATING_DATA;
  const page = document.body.dataset.page || "home";
  const event = config.event;
  const logo = "assets/images/和泰汽車Hotai LOGO.png";
  const decorPath = "assets/images/decor/";

  const navItems = [
    ["home", "首頁", "index.html"],
    ["agenda", "議程", "agenda.html"],
    ["speakers", "講者", "speakers.html"],
    ["checkin", "報到", "checkin.html"],
    ["seating", "座位圖", "seating-closed.html"],
    ["resources", "會後資料", "resources.html"],
    ["venue", "活動地點", "venue.html"]
  ];

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c.5-5 3-7 8-7s7.5 2 8 7"/></svg>',
    document: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>'
  };

  const logoMarkup = (footer = false) => `<img class="brand__logo${footer ? " brand__logo--footer" : ""}" src="${logo}" alt="和泰汽車 Hotai LOGO">`;

  function decorations(scope = "inner") {
    const all = [
      ["car.png", "decor--car"], ["cloud.png", "decor--cloud"], ["flash-拷貝.png", "decor--flash"],
      ["flower.png", "decor--flower"], ["star.png", "decor--star"], ["火箭-拷貝.png", "decor--rocket"], ["氣球.png", "decor--balloon"]
    ];
    const innerByPage = {
      agenda: [2, 4, 6], speakers: [1, 3, 5], checkin: [0, 1, 4], seating: [2, 4, 5],
      resources: [1, 3, 4], venue: [0, 1, 6]
    };
    const chosen = scope === "home" ? all : (innerByPage[page] || [1, 4, 5]).map(i => all[i]);
    return `<div class="decor-layer decor-layer--${scope}" aria-hidden="true">${chosen.map(([file, cls]) => `<img class="decor ${cls}" src="${decorPath}${file}" alt="">`).join("")}</div>`;
  }

  function pageIntro(kicker, title, text = "") {
    return `<section class="page-hero">${decorations("inner")}<div class="shell page-hero__inner reveal">${kicker ? `<p class="kicker">${kicker}</p>` : ""}<h1>${title}</h1>${text ? `<p class="page-hero__lead">${text}</p>` : ""}</div></section>`;
  }

  function renderHeader() {
    const links = navItems.map(([id, label, href]) => `<a href="${href}" ${page === id ? 'aria-current="page"' : ""}>${label}</a>`).join("");
    document.querySelector("#site-header").innerHTML = `
      <div class="utility-note"><div class="shell"><strong>${event.name}</strong><span>${event.timeDisplay}</span></div></div>
      <header class="header"><div class="shell header__inner">
        <a class="brand" href="index.html" aria-label="${event.name}首頁">${logoMarkup()}</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span><span class="sr-only">開啟導覽選單</span></button>
        <nav class="primary-nav" id="primary-nav" aria-label="主要導覽">${links}</nav>
      </div></header>`;
  }

  function renderFooter() {
    document.querySelector("#site-footer").innerHTML = `
      <footer class="footer"><div class="shell footer__grid">
        <div><a class="brand brand--footer" href="index.html" aria-label="和泰汽車首頁識別">${logoMarkup(true)}</a><p>${event.name}<br>${event.timeDisplay}</p></div>
        <div><h2>活動資訊</h2><a href="agenda.html">活動議程</a><a href="speakers.html">講者介紹</a><a href="venue.html">場地與交通</a></div>
        <div><h2>活動服務</h2><a href="checkin.html">線上報到</a><a href="seating-closed.html">會議／晚宴座位圖</a><a href="resources.html">會後資料</a></div>
        <div><h2>主辦單位</h2><p>${event.organizer}</p></div>
      </div><div class="shell footer__bottom"><span>網站內容更新：2026 年 10 月 19 日</span></div></footer>`;
  }

  function speakerCard(s) {
    return `<article class="speaker-card reveal"><figure class="speaker-card__visual speaker-card__visual--${s.accent}"><img src="${s.photo}" alt="${s.photoAlt}" loading="lazy"></figure><div class="speaker-card__body"><div class="status-row"><span class="status status--ready">${s.eventRole}</span><span class="status status--source">正式照片</span></div><h3>${s.zhName} <small>${s.enName}</small></h3><p class="speaker-role">${s.role}</p><p class="speaker-topic">${s.sessionTitle}</p><a class="text-link" href="speakers.html#${s.id}">查看講者資料 ${icons.arrow}</a></div></article>`;
  }

  function contactBlock(includeOwner = false, compact = false) {
    return `<section class="contact-card${compact ? " contact-card--compact" : ""}"><h2>${compact ? "報到與引導服務：" : "聯絡資訊："}</h2>${compact ? "" : "<h3>報到與引導服務：</h3>"}<ul>${config.contacts.guidance.map(item => `<li>＊${item}</li>`).join("")}</ul>${includeOwner ? `<p><strong>本案擔當：</strong>${config.contacts.owner}</p>` : ""}</section>`;
  }

  function renderHome() {
    return `<main id="main-content">
      <section class="hero">${decorations("home")}<div class="hero__mesh" aria-hidden="true"></div><div class="shell hero__grid">
        <div class="hero__content reveal"><p class="kicker">${event.englishName}</p><h1>${event.name}</h1><p class="hero__tagline">${event.timeDisplay}</p><div class="hero__actions"><a class="button button--primary" href="agenda.html">查看活動議程 ${icons.arrow}</a><a class="button button--ghost" href="checkin.html">前往線上報到</a></div></div>
        <aside class="event-pass reveal delay-1" aria-label="活動資訊摘要"><div class="event-pass__top"><span>活動資訊</span></div><div class="event-pass__title"><small>會議地點</small><strong>${event.venueName}</strong></div><dl class="event-pass__meta"><div><dt>${icons.calendar}<span>活動時間</span></dt><dd>${event.timeDisplay}</dd></div><div><dt>${icons.pin}<span>地址</span></dt><dd>${event.address}</dd></div><div><dt>${icons.user}<span>主辦單位</span></dt><dd>${event.organizer}</dd></div></dl><a class="event-pass__link" href="venue.html">查看場地與交通 ${icons.arrow}</a></aside>
      </div><a class="scroll-cue" href="#highlights"><span>向下探索</span><i></i></a></section>
      <section class="section" id="highlights"><div class="shell"><div class="section-heading reveal"><div><h2>活動導覽</h2></div></div><div class="journey-grid">${[
        ["01","活動議程","查看完整活動議程。","agenda.html"],
        ["02","講者介紹","查看專題講者介紹與講題。","speakers.html"],
        ["03","線上報到","填寫活動報到表單。","checkin.html"],
        ["04","座位圖","座位圖頁面目前暫停開放。","seating-closed.html"],
        ["05","會後資料","填寫滿意度問卷，會後將提供簡報資料參考。","resources.html"],
        ["06","活動地點","查看會議場地及交通資訊。","venue.html"]
      ].map(item=>`<a class="journey-card reveal" href="${item[3]}"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p><b>開啟頁面 ${icons.arrow}</b></a>`).join("")}</div></div></section>
      <section class="section section--contrast"><div class="shell"><div class="section-heading reveal"><div><p class="kicker">專題講者</p><h2>講者與分享主題</h2></div></div><div class="speaker-preview-grid">${config.speakers.map(speakerCard).join("")}</div></div></section>
      <section class="section"><div class="shell home-bottom-grid"><div class="data-banner reveal"><div><p class="kicker">活動後回饋</p><h2>滿意度調查問卷</h2><p>活動結束後，請填寫滿意度調查問卷，協助持續改善活動流程。</p></div><a class="button button--primary" href="${config.integrations.surveyCakeUrl}" target="_blank" rel="noopener noreferrer">填寫滿意度調查 ${icons.arrow}</a></div><div class="reveal">${contactBlock(true)}</div></div></section>
    </main>`;
  }

  function renderAgenda() {
    return `<main id="main-content">${pageIntro("Agenda", "活動議程")}
      <section class="section"><div class="shell agenda-page"><div class="agenda-panel reveal"><div class="agenda-toolbar"><div><span class="status status--ready">活動議程</span><h2>2026/10/22（四）</h2></div></div><div class="agenda-timeline" aria-label="活動議程">${config.agenda.map(item=>`<article class="agenda-item agenda-item--${item.type}"><div class="agenda-time"><time>${item.time}</time><small>${item.duration}</small></div><div><h3>${item.title}</h3>${item.details.length ? `<ul>${item.details.map(d=>`<li>${d}</li>`).join("")}</ul>` : ""}</div></article>`).join("")}</div></div>
        <aside class="side-card reveal delay-1"><p class="kicker">活動資訊</p><h2>${event.name}</h2><dl class="mini-details"><div><dt>活動時間</dt><dd>${event.timeDisplay}</dd></div><div><dt>會議場地</dt><dd>${event.meetingVenue}</dd></div><div><dt>午宴場地</dt><dd>${event.lunchVenue}</dd></div><div><dt>晚宴場地</dt><dd>${event.dinnerVenue}</dd></div></dl></aside>
      </div></section>
    </main>`;
  }

  function renderSpeakers() {
    return `<main id="main-content">${pageIntro("Speakers", "講者介紹")}
      <section class="section"><div class="shell speaker-list">${config.speakers.map((s,index)=>`<article class="profile reveal" id="${s.id}"><figure class="profile__visual profile__visual--${s.accent}"><img src="${s.photo}" alt="${s.photoAlt}" loading="lazy"><b>0${index+1}</b></figure><div class="profile__content"><div class="status-row"><span class="status status--ready">${s.eventRole}</span><span class="status status--source">正式照片</span></div><h2>${s.zhName} <small>${s.enName}</small></h2><p class="profile__role">${s.role}</p><div class="session-callout"><small>分享主題</small><strong>${s.sessionTitle}</strong></div>${s.summary?`<p class="profile__summary">${s.summary}</p>`:""}<div class="profile__columns"><div><h3>專長</h3><div class="tag-list">${s.specialties.map(tag=>`<span>${tag}</span>`).join("")}</div></div>${s.education?`<div><h3>學歷</h3><ul class="clean-list">${s.education.map(i=>`<li>${i}</li>`).join("")}</ul></div>`:""}<div><h3>經歷摘錄</h3><ul class="clean-list">${s.experience.map(i=>`<li>${i}</li>`).join("")}</ul></div></div><a class="source-link" href="${s.sourceUrl}" target="_blank" rel="noopener noreferrer">查看資料來源：${s.sourceLabel} <span aria-hidden="true">↗</span></a></div></article>`).join("")}</div></section>
    </main>`;
  }

  function renderCheckin() {
    const url = config.integrations.checkinFormUrl;
    return `<main id="main-content">${pageIntro("Check-in", "活動報到")}
      <section class="section"><div class="shell form-embed-shell"><div class="form-embed__toolbar reveal"><div><h2>${event.name}報到</h2></div><a class="button button--ghost" href="${url}" target="_blank" rel="noopener noreferrer">另開視窗填寫 ${icons.arrow}</a></div><div class="form-embed reveal delay-1"><iframe src="${url}" title="${event.name}活動報到表單" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen"></iframe><div class="form-embed__fallback"><strong>表單無法顯示嗎？</strong><p>部分瀏覽器、登入狀態或公司網路會限制第三方內嵌內容。</p><a href="${url}" target="_blank" rel="noopener noreferrer">開啟活動報到表單</a></div></div></div></section>
    </main>`;
  }

  function renderMeetingMap() {
    const features = seating.meeting.features.map(f=>`<div class="room-feature room-feature--${f.type}" style="--col:${f.col};--span:${f.span};--row:${f.row}">${f.label}</div>`).join("");
    const people = seating.meeting.participants.map(p=>`<div class="meeting-seat" style="--col:${p.col};--row:${p.group+2}"><span>${p.company}</span><strong>${p.name}</strong></div>`).join("");
    return `<section class="seat-section reveal" id="meeting-seating"><div class="seat-section__head"><div><h2>${seating.meeting.title}</h2><p>${seating.meeting.venue}</p></div><span class="seat-count">84 位</span></div><div class="room-scroll" tabindex="0" aria-label="可水平捲動查看完整會議座位圖"><div class="meeting-room" style="--grid-cols:${seating.meeting.gridColumns}">${features}${people}</div></div><p class="scroll-help">在小螢幕上可左右滑動查看完整空間配置。</p></section>`;
  }

  function getUnitTitle(person) {
  const unit = (person.unit || "").trim();
  const title = (person.title || "").trim();

  if (!unit) return title;
  if (!title) return unit;
  if (unit.includes(title)) return unit;

  return `${unit} ${title}`;
}
function renderDinnerMap() {
  return `<section class="seat-section reveal" id="dinner-seating"><div class="seat-section__head"><div><h2>${seating.dinner.title}</h2><p>${seating.dinner.venue}</p></div><span class="seat-count">69 位／7 桌</span></div><div class="dinner-room"><div class="dinner-tables">${seating.dinner.tables.map(t=>`<article class="dinner-table"><header><span>${t.id}</span><div><h3>${t.label}</h3><small>${t.count} 人</small></div></header><ul>${t.people.map(person=>`<li><span>${person.company || ""}</span><strong>${person.name || ""}</strong><small>${getUnitTitle(person)}</small></li>`).join("")}</ul></article>`).join("")}</div></div></section>`;
}

  function renderSeating() {
    return `<main id="main-content">${pageIntro("Seating", "座位圖")}
      <section class="section"><div class="shell seating-page"><nav class="seat-jump" aria-label="座位圖頁內導覽"><a href="#meeting-seating">會議座位圖</a><a href="#dinner-seating">晚宴座位圖</a></nav>${renderMeetingMap()}${renderDinnerMap()}</div></section>
    </main>`;
  }

  function renderResources() {
    const survey = config.integrations.surveyCakeUrl;
    return `<main id="main-content">${pageIntro("Feedback & Resources", "會後資料")}
      <section class="section"><div class="shell resource-page"><section class="survey-card reveal"><div class="survey-card__icon">${icons.document}</div><div><span class="status status--ready">問卷連結</span><p class="kicker">SurveyCake</p><h2>滿意度調查問卷</h2><p>感謝參與 ${event.name}。請於活動後填寫問卷，協助主辦單位持續改善活動內容與體驗。</p><a class="button button--primary" href="${survey}" target="_blank" rel="noopener noreferrer">前往填寫問卷 ${icons.arrow}</a><small>連結將於新分頁開啟。</small></div></section>
        <section class="presentation-section reveal"><div class="section-heading"><div><p class="kicker">活動資料</p><h2>會後簡報</h2></div><p>簡報下載將於會後提供。</p></div><div class="presentation-grid">${config.presentations.map((title,index)=>`<article><span>0${index+1}</span><h3>${title}</h3><button class="button button--disabled" type="button" disabled>會後提供</button></article>`).join("")}</div></section>
      </div></section>
    </main>`;
  }

  function renderVenue() {
    return `<main id="main-content">${pageIntro("台北士林萬麗酒店", "活動地點與交通", `${event.venueName}｜${event.address}`)}
      <section class="section"><div class="shell venue-page"><section class="venue-summary reveal"><div class="venue-summary__visual"><span>${icons.pin}</span><strong>台北士林萬麗酒店</strong><p>${event.address}</p><div class="venue-actions"><a class="button button--primary" href="${event.navigationUrl}" target="_blank" rel="noopener noreferrer">開啟地圖導航 ${icons.arrow}</a><a class="button button--ghost" href="${event.officialVenueUrl}" target="_blank" rel="noopener noreferrer">飯店官方資訊</a></div></div><div class="venue-summary__content"><span class="status status--ready">活動場地</span><h2>${event.venueName}</h2><dl class="detail-list"><div><dt>會議場地</dt><dd>${event.meetingVenue}</dd></div><div><dt>午宴場地</dt><dd>${event.lunchVenue}</dd></div><div><dt>晚宴場地</dt><dd>${event.dinnerVenue}</dd></div></dl></div></section>
        <section class="travel-section reveal"><div class="section-heading"><div><p class="kicker">交通方式</p><h2>前往飯店</h2></div></div><div class="travel-grid">${config.transport.map((item,i)=>`<article><span>0${i+1}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}</div></section><div class="reveal">${contactBlock(false,true)}</div></div></section>
    </main>`;
  }

  const renderers = {home:renderHome,agenda:renderAgenda,speakers:renderSpeakers,checkin:renderCheckin,seating:renderSeating,resources:renderResources,venue:renderVenue};

  function bindInteractions() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".primary-nav");
    navToggle?.addEventListener("click",()=>{const open=navToggle.getAttribute("aria-expanded")==="true";navToggle.setAttribute("aria-expanded",String(!open));nav.classList.toggle("is-open",!open);navToggle.querySelector(".sr-only").textContent=open?"開啟導覽選單":"關閉導覽選單";});
    const observer="IntersectionObserver" in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.06}):null;
    document.querySelectorAll(".reveal").forEach(el=>observer?observer.observe(el):el.classList.add("is-visible"));
  }

  renderHeader();
  document.querySelector("#app").innerHTML=renderers[page]();
  renderFooter();
  bindInteractions();
})();
