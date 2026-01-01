import parentConfig from "@robinbobin/eslint-config-react-native";
import { defineConfig } from "eslint/config";

export default defineConfig(parentConfig, {
  ignores: ["dist/*"],
});
