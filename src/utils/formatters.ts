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
