/**
 * JSON-LD structured data — Organization + LocalBusiness.
 *
 * Rendered once at the root layout. Helps search engines understand:
 *   - Who Forex Drilling is (services, location, contact)
 *   - That this is a service-based local business (LocalBusiness signals
 *     unlock map results and "near me" eligibility for Singapore queries)
 *   - The service catalogue (drilling, instrumentation, downhole, data)
 *
 * Reference: https://schema.org/Organization, https://schema.org/LocalBusiness
 */

import { JsonLd } from "./JsonLd";

const SITE_URL = "https://forexdrilling.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Forex Drilling",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Specialty drilling contractor delivering safe, reliable and high-quality drilling services across the Asia-Pacific region.",
  email: "contact@forexdrilling.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
  areaServed: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Papua New Guinea" },
    { "@type": "Place", name: "Asia-Pacific" },
  ],
  knowsAbout: [
    "Diamond drilling",
    "Sonic drilling",
    "Reverse circulation drilling",
    "Directional drilling",
    "Geotechnical instrumentation",
    "Vibrating Wire Piezometers",
    "Inclinometers",
    "Geophysical logging",
    "Measurement While Drilling",
    "Mining drilling",
    "Exploration drilling",
    "Groundwater drilling",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Forex Drilling",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  email: "contact@forexdrilling.com",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  serviceArea: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Papua New Guinea" },
    { "@type": "Place", name: "Asia-Pacific" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Drilling Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Drilling Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diamond drilling" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sonic drilling" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Directional drilling and coring" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Horizontal drilling (depressurisation)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air and mud rotary drilling" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reverse circulation (RC) drilling" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Standard Penetration Testing (SPT)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Push tube sampling" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pumping and packer testing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Downhole surveying" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Instrumentation Installation",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vibrating Wire Piezometers (VWP)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inclinometers" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Standpipe piezometers" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monitoring systems installation and commissioning" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Downhole Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Geophysical logging" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Borehole surveying and deviation control" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Borehole integrity verification" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Data Acquisition & Digital Drilling Systems",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Krux digital data platform" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Measurement While Drilling (MWD)" } },
        ],
      },
    ],
  },
};

export function OrganizationSchema() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
    </>
  );
}
