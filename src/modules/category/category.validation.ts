import z from "zod";

export const categoryZodSchema = z.object({
  body: z.object({
    title:z.string({
      required_error:"title is required"
    })
  }),
});

