export async function fetchReleaseData(releaseId) {
  const DISCOGS_API_URL = "https://api.discogs.com/releases";

  try {
    const response = await fetch(`${DISCOGS_API_URL}/${releaseId}`, {
      method: "GET",
      headers: {
        "User-Agent": "KollektivXApp/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching releaseId ${releaseId}: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch release data for releaseId ${releaseId}:`, error);
    return null;
  }
}