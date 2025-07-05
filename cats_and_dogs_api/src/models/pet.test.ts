import { Pet } from "./pet";

describe("Pet", () => {
  it("calculates calories correctly", () => {
    const pet = new Pet("Luna", 3, "dog", 20, "moderate", [], ["regular"]);
    expect(pet.calculateCalories()).toBe(800); // 20 * 40
  });

  it("returns default meal type when no dietary restrictions", () => {
    const pet = new Pet("Milo", 5, "cat", 5, "low", [], ["regular"]);
    expect(pet.getAllowedMealTypes()).toEqual(["regular"]);
  });

  it("returns correct meal types for grain-free restriction", () => {
    const pet = new Pet("Luna", 3, "dog", 20, "moderate", ["grain-free"], ["sensitive"]);
    expect(pet.getAllowedMealTypes()).toEqual(["sensitive"]);
  });

  it("returns multiple allowed meal types for high-protein", () => {
    const pet = new Pet("Champ", 2, "dog", 25, "high", ["high-protein"], ["puppy/kitten"]);
    expect(pet.getAllowedMealTypes().sort()).toEqual(["puppy/kitten", "regular"].sort());
  });
});
