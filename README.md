# ✈ Wander — AI Travel Planner

A full-stack web app that generates personalized day-by-day travel itineraries and budget breakdowns using AI, based on a destination, trip length, budget, and travel style.

## Features

- Generates a custom multi-day itinerary using the Gemini API
- Estimates a budget breakdown (hotel, food, transport, activities)
- Clean, responsive frontend built with vanilla HTML, CSS, and JavaScript
- Express backend that securely handles AI API calls

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (Fetch API)
**Backend:** Node.js, Express
**AI:** Google Gemini API
**Other:** dotenv (env config), CORS

## How it works

1. User fills in destination, number of days, budget, and travel style
2. Frontend sends this data to the Express backend
3. Backend builds a prompt and calls the Gemini API, requesting structured JSON output
4. Gemini returns a day-by-day itinerary and cost breakdown
5. Backend passes this back to the frontend, which renders it as a styled itinerary and budget table

## Project Structure
