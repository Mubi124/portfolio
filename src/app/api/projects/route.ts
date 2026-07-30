import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const projects = await client.fetch(
      `*[_type == "project"] | order(order asc) {
        title, description, tags, image, caseStudyUrl, slug
      }`
    );
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
