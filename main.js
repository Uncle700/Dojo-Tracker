const app = document.getElementById("app");

let xp = parseInt(localStorage.getItem("xp")) || 0;
let rank = "Earthling";
let workoutLog = JSON.parse(localStorage.getItem("log")) || [];
let filters = { tempo: "", rest: "", difficulty: "" };

const rankThresholds = [0, 100, 250, 500, 1000, 2000];
const ranks = ["Earthling", "Martial Artist", "Saiyan", "Z Warrior", "Super Saiyan", "Ultra Instinct"];

function updateRank() {
  rank = ranks[rankThresholds.findIndex(th => xp < th)] || ranks[ranks.length - 1];
}

function logWorkout() {
  const entry = {
    name: prompt("Exercise name?"),
    sets: parseInt(prompt("Sets?")),
    reps: parseInt(prompt("Reps?")),
    weight: parseInt(prompt("Weight (kg)?")),
    tempo: prompt("Tempo (e.g. 2-0-2)?"),
    rest: parseInt(prompt("Rest time (seconds)?")),
    difficulty: prompt("Difficulty (Easy/Medium/Hard)?")
  };
  workoutLog.push(entry);
  xp += entry.sets * entry.reps + 25;
  localStorage.setItem("log", JSON.stringify(workoutLog));
  localStorage.setItem("xp", xp);
  render();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function render() {
  updateRank();
  app.innerHTML = `<div class='card'>
    <h1>Dojo Tracking</h1>
    <p>XP: ${xp}</p>
    <p>Rank: ${rank}</p>
    <button onclick="logWorkout()">Log Workout</button>
    <button onclick="toggleDarkMode()">Toggle Dark Mode</button>
  </div>
  <div class='card'>
    <h2>Workout Log</h2>
    <label>Filter tempo:</label> <input onchange="setFilter('tempo', this.value)" value="${filters.tempo}"><br/>
    <label>Filter rest:</label> <input onchange="setFilter('rest', this.value)" value="${filters.rest}"><br/>
    <label>Filter difficulty:</label>
    <select onchange="setFilter('difficulty', this.value)">
      <option value="">All</option>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>
    <ul>
      ${workoutLog.filter(matchFilter).map(e => `
        <li>${e.name}: ${e.sets}×${e.reps} @ ${e.weight}kg (${e.tempo}, ${e.rest}s, ${e.difficulty})</li>
      `).join("")}
    </ul>
  </div>`;
}

function setFilter(key, val) {
  filters[key] = val;
  render();
}

function matchFilter(e) {
  return (!filters.tempo || e.tempo.includes(filters.tempo)) &&
         (!filters.rest || e.rest.toString() === filters.rest) &&
         (!filters.difficulty || e.difficulty === filters.difficulty);
}

render();