import { Pet } from "../models/pet"
import { MealPlan } from "./meal_plan";
type Species = "cat" | "dog";
export interface PetFilter{
    species?: string;
    minAgeInMonths? : number;
    maxAgeInMonths? : number;
}
export class PetService
{
    private pets: Pet[];
    constructor(pets: Pet[] = []){
        this.pets = pets;
    }

    getAll(){
        return this.pets;
    }

    getFilteredPets(filter: PetFilter): Pet[]{
        return this.pets.filter(pet =>{
            if (filter.species && pet.species !== filter.species) return false;
            if (filter.minAgeInMonths !== undefined && pet.ageInMonths < filter.minAgeInMonths) return false;
            if (filter.maxAgeInMonths !== undefined && pet.ageInMonths > filter.maxAgeInMonths) return false;
            return true;
            
            }

        )
    }

    addPet(pet: Pet){
        this.pets.push(pet);
    }

    getPet(name: string): Pet | undefined{
        return this.pets.find(f => f.name === name);
    }

    
}