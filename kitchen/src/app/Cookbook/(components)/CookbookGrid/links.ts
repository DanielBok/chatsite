import { alphabetical } from "radash";
import NinjaFoodiImage from "./static/ninja-foodi.jpg";


const links = alphabetical([
  {
    source: "Ninja",
    link: "ninja",
    description: "A collection of recipe from Ninja cookbooks",
    image: NinjaFoodiImage,
  }
], e => e.source.toLowerCase());

export default links;