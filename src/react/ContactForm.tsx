import { z } from "astro/zod";
import type { CollectionEntry } from "astro:content";
import { useState } from "react";
import Button from "./Button";
import classNames from "classnames";
import { subjectOptions } from "../data";
import Field from "./Field";

type Props = {
  form: CollectionEntry<"homepage">["data"]["form"];
};

export default function ContactForm({ form }: Props) {
  const PUBLIC_RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

  const [messageSent, setMessageSent] = useState({
    isSent: false,
    success: false,
  });

  const [pending, setPending] = useState(false);

  const schema = z.object({
    Ime: z.string().min(1, "Ime je obavezno"),
    Email: z.string().email("Email je obavezan"),
    Poruka: z.string().min(1, "Poruka je obavezna"),
    Naslov: z.enum(subjectOptions),
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
      // console.log("errors", errors);
      return;
    }

    setPending(true);

    grecaptcha.ready(function () {
      grecaptcha
        .execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
        .then(async function (token: string) {
          const backendUrl = `${
            import.meta.env.PUBLIC_FORM_BACKEND_URL
          }/api/job_match/contact_us`;

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
                  subject: `JobMatch kontakt forma | Želim ${result.data.Naslov.toLowerCase()}`,
                },
                token,
              }),
            });
            setPending(false);
            if (!response.ok) {
              // throw new Error(`Response status: ${response.status}`);
              setPending(false);
              setMessageSent({
                isSent: true,
                success: false,
              });
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
            setPending(false);
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
              Došlo je do greške, molimo pokušajte ponovno ili nas kontaktirajte
              putem emaila na{" "}
              <a className="text-primary" href="mailto:info@jobmatchtalent.hr">
                info@jobmatchtalent.hr
              </a>
            </div>
          )}
        </div>
      )}
      <div className="flex items-start desktop:flex-row flex-col gap-24 w-full">
        <label
          className="body-l text-body-grey mt-5 font-medium"
          htmlFor="Naslov"
        >
          Želim:
        </label>
        <div className="flex  flex-wrap gap-8">
          {subjectOptions.map((option) => (
            <div key={option} className="flex items-center gap-8">
              <input
                defaultChecked={option === "Poslati upit"}
                type="radio"
                id={option}
                name="Naslov"
                value={option}
                className="peer hidden"
              />
              <label
                className="body-m peer-checked:bg-primary bg-white peer-checked:text-white  cursor-pointer text-body-grey font-light px-10 py-8 rounded-full"
                htmlFor={option}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex desktop:flex-row flex-col gap-24 w-full">
        <Field field={form.fields[0]} errors={errors?.Ime} />
        <Field field={form.fields[1]} errors={errors?.Email} />
      </div>
      <Field field={form.fields[2]} errors={errors?.Poruka} />

      <div className="flex items-start desktop:items-center gap-24 flex-col desktop:flex-row">
        <Button
          type="submit"
          variant="primary"
          size="L"
          className={classNames({
            "opacity-50 cursor-default pointer-events-none": pending,
          })}
        >
          {pending ? "Slanje..." : "Kontaktirajte nas"}
        </Button>
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
