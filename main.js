import "./style.scss";
import gsap from "gsap";

// https://twitter.com/avstorm/status/1696401608458764517

const input = document.querySelector("input");
const cursor = document.querySelector(".cursor");
const progress = document.querySelector(".progress");
const check = document.querySelector(".check");
const letters = document.querySelector(".letters");
const lengthSpan = document.querySelector(".top span");

let completed = false;

input.addEventListener("input", (e) => {
  const inputText = input.value;

  // console.log(inputText)

  letters.innerHTML = "";
  for (let index = 0; index < inputText.length; index++) {
    if (inputText.length <= 10) {
      const element = inputText[index];
      const span = document.createElement("span");
      span.innerText = element;
      letters.appendChild(span);
    }
  }

  if (completed) {
    completed = false;
    const tl = gsap.timeline();
    gsap.to(check, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "none",
    });
    gsap.to(cursor, {
      width: "7px",
      left: letters.offsetWidth + 22 + "px",
      background: "#cbd5e1",
      ease: "none",
      duration: 0.3,
    });
  }

  if (inputText.length > 9) {
    completed = true;
    const tl = gsap.timeline();
    tl.to(cursor, {
      width: "30px",
      left: "calc(100% - 2.5rem)",
      background: "#1d4ed8",
      ease: "none",
      rotate: 360,
      duration: 0.3,
    });
    tl.to(check, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "none",
    });
  }

  if (inputText.length > 9) {
    input.value = inputText.substring(0, 10);
  }

  //


  cursor.style.left = letters.offsetWidth + 22 + "px";

  //

  const progressValue = (input.value.length / 10) * 100;
  progress.style.height = progressValue + "%";

  lengthSpan.textContent = input.value.length + "/10";
});

input.addEventListener(
  "select",
  function () {
    this.selectionStart = this.selectionEnd;
  },
  false
);
