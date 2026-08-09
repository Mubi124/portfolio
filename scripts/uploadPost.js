const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Load environment variables from .env.local if available
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-08';

if (!projectId) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is missing from environment variables.');
  process.exit(1);
}

if (!token) {
  console.error('Error: SANITY_API_TOKEN is missing from .env.local.');
  console.error('Please add SANITY_API_TOKEN=<your-write-token> to .env.local to execute mutations.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: false,
});

const masterGuideBlocks = [
  {
    _type: 'block',
    _key: 'mg_b1',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s1',
        text: 'Building a successful digital product requires more than just aesthetics. A visually striking interface might capture attention, but if it suffers from a confusing user experience, a leaky conversion funnel, or a fragile codebase, it will ultimately fail to generate revenue or retain users.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b2',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s2',
        text: 'To build high-ticket B2B SaaS products and conversion-focused web platforms, you must bridge the gap between strategic design and technical execution. This master guide breaks down the three critical pillars of modern product architecture: scaling complex dashboards, engineering high-converting landing pages, and synchronizing design systems with production code.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b3',
    style: 'h2',
    children: [{ _type: 'span', _key: 'mg_s3', text: 'Pillar 1: Designing Scalable B2B SaaS Dashboards', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'mg_b4',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s4',
        text: 'If you are building an enterprise SaaS product, your dashboard is the operational hub for your users. It is where they analyze data, make critical business decisions, and determine the ongoing value of your software.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b5',
    style: 'h3',
    children: [{ _type: 'span', _key: 'mg_s5', text: 'The Core Problem with Modern Dashboards', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'mg_b6',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s6',
        text: 'The most common mistake in B2B product design is treating the interface as a static canvas rather than a dynamic system. When teams skip building a strict design system, the result is a fragmented user experience. Data tables lack consistent states for loading or errors, typography scales arbitrarily across different modules, and the engineering team is forced to guess the logic behind the layout.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b7',
    style: 'h3',
    children: [{ _type: 'span', _key: 'mg_s7', text: 'Architecting the Information', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'mg_b8',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s8',
        text: 'Before opening Figma, the structural foundation must be established. Complex datasets must be categorized logically to prevent cognitive overload. Effective architecture relies on establishing distinct navigation models:',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b9',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [
      {
        _type: 'span',
        _key: 'mg_s9',
        text: 'Primary Navigation: Core application modules (Analytics, User Management, Settings).',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b10',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [
      {
        _type: 'span',
        _key: 'mg_s10',
        text: 'Secondary Navigation: Tabbed views or persistent sub-module sidebars.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b11',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [
      {
        _type: 'span',
        _key: 'mg_s11',
        text: 'Tertiary Navigation: In-page data filters, search bars, and segmented controls.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b12',
    style: 'h2',
    children: [{ _type: 'span', _key: 'mg_s12', text: 'Pillar 2: The Anatomy of a High-Converting B2B Landing Page', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'mg_b13',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s13',
        text: 'You can build the most powerful SaaS dashboard in the world, but if your frontend marketing site cannot convert traffic into users, the product will stagnate. High-ticket B2B landing pages rely on distinct UX mechanics to drive revenue.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b14',
    style: 'h3',
    children: [{ _type: 'span', _key: 'mg_s14', text: 'The Psychology of Visual Hierarchy', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'mg_b15',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s15',
        text: 'Aesthetic-only designs often yield terrible conversion rates. Strategic UX, on the other hand, guides the user’s eye directly to high-value actions using F-pattern and Z-pattern scanning routes, combined with micro-interactions that build brand trust.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b16',
    style: 'h2',
    children: [{ _type: 'span', _key: 'mg_s16', text: 'Pillar 3: Building a Dual-Theme Design System', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'mg_b17',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s17',
        text: 'A robust design system is only as valuable as its implementation in the codebase. Establishing unified token names, component props, and accessible interaction patterns between Figma Variables and Tailwind CSS guarantees a durable, high-converting product experience.',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'mg_b18',
    style: 'h2',
    children: [{ _type: 'span', _key: 'mg_s18', text: 'Conclusion: The Intersection of Strategy and Execution', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'mg_b19',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'mg_s19',
        text: 'Your digital interface is the primary touchpoint between your business and your customers. Building a scalable product requires an approach that values aesthetic precision just as highly as technical, production-ready execution.',
        marks: [],
      },
    ],
  },
];

const masterDoc = {
  _id: 'post-complete-architecture-b2b-products',
  _type: 'post',
  title: 'The Complete Architecture of High-Performing B2B Products',
  slug: {
    _type: 'slug',
    current: 'complete-architecture-b2b-products',
  },
  excerpt: 'A master guide merging SaaS Dashboards, Landing Page Funnels, and Design Systems into one unified product architecture for B2B applications.',
  category: 'Product Design',
  publishedAt: new Date().toISOString(),
  body: masterGuideBlocks,
};

async function uploadPost() {
  try {
    console.log(`Uploading document: "${masterDoc.title}"...`);
    const result = await client.createOrReplace(masterDoc);
    console.log('Success! Document uploaded to Sanity CMS.');
    console.log('Document ID:', result._id);
    console.log('Slug:', masterDoc.slug.current);
  } catch (error) {
    console.error('Error uploading post to Sanity:', error.message);
    process.exit(1);
  }
}

uploadPost();
