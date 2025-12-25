import { getApiBaseUrl } from "./env";

function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function getMediaBaseUrl(): string {
  const apiBaseUrl = getApiBaseUrl();
  // Remove /api suffix and normalize 127.0.0.1 to localhost for consistent origin
  return apiBaseUrl.replace(/\/api$/, "").replace("127.0.0.1", "localhost");
}

export function buildMediaUrl(path?: string | null): string | undefined {
  if (!path) {
    return undefined;
  }

  if (isAbsoluteUrl(path)) {
    return path;
  }

  const baseUrl = getMediaBaseUrl();
  return `${baseUrl}${ensureLeadingSlash(path)}`;
}

export function getUserImageUrl(path?: string | null): string | undefined {
  return buildMediaUrl(path);
}
