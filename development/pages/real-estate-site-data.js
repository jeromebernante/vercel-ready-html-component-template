/**
 * Single source of truth for static copy, navigation, listings, and media paths.
 * Edit this file to update the real-estate demo page.
 */
const REAL_ESTATE_SITE_DATA = {
  meta: {
    title: "Real Estate — Find Your Dream Home",
    brandName: "ESTATE LOGO",
  },

  contact: {
    /** Shown in top bar & footer */
    phoneDisplay: "+1 (555) 123-4567",
    /** tel: href (URI-safe, no spaces) */
    phoneTel: "+15551234567",
    email: "info@example.com",
    /** Office / main line for CTA & footer */
    officePhoneDisplay: "+63 2 000 0000",
    officePhoneTel: "+6320000000",
    /** Multi-line address (HTML allowed for <br>) */
    addressHtml:
      "123 Business Park Drive, Suite 100<br>Makati City, Metro Manila",
    /** Plain lines for footer block */
    addressLines: ["123 Business Park Drive", "Makati City, Metro Manila"],
  },

  /** Primary navigation — also reused for footer quick links unless footerMenuOverride is set */
  menu: [
    { label: "Home", href: "#" },
    { label: "Properties", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],

  hero: {
    /** CSS url() value — path relative to this HTML file */
    backgroundImage: '../images/temp_img_hero_1920_1080.png',
    minHeight: "420px",
  },

  search: {
    locationLabel: "Location",
    locations: [
      { value: "", label: "Location" },
      { value: "manila", label: "Manila" },
      { value: "makati", label: "Makati" },
      { value: "bgc", label: "BGC" },
    ],
    typeLabel: "Property Type",
    types: [
      { value: "", label: "Property Type" },
      { value: "condo", label: "Condominium" },
      { value: "house", label: "House" },
      { value: "townhouse", label: "Townhouse" },
    ],
    priceLabel: "Price Range",
    prices: [
      { value: "", label: "Price Range" },
      { value: "0-200k", label: "Under $200k" },
      { value: "200-500k", label: "$200k – $500k" },
      { value: "500k+", label: "$500k+" },
    ],
    submitLabel: "Search",
  },

  intro: {
    heading: "Stress Test Demo With 1000 Listings",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris browse our curated collection of premium properties.",
  },

  featured: [
    {
      title: "The Manors Manila",
      image: "../images/temp_img_thumbnail_1200_630.png",
      alt: "The Manors Manila exterior",
      width: 1200,
      height: 630,
    },
    {
      title: "Azure Urban Resort Residences",
      image: "../images/temp_img_thumbnail_600_400.png",
      alt: "Azure Urban Resort Residences",
      width: 600,
      height: 400,
    },
  ],

  propertiesSectionTitle: "Properties",

  properties: [
    {
      title: "Shore Two",
      image: "../images/temp_img_thumbnail_600_400.png",
      alt: "Shore Two",
      beds: 2,
      baths: 2,
      area: "65 m²",
      price: "$285,000",
    },
    {
      title: "M-Place South Triangle",
      image: "../images/temp_img_product_1000_1000.png",
      alt: "M-Place South Triangle",
      beds: 3,
      baths: 2,
      area: "78 m²",
      price: "$312,500",
    },
    {
      title: "One Serendra",
      image: "../images/temp_img_hero_1600_900.png",
      alt: "One Serendra",
      beds: 2,
      baths: 1,
      area: "52 m²",
      price: "$198,000",
    },
    {
      title: "Acqua Private Residences",
      image: "../images/temp_img_product_800_1200.png",
      alt: "Acqua Private Residences",
      beds: 4,
      baths: 3,
      area: "112 m²",
      price: "$445,000",
    },
    {
      title: "The Grove by Rockwell",
      image: "../images/temp_img_thumbnail_1200_630.png",
      alt: "The Grove by Rockwell",
      beds: 2,
      baths: 2,
      area: "71 m²",
      price: "$267,800",
    },
    {
      title: "Two Roxas Triangle",
      image: "../images/temp_img_hero_800_1200.png",
      alt: "Two Roxas Triangle",
      beds: 3,
      baths: 2,
      area: "88 m²",
      price: "$389,000",
    },
  ],

  pagination: {
    currentPage: 1,
    totalPages: 5,
    nextLabel: "Next",
    /** Base URL for page links (append page number) — use "#" for demo */
    pageHrefPrefix: "#",
  },

  touch: {
    heading: "Get In Touch With Us",
    formTitle: "Inquire Now",
    sendButtonLabel: "Send Email",
    /** Full-width section background */
    backgroundImage: "../images/temp_img_full_background_2560_1440.png",
  },

  agent: {
    name: "Maria Santos",
    photo: "../images/temp_img_avatar_512_512.png",
    photoAlt: "Agent portrait",
    phones: ["+63 917 000 0000", "+63 2 000 0000"],
    email: "maria.santos@example.com",
    profileLabel: "View Profile",
    profileHref: "#",
  },

  portfolio: {
    title: "Our Portfolio",
    subtitle:
      "A selection of interiors and developments we represent. Quality spaces designed for modern living.",
    main: {
      src: "../images/temp_img_hero_800_1200.png",
      alt: "Living room showcase",
      width: 800,
      height: 1200,
    },
    thumbs: [
      {
        src: "../images/temp_img_product_1000_1000.png",
        alt: "Bedroom",
        width: 1000,
        height: 1000,
      },
      {
        src: "../images/temp_img_thumbnail_600_400.png",
        alt: "Living area",
        width: 600,
        height: 400,
      },
      {
        src: "../images/temp_img_product_800_1200.png",
        alt: "Bathroom",
        width: 800,
        height: 1200,
      },
    ],
  },

  testimonial: {
    text:
      "Best theme for Real Estate Agency fast installation and translation can be done with Poedit software. Cool in comfortable design. Thanks for this amazing theme. Recommended for all real estate agency.",
  },

  cta: {
    label: "Contact Info",
    primaryLabel: "Contact Us",
    primaryHref: "#",
    callLabel: "Call Us",
  },

  partners: {
    /** Number of placeholder bars when logos is empty */
    placeholderCount: 5,
    logos: [],
  },

  social: [
    { network: "Facebook", href: "#", icon: "facebook" },
    { network: "Twitter", href: "#", icon: "twitter" },
    { network: "Instagram", href: "#", icon: "instagram" },
  ],

  newsletter: {
    placeholder: "Your email",
    submitLabel: "Subscribe",
  },

  copyright: "© 2026 Estate Agency. All rights reserved.",
};

if (typeof window !== "undefined") {
  window.REAL_ESTATE_SITE_DATA = REAL_ESTATE_SITE_DATA;
}
