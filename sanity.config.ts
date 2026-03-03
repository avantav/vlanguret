import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas from studio directory
import projectCategory from './studio/schemas/projectCategory'
import project from './studio/schemas/project'
import testimonial from './studio/schemas/testimonial'
import teamMember from './studio/schemas/teamMember'

const schemaTypes = [projectCategory, project, testimonial, teamMember]

export default defineConfig({
  name: 'vlanguret-studio',
  title: 'VLanguret Portfolio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9h69oymm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
