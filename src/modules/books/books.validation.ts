import z from "zod";

export const bookZodSchema = z.object({
  body: z.object({
    
      title:z.string(),
      author:z.string(),
      genre:z.string(),
      price: z.number(),
      publicationDate:z.string(),
      categoryId:z.string()
  }),
});

