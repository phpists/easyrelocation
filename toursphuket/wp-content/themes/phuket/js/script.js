const handleTogglesCard = (className) => {
  const arrows = document.querySelectorAll(`.${className}`);

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      const parent = e.currentTarget?.offsetParent;
      parent.classList.toggle("active");
      parent.children[1].style.display = !parent.classList.contains("active")
        ? "none"
        : "block";
    });
  });
};

document.addEventListener("DOMContentLoaded", (event) => {
    handleTogglesCard("program-list__arrow");
  handleTogglesCard("price-list__arrow");
});
