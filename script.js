const player = document.getElementById("player");
const obstacle = document.querySelector(".obstacle");
const scoreText = document.getElementById("score");

let score = 0;
let left = 45;
let jumping = false;

// Keyboard control
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && left > 5) {
    left -= 10;
    player.style.left = left + "%";
  }
  if (e.key === "ArrowRight" && left < 85) {
    left += 10;
    player.style.left = left + "%";
  }
  if (e.key === "ArrowUp" && !jumping) {
    jump();
  }
});

function jump() {
  jumping = true;
  let up = 0;
  const jumpUp = setInterval(() => {
    if (up >= 100) {
      clearInterval(jumpUp);
      const down = setInterval(() => {
        if (up <= 0) {
          clearInterval(down);
          jumping = false;
        }
        up -= 5;
        player.style.bottom = up + "px";
      }, 20);
    }
    up += 5;
    player.style.bottom = up + "px";
  }, 20);
}

// Collision + Score
setInterval(() => {
  const p = player.getBoundingClientRect();
  const o = obstacle.getBoundingClientRect();

  if (
    p.left < o.right &&
    p.right > o.left &&
    p.bottom > o.top &&
    p.top < o.bottom
  ) {
    alert("Game Over 😭\nScore: " + score);
    location.reload();
  }

  score++;
  scoreText.innerText = "Score: " + score;
}, 100);
