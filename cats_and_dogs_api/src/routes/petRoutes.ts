// src/routes/petRoutes.ts
import { Router } from "express";
import { Pet } from "../models/pet";
import { PetService } from "../services/pet_service";
import { MealPlan } from "../services/meal_plan";
import { PetFilter } from "../services/pet_service";
import { ref } from "process";

export default function petRoutes(petService: PetService, mealPlan: MealPlan) {
  const router = Router();


    router.post("/pets", (req, res) => {
    const pet = new Pet(
        req.body.name,
        req.body.ageInMonths,
        req.body.species,
        req.body.weight,
        req.body.activityLevel,
        req.body.dietaryRestrictions,
    );
    pet.mealType = pet.getAllowedMealTypes();
    petService.addPet(pet);
    res.status(201).json(pet);

    });

    router.get("/pets", (req, res) => {
        const species = req.query.species as string | undefined;
        const minAgeInMonths = req.query.minAge as number | undefined;
        const maxAgeInMonths = req.query.maxAge as number | undefined;

        const filter: PetFilter = {species, minAgeInMonths, maxAgeInMonths};
        let pets = petService.getAll();

        if (species || minAgeInMonths != undefined || maxAgeInMonths != undefined){

            pets = petService.getFilteredPets(filter);
        }
       
        res.json(pets);
    });

    router.get("/pets/:name", (req, res) => {
    res.json(petService.getPet(req.params.name));
    });

    router.get("/pets/:name/mealtypes", (req, res) => {
        const pet = petService.getPet(req.params.name);
        if (!pet){
            res.status(404).json({ error: "Pet not found" });
            return;
        }
        res.json(pet.getAllowedMealTypes());
    });

   type DietaryUpdateRequest = {
    dietaryRestrictions: string[];
    };

    router.put("/pets/:name/dietaryRestrictions", (req, res) => {
        mealPlan.updateProfile(req.params.name, {dietaryRestrictions: req.body.dietaryRestrictions});
        res.status(201).json({ message: "Dietary Restrictions added", name: req.params.name });
    });

    
    return router;
}

