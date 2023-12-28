document.addEventListener("DOMContentLoaded", (event) => {
  const elements = document.querySelectorAll(".phone_input");
  const maskOptions = {
    mask: "+{7}(000)000-00-00",
  };

  elements.forEach((e) => {
    const mask = IMask(e, maskOptions);
  });
});
