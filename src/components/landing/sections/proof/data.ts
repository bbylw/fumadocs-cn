export const owner = 'fuma-nama';
export const repo = 'fumadocs';

export interface ProofMetrics {
  stars: number;
  downloads: number;
  contributors: number;
}

const FALLBACK_METRICS: ProofMetrics = {
  stars: 10500,
  downloads: 95000,
  contributors: 120,
};

async function getJson<T>(url: string): Promise<{ data?: T; headers?: Headers }> {
  const headers = new Headers({ Accept: 'application/vnd.github+json' });
  const token = process.env.GITHUB_TOKEN;
  if (url.startsWith('https://api.github.com') && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(3000),
  }).catch(() => undefined);
  if (!response?.ok) return {};
  const data = (await response.json().catch(() => undefined)) as T | undefined;
  return { data, headers: response.headers };
}

export async function getStars(): Promise<number> {
  const { data } = await getJson<{ stargazers_count?: number }>(
    `https://api.github.com/repos/${owner}/${repo}`,
  );
  return typeof data?.stargazers_count === 'number' ? data.stargazers_count : FALLBACK_METRICS.stars;
}

export async function getDownloads(): Promise<number> {
  const { data } = await getJson<{ downloads?: number }>(
    'https://api.npmjs.org/downloads/point/last-week/fumadocs-core',
  );
  return typeof data?.downloads === 'number' ? data.downloads : FALLBACK_METRICS.downloads;
}

export async function getContributorCount(): Promise<number> {
  const { data, headers } = await getJson<unknown[]>(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=0`,
  );
  const link = headers?.get('link');
  const match = link?.match(/[&?]page=(\d+)>;\s*rel="last"/);
  if (match) return Number(match[1]);
  if (Array.isArray(data) && data.length > 0) return data.length;
  return FALLBACK_METRICS.contributors;
}

export async function getProofMetrics(): Promise<ProofMetrics> {
  const [stars, downloads, contributors] = await Promise.all([
    getStars(),
    getDownloads(),
    getContributorCount(),
  ]);
  return { stars, downloads, contributors };
}
