const handleTogglesCard = () => {
  const arrows = document.querySelectorAll(".program-list__arrow");

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
  console.log("here");
  handleTogglesCard();
});
