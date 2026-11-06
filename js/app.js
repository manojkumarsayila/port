(function () {
  "use strict";

  /*
    Edit these values to personalize the page.
    photo:        "assets/images/photo.jpg" (leave empty to keep the placeholder)
    email:        "you@example.com" (leave empty to show a placeholder)
    linkedin:     "https://www.linkedin.com/in/your-profile" (leave empty to show a placeholder)
    location:     "City, Country" (leave empty to hide)
    availability: "Open to internship opportunities" (only if accurate)
    projects:     [{ name, description, tech: ["HTML"], image: "", repo: "https://github.com/...", demo: "" }]
  */
  const SITE = {
    photo: "assets/images/pic.jpeg",
    email: "manojkumarsayila@gmail.com",
    linkedin: "https://www.linkedin.com/in/manoj-kumar-802a5140b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    location: "",
    availability: "",
    projects: [
      {
        name: "PULSEFORM",
        description: "A public fitness and wellness guide for discovering workouts, building healthier habits, and planning weekly sessions in your browser.",
        tech: [],
        image: "https://image.thum.io/get/width/1200/https://pulseform-2bn4ehop8-manojkumar5.vercel.app/",
        repo: "",
        demo: "https://pulseform-2bn4ehop8-manojkumar5.vercel.app/"
      }
    ]
  };

  const TONES = ["clay", "sage", "marigold", "sky", "rose"];

  const $ = (id) => document.getElementById(id);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function externalLink(href, label) {
    const a = el("a", "text-link", label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  $("year").textContent = String(new Date().getFullYear());

  /* Profile photo: replaces the arch placeholder when a file is supplied */
  if (SITE.photo) {
    const portrait = $("portrait");
    const img = el("img");
    img.src = SITE.photo;
    img.alt = "Portrait of Manoj Kumar";
    portrait.textContent = "";
    portrait.appendChild(img);
    portrait.setAttribute("role", "img");
    portrait.setAttribute("aria-label", "Portrait of Manoj Kumar");
  }

  if (SITE.location) {
    const row = $("fact-location");
    row.querySelector("dd").textContent = SITE.location;
    row.hidden = false;
  }

  if (SITE.availability) {
    const note = $("availability");
    note.textContent = SITE.availability;
    note.hidden = false;
  }

  /* Projects */
  function renderProjects(items) {
    const grid = $("project-grid");
    grid.textContent = "";

    items.forEach((p, index) => {
      const tone = TONES[index % TONES.length];
      const article = el("article", "project");

      const media = el("div", "project-media tone-" + tone);
      if (p.image) {
        const img = el("img");
        img.src = p.image;
        img.alt = p.name + " project preview";
        img.loading = "lazy";
        media.appendChild(img);
      } else {
        media.appendChild(el("span", "project-mark", p.name.charAt(0).toUpperCase()));
      }

      const body = el("div", "project-body");
      body.append(el("h3", null, p.name), el("p", null, p.description));

      if (p.tech && p.tech.length) {
        const list = el("ul", "tech");
        p.tech.forEach((t) => list.appendChild(el("li", null, t)));
        body.appendChild(list);
      }

      const links = el("div", "project-links");
      if (p.repo) links.appendChild(externalLink(p.repo, "Repository"));
      if (p.demo) links.appendChild(externalLink(p.demo, "Live demo"));
      if (links.childElementCount) body.appendChild(links);

      article.append(media, body);
      grid.appendChild(article);
    });
  }

  renderProjects(SITE.projects);

  /* Contact: email is shown as selectable text with a copy button, since mailto links are unreliable here */
  const emailValue = $("email-value");
  const copyBtn = $("copy-email");
  const copyStatus = $("copy-status");

  if (SITE.email) {
    emailValue.textContent = SITE.email;
    copyBtn.hidden = false;
    const footerEmail = $("footer-email");
    footerEmail.textContent = SITE.email;
    footerEmail.hidden = false;
  } else {
    emailValue.textContent = "Email address to be added";
    emailValue.classList.add("muted");
  }

  let statusTimer = null;
  function setStatus(message) {
    copyStatus.textContent = message;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { copyStatus.textContent = ""; }, 2400);
  }

  copyBtn.addEventListener("click", async () => {
    if (!SITE.email) return;
    try {
      await navigator.clipboard.writeText(SITE.email);
      setStatus("Copied to clipboard.");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(emailValue);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setStatus("Press Ctrl+C or Cmd+C to copy.");
    }
  });

  if (SITE.linkedin) {
    $("linkedin-placeholder").hidden = true;
    const link = $("linkedin-link");
    link.href = SITE.linkedin;
    link.hidden = false;
    const footerLinkedin = $("footer-linkedin");
    footerLinkedin.href = SITE.linkedin;
    footerLinkedin.hidden = false;
  }

  /* Mobile menu: a disclosure button that shows the navigation below the bar */
  const toggle = document.querySelector(".menu-toggle");
  const nav = $("site-nav");
  const menuLabel = document.querySelector("[data-menu-label]");
  const mobile = window.matchMedia("(max-width: 759px)");
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    nav.hidden = mobile.matches ? !open : false;
    toggle.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Close menu" : "Open menu";
  }

  toggle.addEventListener("click", () => setMenu(!menuOpen));

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOpen) {
      setMenu(false);
      toggle.focus();
    }
  });

  mobile.addEventListener("change", () => setMenu(false));

  setMenu(false);
})();
