    // src/server.ts
    import petRoutes from "./routes/petRoutes";
    import { Pet } from "./models/pet";
    import { PetService } from "./services/pet_service";
    import { MealType } from "./models/pet";
    import { MealPlan } from "./services/meal_plan";
    import express from "express";
    import cors from "cors";



    const petData = [
    {
        name: "Luna",
        species: "dog",
        age: 3,
        weight: 20,
        activityLevel: "moderate",
        dietaryRestrictions: ["grain-free"], 
        mealType: []
    },
    {
        name: "Milo",
        species: "cat",
        age: 5,
        weight: 5,
        activityLevel: "low",
        dietaryRestrictions: [],
        mealType: []
    }
    ];

    const pets = petData.map(p => {
        const pet = new Pet(p.name, 
        p.age, 
        p.species as "dog" | "cat", 
        p.weight, 
        p.activityLevel as "low" | "moderate" | "high",
        p.dietaryRestrictions,
        p.mealType as MealType[]);

        pet.mealType = pet.getAllowedMealTypes();

        return pet;
    
    });


    const petService = new PetService(pets);
    const mealPlan = new MealPlan(petService);
    mealPlan.generateAll();


    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
    res.send("🐾 Welcome to Cats & Dogs API!");
    });

    app.use("/api", petRoutes(petService, mealPlan));

    const PORT = process.env.PORT || 3000;

    if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🐾 API is running on port ${PORT}`);
    });
    }

export default app;

