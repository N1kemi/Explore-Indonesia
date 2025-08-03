const searchButton = document.querySelector(".nav-bar_button");
const searchField = document.querySelector(".nav-bar_field");

searchButton.addEventListener("click", () => {
  searchField.classList.toggle("active");
});

const hamburger = document.querySelector(".hamburger");
const burgerMenu = document.querySelector(".burger-menu");
const navBarButton = document.querySelector(".nav-bar_button");
const body = document.body;

function toggleMenu() {
  burgerMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
  navBarButton.classList.toggle("hidden");

  if (burgerMenu.classList.contains("active")) {
    body.classList.add("no-scroll");
    document.addEventListener("click", closeMenuOnClickOutside);
  } else {
    body.classList.remove("no-scroll");
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  const isClickInsideMenu =
    burgerMenu.contains(event.target) || hamburger.contains(event.target);

  if (!isClickInsideMenu) {
    burgerMenu.classList.remove("active");
    hamburger.classList.remove("active");
    navBarButton.classList.remove("hidden");
    body.classList.remove("no-scroll");
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

hamburger.addEventListener("click", toggleMenu);

const openLoginBtn = document.getElementById("openModalBtn");
const openRegisterBtn = document.querySelector(".register-link");
const closeModalBtns = document.querySelectorAll(".background-close");
const loginContainer = document.getElementById("form-container");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const goToRegister = document.getElementById("goToRegister");
const goToLogin = document.getElementById("goToLogin");

openLoginBtn.addEventListener("click", () => {
  loginContainer.classList.add("show");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  document.body.classList.add("no-scroll");
});

openRegisterBtn.addEventListener("click", () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  loginContainer.classList.add("show");
  document.body.classList.add("no-scroll");
});

goToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Switching to register form...");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

goToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Close button clicked!");
    loginContainer.classList.remove("show");
    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");

    if (!burgerMenu.classList.contains("active")) {
      document.body.classList.remove("no-scroll");
    }

    console.log("Forms closed:", loginContainer.classList);
  });
});

const forms = document.querySelectorAll(".main-form");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs(form);
  });
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = (form) => {
  const username = form.querySelector(".username");
  const email = form.querySelector(".email");
  const password = form.querySelector(".password");

  if (username && username.value.trim() === "") {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }

  if (email && email.value.trim() === "") {
    setError(email, "Email is required");
  } else if (email && !isValidEmail(email.value)) {
    setError(email, "Provide a valid email address");
  } else if (email) {
    setSuccess(email);
  }

  if (password && password.value.trim() === "") {
    setError(password, "Password is required");
  } else if (password && password.value.length < 8) {
    setError(password, "Password must be at least 8 characters.");
  } else if (password) {
    setSuccess(password);
  }
};

const slides = document.querySelectorAll(".slide");
const progress = document.querySelector(".progress");
const indicatorText = document.querySelector(".indicator-text");
let currentSlide = 0;
const totalSlides = slides.length;
const slideInterval = 4000;

function updateSlideNumber() {
  indicatorText.textContent = `0${currentSlide + 1}`;

  const progressHeight = ((currentSlide + 1) / totalSlides) * 100;
  progress.style.height = `${progressHeight}%`;
}

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));

  slides[index].classList.add("active");

  updateSlideNumber();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

let slideTimer = setInterval(nextSlide, slideInterval);

const sliderContainer = document.querySelector(".slider-container");

sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(slideTimer);
});

sliderContainer.addEventListener("mouseleave", () => {
  slideTimer = setInterval(nextSlide, slideInterval);
});
showSlide(currentSlide);

const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 0,
  slidesPerGroup: 1,
  speed: 800,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    },
  },
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
