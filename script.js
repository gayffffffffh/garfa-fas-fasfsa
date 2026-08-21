(function () {
  "use strict";

  const cfg = window.CONFIG || CONFIG;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- render: what i do ---------- */
  function renderWhatIDo() {
    const host = document.getElementById("whatido");
    if (!host) return;
    host.innerHTML = "";
    cfg.whatIDo.forEach(function (item) {
      const card = document.createElement("article");
      card.className = "do-card reveal";

      const title = document.createElement("h3");
      title.className = "do-card__title";
      title.textContent = item.title;

      const text = document.createElement("p");
      text.className = "do-card__text";
      text.textContent = item.text;

      card.append(title, text);
      host.appendChild(card);
    });
  }

  /* ---------- render: skills ---------- */
  function renderSkills() {
    const host = document.getElementById("skills-grid");
    if (!host) return;
    host.innerHTML = "";
    cfg.skills.forEach(function (group) {
      const card = document.createElement("article");
      card.className = "skill-card reveal";

      const head = document.createElement("div");
      head.className = "skill-card__head";

      const id = document.createElement("span");
      id.className = "skill-card__id";
      id.textContent = group.id + " —";

      const title = document.createElement("h3");
      title.className = "skill-card__title";
      title.textContent = group.title;

      head.append(id, title);

      const list = document.createElement("ul");
      group.items.forEach(function (name) {
        const li = document.createElement("li");
        li.textContent = name;
        list.appendChild(li);
      });

      card.append(head, list);
      host.appendChild(card);
    });
  }

  /* ---------- render: projects ---------- */
  function renderProjects() {
    const host = document.getElementById("projects-grid");
    if (!host) return;
    host.innerHTML = "";
    cfg.projects.forEach(function (proj) {
      const card = document.createElement("article");
      card.className = "proj-card reveal";

      const title = document.createElement("h3");
      title.className = "proj-card__title";
      title.textContent = proj.title;

      const text = document.createElement("p");
      text.className = "proj-card__text";
      text.textContent = proj.text;

      card.append(title, text);

      if (proj.tags && proj.tags.length) {
        const tags = document.createElement("div");
        tags.className = "proj-card__tags";
        proj.tags.forEach(function (t) {
          const tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = t;
          tags.appendChild(tag);
        });
        card.appendChild(tags);
      }

      host.appendChild(card);
    });
  }

  /* ---------- render: social ---------- */
  function renderSocial() {
    const host = document.getElementById("social");
    if (!host) return;
    host.innerHTML = "";
    cfg.social.forEach(function (item) {
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const label = document.createElement("span");
      label.className = "social__label";
      label.textContent = item.label;
      link.appendChild(label);

      if (item.handle) {
        const handle = document.createElement("span");
        handle.className = "social__handle";
        handle.textContent = item.handle;
        link.appendChild(handle);
      }

      host.appendChild(link);
    });
  }

  /* ---------- roles typing effect ---------- */
  function typeRoles() {
    const host = document.getElementById("roles");
    if (!host) return;

    const roles = cfg.roles;
    const joined = roles.join(" • ");

    if (reduceMotion) {
      host.textContent = joined;
      return;
    }

    const caret = document.createElement("span");
    caret.className = "caret";
    caret.textContent = " ";

    const out = document.createElement("span");
    host.append(out, caret);

    let i = 0;
    (function step() {
      if (i > joined.length) return;
      out.textContent = joined.slice(0, i);
      i += 1;
      setTimeout(step, 45);
    })();
  }

  /* ---------- terminal animation ---------- */
  function runTerminal() {
    const host = document.getElementById("typed");
    if (!host) return;

    const outputs = {
      whoami: "garfield",
      "cat /etc/roles": "cybersecurity · ctf · osint",
      "nmap -sV target.local": "scan complete — 3 open ports",
      "sherlock garfield": "accounts found across public platforms",
    };

    const lines = cfg.typingLines;

    if (reduceMotion) {
      host.textContent = lines
        .map(function (l) {
          return "$ " + l + "\n" + (outputs[l] || "ok");
        })
        .join("\n");
      return;
    }

    const caret = document.createElement("span");
    caret.className = "caret";
    caret.textContent = " ";

    const buffer = document.createElement("span");
    host.append(buffer, caret);

    let li = 0;

    function typeLine() {
      if (li >= lines.length) {
        setTimeout(function () {
          buffer.textContent = "";
          li = 0;
          typeLine();
        }, 2600);
        return;
      }

      const cmd = lines[li];
      const prompt = document.createElement("span");
      prompt.className = "ps1";
      prompt.textContent = "$ ";
      buffer.appendChild(prompt);

      const cmdNode = document.createTextNode("");
      buffer.appendChild(cmdNode);

      let ci = 0;
      (function typeChar() {
        if (ci < cmd.length) {
          cmdNode.textContent += cmd.charAt(ci);
          ci += 1;
          setTimeout(typeChar, 52);
          return;
        }

        setTimeout(function () {
          const res = document.createElement("span");
          res.className = "out";
          res.textContent = "\n" + (outputs[cmd] || "ok") + "\n";
          buffer.appendChild(res);
          li += 1;
          setTimeout(typeLine, 520);
        }, 300);
      })();
    }

    typeLine();
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el, idx) {
      el.style.transitionDelay = (idx % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  function init() {
    renderWhatIDo();
    renderSkills();
    renderProjects();
    renderSocial();
    typeRoles();
    runTerminal();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
