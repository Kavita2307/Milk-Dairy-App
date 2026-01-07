export interface WeightResponse {
  weight: number;
  stable: boolean;
}

const BASE_URL = "http://192.168.4.1"; // change if needed

export async function getWeight(): Promise<WeightResponse> {
  const response = await fetch(`${BASE_URL}/api/weight`);
  if (!response.ok) {
    throw new Error("Failed to fetch weight");
  }
  return response.json();
}

export async function tareScale(): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/tare`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Tare failed");
  }
}
