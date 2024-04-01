document.addEventListener("DOMContentLoaded", function () {
  var currentIndex = 0;
  var cardsPerPage = 1; // Изначально на мобильных показываем по одной карточке

  var totalCards = document.querySelectorAll(".player-item").length;

  let totalCounterAll = document.querySelector(".player-counter-all");
  totalCounterAll.textContent = "/ " + totalCards;

  let currentCounter = document.querySelector(".player-counter");

  function showNextCards() {
    currentIndex = (currentIndex + cardsPerPage) % totalCards;
    updateCarousel();
    displayCurrentCard();
  }

  function showPrevCards() {
    currentIndex = (currentIndex - cardsPerPage + totalCards) % totalCards;
    updateCarousel();
    displayCurrentCard();
  }

  function updateCarousel() {
    document.querySelector(".player-list").style.transform =
      "translateX(" + -currentIndex * (100 / cardsPerPage) + "%)";
  }

  function displayCurrentCard() {
    // Вычисляем номер первой карточки на текущей странице
    var startCardIndex = currentIndex + 1;
    // Вычисляем номер последней карточки на текущей странице
    var endCardIndex = Math.min(startCardIndex + cardsPerPage - 1, totalCards);
    // Формируем строку с информацией о текущем диапазоне карточек
    currentCounter.textContent = endCardIndex;
  }

  // Проверяем размер окна и устанавливаем соответствующее количество карточек и счетчик
  function checkWindowSize() {
    if (window.innerWidth <= 375) {
      cardsPerPage = 1;
    } else {
      cardsPerPage = 3;
    }
    updateCarousel();
    displayCurrentCard();
  }

  // Вызываем функцию для первичной настройки
  checkWindowSize();

  // Обработчик изменения размера окна
  window.addEventListener("resize", checkWindowSize);

  document
    .querySelector(".player-button-next")
    .addEventListener("click", function () {
      clearInterval(autoInterval);
      showNextCards();
      autoInterval = setInterval(showNextCards, 4000);
    });

  document
    .querySelector(".player-button-prev")
    .addEventListener("click", function () {
      clearInterval(autoInterval);
      showPrevCards();
      autoInterval = setInterval(showNextCards, 4000);
    });

  var autoInterval = setInterval(showNextCards, 4000);
});

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Создаем точки
slides.forEach((slide, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

showSlide(slideIndex);

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

function showSlide(index) {
  const slidesLength = slides.length;

  // Устанавливаем активный слайд
  if (index < 0) {
    slideIndex = 0;
  } else if (index >= slidesLength) {
    slideIndex = slidesLength - 1;
  } else {
    slideIndex = index;
  }

  slides.forEach((slide, i) => {
    if (i === slideIndex) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });

  // Устанавливаем активную точку
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    if (i === slideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Устанавливаем состояние кнопок "Назад" и "Вперед"
  if (slideIndex === 0) {
    prevBtn.classList.add("inactive");
    nextBtn.classList.remove("inactive");
  } else if (slideIndex === slidesLength - 1) {
    prevBtn.classList.remove("inactive");
    nextBtn.classList.add("inactive");
  } else {
    prevBtn.classList.remove("inactive");
    nextBtn.classList.remove("inactive");
  }
}

// Проверяем ширину экрана и решаем, показывать ли слайдер или простой список
function checkScreenWidth() {
  if (window.innerWidth <= 376) {
    // Показываем слайдер на мобильных устройствах
    dotsContainer.style.display = "block";
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  } else {
    // Показываем простой список на десктопах
    dotsContainer.style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    slides.forEach((slide) => {
      slide.style.display = "flex";
    });
  }
}

//Бегущая строка
// Вызываем функцию при загрузке страницы и изменении размера окна
window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

// Получаем элемент бегущей строки
const marqueeContent = document.querySelector(".running-line-content");

// Функция для установки нового контента
function setMarqueeContent(newContent) {
  marqueeContent.textContent = newContent;
}

function setSpeed(speed) {
  marqueeContent.style.animationDuration = speed + "s";
}

// Устанавливаем скорость анимации в 10 секунд
setSpeed(20);
