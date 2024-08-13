const strapiUrl = "http://localhost:1337";
const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process?.env?.STRAPI_API_KEY}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNavData = async () => {
  const navData = await fetchData(
    `${process.env.STRAPI_URL}/api/navigation?populate=*`
  );
  return flattenAttributes(navData);
};

export const getContactData = async () => {
  const contactData = await fetchData(
    `${process.env.STRAPI_URL}/api/contact-info?populate=*`
  );
  return flattenAttributes(contactData);
};

export const getPages = async () => {
  const pages = await fetchData(
    `${process.env.STRAPI_URL}/api/pages?populate=*`
  );
  return flattenAttributes(pages);
};

export const getFacultyData = async () => {
  const facultyData = await fetchData(`${strapiUrl}/api/faculties?populate=*`);
  return facultyData.data.map((item: any) => flattenAttributes(item));
};

export const getPageBySlug = async (slug: string) => {
  const slugParts = slug.split("/");
  const response = await fetchData(
    `${process.env.STRAPI_URL}/api/pages?filters[Slug][$eq]=${
      slugParts[slugParts.length - 1]
    }&populate[Content][populate]=profiles`
  );

  if (!response || !response.data || !Array.isArray(response.data)) {
    console.error("No data returned for the given slug:", slug);
    return null;
  }

  console.log("Fetched Page Data with Profiles:", response.data); // Check if profiles are populated

  return response.data.length ? flattenAttributes(response.data[0]) : null;
};

export function flattenAttributes(data: any): any {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened: { [key: string]: any } = {};

  if (data.attributes) {
    for (let key in data.attributes) {
      const attribute = data.attributes[key];
      if (attribute && typeof attribute === "object" && "data" in attribute) {
        flattened[key] = flattenAttributes(attribute.data);
      } else {
        flattened[key] = attribute;
      }
    }
  }

  for (let key in data) {
    if (key !== "attributes" && key !== "data") {
      flattened[key] = data[key];
    }
  }

  if (data.data) {
    flattened = { ...flattened, ...flattenAttributes(data.data) };
  }

  return flattened;
}
