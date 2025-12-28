const menuToggle = document.getElementById("menuToggle");
const drawer = document.getElementById("drawer");
const links = drawer.querySelectorAll("a");

menuToggle.addEventListener("click", () => {
  drawer.classList.toggle("open");
});

links.forEach(link => {
  link.addEventListener("click", () => {
    drawer.classList.remove("open");
  });
});
document.addEventListener("click", (event) => {
  const isClickInsideDrawer = drawer.contains(event.target);
  const isClickOnButton = menuToggle.contains(event.target);

  // If the click is NOT on the drawer AND NOT on the toggle button
  if (!isClickInsideDrawer && !isClickOnButton) {
    drawer.classList.remove("open");
  }
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
} 
const textBox = document.querySelector(".text-box");
const paragraphs = textBox.querySelectorAll("p");

paragraphs.forEach(p => {
  const words = p.innerText.split(" "); // Split text by spaces
  p.innerHTML = ""; // Clear the original text

  words.forEach(word => {
    const span = document.createElement("span");
    span.classList.add("word");
    span.innerText = word + " "; // Add the word plus the space back
    p.appendChild(span);
  });
});