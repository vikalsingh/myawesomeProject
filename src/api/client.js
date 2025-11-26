// using fetch (simple, no extra dependency)
const BASE_URL = 'https://jsonplaceholder.typicode.com'; // you can change later

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}
