import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BedIcon from "@mui/icons-material/Bed";
import MapIcon from "@mui/icons-material/Map";
import ScaleIcon from "@mui/icons-material/Scale";

const bedIconMap = {
  totalBeds: {
    icon: BedIcon,
    title: "Beds",
  },
  totalPacketsPerCycle: {
    icon: ShoppingBagIcon,
    title: "Packets/cycle",
  },
  totalPacketsYearly: {
    icon: ShoppingBagIcon,
    title: "Packets/Yearly",
  },
  totalProductionYearlyInTonn: {
    icon: ScaleIcon,
    title: "Production/Yearly(Tonnes)",
  },
  totalProductiveArea: {
    icon: MapIcon,
    title: "Area(Sq Ft)",
  },
  totalSale: {
    icon: CurrencyRupeeIcon,
    title: "Yearly Sale",
  },
};

export default bedIconMap;
