document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.querySelector(".navbar-toggler");
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.getElementById("navbarNav");
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "light";
  htmlEl.setAttribute("data-bs-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlEl.getAttribute("data-bs-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      htmlEl.setAttribute("data-bs-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  if (menuToggle && menuIcon && navbar) {
    menuToggle.addEventListener("click", () => {
      setTimeout(() => {
        const isOpen = navbar.classList.contains("show");
        menuIcon.className = isOpen ? "menu-bars is-open" : "menu-bars";
      }, 200);
    });
  }
});
