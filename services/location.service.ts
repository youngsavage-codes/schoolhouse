import axios from "axios";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/iamspruce/nigeria-states-lga@master/states.json";

interface StateData {
  state: string;
  lgas: string[];
  cities?: string[];
}

let cachedData: StateData[] | null = null;

/* ---------------- Fetch All States ---------------- */
export const fetchStates = async (): Promise<string[]> => {
  if (!cachedData) {
    const res = await axios.get<StateData[]>(BASE_URL);
    cachedData = res.data;
  }

  return cachedData.map((item) => item.state);
};

/* ---------------- Fetch LGAs & Cities by State ---------------- */
export const fetchLGAsAndCities = async (
  state: string
): Promise<{ lgas: string[]; cities: string[] }> => {
  if (!cachedData) {
    const res = await axios.get<StateData[]>(BASE_URL);
    cachedData = res.data;
  }

  const found = cachedData.find(
    (item) => item.state.toLowerCase() === state.toLowerCase()
  );

  return {
    lgas: found?.lgas || [],
    cities: found?.cities || [],
  };
};
