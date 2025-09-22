// Basic interactivity: mobile menu, carousel, form handling and modal
document.addEventListener("DOMContentLoaded", function () {
  // Set year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  hamburger &&
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      mobileNav.style.display = expanded ? "none" : "block";
      mobileNav.setAttribute("aria-hidden", String(expanded));
    });

  // Demo buttons open contact anchor
  const demoBtns = document.querySelectorAll("#demoBtn, #heroDemoBtn");
  demoBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      document
        .querySelector("#contact")
        .scrollIntoView({ behavior: "smooth", block: "start" });
      // focus first input
      setTimeout(() => document.querySelector("#name").focus(), 600);
    })
  );

  // Carousel simple left/right
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");
  if (track) {
    prev &&
      prev.addEventListener("click", () => {
        track.scrollBy({ left: -340, behavior: "smooth" });
      });
    next &&
      next.addEventListener("click", () => {
        track.scrollBy({ left: 340, behavior: "smooth" });
      });
  }

  // Form handling (no backend) - validate & show modal
  const form = document.getElementById("demoForm");
  const modal = document.getElementById("thankYouModal");
  const modalClose = document.getElementById("modalClose");
  const modalOk = document.getElementById("modalOk");
  const clearBtn = document.getElementById("clearBtn");

  form &&
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // simple constraint checks
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // simulate submission - show modal
      modal.setAttribute("aria-hidden", "false");
      modal.style.visibility = "visible";
      // In a real app you'd POST the form data here
      form.reset();
    });

  modalClose && modalClose.addEventListener("click", closeModal);
  modalOk && modalOk.addEventListener("click", closeModal);

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.style.visibility = "hidden";
  }

  clearBtn && clearBtn.addEventListener("click", () => form.reset());

  // Keyboard escape to close modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false")
      closeModal();
  });
});
