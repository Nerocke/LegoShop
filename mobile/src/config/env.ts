import Constants from "expo-constants";

const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL || "http://localhost:3000";

export { API_BASE_URL };
