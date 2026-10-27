// 1. Hiệu ứng gõ chữ (Typing Animation)
const phrases = [
  "Sinh viên Vật lý học @ VNU-HUS",
  "Định hướng Quang học lượng tử (Quantum Optics)",
  "Ứng dụng Công nghệ số & Trí tuệ nhân tạo",
  "Digital Portfolio Project",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 35 : 70;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1800; // Dừng lại khi gõ xong câu
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

// 2. Hiệu ứng cuộn trang xuất hiện (Scroll Reveal)
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.12 },
);

revealElements.forEach((el) => revealObserver.observe(el));

// 3. Lọc các bài tập từ Bài 1 đến Bài 6
function filterProjects(category, btnElement) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  btnElement.classList.add("active");

  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 4. Mở / Đóng ảnh phóng to (Lightbox)
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  lbImg.src = src;
  lb.classList.add("open");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

// 5. Chuyển đổi chế độ Sáng / Tối (Dark / Light Mode)
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlEl.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", nextTheme);
  themeToggle.innerHTML =
    nextTheme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
});
