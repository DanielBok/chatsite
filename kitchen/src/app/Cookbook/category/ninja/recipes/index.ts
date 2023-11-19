import { alphabetical } from "radash";
import BakedMacaroniAndCheese from "./static/baked-macaroni-and-cheese.png";
import BuffaloChickenWings from "./static/buffalo-chicken-wings.png";

import HerbRoastedChicken from "./static/herb-roasted-chicken.png";
import PankoCrustedCodWithQuinoa from "./static/panko-crusted-cod-with-quinoa.png";
import StickyStLouisRibs from "./static/sticky-st-louis-ribs.png";
import TeriyakiChickenBroccoliRice from "./static/teriyaki-chicken-broccoli-rice.png";

import { Recipe, Timings } from "./types";


const recipes: Recipe[] = [
  {
    name: "Baked Macaroni & Cheese",
    difficulty: 1,
    servings: {min: 6, max: 8},
    ingredients: [
      {searchKey: "Baking Soda", description: "1 tablespoon baking soda"},
      {searchKey: "Lemon Juice", description: "1/2 cup lemon juice"},
      {searchKey: "Water", description: "5 cups water"},
      {searchKey: "Dry Elbow Pasta", description: "1 box (16 ounces) dry elbow pasta"},
      {searchKey: "Heavy Cream", description: "1 cup heavy cream"},
      {searchKey: "Shredded Cheese", description: "1 bag (16 ounces) shredded cheese"},
      {searchKey: "Kosher Salt", description: "2 tablespoons kosher salt"},
      {searchKey: "Ground Black Pepper", description: "1 tablespoon ground black pepper"},
      {searchKey: "Onion Powder", description: "1 tablespoon onion powder"},
      {searchKey: "Garlic Powder", description: "1 tablespoon garlic powder"},
      {searchKey: "Mustard Powder", description: "1 tablespoon mustard powder"},
      {searchKey: "Italian Bread Crumbs or Panko", description: "2 cups panko or Italian bread crumbs"},
      {searchKey: "Butter", description: "1 stick (1/2 cup) butter, melted"},
    ],
    directions: [
      `Place baking soda and lemon juice into the pot. Stir until dissolved and bubbling has stopped. Add the water and dry pasta, stirring to incorporate.`,
      `Assemble pressure lid, making sure the pressure release valve is in the SEAL position. Select PRESSURE and set to low (LO). Set time to 0 minutes (the time the unit takes to pressurize is long enough to cook the pasta). Select START/STOP to begin.`,
      `When pressure cooking is complete, allow pressure to natural release for 10 minutes. After 10 minutes, quick release remaining pressure by moving the pressure release valve to the VENT position. Carefully remove lid when unit has finished releasing pressure.`,
      `Add remaining ingredients, except bread crumbs and butter, to the pot.`,
      `Stir well to melt cheese and ensure all ingredients are combined.`,
      `In a bowl, stir together the bread crumbs and melted butter. Cover pasta evenly with the mixture.`,
      `Close the crisping lid. Select AIR CRISP, set the temperature to 360°F, and set the time to 7 minutes. Select START/STOP to begin.`,
      `When cooking is complete, serve immediately.`
    ],
    timing: {
      prep: 10,
      cook: 0,
      pressureBuild: 7,
      pressureCook: 0,
      pressureRelease: 10,
      airCrisp: 7,
      bakeRoast: 0,
      broil: 0,
    },
    image: BakedMacaroniAndCheese,
    tips: [
      `To make this mac & cheese more kid friendly, remove onion powder, garlic powder, and mustard powder, and serve the kids before adding the bread crumb topping.`
    ]
  },
  {
    name: "Buffalo Chicken Wings",
    difficulty: 1,
    servings: {min: 4, max: 6},
    ingredients: [
      {searchKey: "Water", description: "1/2 cup water"},
      {
        searchKey: "Chicken Wings, Drums Flats",
        description: "2 pounds frozen chicken wings, drums and flats separated"
      },
      {searchKey: "Canola", description: "2 tablespoons canola oil"},
      {searchKey: "Buffalo Sauce", description: "2 tablespoons Buffalo sauce"},
      {searchKey: "Kosher Salt", description: "2 teaspoons Kosher Salt"},
    ],
    directions: [
      `Pour water into pot. Place wings into the Cook & Crisp™ Basket and place basket in pot. Assemble the pressure lid, making sure the pressure release valve is in the SEAL position.`,
      ` Select PRESSURE and set HIGH. Set time to 5 minutes. Select START/STOP to begin.`,
      `3 When pressure cooking is complete, quick release the pressure by turning the pressure release valve to the VENT position. Carefully remove lid when unit has finished releasing pressure.`,
      `Pat wings dry with paper towels and toss with 2 tablespoons oil in the basket.`,
      `5 Close crisping lid. Select AIR CRISP, set temperature to 390°F, and set time to 15 minutes. Select START/STOP to begin.`,
      `After 7 minutes, open lid, then lift basket and shake wings or toss them with silicone-tipped tongs. Lower basket back into pot and close lid to resume cooking.`,
      `7 While the wings are cooking, stir together Buffalo sauce and salt in a large mixing bowl.`,
      ` When cooking is complete, transfer wings to the bowl with buffalo sauce and toss to coat. `,
    ],
    timing: {
      prep: 10,
      cook: 20,
      pressureBuild: 6,
      pressureCook: 0,
      pressureRelease: "quick" as Timings["pressureRelease"],
      airCrisp: 0,
      bakeRoast: 0,
      broil: 0,
    },
    image: BuffaloChickenWings,
    tips: [
      `Want to use fresh wings instead of frozen? Rather than pressure cooking, simply place fresh wings in the basket and toss with 2 tablespoons canola oil. Then Air Crisp at 390°F for 24–28 minutes.`
    ]
  },
  {
    name: "Frozen Chicken Dinner",
    difficulty: 2,
    servings: 2,
    ingredients: [
      {searchKey: "Olive Oil", description: "2 tablespoons olive oil, divided"},
      {searchKey: "Onion", description: "1 small onion, peeled, diced "},
      {searchKey: "Rice", description: "1 cup wild rice blend"},
      {searchKey: "Kosher Salt", description: "3 teaspoons kosher salt, divided"},
      {searchKey: "Ras el Hanout", description: `1 tablespoon Moroccan seasoning “Ras el Hanout”`},
      {searchKey: "Chicken Stock", description: "3/4 cup chicken stock"},
      {searchKey: "Chicken Breast", description: "2 frozen chicken breasts (8-10 ounces each)"},
      {searchKey: "Green Beans", description: "1 bag (12 ounces) green beans, trimmed "},
      {searchKey: "Black Pepper", description: "1 teaspoon black pepper, divided"},
      {searchKey: "Parsley", description: "1/4 cup fresh parsley, chopped"},
      {searchKey: "Honey Mustard Sauce", description: "1/4 cup honey mustard sauce"},

    ],
    directions: [
      `Select SEAR/SAUTÉ and set to HIGH. Allow to preheat for 5 minutes`,
      `After 5 minutes, add 1 tablespoon oil and onion. Cook, stirring occasionally, for 3 minutes, until onions are fragrant. Add wild rice, 2 teaspoons salt, and Moroccan seasoning. Cook, stirring frequently, until the rice is coated with oil and very shiny. Add chicken stock and stir to incorporate. `,
      `Place frozen chicken breasts on reversible rack, making sure rack is in the higher position. Place rack inside pot over rice mixture.`,
      `Assemble pressure lid, making sure the pressure release valve is in the SEAL position.`,
      `Select PRESSURE and set to HIGH. Set time to 22 minutes. Select START/STOP to begin. `,
      `While chicken and rice are cooking, toss green beans in a bowl with the remaining oil, salt, and pepper.`,
      `When pressure cooking is complete, allow pressure to naturally release for 10 minutes. After 10 minutes, quick release any remaining pressure by turning the pressure release valve to the VENT position. Carefully remove lid when unit has finished releasing pressure.`,
      `Lift reversible rack out of the pot. Stir parsley into rice, then add green beans directly on top of the rice.`,
      `Brush chicken breasts on all sides with honey mustard sauce, then return the reversible rack to the pot over rice and green beans.`,
      `Close crisping lid. Select BROIL and set time to 10 minutes. Select START/STOP to begin.`,
      `Cooking is complete when internal temperature reaches 165°F. Serve chicken with green beans and rice.`,
    ],
    timing: {
      prep: 10,
      cook: {min: 37, max: 40},
      pressureBuild: 8,
      pressureCook: 0,
      pressureRelease: 10,
      airCrisp: 0,
      bakeRoast: 0,
      broil: 0,
    },
  },
  {
    name: "Herb-Roasted Chicken",
    difficulty: 1,
    servings: 4,
    ingredients: [
      {searchKey: "Chicken", description: "1 whole uncooked chicken (4 1/2–5 pounds)"},
      {searchKey: "Lemon Juice", description: "Juice of 2 lemons (1/4 cup lemon juice)"},
      {searchKey: "Water", description: "1/4 cup hot water"},
      {searchKey: "Honey", description: "1/4 cup honey"},
      {searchKey: "Kosher Salt", description: "2 tablespoons plus 2 tablespoons kosher salt, divided"},
      {searchKey: "Black Peppercorns", description: "1 tablespoon whole black peppercorns"},
      {searchKey: "Fresh Thyme", description: "5 sprigs fresh thyme"},
      {searchKey: "Garlic", description: "5 cloves garlic, peeled, smashed"},
      {searchKey: "Canola Oil", description: "1 tablespoon canola oil"},
      {searchKey: "Ground Black Pepper", description: "2 teaspoons ground black pepper"},
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
      broil: 0,
    },
    image: HerbRoastedChicken,
    tips: [
      "Use cooking spray in place of oil to evenly coat large cuts of protein in the Cook & Crisp Basket."
    ]
  },
  {
    name: "Miso-Glazed Salmon & Bok Choy",
    difficulty: 2,
    servings: 4,
    ingredients: [
      {searchKey: "Chicken", description: "1 whole uncooked chicken (4 1/2–5 pounds)"},
      {searchKey: "Lemon Juice", description: "Juice of 2 lemons (1/4 cup lemon juice)"},
      {searchKey: "Water", description: "1/4 cup hot water"},
      {searchKey: "Honey", description: "1/4 cup honey"},
      {searchKey: "Kosher Salt", description: "2 tablespoons plus 2 tablespoons kosher salt, divided"},
      {searchKey: "Black Peppercorns", description: "1 tablespoon whole black peppercorns"},
      {searchKey: "Fresh Thyme", description: "5 sprigs fresh thyme"},
      {searchKey: "Garlic", description: "5 cloves garlic, peeled, smashed"},
      {searchKey: "Canola Oil", description: "1 tablespoon canola oil"},
      {searchKey: "Ground Black Pepper", description: "2 teaspoons ground black pepper"},
    ],
    directions: [
      `Place rice and water into the pot. Stir to combine. Place reversible rack in pot, making sure rack is in the higher position.`,
      `Season salmon with salt, then place on rack. Assemble pressure lid, making sure the pressure release valve is in the SEAL position`,
      `Select PRESSURE and set to HIGH. Set time to 2 minutes. Select START/STOP to begin.`,
      `While salmon and rice are cooking, stir together miso and butter to form a paste. Toss bok choy with mirin and sesame oil.`,
      `When pressure cooking is complete, quick release the pressure by moving the pressure release valve to the VENT position. Carefully remove lid when unit has finished releasing pressure.`,
      `Gently pat salmon dry with paper towel, then spread miso butter evenly on top of the fillets. Add bok choy to the rack.`,
      `Close crisping lid. Select BROIL and set time to 7 minutes. Select START/STOP to begin, checking for doneness after 5 minutes.`,
      `When cooking is complete, remove salmon from rack and serve with bok choy and rice. Garnish with sesame seeds, if desired.`,
    ],
    timing: {
      prep: 10,
      cook: {min: 7, max: 9},
      pressureBuild: 5,
      pressureCook: 0,
      pressureRelease: "quick" as Timings["pressureRelease"],
      airCrisp: 0,
      bakeRoast: 0,
      broil: 0,
    },
    image: HerbRoastedChicken,
    tips: [
      "Use cooking spray in place of oil to evenly coat large cuts of protein in the Cook & Crisp Basket."
    ]
  },
  {
    name: "Panko-Crusted Cod with Quinoa",
    difficulty: 1,
    servings: {min: 4, max: 6},
    ingredients: [
      {searchKey: "White Quinoa", description: "1 1/2 cups white quinoa"},
      {searchKey: "Kosher Salt", description: "3 teaspoons kosher salt, divided"},
      {searchKey: "Water", description: "1 1/2 cups water"},
      {searchKey: "Panko Bread Crumbs", description: "1 cup panko bread crumbs"},
      {searchKey: "Butter", description: "1/2 stick (1/4 cup) butter, melted"},
      {searchKey: "Parsley", description: "1/4 cup fresh parsley, minced"},
      {searchKey: "Lemon", description: "Zest and juice of 2 lemons"},
      {searchKey: "Cod fillets", description: "4 fresh cod fillets (5–6 ounces each)"},
      {searchKey: "Asparagus", description: "1 bunch asparagus, stems trimmed"},
      {searchKey: "Extra Virgin Olive Oil", description: "1 teaspoon extra virgin olive oil"},
    ],
    directions: [
      `Place the quinoa, 1 teaspoon salt, and water into the pot.`,
      `Assemble pressure lid, making sure the pressure release valve is in the SEAL position. Select PRESSURE and set to high (HI). Set time to 2 minutes. Select START/STOP to begin.`,
      `While quinoa is cooking, in a bowl, stir together the bread crumbs with butter, parsley, lemon zest and juice, and 1 teaspoon salt. Press panko mixture evenly onto the top of each cod fillet.`,
      `When pressure cooking is complete, quick release the pressure by moving the pressure release valve to the VENT position. Carefully remove lid when unit has finished releasing pressure.`,
      `Toss the asparagus with olive oil and 1 teaspoon salt. Lay asparagus evenly on top of quinoa.`,
      `Place the reversible rack in the pot over the quinoa and asparagus, making sure it is in the higher position. Place the cod fillets on the rack, breading side up.`,
      `Close the crisping lid. Select BAKE/ROAST, set the temperature to 350°F, and set the time to 12 minutes. Select START/STOP to begin. Cook for up to an additional 2 minutes if necessary.`,
      `Cooking is complete when internal temperature reaches 145°F. Serve cod with quinoa and asparagus.`,
    ],
    timing: {
      prep: 10,
      cook: 0,
      pressureBuild: 7,
      pressureCook: 2,
      pressureRelease: 1,
      airCrisp: 0,
      bakeRoast: {min: 12, max: 14},
      broil: 0,
    },
    image: PankoCrustedCodWithQuinoa
  },
  {
    name: "Sticky St. Louis Ribs",
    difficulty: 2,
    servings: 4,
    ingredients: [
      {searchKey: "Barbecue Spice Rub", description: "1/4 cup barbecue spice rub"},
      {searchKey: "Kosher Salt", description: "2 tablespoons kosher salt"},
      {searchKey: "Brown Sugar", description: "2 tablespoons brown sugar"},
      {
        searchKey: "St. Louis Ribs",
        description: "1 rack uncooked St. Louis ribs (3–3 1/2 pounds), cut in thirds (4 ribs per section)"
      },
      {searchKey: "Beer", description: "1/2 cup beer"},
      {searchKey: "Barbecue Sauce", description: "1 cup barbecue sauce"},
    ],
    directions: [
      `In a small bowl, stir together barbecue spice rub, salt, and brown sugar. Season ribs evenly with spice mix.`,
      `Pour beer into pot. Place ribs into Cook & Crisp™ Basket and place basket in pot.`,
      `Assemble pressure lid, making sure the pressure release valve is in the SEAL position.`,
      `Select PRESSURE and set to HIGH. Set time to 19 minutes. Select START/STOP to begin.`,
      `When pressure cooking is complete, quick release pressure by turning the pressure release valve to the VENT position. Carefully remove pressure lid when unit has finished releasing pressure.`,
      `Close crisping lid. Select AIR CRISP, set temperature to 400°F, and set time to 15 minutes. Select START/STOP to begin.`,
      `After 10 minutes, open lid and liberally brush ribs with barbecue sauce. Close lid to resume cooking for 5 more minutes.`,
      `When internal temperature reaches 185°F, cooking is complete and ribs are ready to serve.`
    ],
    timing: {
      prep: 10,
      cook: 0,
      pressureBuild: 6,
      pressureCook: 19,
      pressureRelease: 1,
      airCrisp: 15,
      bakeRoast: 0,
      broil: 0,
    },
    image: StickyStLouisRibs,
    tips: [
      "The Ninja® roasting rack insert makes it easy to hold up the ribs while cooking. It is available for purchase on ninjaaccessories.com."
    ]
  },
  {
    name: "Teriyaki Chicken, Broccoli & Rice",
    difficulty: 1,
    servings: 2,
    ingredients: [
      {searchKey: "Rice", description: "1 cup long-grain white rice, rinsed"},
      {searchKey: "Chicken Stock", description: "1 cup chicken stock"},
      {searchKey: "Vegetables", description: "1/2 cup frozen mixed vegetables"},
      {searchKey: "Kosher Salt", description: "2 teaspoons kosher salt, divided"},
      {searchKey: "Ground Black Pepper", description: "2 teaspoons ground black pepper, divided"},
      {searchKey: "Adobo Seasoning", description: "1 tablespoon Adobo seasoning"},
      {searchKey: "Chicken Breast", description: "2 uncooked fresh boneless skinless chicken breasts (8 ounces each)"},
      {searchKey: "Broccoli", description: "1 head broccoli, cut in 2-inch florets"},
      {searchKey: "Extra Virgin Olive Oil", description: "1 tablespoon extra virgin olive oil"},
      {searchKey: "Teriyaki Sauce", description: "1/4 cup teriyaki sauce"},
    ],
    directions: [
      `Place rice, chicken stock, frozen vegetables, 1 teaspoon salt, 1 teaspoon pepper, and Adobo seasoning into the pot; stir to combine.`,
      `Place chicken breasts on reversible rack, making sure rack is in the higher position. Place rack inside pot over rice mixture.`,
      `Assemble pressure lid, making sure the pressure release valve is in the SEAL position. Select PRESSURE and set to high (HI). Set time to 2 minutes. Select START/STOP to begin.`,
      `While chicken and rice are cooking, toss broccoli in a bowl with the olive oil and remaining salt and pepper`,
      `When pressure cooking is complete, allow pressure to natural release for 10 minutes. After 10 minutes, quick release any remaining pressure by turning the pressure release valve to the VENT position. Carefully remove lid when unit has finished releasing pressure.`,
      `Brush tops of chicken breasts liberally with teriyaki sauce. Add broccoli to rack around chicken.`,
      `Close crisping lid. Select BROIL and set time to 12 minutes. Select START/STOP to begin.`,
      `Check after 10 minutes for desired doneness. Cooking is complete when internal temperature of chicken reaches 165°F. Serve chicken with rice and broccoli.`,
    ],
    timing: {
      prep: 10,
      cook: 0,
      pressureBuild: 8,
      pressureCook: 2,
      pressureRelease: 10,
      airCrisp: 0,
      bakeRoast: 0,
      broil: 12,
    },
    image: TeriyakiChickenBroccoliRice,
  },
].map(({timing, ...rest}) => {
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
    id: processKey(rest.name),
    ...rest,
    timing: {
      ...timing,
      total: total.min === total.max ? total.min : total
    }
  };
});

export default alphabetical(recipes, e => e.name.toLowerCase())
  .reduce((acc, r) => ({...acc, [r.id]: r}), {} as Record<string, Recipe>);

function processKey(name: string) {
  return name.replace("&", "and")
    .replace(/[,.]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}