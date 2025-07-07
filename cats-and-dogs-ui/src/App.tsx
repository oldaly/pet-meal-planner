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
  calculateCalories: number;
}

const mealTypeOptions = ["regular", "sensitive", "puppy/kitten"];

export default function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [allowedMeals, setAllowedMeals] = useState("");

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newSpecies, setNewSpecies] = useState("");
  const [newActivityLevel, setNewActivityLevel] = useState("");
  const [newDietaryRestrictions, setNewDietaryRestrictions] = useState("");

  const [addMessage, setAddMessage] = useState("");

  function getCalorieColor(calories: number): string {
  if (calories < 500) return "green";
  if (calories < 1000) return "orange";
  return "red";
  }

  const mealTypeIcons = {
  regular: "🍽️",
  sensitive: "⚠️",
  "puppy/kitten": "🐾",
  };

  function getMealBadgeStyle(type: string): React.CSSProperties {
  switch (type) {
    case "regular":
      return { backgroundColor: "#D1FAE5", color: "#065F46", padding: "2px 6px", borderRadius: "8px", marginRight: "4px" };
    case "sensitive":
      return { backgroundColor: "#FEF3C7", color: "#92400E", padding: "2px 6px", borderRadius: "8px", marginRight: "4px" };
    case "puppy/kitten":
      return { backgroundColor: "#E0E7FF", color: "#3730A3", padding: "2px 6px", borderRadius: "8px", marginRight: "4px" };
    default:
      return {};
  }
}

  
  const handleFilterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const queryParams = new URLSearchParams();

  if (species) queryParams.append("species", species);
  if (minAge) queryParams.append("minAge", minAge);
  if (maxAge) queryParams.append("maxAge", maxAge);
  if (allowedMeals) queryParams.append("allowedMeals", allowedMeals);

  const res = await fetch(`http://cats-and-dogs-api-env.eba-rdmt69m3.ap-southeast-2.elasticbeanstalk.com/api/pets?${queryParams.toString()}`);
  const data = await res.json();
  setPets(data); // or however you're storing the pets
};

  const handleAddPetSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newPet = {
    name: newName,
    ageInMonths: Number(newAge),
    species: newSpecies,
    weight: Number(newWeight),
    activityLevel: newActivityLevel,
    dietaryRestrictions: newDietaryRestrictions.split(',').map(s => s.trim()).filter(Boolean),
  };

  const res = await fetch("http://cats-and-dogs-api-env.eba-rdmt69m3.ap-southeast-2.elasticbeanstalk.com/api/pets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPet),
  });

  const addedPet = await res.json();
  setPets((prev) => [...prev, addedPet]);

  // Reset form
  setNewName("");
  setNewAge("");
  setNewWeight("");
  setNewSpecies("");
  setNewActivityLevel("");
  setNewDietaryRestrictions("");

  // Show message
  setAddMessage("🐶 Pet added!");
  setTimeout(() => setAddMessage(""), 3000);
};




  useEffect(() => {
    fetch("http://cats-and-dogs-api-env.eba-rdmt69m3.ap-southeast-2.elasticbeanstalk.com/api/pets")
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
      <h4 className="text-3xl font-bold mb-4">Add new pet</h4>
      {addMessage && <p className="text-green-600 font-semibold">{addMessage}</p>}
      <form onSubmit={handleAddPetSubmit}>
    <select value={newSpecies} onChange={(e) => setNewSpecies(e.target.value)}>
      <option value="">Select</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
    </select>

    <input
      type="string"
      placeholder="Name"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
    />
    <input
      type="number"
      placeholder="Age (months)"
      value={newAge}
      onChange={(e) => setNewAge(e.target.value)}
    />

    <input
      type="number"
      placeholder="Weight"
      value={newWeight}
      onChange={(e) => setNewWeight(e.target.value)}
    />

    <select value={newActivityLevel} onChange={(e) => setNewActivityLevel(e.target.value)} >
        <option value="">Select</option>
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
    </select>

    <input
      type="string"
      placeholder="Dietary Restrictions"
      value={newDietaryRestrictions}
      onChange={(e) => setNewDietaryRestrictions(e.target.value)}
    />

    <button type="submit">Add Pet</button>
  </form>

<h4 className="text-3xl font-bold mb-4">Filter pets</h4>
      <form onSubmit={handleFilterSubmit}>
    <select value={species} onChange={(e) => setSpecies(e.target.value)}>
      <option value="">All</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
    </select>

    <input
      type="number"
      placeholder="Min Age (months)"
      value={minAge}
      onChange={(e) => setMinAge(e.target.value)}
    />

    <input
      type="number"
      placeholder="Max Age (months)"
      value={maxAge}
      onChange={(e) => setMaxAge(e.target.value)}
    />

    <select value={allowedMeals} onChange={e => setAllowedMeals(e.target.value)}>
  <option value="">Select meal type</option>
  {mealTypeOptions.map(type => (
    <option key={type} value={type}>
      {type}
    </option>
  ))}
</select>

    <button type="submit">Filter</button>
  </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        
        <ul className="space-y-4">
          {pets.map((pet) => (
            <li key={pet.name} className="border p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold">{pet.name} ({pet.species})</h2>
              <p>Age: {pet.ageInYears} • Weight: {pet.weight}kg • Activity: {pet.activityLevel}</p>
              <p>Restrictions: {(pet.dietaryRestrictions && pet.dietaryRestrictions.length > 0)
              ? pet.dietaryRestrictions.join(", ")
              : "None"}</p>
              <p>
                Allowed Meals:{" "}
                {pet.mealType?.length ? (
                  pet.mealType.map((type) => (
                    <span key={type} style={getMealBadgeStyle(type)}>
                      {mealTypeIcons[type as keyof typeof mealTypeIcons]} {type}
                    </span>
                  ))
                ) : (
                  <span style={{ color: "#888" }}>None</span>
                )}
              </p>


              <p style={{ color: getCalorieColor(pet.calculateCalories) }}>Calories per day: {pet.calculateCalories}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
