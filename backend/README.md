# PlagaAlert Backend

This is the backend service for PlagaAlert, built with FastAPI.

It handles data processing, environmental data integration, risk calculation, and AI-based insights.

---

## Tech Stack

- Python
- FastAPI
- Uvicorn
- External APIs (weather data)
- AI integration (Gemini)

---

## Responsibilities

- Receive location and crop data
- Fetch environmental conditions:
  - Temperature
  - Humidity
  - Rainfall
- Run a risk model based on thresholds
- Generate:
  - Risk score
  - Risk level
  - Main cause
  - Recommendations
- Optionally generate AI insights

---

## Running locally

Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows


---

# 3. README BACKEND

`/backend/README.md`

```md
# PlagaAlert Backend

This is the backend service for PlagaAlert, built with FastAPI.

It handles data processing, environmental data integration, risk calculation, and AI-based insights.

---

## Tech Stack

- Python
- FastAPI
- Uvicorn
- External APIs (weather data)
- AI integration (Gemini)

---

## Responsibilities

- Receive location and crop data
- Fetch environmental conditions:
  - Temperature
  - Humidity
  - Rainfall
- Run a risk model based on thresholds
- Generate:
  - Risk score
  - Risk level
  - Main cause
  - Recommendations
- Optionally generate AI insights

---

## Running locally

Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

## Run the server:

```bash
uvicorn main:app --reload