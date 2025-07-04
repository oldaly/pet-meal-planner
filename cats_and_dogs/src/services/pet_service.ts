import { Pet } from "../models/pet"
export class PetService
{
    private pets: Pet[];
    constructor(pets: Pet[]){
        this.pets = pets;
    }

    getAll(){
        return this.pets;
    }

    
}