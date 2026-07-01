export const FOLLOWERS_MILLION = 1_000_000;
export const FOLLOWERS_THOUSAND = 1_000;

export function formatFollowers(count: number): string {
  if (count >= FOLLOWERS_MILLION) {
    return (count / FOLLOWERS_MILLION).toFixed(1) + "M";
  }
  if (count >= FOLLOWERS_THOUSAND) {
    return (count / FOLLOWERS_THOUSAND).toFixed(1) + "K";
  }
  return count.toString();
}

export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}

/** 
 * Generates a deterministic fallback avatar URL using UI Avatars.
 * Allows customizing the size (defaults to 128).
 */
export function getFallbackAvatar(name: string, size: number = 128): string {
  const initials = encodeURIComponent(name.slice(0, 2).toUpperCase());
  return `https://ui-avatars.com/api/?name=${initials}&background=e0dedb&color=37322f&size=${size}&bold=true&font-size=0.4`;
}
