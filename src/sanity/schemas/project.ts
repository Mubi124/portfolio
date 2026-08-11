import { defineField, defineType } from 'sanity';

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caseStudyUrl', title: 'Case Study URL', type: 'url' }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'challenges',
      title: 'Engineering Challenges & Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Challenge Title', type: 'string' }),
            defineField({ name: 'problem', title: 'Problem Statement', type: 'text' }),
            defineField({ name: 'solution', title: 'Engineering Solution', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({ name: 'githubUrl', title: 'GitHub Repository URL', type: 'url' }),
    defineField({ name: 'liveUrl', title: 'Live Build URL', type: 'url' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});

