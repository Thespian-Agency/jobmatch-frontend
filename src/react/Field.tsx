import type { CollectionEntry } from "astro:content";

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

export default Field;
