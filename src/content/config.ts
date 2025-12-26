import { defineCollection, z } from 'astro:content';

const portfolios = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()),
    year: z.string(),
    hosters: z.array(z.string()),
    description: z.string(),
    thumbnail: z.string(),
    images: z.array(z.string())
  })
});

const site_content = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
    categories: z.array(z.object({
      name: z.string()
    })).optional()
  })
});

export const collections = {
  portfolios,
  site_content
};
