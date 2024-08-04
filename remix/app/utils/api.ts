export const getNavData = async () => {
    try {
        const response = await fetch(
            `${process.env.STRAPI_URL}/api/navigation?populate=*`,
            {
              headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
              },
            }
          );
            const navData = await response.json();
          return flattenAttributes(navData);
        } catch (error) {
            console.error(error);
        }
}

export const getContactData = async () => {
    try {
    const response = await fetch(
        `${process.env.STRAPI_URL}/api/contact-info?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
          },
        }
      );
        const contactData = await response.json();
      return flattenAttributes(contactData);
    }
    catch (error) {
        console.error(error);
    }
}

export function flattenAttributes(data: any): any {
  // Base case for recursion
  if (!data) return null;

  // Handling array data
  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened: { [key: string]: any } = {};

  // Handling attributes
  if (data.attributes) {
    for (let key in data.attributes) {
      if (
        typeof data.attributes[key] === "object" &&
        data.attributes[key] !== null &&
        "data" in data.attributes[key]
      ) {
        flattened[key] = flattenAttributes(data.attributes[key].data);
      } else {
        flattened[key] = data.attributes[key];
      }
    }
  }

  // Copying non-attributes and non-data properties
  for (let key in data) {
    if (key !== "attributes" && key !== "data") {
      flattened[key] = data[key];
    }
  }

  // Handling nested data
  if (data.data) {
    flattened = { ...flattened, ...flattenAttributes(data.data) };
  }

  return flattened;
}
