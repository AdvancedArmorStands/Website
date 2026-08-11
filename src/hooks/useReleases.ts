// hooks/useReleases.ts
import { useEffect, useState } from "react";

export interface Release {
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  assets: {
    name: string;
    browser_download_url: string;
  }[];
  published_at: string;
}

const RELEASES_PER_PAGE = 10;

export function useReleases(page: number) {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch(`https://api.github.com/repos/Parsa3323/AdvancedArmorStands/releases?per_page=${RELEASES_PER_PAGE}&page=${page}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json().then((data) => ({
          data,
          hasNextPage: res.headers.get("link")?.includes('rel="next"') ?? false,
        }));
      })
      .then(({ data, hasNextPage }) => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setReleases(data);
          setHasNextPage(hasNextPage);
          setError(null);
        } else {
          // If data is not an array (e.g., error response), set empty array
          setReleases([]);
          setHasNextPage(false);
          setError(data.message || "Failed to fetch releases");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Error fetching releases:", err);
        setReleases([]);
        setHasNextPage(false);
        setError(err.message || "Failed to fetch releases");
        setLoading(false);
      });
    return () => controller.abort();
  }, [page]);

  return { releases, loading, error, hasNextPage, releasesPerPage: RELEASES_PER_PAGE };
}
