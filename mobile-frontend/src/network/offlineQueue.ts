import AsyncStorage from "@react-native-async-storage/async-storage";

// ==================
// TYPES
// ==================
export type QueueItem = {
  id: string;
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  payload: any;
  createdAt: number;
};

type SendFn = (data: {
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  payload: any;
}) => Promise<any>;

// ==================
// STORAGE KEY
// ==================
const QUEUE_KEY = "OFFLINE_REQUEST_QUEUE";

// ==================
// HELPERS
// ==================
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ==================
// QUEUE OPERATIONS
// ==================
export async function addToQueue(item: QueueItem) {
  const existing = await AsyncStorage.getItem(QUEUE_KEY);
  const queue: QueueItem[] = existing ? JSON.parse(existing) : [];

  queue.push(item);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function getQueue(): Promise<QueueItem[]> {
  const data = await AsyncStorage.getItem(QUEUE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function removeFromQueue(id: string) {
  const queue = await getQueue();
  const updated = queue.filter((item) => item.id !== id);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
}

export async function clearQueue() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

// ==================
// SAVE + QUEUE (LOCAL FIRST)
// ==================
export async function saveAndQueue(data: {
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  payload: any;
}) {
  const item: QueueItem = {
    id: generateId(),
    endpoint: data.endpoint,
    method: data.method ?? "POST",
    payload: data.payload,
    createdAt: Date.now(),
  };

  await addToQueue(item);
}

// ==================
// RETRY LOGIC
// ==================
export async function retryQueue(sendFn: SendFn) {
  const queue = await getQueue();

  if (queue.length === 0) return;

  for (const item of queue) {
    try {
      await sendFn({
        endpoint: item.endpoint,
        method: item.method,
        payload: item.payload,
      });

      // ✅ remove only if successful
      await removeFromQueue(item.id);
    } catch (e) {
      // ❌ keep item in queue
      console.log("Retry failed, keeping in queue:", item.endpoint);
    }
  }
}
