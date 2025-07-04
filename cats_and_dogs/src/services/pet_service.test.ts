import { PetService } from "./pet_service";
import { Pet } from "../models/pet";

describe("PetService", () => {
  const pet = new Pet("Luna", 3, "dog", 20, "moderate", [], "regular");
  let service: PetService;

  beforeEach(() => {
    service = new PetService([pet]);
  });

  it("gets all pets", () => {
    expect(service.getAll().length).toBe(1);
    expect(service.getAll()[0].name).toBe("Luna");
  });

  
});
