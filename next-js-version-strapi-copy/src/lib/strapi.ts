import qs from "qs";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default options with user options
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    };

    const mergedOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...((options as any).headers || {}),
      },
    };
    
    // Explicitly copy body if present in options, because spreading ...options usually works but let's be safe
    if ((options as any).body) {
      (mergedOptions as any).body = (options as any).body;
    }
    
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    console.log(`[Strapi] Fetching: ${requestUrl}`);

    const response = await fetch(requestUrl, {
      ...mergedOptions,
      cache: "no-store", // Ensure we always get fresh data
    });

    if (!response.ok) {
      console.error(`[Strapi] Error ${response.status}: ${response.statusText}`);
      const text = await response.text();
      console.error(`[Strapi] Response body: ${text}`);
      return null;
    }

    const data = await response.json();
    console.log(`[Strapi] Success. Records found: ${data.data?.length}`);
    return data;
  } catch (error) {
    console.error(error);
    // Return null to allow fallback UI to handle the error gracefully
    return null;
  }
}

export function getStrapiMedia(url: string | null | undefined) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${getStrapiURL()}${url}`;
}
