🐾 Lyka Live Coding Challenge — "Meal Planner for Pets"

🟢 Scenario
Lyka delivers fresh pet meals. Your task is to build a basic system that creates personalized meal plans based on each pet's profile.

✅ Part 1 – Base Functionality (~25 mins)
Create a program that:

Accepts a list of pets with the following attributes:
name: string
species: "dog" | "cat"
age: number (in years)
weight: number (in kg)
activityLevel: "low" | "moderate" | "high"
Calculates daily calorie needs using this formula:
Base Calorie Need = weight * multiplier

Multiplier:
- low: 30
- moderate: 40
- high: 50
Outputs each pet’s:
Name
Species
Daily calorie requirement
🟡 Part 2 – Extend the Logic (~15 mins)
Now add:

Function to generate a weekly meal plan (7 days), with each day's calories split into 2 meals.
Each meal can be represented like:
{
  day: "Monday",
  meals: [350, 350] // in kcal
}
🔵 Part 3 – Add Constraints (~10 mins)
Add a field dietaryRestrictions: string[] (e.g., ["grain-free", "low-fat"])
Add a field mealType: "regular" | "sensitive" | "puppy/kitten"
Based on restrictions, filter the available meal types for each pet and assign the most appropriate.
🔴 Optional Stretch (~10 mins)
Implement function: updatePetProfile(name: string, newData: Partial<Pet>) that updates a pet’s profile and recalculates the meal plan.
📤 Output Example
Pet: Luna (dog)
Calories/day: 1000
Meal Plan:
- Monday: [500, 500]
- Tuesday: [500, 500]
...

Dietary: [grain-free]
Meal Type: sensitive
🧪 Sample Input
[
  {
    name: "Luna",
    species: "dog",
    age: 3,
    weight: 20,
    activityLevel: "moderate",
    dietaryRestrictions: ["grain-free"],
    mealType: "sensitive"
  },
  {
    name: "Milo",
    species: "cat",
    age: 5,
    weight: 5,
    activityLevel: "low",
    dietaryRestrictions: [],
    mealType: "regular"
  }
]
