import { Recipe } from "./types";
import HerbRoastedChicken from "./static/herb-roasted-chicken.png";


const recipes: Recipe[] = [
  {
    name: "Herb-Roasted Chicken",
    difficulty: 1,
    servings: 4,
    ingredients: [
      {searchKey: "Chicken", description: "1 whole uncooked chicken (4 1/2–5 pounds)"},
      {searchKey: "Lemon juice", description: "Juice of 2 lemons (1/4 cup lemon juice)"},
      {searchKey: "Water", description: "1/4 cup hot water"},
      {searchKey: "Honey", description: "1/4 cup honey"},
      {searchKey: "Kosher salt", description: "2 tablespoons plus 2 tablespoons kosher salt, divided"},
      {searchKey: "Black peppercorns", description: "1 tablespoon whole black peppercorns"},
      {searchKey: "Fresh thyme", description: "5 sprigs fresh thyme"},
      {searchKey: "Garlic", description: "5 cloves garlic, peeled, smashed"},
      {searchKey: "Canola oil", description: "1 tablespoon canola oil"},
      {searchKey: "Ground black pepper", description: "2 teaspoons ground black pepper"},
    ],
    directions: [
      `Remove packet of giblets, if included in cavity of the chicken. Rinse chicken and tie legs together with cooking twine.`,
      `In a small bowl, mix together lemon juice, hot water, honey, and 2 tablespoons salt. Pour mixture into the pot. Place whole peppercorns, thyme, and garlic in the pot`,
      `Place chicken into the Cook & Crisp™ Basket and place basket in pot.`,
      `Assemble pressure lid, making sure the pressure release valve is in the SEAL position. Select PRESSURE and set to high (HI). Set time to 22 minutes. Select START/STOP to begin.`,
      `When pressure cooking is complete, allow pressure to natural release for 5 minutes. After 5 minutes, quick release the pressure by moving the pressure release valve to the VENT position. Carefully remove lid when unit has finished releasing pressure.`,
      `Brush chicken with canola oil or spray with cooking spray. Season with salt and pepper.`,
      `Close crisping lid. Select AIR CRISP, set temperature to 400°F, and set time to 8 minutes. Select START/STOP to begin. Cook until desired level of crispness is reached, adding up to 10 additional minutes.`,
      `Let chicken rest for 5–10 minutes. Cooking is complete when internal temperature reaches 165°F. Remove chicken from basket using the Ninja® roast lifters* (or 2 large serving forks).`
    ],
    timing: {
      prep: 10,
      cook: 0,
      pressureBuild: 6,
      pressureCook: 22,
      pressureRelease: 5,
      airCrisp: {min: 8, max: 18},
      bakeRoast: 0,
    },
    image: HerbRoastedChicken,
    tips: [
      "Use cooking spray in place of oil to evenly coat large cuts of protein in the Cook & Crisp Basket."
    ]
  }
].map(({timing, ...rest}, id) => {
  const total = Object.entries(timing).reduce((acc, [k, v]) => {
    if (k === "pressureRelease") {
      return acc;
    }

    if (typeof v === "number") {
      v = {min: v, max: v};
    }
    v = v as { min: number, max: number };
    acc.min += v.min;
    acc.max += v.max;

    return acc;
  }, {min: 0, max: 0});


  return {
    id,
    ...rest,
    timing: {
      ...timing,
      total: total.min === total.max ? total.min : total
    }
  };
});

export default recipes;