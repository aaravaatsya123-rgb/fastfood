const stick = document.getElementById("stick");
let dragging = false;

stick.addEventListener("mousedown", () => dragging = true);
document.addEventListener("mouseup", () => dragging = false);

document.addEventListener("mousemove", e => {
  if (!dragging) return;
  let dx = e.movementX;
  move(dx);
});
