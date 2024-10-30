export const strapiUrl = process.env.STRAPI_URL;


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
    `${process.env.STRAPI_URL}/api/navigation?populate=deep`
  );
  return flattenAttributes(navData);
};

export const getContactData = async () => {
  const contactData = await fetchData(
    `${process.env.STRAPI_URL}/api/contact-info?populate=deep`
  );
  return flattenAttributes(contactData);
};

export const getPages = async () => {
  const pages = await fetchData(
    `${process.env.STRAPI_URL}/api/pages?populate=deep`
  );
  return flattenAttributes(pages);
};

export const getFacultyData = async () => {
  const facultyData = await fetchData(`${strapiUrl}/api/faculties?populate=deep`);
  return facultyData.data.map((item: any) => flattenAttributes(item));
};

export const getPageBySlug = async (slug: string) => {
  const slugParts = slug.split("/");
  const response = await fetchData(
    `${process.env.STRAPI_URL}/api/pages?filters[Slug][$eq]=${
      slugParts[slugParts.length - 1]
    }&populate=deep`
  );

  if (!response || !response.data || !Array.isArray(response.data)) {
    console.error("No data returned for the given slug:", slug);
    return null;
  }

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
