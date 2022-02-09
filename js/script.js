"use strict";

// SET CURRENT YEAR

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// MAKE MOBILE NAVIGATION WORK

const header = document.querySelector("header");
const button = document.querySelector(".btn-mobile-nav");

button.addEventListener("click", function () {
  header.classList.toggle("nav-open"); // se tiver = remove; não não tiver = adiciona
});

// SMOOTH SCROLLING ANIMATION

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // 1 - SCROLL PARA O TOPO
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // 2 - SCROLL PARA OUTROS LINKS
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // 3 - FECHAR ABA DE NAVEGAÇÃO
    if (link.classList.contains("main-nav-link")) {
      header.classList.toggle("nav-open"); // se for o nav, abra e feche o mobile (full screen não é afetado)
    }
  });
});

// STICKY NAVIGATION

const hero = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting === false) document.body.classList.add("sticky");
    if (entry.isIntersecting === true) document.body.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(hero);

// FIXING FLEXBOX GAP PROPERTY MISSING IN SOME SAFARI VERSIONS

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
