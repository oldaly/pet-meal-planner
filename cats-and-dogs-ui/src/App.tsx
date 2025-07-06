// src/App.tsx
import { useEffect, useState } from "react";

interface Pet {
  name: string;
  ageInMonths: number;
  ageInYears: string;
  species: "dog" | "cat";
  weight: number;
  activityLevel: "low" | "moderate" | "high";
  dietaryRestrictions: string[];
  mealType: string[];
}

export default function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/pets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch pets:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-3xl font-bold mb-4">🐾 Cats & Dogs Meal Planner</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {pets.map((pet) => (
            <li key={pet.name} className="border p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold">{pet.name} ({pet.species})</h2>
              <p>Age: {pet.ageInYears} • Weight: {pet.weight}kg • Activity: {pet.activityLevel}</p>
              <p>Restrictions: {pet.dietaryRestrictions.join(", ") || "None"}</p>
              <p>Allowed Meals: {pet.mealType.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
