import { env } from "@/lib/env";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errorCode?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function extractErrorDetails(
  body: unknown,
  fallback: string,
): { message: string; errorCode?: string } {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    const message = typeof record.message === "string" ? record.message : fallback;
    const errorCode = typeof record.errorCode === "string" ? record.errorCode : undefined;
    return { message, errorCode };
  }
  return { message: fallback };
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  // Let the browser set its own multipart Content-Type (with boundary) for file uploads.
  const isFormData = init?.body instanceof FormData;

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const { message, errorCode } = extractErrorDetails(
      body,
      `Request to ${path} failed with ${response.status}`,
    );
    throw new ApiError(response.status, message, errorCode);
  }

  return body as T;
}
