const form = document.getElementById("tripForm");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const results = document.getElementById("results");
const itineraryContainer = document.getElementById("itineraryContainer");
const budgetTable = document.getElementById("budgetTable");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop page from refreshing on submit

  const destination = document.getElementById("destination").value;
  const days = parseInt(document.getElementById("days").value);
  const budget = parseInt(document.getElementById("budget").value);
  const style = document.getElementById("style").value;

  // reset UI state
  errorBox.classList.add("hidden");
  results.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const res = await fetch("http://localhost:3000/api/generate-trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, days, budget, style })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Something went wrong");
    }

    const data = await res.json();

    renderItinerary(data.itinerary);
    renderBudget(data.budget);

    results.classList.remove("hidden");
  } catch (err) {
    errorBox.textContent = "Error: " + err.message;
    errorBox.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
});

function renderItinerary(itinerary) {
  itineraryContainer.innerHTML = "";
  itinerary.forEach(day => {
    const div = document.createElement("div");
    div.className = "day-card";
    div.innerHTML = `
      <h3>Day ${day.day}</h3>
      <ul>${day.activities.map(a => `<li>${a}</li>`).join("")}</ul>
    `;
    itineraryContainer.appendChild(div);
  });
}

function renderBudget(budget) {
  budgetTable.innerHTML = `
    <tr><td>Hotel</td><td>₹${budget.hotel}</td></tr>
    <tr><td>Food</td><td>₹${budget.food}</td></tr>
    <tr><td>Transport</td><td>₹${budget.transport}</td></tr>
    <tr><td>Activities</td><td>₹${budget.activities}</td></tr>
    <tr><td>Total</td><td>₹${budget.total}</td></tr>
  `;
}