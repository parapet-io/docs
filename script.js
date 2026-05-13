const sidebar = document.querySelector(".sidebar");
const menuToggle = document.querySelector(".menu-toggle");
const navGroups = [...document.querySelectorAll(".nav-group")];
const navLinks = [...document.querySelectorAll(".nav-group > a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const linkByHash = new Map(
  navLinks.map((link) => [link.getAttribute("href"), link])
);

menuToggle?.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Make groups mutually exclusive: opening one collapses the rest. Optional —
// drop this block to allow several sub-menus open at once.
navGroups.forEach((group) => {
  group.addEventListener("toggle", () => {
    if (!group.open) return;
    navGroups.forEach((other) => {
      if (other !== group) other.open = false;
    });
  });
});

const openParentGroup = (link) => {
  const parent = link.closest(".nav-group");
  if (parent && !parent.open) {
    parent.open = true;
    navGroups.forEach((other) => {
      if (other !== parent) other.open = false;
    });
  }
};

const activateLink = () => {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 160)
    .at(-1);

  if (!current) return;

  const activeHash = `#${current.id}`;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === activeHash);
  });

  const activeLink = linkByHash.get(activeHash);
  if (activeLink) openParentGroup(activeLink);
};

document.addEventListener("scroll", activateLink, { passive: true });
window.addEventListener("hashchange", activateLink);
activateLink();

// On first load: if URL has a hash, expand its parent group.
if (window.location.hash) {
  const link = linkByHash.get(window.location.hash);
  if (link) openParentGroup(link);
}

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.parentElement?.querySelector("code")?.innerText;
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = original ?? "Copy";
      }, 1200);
    } catch {
      // Clipboard API unavailable (e.g. file://). Fail silently — the
      // code block remains selectable in the page.
    }
  });
});
