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
        ageInMonths: 36,
        weight: 20,
        activityLevel: "moderate",
        dietaryRestrictions: ["grain-free", "low-fat"], // should map to ["sensitive"]
        mealType: []
    },
    {
        name: "Milo",
        species: "cat",
        ageInMonths: 60,
        weight: 5,
        activityLevel: "low",
        dietaryRestrictions: [], // should default to ["regular"]
        mealType: []
    },
    {
        name: "Charlie",
        species: "dog",
        ageInMonths: 12,
        weight: 8,
        activityLevel: "high",
        dietaryRestrictions: ["high-protein"], // maps to ["regular", "puppy/kitten"]
        mealType: []
    },
    {
        name: "Bella",
        species: "cat",
        ageInMonths: 18,
        weight: 4,
        activityLevel: "moderate",
        dietaryRestrictions: ["puppy-formula", "grain-free"], // maps to ["puppy/kitten", "sensitive"]
        mealType: []
    },
    {
        name: "Max",
        species: "dog",
        ageInMonths: 48,
        weight: 25,
        activityLevel: "low",
        dietaryRestrictions: ["low-fat", "high-protein"], // maps to ["sensitive", "regular", "puppy/kitten"]
        mealType: []
    },
];


    const pets = petData.map(p => {
        const pet = new Pet(p.name, 
        p.ageInMonths, 
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
    const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://cats-and-dogs-ui.s3-website-ap-southeast-2.amazonaws.com"
    ];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

    app.use(express.json());

    app.get("/", (req, res) => {
    res.send("🐾 Welcome to the Cats & Dogs API!");
    });

    app.use("/api", petRoutes(petService, mealPlan));

    const PORT = process.env.PORT || 3000;

    if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🐾 API is running on port ${PORT}`);
    });
    }

export default app;

