import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { metaLoader, pageLoader } from '@fumadocs/astro/loaders';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

export const collections = {
  docs: defineCollection({
    loader: pageLoader(),
    schema: pageSchema.extend({
      preview: z.string().optional(),
      method: z.string().optional(),
    }),
  }),
  meta: defineCollection({
    loader: metaLoader(),
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  }),
};
