const app = document.getElementById("app");

let xp = parseInt(localStorage.getItem("xp")) || 0;
let rank = "Earthling";
const rankThresholds = [0, 100, 250, 500, 1000, 2000];
const ranks = ["Earthling", "Martial Artist", "Saiyan", "Z Warrior", "Super Saiyan", "Ultra Instinct"];

function updateRank() {
  rank = ranks[rankThresholds.findIndex(th => xp < th)] || ranks[ranks.length - 1];
}

function render() {
  updateRank();
  app.innerHTML = `
    <div class="card">
      <h1>Dojo Tracking</h1>
      <p>XP: ${xp}</p>
      <p>Rank: ${rank}</p>
      <button onclick="logWorkout()">Complete Workout</button>
      <button onclick="toggleDarkMode()">Toggle Dark Mode</button>
    </div>
  `;
}

function logWorkout() {
  const sessionXP = 50;
  xp += sessionXP;
  localStorage.setItem("xp", xp);
  render();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

render();