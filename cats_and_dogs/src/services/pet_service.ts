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

    updateProfile(name: string, petData: Partial<Pet> ){
        const pet = this.pets.find(f => f.name = name);
        if (!pet){
            throw new Error(`Pet name ${name} not found`);
        }
        Object.assign(pet, petData);

    }
}