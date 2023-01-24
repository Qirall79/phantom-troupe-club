const avatars = document.querySelectorAll(".avatar");
const input = document.querySelector("input#avatar");

const handleClick = (e) => {
  const avatar = e.target.alt ? e.target.parentElement : e.target;
  avatars.forEach((a) => {
    a.classList.remove("selected");
  });
  avatar.classList.add("selected");
  input.value = document.querySelector(".selected img").getAttribute("src");
  console.log(input.value);
};

avatars.forEach((avatar) => {
  avatar.addEventListener("click", handleClick);
});
