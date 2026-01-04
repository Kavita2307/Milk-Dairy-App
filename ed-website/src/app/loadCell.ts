export interface LoadCellResponse {
  weight: number;
  unit: "kg";
  stable: boolean;
  timestamp: number;
}

const LOAD_CELL_URL = "http://192.168.4.1";

export async function readLoadCell(): Promise<LoadCellResponse> {
  const res = await fetch(`${LOAD_CELL_URL}/api/weight`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to read load cell");
  }

  return res.json();
}
