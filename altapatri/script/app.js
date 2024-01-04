"use strict";
var maskIP = new IPTelMask({
  element: 'input[type="tel"]',
});
maskIP.init();

const burgerBtn = document.getElementById("burger-check");
const closeBtn = document.getElementById("close-btn");
const navMenu = document.getElementById("header-nav");
const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByClassName("header")[0];
let windowWidth = window.innerWidth;

window.addEventListener("resize", function () {
  windowWidth = window.innerWidth;
});

document.addEventListener("scroll", function (e) {
  if (window.scrollY > header.clientHeight && windowWidth > 1024) {
    header.getElementsByClassName("branding")[0].style.maxHeight = 0;
  } else {
    header.getElementsByClassName("branding")[0].style.maxHeight = "20vh";
  }
});

closeBtn.addEventListener("click", toggleMenu);
burgerBtn.addEventListener("click", toggleMenu);
window.addEventListener("resize", closeMenuOnLargeScreens);

function toggleMenu() {
  navMenu.classList.toggle("navigation--active");
  body.classList.toggle("overflow-hidden");
}

function closeMenuOnLargeScreens() {
  if (window.innerWidth > 1024) {
    body.classList.remove("overflow-hidden");
    navMenu.classList.remove("navigation--active");
  }
}

const subMenus = document.querySelectorAll(".sub-menu");
const arrows = document.querySelectorAll(".main-menu__toggle-arrow");

function toggleSubMenu() {
  this.classList.toggle("check");
  const subMenu = this.closest(".main-menu__item").querySelector(".sub-menu");
  subMenu.classList.toggle("sub-menu--active");
}

arrows.forEach((arrow) => {
  arrow.addEventListener("click", toggleSubMenu);
});

window.addEventListener("resize", closeSubMenuOnLargeScreens);

function closeSubMenuOnLargeScreens() {
  if (window.innerWidth > 1024) {
    arrows.forEach((arrow) => {
      arrow.classList.remove("check");
    });
    subMenus.forEach((subMenu) => {
      subMenu.classList.remove("sub-menu--active");
    });
  }
}

// РЎС‚РІРѕСЂСЋС”РјРѕ РЅРѕРІРёР№ РѕР±'С”РєС‚ "MutationObserver"
const observer1 = new MutationObserver(function (mutationsList, observer) {
  // РџРµСЂРµРІС–СЂСЏС”РјРѕ РєРѕР¶РЅСѓ РјСѓС‚Р°С†С–СЋ РІ "mutationsList"
  for (const mutation of mutationsList) {
    // РџРµСЂРµРІС–СЂСЏС”РјРѕ РєРѕР¶РЅРёР№ РІСѓР·РѕР» РґРѕРґР°РЅРёР№ РІ "mutation.addedNodes"
    for (const node of mutation.addedNodes) {
      // РџРµСЂРµРІС–СЂСЏС”РјРѕ С‡Рё С” РІСѓР·РѕР» РµР»РµРјРµРЅС‚РѕРј Р· РєР»Р°СЃРѕРј "hystmodal__shadow"
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.classList.contains("hystmodal__shadow")
      ) {
        // Р”РѕРґР°С”РјРѕ Р°С‚СЂРёР±СѓС‚ "aria-label" Р·С– Р·РЅР°С‡РµРЅРЅСЏРј "Shadow button"
        node.setAttribute("aria-label", "Shadow button");
      }
    }
  }
});

// Р’СЃС‚Р°РЅРѕРІР»СЋС”РјРѕ РїР°СЂР°РјРµС‚СЂРё СЃРїРѕСЃС‚РµСЂРµР¶РµРЅРЅСЏ
observer1.observe(document.body, { childList: true, subtree: true });

function initSwiper(selector) {
  const swiper = new Swiper(selector, {
    direction: "horizontal",
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [],
  });

  function updateSwiper() {
    const swiperContainer = document.querySelector(selector);
    if (swiperContainer) {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        swiper.params.slidesPerView = 1;
      } else if (windowWidth < 1024) {
        swiper.params.slidesPerView = 2;
      } else {
        swiper.params.slidesPerView = 3;
      }
      swiper.update();
    }
  }

  window.addEventListener("resize", updateSwiper);
  updateSwiper();
}

if (typeof Swiper !== "undefined") {
  initSwiper(".review-slider-container");
  initSwiper(".document-slider-container");
  console.log("hrer");
}

const MAX_SHORT_DESCR_LENGTH = 100;
const contentShortDescr = document.querySelectorAll(".content__text");
contentShortDescr.forEach((content) => {
  let fullContent = content.textContent;
  content.dataset.fullDescr = fullContent;

  if (fullContent.length > MAX_SHORT_DESCR_LENGTH) {
    content.textContent =
      fullContent.substring(0, MAX_SHORT_DESCR_LENGTH) + "...";
    content.dataset.shortDescr = content.textContent;
  }
});

const readMoreBtn = document.querySelectorAll(".read-more-btn");
readMoreBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let content = btn.parentElement.querySelector(".content__text");
    let fullContent = content.dataset.fullDescr;
    openModalById("#popup", fullContent);
  });
});

const modalSessionItem =
  "РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РїРѕСЏРІРёС‚СЃСЏ С‡РµСЂРµР·:";
const DEFAULT_TIMER_TIME = 300;
let timer = 50;

let countdown;
sessionStorage.setItem(modalSessionItem, String(timer));

function handleCloseModal() {
  closeModalById("#modal-form");
}

const closeElements = document.querySelectorAll(".close, .close-main");
closeElements.forEach((element) => {
  element.addEventListener("click", handleCloseModal);
});

const myModal = new HystModal({
  beforeOpen: function () {},
  afterClose: function () {
    timer = DEFAULT_TIMER_TIME;
    sessionStorage.setItem(modalSessionItem, timer);
    clearInterval(countdown);
    startCountdown("#modal-form");
    history.pushState(null, "", "#close");
  },
});

function startCountdown(modalId) {
  countdown = setInterval(() => {
    sessionStorage.setItem(modalSessionItem, String(--timer));
    if (timer === 0) {
      clearInterval(countdown);
      openModalById(modalId);
    }
  }, 1000);
}

function openModalById(modalId, content) {
  if (content) {
    const modalContent = document.getElementById("modal-content");
    const docModalContent = document.getElementById("document-img-modal");
    if (docModalContent) {
      const image = docModalContent.querySelector("img");
      image.src = content;
    }
    if (modalContent) {
      modalContent.textContent = content;
    }

    const body = document.getElementsByTagName("body")[0];
    // body.classList.add("overflow-hidden");
  }

  history.pushState(null, "", modalId);
  if (document.location.hash === modalId) {
    clearInterval(countdown);
  }
  myModal.open(modalId);
}

function closeModalById(modalId) {
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("overflow-hidden");
  myModal.close(modalId);
}

document.addEventListener(
  "mouseleave",
  function (evnt) {
    if (evnt.clientY < 0 && !(DEFAULT_TIMER_TIME / 2 <= timer)) {
      if (!myModal.isOpened) {
        openModalById("#modal-form");
        clearInterval(countdown);
      }
    }
  },
  false
);

startCountdown("#modal-form");

// РћРЅРѕРІР»РµРЅРЅСЏ С‚Р°Р№РјРµСЂР° РїСЂРё РІРІРµРґРµРЅРЅС– РґР°РЅРёС… РІ Р±СѓРґСЊ-СЏРєРёР№ РІС…С–РґРЅРёР№ РµР»РµРјРµРЅС‚
const inputElements = document.querySelectorAll("input");
inputElements.forEach((input) => {
  input.addEventListener("input", function () {
    timer = DEFAULT_TIMER_TIME;
    sessionStorage.setItem(modalSessionItem, timer);
  });
});

const accordionItems = document.querySelectorAll(".accordion__item");
accordionItems.forEach((item, index) => {
  const header = item.querySelector(".item-header");
  const content = item.querySelector(".item-content");

  header.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      // Р—Р°РєСЂРёРІР°С”РјРѕ Р°РєС‚РёРІРЅРёР№ РµР»РµРјРµРЅС‚, СЏРєС‰Рѕ РІС–РЅ РІР¶Рµ РІС–РґРєСЂРёС‚РёР№
      item.classList.remove("active");
      content.style.maxHeight = 0;
    } else {
      // Р—Р°РєСЂРёРІР°С”РјРѕ РІСЃС– С–РЅС€С– Р°РєС‚РёРІРЅС– РµР»РµРјРµРЅС‚Рё РїРµСЂРµРґ РІС–РґРєСЂРёС‚С‚СЏРј РїРѕС‚РѕС‡РЅРѕРіРѕ РµР»РµРјРµРЅС‚Р°
      accordionItems.forEach((accItem, accIndex) => {
        if (accItem.classList.contains("active")) {
          accItem.classList.remove("active");
          const accContent = accItem.querySelector(".item-content");
          accContent.style.maxHeight = 0;
        }
      });

      // Р’С–РґРєСЂРёРІР°С”РјРѕ РїРѕС‚РѕС‡РЅРёР№ РµР»РµРјРµРЅС‚
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  // Р РѕР·РіРѕСЂС‚Р°С”РјРѕ РїРµСЂС€РёР№ РµР»РµРјРµРЅС‚ Р·Р° Р·Р°РјРѕРІС‡СѓРІР°РЅРЅСЏРј
  if (index === 0) {
    item.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
  }
});

document.querySelectorAll("input[id='form_btn']").forEach(function (el) {
  el.removeAttribute("disabled");
});

console.log("here");
