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

  const [messageSent, setMessageSent] = useState({
    isSent: false,
    success: false,
  });

  const schema = z.object({
    Ime: z.string().min(1, "Ime je obavezno"),
    Email: z.string().email("Email je obavezan"),
    Poruka: z.string().min(1, "Poruka je obavezna"),
  });

  type FormInputsType = z.infer<typeof schema>;
  type ZodErrorType = z.typeToFlattenedError<FormInputsType>["fieldErrors"];
  const [errors, setErrors] = useState<ZodErrorType | null>(null);

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

    grecaptcha.ready(function () {
      grecaptcha
        .execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
        .then(async function (token: string) {
          const backendUrl = `${
            import.meta.env.PUBLIC_FORM_BACKEND_URL ||
            "https://staging.thespian.eu"
          }/api/forms/contact`;

          try {
            const response = await fetch(backendUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  company_name: "-",
                  content: result.data.Poruka,
                  email: result.data.Email,
                  name: result.data.Ime,
                  phone: "-",
                  subject: "JOBMATCH - Kontakt",
                },
                token,
              }),
            });
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            if (json.message === "success") {
              setMessageSent({
                isSent: true,
                success: true,
              });
            } else {
              setMessageSent({
                isSent: true,
                success: false,
              });
            }
          } catch (error: any) {
            console.error(error.message);
            setMessageSent({
              isSent: true,
              success: false,
            });
          }
        });
    });
  };

  return (
    <form
      onSubmit={handleSubimt}
      className="flex flex-col relative gap-40 p-52 bg-[#F7F7F7] items-start rounded-24"
    >
      {messageSent.isSent && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 backdrop-blur-sm overflow-hidden rounded-24 flex items-center justify-center">
          {messageSent.success ? (
            <div className="text-body-grey font-medium">
              Poruka je poslana uspješno
            </div>
          ) : (
            <div className="text-body-grey font-medium text-center max-w-[300px]">
              Došlo je do greške, molimo pokušajte ponovno ili kontaktirajte nas
              putem emaila na{" "}
              <a className="text-primary" href="mailto:info@jobmatch.hr">
                info@jobmatch.hr
              </a>
            </div>
          )}
        </div>
      )}
      <div className="flex desktop:flex-row flex-col gap-24 w-full">
        <Field field={form.fields[0]} errors={errors?.Ime} />
        <Field field={form.fields[1]} errors={errors?.Email} />
      </div>
      <Field field={form.fields[2]} errors={errors?.Poruka} />

      <div className="flex items-center gap-24">
        <button
          type="submit"
          className="desktop:w-auto w-full p-16 cursor-pointer rounded-32 bg-primary text-white body-m font-medium"
        >
          Kontaktirajte nas
        </button>
        <div className="text-description-grey text-xs font-light max-w-[300px]">
          Ova stranica je zaštićena reCAPTCHA-om, Google-ovom{" "}
          <a
            className="text-primary"
            href="https://policies.google.com/privacy"
          >
            Politikom privatnosti
          </a>{" "}
          i{" "}
          <a className="text-primary" href="https://policies.google.com/terms">
            Politikom korištenja
          </a>{" "}
          .
        </div>
      </div>
    </form>
  );
}
