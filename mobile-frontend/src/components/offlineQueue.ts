import AsyncStorage from "@react-native-async-storage/async-storage";

const QUEUE_KEY = "LEFTOVER_QUEUE";

export async function addToQueue(item: any) {
  const existing = await AsyncStorage.getItem(QUEUE_KEY);
  const queue = existing ? JSON.parse(existing) : [];
  queue.push(item);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function getQueue() {
  const data = await AsyncStorage.getItem(QUEUE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function clearQueue() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}
