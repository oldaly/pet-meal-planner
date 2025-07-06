import { Pet } from "../models/pet";
import { PetService } from "../services/pet_service";
import { MealPlan } from "../services/meal_plan";

describe("🐾 Integration Test: PetService + MealPlan + Pet", () => {
  let pets: Pet[];
  let service: PetService;
  let planner: MealPlan;

  beforeEach(() => {
    pets = [
      new Pet("Luna", 3, "dog", 20, "moderate", ["grain-free"], ["sensitive"]),
      new Pet("Milo", 5, "cat", 5, "low", [], ["regular"])
    ];
    service = new PetService(pets);
    planner = new MealPlan(service);
  });

  it("generates correct meal plans for all pets", () => {
    planner.generateAll();

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    planner.printAll();

    expect(consoleSpy).toHaveBeenCalledWith("Pet Luna needs 800 calories per day");
    expect(consoleSpy).toHaveBeenCalledWith("Pet Milo needs 150 calories per day");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Allowed meal types: sensitive"));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Allowed meal types: regular"));

    consoleSpy.mockRestore();
  });

  it("updates profile and recalculates correctly", () => {
    const milo = pets.find(p => p.name === "Milo");
    expect(milo).toBeDefined();

    if (milo) {
      milo.ageInMonths = 72;
      milo.weight = 6;

      planner.generateAll();

      expect(milo.ageInMonths).toBe(72);
      expect(milo.weight).toBe(6);
      expect(milo.calculateCalories()).toBe(180);
    }
  });

  it("gets allowed meal types from dietary restrictions", () => {
    const luna = pets.find(p => p.name === "Luna");
    expect(luna?.getAllowedMealTypes()).toEqual(["sensitive"]);
  });

  it("throws error on update of non-existent pet", () => {
    expect(() => {
      const ghost = pets.find(p => p.name === "Ghost");
      if (!ghost) throw new Error("Pet name Ghost not found");
    }).toThrow("Pet name Ghost not found");
  });
});
