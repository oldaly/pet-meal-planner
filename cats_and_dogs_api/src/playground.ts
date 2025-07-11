import { Pet } from "./models/pet";
import { MealPlan } from "./services/meal_plan";
import { PetService } from "./services/pet_service";
import { MealType } from "./models/pet";

const petData = [
  {
    name: "Luna",
    species: "dog",
    ageInMonths: 36,
    weight: 20,
    activityLevel: "moderate",
    dietaryRestrictions: ["grain-free"], 
    mealType: []
  },
  {
    name: "Milo",
    species: "cat",
    ageInMonths: 60,
    weight: 5,
    activityLevel: "low",
    dietaryRestrictions: [],
    mealType: []
  }
];

const pets = petData.map(p => new Pet(p.name, 
    p.ageInMonths, 
    p.species as "dog" | "cat", 
    p.weight, 
    p.activityLevel as "low" | "moderate" | "high",
    p.dietaryRestrictions,
    p.mealType as MealType[]));


const petService = new PetService(pets);

const mealPlan = new MealPlan(petService);

mealPlan.generateAll();
mealPlan.printAll();
    

mealPlan.updateProfile("Milo", {ageInMonths: 6, weight: 6 });
const updatedPet = pets.find(f => f.name = "Milo");
console.log(`Pet with name ${updatedPet?.name} has been updated: age: ${updatedPet?.ageInMonths}, weight: ${updatedPet?.weight}`);
console.log(`${updatedPet?.name}'s age in years is ${updatedPet?.ageInYears} `);


    