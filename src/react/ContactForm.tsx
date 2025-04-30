import { z } from "astro/zod";
import type { CollectionEntry } from "astro:content";
import { useState } from "react";

type Props = {
  form: CollectionEntry<"homepage">["data"]["form"];
};

function Field({
  field,
  errors,
}: {
  field: CollectionEntry<"homepage">["data"]["form"]["fields"][number];
  errors?: string[];
}) {
  return (
    <div className="flex flex-col gap-12 w-full">
      <label
        className="body-l text-body-grey font-medium"
        htmlFor={field.title}
      >
        {field.title}
      </label>
      <input
        name={field.title}
        placeholder={field.placeholder}
        className="body-l text-body-grey font-regular placeholder:text-[#868A93] placeholder:font-regular border-b border-b-stroke-grey-primary p-16 outline-none"
        type="text"
        id={field.title}
      />
      {errors && (
        <div className="flex flex-col gap-12 w-full">
          {errors.map((error) => (
            <label
              key={error}
              className="body-s text-fg-error-primary font-light"
            >
              *{error}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactForm({ form }: Props) {
  const PUBLIC_RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;
  const schema = z.object({
    Ime: z.string().min(1, "Ime je obavezno"),
    Email: z.string().email("Email je obavezan"),
    Poruka: z.string().min(1, "Poruka je obavezna"),
  });

  type FormInputsType = z.infer<typeof schema>;
  type ZodErrorType = z.typeToFlattenedError<FormInputsType>["fieldErrors"];
  const [errors, setErrors] = useState<ZodErrorType | null>(null);

  console.log("RECAPTCHA_SITE_KEY", PUBLIC_RECAPTCHA_SITE_KEY);
  const handleSubimt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(
      Object.fromEntries(new FormData(e.target as HTMLFormElement))
    );

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      console.log("errors", errors);
      return;
    }

    // grecaptcha.ready(function () {
    //   grecaptcha
    //     .execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
    //     .then(function (token: string) {
    //       console.log("token", token);
    //       // Add your logic to submit to your backend server here.
    //     });
    // });
  };

  return (
    <form
      onSubmit={handleSubimt}
      className="flex flex-col gap-40 p-52 bg-[#F7F7F7] items-start rounded-24"
    >
      <div className="flex   gap-24">
        <Field field={form.fields[0]} errors={errors?.Ime} />
        <Field field={form.fields[1]} errors={errors?.Email} />
      </div>
      <Field field={form.fields[2]} errors={errors?.Poruka} />

      <div className="flex items-end gap-24">
        <button
          type="submit"
          className=" p-16 cursor-pointer rounded-32 bg-primary text-white body-m font-medium"
        >
          Kontaktirajte nas
        </button>
        <div className="text-description-grey text-xs font-light max-w-[300px]">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            className="text-primary"
            href="https://policies.google.com/privacy"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="text-primary" href="https://policies.google.com/terms">
            Terms of Service
          </a>{" "}
          apply.
        </div>
      </div>
    </form>
  );
}
