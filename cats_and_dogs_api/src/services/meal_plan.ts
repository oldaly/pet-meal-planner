import { Pet } from "../models/pet";
import { PetService } from "./pet_service";
type DailyMeal = [string, [number, number]];
type PetExtended = [Pet, DailyMeal[]];

export class MealPlan{
    private petsExtended: PetExtended[] = [];
    constructor(public pets: PetService){

    }

    generateMealPlan(pet : Pet): DailyMeal[]{
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const caloriesPerMeal = pet.calculateCalories / 2;
        return daysOfWeek.map(d => [d, [caloriesPerMeal,caloriesPerMeal]]);
    }
    generateAll(){
        this.petsExtended = this.pets.getAll().map(p =>  [p, this.generateMealPlan(p)]);
    }
    printAll(){
        for (const [pet, meals] of this.petsExtended){
            console.log(`Pet ${pet.name} needs ${pet.calculateCalories} calories per day`);
            
            for (const [day,[meal1,meal2]] of meals)
            {
                console.log(` - ${day}: [${meal1}, ${meal2}]`);
            }
            console.log(`Allowed meal types: ${pet.getAllowedMealTypes()}`)
        }

    }

    updateProfile(name: string, petData: Partial<Pet> ){
        const pet = this.pets.getAll().find(f => f.name === name);
        if (!pet){
            throw new Error(`Pet name ${name} not found`);
        }
        Object.assign(pet, petData);

        const petExtended = this.petsExtended.find(([pet, meals]) => pet.name === name);
        if (!petExtended){
            throw new Error(`Pet name ${name} not found`);
        }
        Object.assign(petExtended[0], petData);
        petExtended[0].mealType = petExtended[0].getAllowedMealTypes();
        petExtended[1] = this.generateMealPlan(petExtended[0]);

    }

}