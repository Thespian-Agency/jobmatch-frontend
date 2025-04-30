import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Homepage Collection Schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    buttons: z.record(z.string(), z.string()),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    services: z.object({
      title: z.string(),
      subtitle: z.string(),
      items: z.array(
        z.object({
          top: z.object({
            title: z.string(),
            description: z.string(),
          }),
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    results: z.object({
      title: z.string(),
      description: z.string(),
    }),
    profiles: z.object({
      title: z.string(),
      description: z.string(),
    }),
    advantages: z.object({
      title: z.string(),
      subtitle: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    testimonials: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string().transform((val) => ({
            __html: val,
          })),
          description: z.string(),
          author: z.object({
            name: z.string(),
            position: z.string(),
          }),
        })
      ),
    }),
    our_process: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    team_player: z.object({
      title: z.string(),
      description: z.string(),
    }),
    for_who: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    faq: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    form: z.object({
      title: z.string(),
      fields: z.array(
        z.object({
          title: z.string(),
          placeholder: z.string(),
        })
      ),
      errors: z.record(z.string(), z.string()),
    }),
    footer: z.object({
      copyright: z.string(),
      powered_by: z.string(),
      legal_notice: z.string(),
      privacy_policy: z.string(),
    }),
    header: z.object({
      links: z.record(z.string(), z.string()),
    }),
  }),
});

export const collections = {
  homepage: homepageCollection,
};
