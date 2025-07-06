export type MealType = "regular" | "sensitive" | "puppy/kitten";
const defaultMeal: MealType = "regular";


const dietaryToMealTypeMap = new Map<string, MealType[]>([
  ["grain-free", ["sensitive"]],
  ["low-fat", ["sensitive"]],
  ["high-protein", ["regular", "puppy/kitten"]],
  ["puppy-formula", ["puppy/kitten"]],
  // Add more as needed
]);

export class Pet {
  constructor(
    public name: string,
    public ageInMonths: number,
    public species: "dog" | "cat",
    public weight: number,
    public activityLevel: "low" | "moderate" | "high",
    public dietaryRestrictions: string[],
    public mealType: MealType[] = []
  ) {}

  get ageInYears(): string{
    const years = Math.floor(this.ageInMonths/12);
    const months = this.ageInMonths % 12;
    return `${years} year(s) ${months} month(s)`;

  }
  ageInYearsMethod(): string{
    const years = Math.floor(this.ageInMonths/12);
    const months = this.ageInMonths % 12;
    return `${years} year(s) ${months} month(s)`;

  }
  get calculateCalories(): number {
    let multiplier: number = 0;
    switch (this.activityLevel){
                case "low": 
                     multiplier = 30;
                    break;
                case "moderate":
                    multiplier = 40;
                    break;
                case "high":
                    multiplier = 50;
                    break;
    }
  /*const multiplier = {
    low: 30,
    moderate: 40,
    high: 50
  }[this.activityLevel];*/

  return this.weight * multiplier;
}

 public getAllowedMealTypes(): MealType[] {
    if (this.dietaryRestrictions.length == 0) return [defaultMeal];
   const allowed = new Set<MealType>();

  for (const restriction of this.dietaryRestrictions) {
    const types = dietaryToMealTypeMap.get(restriction);
    if (types) {
      types.forEach(t => allowed.add(t));
    }
  }

  return Array.from(allowed);
}

  toJSON() {
    return {
      name: this.name,
      ageInMonths: this.ageInMonths,
      species: this.species,
      weight: this.weight,
      activityLevel: this.activityLevel,
      dietaryRestrictions: this.dietaryRestrictions,
      mealType: this.mealType,
      ageInYears: this.ageInYears, 
      calculateCalories: this.calculateCalories
    };
  }
}

