import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),
    defineField({
      name: 'projectImage',
      title: 'Project Image',
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
      description: 'Optional image related to the project mentioned in the testimonial',
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
      title: 'clientName',
      subtitle: 'content',
      media: 'projectImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? subtitle.substring(0, 100) + '...' : '',
      };
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
