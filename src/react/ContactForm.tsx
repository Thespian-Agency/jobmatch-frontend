import type { CollectionEntry } from "astro:content";

type Props = {
  fields: CollectionEntry<"homepage">["data"]["form"]["fields"];
};

function Field({
  field,
}: {
  field: CollectionEntry<"homepage">["data"]["form"]["fields"][number];
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
        placeholder={field.placeholder}
        className="body-l text-body-grey font-regular placeholder:text-[#868A93] placeholder:font-regular border-b border-b-stroke-grey-primary p-16 outline-none"
        type="text"
        id={field.title}
      />
    </div>
  );
}
export default function ContactForm({ fields }: Props) {
  return (
    <form className="flex flex-col gap-40 p-52 bg-[#F7F7F7] items-start rounded-24">
      <div className="flex   gap-24">
        <Field field={fields[0]} />
        <Field field={fields[1]} />
      </div>
      <Field field={fields[2]} />
      <button
        type="submit"
        className=" p-16 cursor-pointer rounded-32 bg-primary text-white body-m font-medium"
      >
        Kontaktirajte nas
      </button>
    </form>
  );
}
