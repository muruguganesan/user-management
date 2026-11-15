
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Name is required"),

  age: z.string()
    .nonempty("Age is required")
    .pipe(
      z.coerce.number<string>()
        .min(18, "Age must be greater than or equal to 18")
    ),

  email: z.string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid Email")),

  photo: z.instanceof(FileList)
    .optional()
    .transform(files => files?.[0])
    .refine(
      file => !file || ["image/png", "image/jpeg"].includes(file.type),
      "Only JPG and PNG files are allowed"
    )
    .refine(
      file => !file || file.size <= 3 * 1024 * 1024,
      "Maximum file size is 3 MB"
    )
});

export type UserInput = z.input<typeof userSchema>;
export type UserOutput = z.output<typeof userSchema>;
