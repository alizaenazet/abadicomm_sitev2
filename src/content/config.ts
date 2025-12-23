import { defineCollection, z } from 'astro:content';

const portfolios = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()),
    year: z.string(), // Keeping as string to match previous type, though number might be better long term
    hosters: z.array(z.string()),
    description: z.string(),
    thumbnail: z.string(),
    images: z.array(z.string())
  })
});

export const collections = {
  portfolios,
};
