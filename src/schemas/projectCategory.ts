import { defineType, defineField } from 'sanity';

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      subtitle: 'description',
      media: 'coverImage',
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
