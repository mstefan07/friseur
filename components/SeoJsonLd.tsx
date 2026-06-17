import {
  address,
  businessName,
  city,
  email,
  geo,
  getSiteUrl,
  isPlaceholderNap,
  isPlaceholderSocial,
  ogImage,
  openingHoursSpecification,
  phone,
  priceRange,
  region,
  schemaServices,
  siteDescription,
  siteName,
  socialLinks,
} from "@/lib/site";

function buildHairSalonSchema(siteUrl: string) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${siteUrl}/#hairsalon`,
    name: businessName,
    url: siteUrl,
    image: `${siteUrl}${ogImage.path}`,
    description: siteDescription,
    priceRange,
    openingHoursSpecification: openingHoursSpecification.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      ...entry,
    })),
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: region,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Barber-Leistungen",
      itemListElement: schemaServices.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service,
          provider: {
            "@id": `${siteUrl}/#hairsalon`,
          },
        },
      })),
    },
  };

  if (!isPlaceholderNap) {
    Object.assign(schema, {
      telephone: phone,
      email,
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        postalCode: address.postalCode,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        addressCountry: address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    });
  }

  if (!isPlaceholderSocial) {
    schema.sameAs = socialLinks.map((link) => link.href);
  }

  return schema;
}

function buildOrganizationSchema(siteUrl: string) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: businessName,
    url: siteUrl,
    logo: `${siteUrl}/images/barber-logo.webp`,
    image: `${siteUrl}${ogImage.path}`,
  };

  if (!isPlaceholderNap) {
    Object.assign(schema, { email, telephone: phone });
  }

  if (!isPlaceholderSocial) {
    schema.sameAs = socialLinks.map((link) => link.href);
  }

  return schema;
}

function buildWebSiteSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "de-DE",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function SeoJsonLd() {
  const siteUrl = getSiteUrl();
  const schemas = [
    buildHairSalonSchema(siteUrl),
    buildOrganizationSchema(siteUrl),
    buildWebSiteSchema(siteUrl),
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@id"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
