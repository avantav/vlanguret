import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'projectCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
      }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this project on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {category} = selection
      return {...selection, subtitle: category && `${category}`}
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
  ],
})
