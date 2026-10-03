(function () {
  const THEME_KEY = "blog-theme";

  function preferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "切换到浅色模式" : "切换到深色模式"
      );
    }
  }

  applyTheme(preferredTheme());

  const page = document.body.dataset.page;
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = SITE.year;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) link.classList.add("active");
  });

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    if (!navLinks?.classList.contains("open")) return;
    if (navLinks.contains(event.target) || menuBtn.contains(event.target)) return;
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });

  function tagList(tags) {
    return tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  }

  function projectCover(project) {
    if (project.cover) return project.cover;
    const first = project.screenshots && project.screenshots[0];
    return first ? first.src : "";
  }

  function renderHome() {
    const projectRoot = document.getElementById("project-list");
    if (!projectRoot) return;

    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) heroTitle.textContent = SITE.heroTitle;

    projectRoot.innerHTML = PROJECTS.map((project) => {
      const cover = projectCover(project);
      return `
      <a class="project-card${project.featured ? " featured" : ""}" href="project.html?id=${project.id}">
        ${
          cover
            ? `<div class="card-cover">
                 <img src="${encodeURI(cover)}" alt="${project.title} 界面截图" loading="lazy" decoding="async" />
               </div>`
            : ""
        }
        <div class="card-body">
          <span class="chip">${project.featured ? "毕业设计" : project.role}</span>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <span class="cta">查看详情 →</span>
        </div>
      </a>`;
    }).join("");
  }

  function renderAbout() {
    const intro = document.getElementById("about-intro");
    const job = document.getElementById("about-job");
    const skills = document.getElementById("skill-list");
    if (!intro) return;

    intro.textContent = ABOUT.intro;
    if (job) job.textContent = ABOUT.job;
    if (skills) {
      skills.innerHTML = ABOUT.skills
        .map((item) => `<li><span class="chip">${item}</span></li>`)
        .join("");
    }
  }

  function screenshotGrid(list) {
    if (!list || !list.length) return "";
    return `
      <section class="panel" id="screenshots">
        <h2>界面截图</h2>
        <div class="gallery">
          ${list
            .map(
              (shot) => `
            <figure class="shot">
              <button
                class="shot-frame"
                type="button"
                data-full="${encodeURI(shot.src)}"
                data-caption="${shot.caption}"
                aria-label="放大查看：${shot.caption}"
              >
                <img src="${encodeURI(shot.src)}" alt="" loading="lazy" decoding="async" />
              </button>
              <figcaption>${shot.caption}</figcaption>
            </figure>`
            )
            .join("")}
        </div>
      </section>`;
  }

  function setupLightbox() {
    const dialog = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    const gallery = document.getElementById("screenshots");
    // 老浏览器不支持 <dialog> 时直接跳过，截图仍可正常浏览
    if (!dialog || !gallery || typeof dialog.showModal !== "function") return;

    gallery.addEventListener("click", (event) => {
      const frame = event.target.closest(".shot-frame");
      if (!frame) return;
      img.src = frame.dataset.full;
      img.alt = frame.dataset.caption;
      caption.textContent = frame.dataset.caption;
      dialog.showModal();
    });

    dialog.querySelector(".lightbox-close").addEventListener("click", () => {
      dialog.close();
    });

    // 点击图片以外的空白区域关闭（Esc 由 <dialog> 自己处理）
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  function projectById(id) {
    return PROJECTS.find((item) => item.id === id) || PROJECTS.find((item) => item.featured) || PROJECTS[0];
  }

  function renderProject() {
    const root = document.getElementById("project-root");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const project = projectById(id);
    document.title = `${project.title} · ${SITE.name}`;

    root.innerHTML = `
      <section class="project-banner panel" id="overview">
        <p class="eyebrow">${project.role}</p>
        <h1>${project.title}</h1>
        <p class="lede">${project.subtitle}</p>
        <p>${project.description}</p>
        <div class="stats">
          <div><strong>${project.period}</strong>周期</div>
          <div><strong>${project.stack.join(" / ")}</strong>技术栈</div>
        </div>
        ${
          project.github
            ? `<p style="margin-top:18px"><a class="cta-link" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub 仓库 →</a></p>`
            : ""
        }
      </section>
      ${screenshotGrid(project.screenshots)}
      <section class="panel">
        <h2>核心功能</h2>
        <ul class="focus-list">
          ${project.highlights.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="meta-row" style="margin-top:16px">${tagList(project.stack)}</div>
      </section>`;

    setupLightbox();
  }

  if (page === "home") renderHome();
  if (page === "about") renderAbout();
  if (page === "project") renderProject();
})();
