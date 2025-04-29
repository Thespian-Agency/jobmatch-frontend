import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Homepage Collection Schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    selection_items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
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
    // banner: z.object({
    //   title: z.string(),
    //   content: z.string().optional(),
    //   image: z.string(),
    //   button: z
    //     .object({
    //       label: z.string(),
    //       link: z.string(),
    //       enable: z.boolean().default(true),
    //     })
    //     .optional(),
    // }),
    // key_features: z.object({
    //   title: z.string(),
    //   description: z.string(),
    //   feature_list: z
    //     .array(
    //       z.object({
    //         icon: z.string(),
    //         title: z.string(),
    //         content: z.string(),
    //       })
    //     )
    //     .optional(),
    // }),

    // service: z.object({
    //   homepage_tab: z.object({
    //     title: z.string(),
    //     description: z.string(),
    //     tab_list: z
    //       .array(
    //         z.object({
    //           title: z.string(),
    //           icon: z.string(),
    //           image: z.string(),
    //         })
    //       )
    //       .optional(),
    //   }),

    //   our_service: z.array(
    //     z.object({
    //       title: z.string(),
    //       description: z.string().optional(),
    //       image: z.string().optional(),
    //       list: z.array(z.string()).optional(),
    //       video: z
    //         .object({
    //           thumbnail: z.string(),
    //           video_id: z.string(),
    //         })
    //         .optional(),
    //       button: z
    //         .object({
    //           label: z.string(),
    //           link: z.string(),
    //           enable: z.boolean().default(true),
    //         })
    //         .optional(),
    //     })
    //   ),
    // }),
    // testimonial: z.object({
    //   title: z.string(),
    //   description: z.string(),
    //   testimonial_list: z
    //     .array(
    //       z.object({
    //         author: z.string(),
    //         avatar: z.string(),
    //         organization: z.string(),
    //         rating: z.enum(["one", "two", "three", "four", "five"]),
    //         content: z.string(),
    //       })
    //     )
    //     .optional(),
    // }),
  }),
});

export const collections = {
  homepage: homepageCollection,
};
