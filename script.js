const url =
  "https://developer.nps.gov/api/v1/parks?stateCode=CA&api_key=wsocPvzImHobFSy9eqfISnL5LT3UCLNmCavydLOp";

const slideContainer = document.querySelector(".slideshow-container");
const dotsContainer = document.querySelector(".dots")
let slideIndex = 1;

fetch(url)
  .then((res) => res.json())
  .then((res) => generateDisplay(res.data));

function generateDisplay(arr) {
  console.log(arr);
  let index = 0
  arr.forEach((park) => {
    if (park.designation.includes("National Park") || park.designation.includes("National and State Parks")) {
      console.log(park);
      let htmlTemplate = `
      <div class="mySlides fade">
        <img src="${park.images[0].url}"/>
        <div class="title">${park.fullName}</div>
        <div class="text">${park.images[0].caption}</div>
      </div>
      `;

      index++

      let dotsHTML = `
        <span class="dot" onclick="currentSlide(${index})"></span>
      `

      slideContainer.insertAdjacentHTML("afterbegin", htmlTemplate);
      dotsContainer.insertAdjacentHTML("beforeend", dotsHTML)
    }
  });

  showSlides(slideIndex);
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
