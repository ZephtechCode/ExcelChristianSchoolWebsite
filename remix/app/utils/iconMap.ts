import { IconType } from "react-icons";
import {
  FaBook,
  FaCoffee,
  FaUser,
  FaCross,
  FaGraduationCap,
} from "react-icons/fa";

const iconMap: Record<string, IconType> = {
  book: FaBook,
  coffee: FaCoffee,
  user: FaUser,
  cross: FaCross,
  "graduation-cap": FaGraduationCap,
};

export default iconMap;
