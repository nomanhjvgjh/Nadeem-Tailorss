/* ==========================================================================
   Nadeem Tailor — main.js
   ⚙️  EDIT YOUR DETAILS IN THE `CONFIG` OBJECT BELOW (phone, WhatsApp, links).
   Everything on the site updates automatically from these values.
   ========================================================================== */

const CONFIG = {
  // 👉 Phone number in international format, digits only (no +, no spaces).
  //    Example for India: 91 + 10-digit number  ->  "919876543210"
  phone: "+91 8285843898",

  // Human-readable phone shown on the site
  phoneDisplay: "+91 8285843898",

  // Default WhatsApp greeting message
  waMessage: "Hello Nadeem Tailor! I would like to enquire about your tailoring services.",

  // Address
  address: "Nadeem Tailor, Laxmi Nagar, New Delhi, Delhi 110092",

  // Business email
  email: "nomangamedav@gmail.com",

  // 👉 Google Maps embed URL (Maps → Share → Embed a map → copy the src="" link)
  //    The placeholder below points to Laxmi Nagar — replace with your exact shop pin.
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4363.60960512069!2d77.2733145!3d28.634829599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdc656f2af37%3A0xfbec4b9af02c56c7!2sNadeem%20Tailor!5e1!3m2!1sen!2sin!4v1783416438345!5m2!1sen!2sin",

  // 👉 Public Google Business / reviews link ("Write a review" or profile link)
  googleReviews: "https://www.google.com/search?q=Nadeem+Tailor+Laxmi+Nagar",

  // 👉 Social media links (leave "#" to hide-in-plain-sight / update later)
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
};

/* -------------------- Wire up dynamic links -------------------- */
function waLink(customMsg) {
  const msg = encodeURIComponent(customMsg || CONFIG.waMessage);
  return `https://wa.me/${CONFIG.phone}?text=${msg}`;
}

function hydrate() {
  // WhatsApp links
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = waLink(el.getAttribute("data-msg"));
    el.target = "_blank";
    el.rel = "noopener";
  });
  // Call links
  document.querySelectorAll("[data-call]").forEach((el) => {
    el.href = `tel:+${CONFIG.phone}`;
  });
  // Phone display text
  document.querySelectorAll("[data-phone-text]").forEach((el) => {
    el.textContent = CONFIG.phoneDisplay;
  });
  // Email
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.href = `mailto:${CONFIG.email}`;
    if (el.hasAttribute("data-email-text")) el.textContent = CONFIG.email;
  });
  // Address text
  document.querySelectorAll("[data-address]").forEach((el) => {
    el.textContent = CONFIG.address;
  });
  // Google reviews
  document.querySelectorAll("[data-reviews]").forEach((el) => {
    el.href = CONFIG.googleReviews;
    el.target = "_blank";
    el.rel = "noopener";
  });
  // Map embed
  document.querySelectorAll("[data-map]").forEach((el) => {
    el.src = CONFIG.mapEmbed;
  });
  // Social
  document.querySelectorAll("[data-social]").forEach((el) => {
    const key = el.getAttribute("data-social");
    if (CONFIG.social[key]) el.href = CONFIG.social[key];
    el.target = "_blank";
    el.rel = "noopener";
  });
  // Current year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* -------------------- Theme toggle -------------------- */
function initTheme() {
  const saved = localStorage.getItem("nt-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = saved || (prefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", theme);

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("nt-theme", next);
    });
  }
}

/* -------------------- Mobile nav + header -------------------- */
function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        links.classList.remove("open");
      })
    );
  }

  const header = document.querySelector(".header");
  const topBtn = document.querySelector(".fab-top");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 20);
    if (topBtn) topBtn.classList.toggle("show", y > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active link based on current page
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });
}

/* -------------------- Scroll reveal -------------------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* -------------------- Gallery filter + lightbox -------------------- */
function initGallery() {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;

  // Filtering
  const buttons = document.querySelectorAll(".filter-bar button");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      grid.querySelectorAll(".gallery-item").forEach((item) => {
        const show = filter === "all" || item.getAttribute("data-cat") === filter;
        item.style.display = show ? "" : "none";
      });
    })
  );

  // Lightbox
  const lb = document.querySelector(".lightbox");
  if (!lb) return;
  const lbImg = lb.querySelector("img");
  const items = Array.from(grid.querySelectorAll(".gallery-item"));
  let idx = 0;

  const visible = () => items.filter((i) => i.style.display !== "none");
  const open = (item) => {
    const list = visible();
    idx = list.indexOf(item);
    show();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const show = () => {
    const list = visible();
    const src = list[idx].querySelector("img").getAttribute("src");
    lbImg.src = src;
  };
  const move = (dir) => {
    const list = visible();
    idx = (idx + dir + list.length) % list.length;
    show();
  };
  const close = () => {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  };

  items.forEach((item) => item.addEventListener("click", () => open(item)));
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".prev").addEventListener("click", () => move(-1));
  lb.querySelector(".next").addEventListener("click", () => move(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
  });
}

/* -------------------- Contact form → WhatsApp -------------------- */
function initForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const text =
      `New enquiry from the website%0A%0A` +
      `👤 Name: ${name}%0A` +
      `📞 Phone: ${phone}%0A` +
      `✂️ Service: ${service}%0A` +
      `📝 Message: ${message}`;

    window.open(`https://wa.me/${CONFIG.phone}?text=${text}`, "_blank", "noopener");
    showToast("Opening WhatsApp to send your enquiry…");
    form.reset();
  });
}

/* -------------------- FAQ accordion -------------------- */
function initFaq() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;
  items.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close all (single-open accordion)
      items.forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* -------------------- Toast -------------------- */
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* -------------------- Boot -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  hydrate();
  initTheme();
  initNav();
  initReveal();
  initGallery();
  initForm();
});
