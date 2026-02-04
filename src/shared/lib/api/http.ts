export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function http<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(new URL(input.toString(), apiBaseUrl), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}
