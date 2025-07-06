# 🐾 Pets Meal Planner

A full-stack TypeScript app to manage dog and cat meal plans based on age, weight, activity level, and dietary restrictions.

---

## 🚀 Features

- Add new pets (dogs or cats)
- Auto-calculate daily calorie needs
- Determine allowed meal types based on dietary restrictions
- Filter pets by species, age range, and meal type
- Responsive React UI
- Dockerized for easy local setup
- Deployed via GitHub Actions

---

## 🌐 Live Demo

- **Frontend (S3 + static website hosting)**  
  📍 http://cats-and-dogs-ui.s3-website-ap-southeast-2.amazonaws.com/index.html

- **Backend (Elastic Beanstalk)**  
  📍 http://cats-and-dogs-api-env.eba-rdmt69m3.ap-southeast-2.elasticbeanstalk.com/api/pets

---

## 🖼️ Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Express + TypeScript
- **Deployment**: AWS S3 (UI), AWS Elastic Beanstalk (API)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Future-Ready**: Supports deployment to AWS Lambda, EC2, or any Docker-compatible service

---

## 🧠 Meal Type Logic

Allowed meal types are based on dietary restrictions:

| Restriction     | Meal Types Allowed        |
|----------------|---------------------------|
| grain-free     | sensitive                 |
| low-fat        | sensitive                 |
| high-protein   | regular, puppy/kitten     |
| puppy-formula  | puppy/kitten              |
| *(none)*       | regular (default)         |

---

## 🧪 API Examples

### ➕ Add a Pet
```http
POST /api/pets
Content-Type: application/json

{
  "name": "Bella",
  "ageInMonths": 18,
  "species": "cat",
  "weight": 4,
  "activityLevel": "moderate",
  "dietaryRestrictions": ["puppy-formula", "grain-free"]
}

🔍 Get Pets with Filters

GET /api/pets?species=dog&minAge=12&maxAge=60&allowedMeals=sensitive

🐳 Docker Setup
Build the image
docker build -t cats-dogs-api .
Run the container
docker run -p 3000:3000 cats-dogs-api
Optional: Run in detached mode
docker run -d -p 3000:3000 cats-dogs-api
Stop all running containers
docker ps       # find the container ID
docker stop <container_id>


# App available at:
http://localhost:5173

🛠 Local Development (without Docker)

Backend

cd cats_and_dogs_api
npm install
npm run build
npm run start

Frontend

cd cats-and-dogs-ui
npm install
npm run dev

🔁 GitHub Actions CI/CD

Automatic deployment on push to main:
Frontend → AWS S3
Backend → AWS Elastic Beanstalk
Easily extendable to support:
AWS Lambda (via API Gateway)
AWS EC2 (via Docker)
GitHub Pages (for frontend only)

🔀 Branch Strategy
main: Production-ready, deployable via GitHub Actions
dev: Ongoing development and testing

📄 License
MIT License


