// src/routes/petRoutes.ts
import { Router } from "express";
import { Pet } from "../models/pet";
import { PetService } from "../services/pet_service";
import { MealPlan } from "../services/meal_plan";

export default function petRoutes(petService: PetService, mealPlan: MealPlan) {
  const router = Router();


    router.post("/pets", (req, res) => {
    const pet = new Pet(
        req.body.name,
        req.body.age,
        req.body.type,
        req.body.weight,
        req.body.activityLevel,
        req.body.dietaryRestrictions,
        req.body.mealType
    );

    petService.addPet(pet);
    res.status(201).json({ message: "Pet added", pet });
    });

    router.get("/pets", (req, res) => {
    res.json(petService.getAll());
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

