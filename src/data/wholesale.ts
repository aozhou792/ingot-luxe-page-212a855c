import heroDevice from "@/assets/hero-device.png";
import custom3Pack from "@/assets/Alibarbar-3-pcs_1800x.webp";
import custom5Pack from "@/assets/custom-5-pack.png";
import custom10Pack from "@/assets/Alibarbar-10-pcs_1800x.webp";
import { getSelectableFlavorProducts } from "./products";

const flavourCount = getSelectableFlavorProducts().length;

export type WholesaleProduct = {
  name: string;
  img: string;
  puffs: string;
  flavours: string;
  nicotine: string;
  type: string;
  whatsappMessage: string;
};

export const wholesaleProducts: WholesaleProduct[] = [
  {
    name: "ALIBARBAR INGOT 9000",
    img: heroDevice,
    puffs: "9,000",
    flavours: String(flavourCount),
    nicotine: "Per packaging",
    type: "Disposable",
    whatsappMessage: "Hi, I'd like wholesale pricing for Alibarbar Ingot 9000 single units.",
  },
  {
    name: "3 FLAVOUR CUSTOM PACK",
    img: custom3Pack,
    puffs: "9,000 / device",
    flavours: "3 per pack",
    nicotine: "Per packaging",
    type: "Mixed pack",
    whatsappMessage: "Hi, I'd like wholesale pricing for the Alibarbar 3 Flavour Custom Pack.",
  },
  {
    name: "5 FLAVOUR CUSTOM PACK",
    img: custom5Pack,
    puffs: "9,000 / device",
    flavours: "5 per pack",
    nicotine: "Per packaging",
    type: "Mixed pack",
    whatsappMessage: "Hi, I'd like wholesale pricing for the Alibarbar 5 Flavour Custom Pack.",
  },
  {
    name: "10 FLAVOUR CUSTOM PACK",
    img: custom10Pack,
    puffs: "9,000 / device",
    flavours: "10 per pack",
    nicotine: "Per packaging",
    type: "Bulk pack",
    whatsappMessage: "Hi, I'd like wholesale pricing for the Alibarbar 10 Flavour Custom Pack.",
  },
];
