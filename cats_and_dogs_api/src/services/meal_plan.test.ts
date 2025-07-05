import { Pet } from "../models/pet";
import { PetService } from "./pet_service";
import { MealPlan } from "./meal_plan";

describe("MealPlan", () => {
  const pet = new Pet("Luna", 3, "dog", 20, "moderate", [], ["regular"]);
  const service = new PetService([pet]);
  const planner = new MealPlan(service);

  it("generates meal plan with 7 days", () => {
    const plan = planner.generateMealPlan(pet);
    expect(plan.length).toBe(7);
    expect(plan[0][0]).toBe("Monday");
    expect(plan[0][1]).toEqual([400, 400]); // 800 total = 400 each meal
  });

  it("generates all pets' meal plans", () => {
    planner.generateAll();
    // private member, so you’d normally test via public method or expose getter
    // You could refactor to expose petsExtended for testing if needed
  });
});
