import { Pet } from "../models/pet"
import { MealPlan } from "./meal_plan";
export class PetService
{
    private pets: Pet[];
    constructor(pets: Pet[] = []){
        this.pets = pets;
    }

    getAll(){
        return this.pets;
    }

    addPet(pet: Pet){
        this.pets.push(pet);
    }

    getPet(name: string): Pet | undefined{
        return this.pets.find(f => f.name === name);
    }

    
}