import { defineType, defineField } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      options: {
        list: [
          { title: 'Founder', value: 'founder' },
          { title: 'Design Director', value: 'design-director' },
          { title: 'Architect', value: 'architect' },
          { title: 'Interior Designer', value: 'interior-designer' },
          { title: 'Project Manager', value: 'project-manager' },
          { title: 'General Contractor', value: 'general-contractor' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      description: 'Brief biography or description of the team member',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
