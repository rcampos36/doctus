"use client";

import { uploadImageAction } from "@/app/actions/content";

const fieldClass =
  "mt-1.5 w-full rounded-[0.625rem] border border-[#260a0026] bg-white px-[0.875rem] py-[0.625rem] text-base leading-[1.45] text-text-dark shadow-[0_1px_#00000008] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#c9510080] focus:shadow-[0_0_0_2px_#c9510026]";

export function TextField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-[0.8125rem] font-medium text-text-dark">
      {label}
      <input
        type={type}
        className={fieldClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block text-[0.8125rem] font-medium text-text-dark">
      {label}
      <textarea
        rows={rows}
        className={`${fieldClass} min-h-[6rem] resize-y`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  async function onUpload(file: File | undefined) {
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    const url = await uploadImageAction(data);
    onChange(url);
  }

  return (
    <div className="space-y-2">
      <TextField label={label} value={value} onChange={onChange} />
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-14 w-14 rounded-lg border border-text-dark/10 object-cover"
          />
        ) : null}
        <label className="inline-flex cursor-pointer items-center rounded-full bg-white px-3 py-1.5 text-[0.8125rem] font-semibold text-text-dark shadow-[0_1px_4px_rgb(0_0_0/0.08)]">
          Upload image
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              void onUpload(event.target.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}

export function Card({
  title,
  children,
  onRemove,
}: {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-[1rem] border border-text-dark/8 bg-[#f6f6f6] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-text-dark">{title}</h3>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="text-[0.8125rem] font-medium text-primary"
          >
            Remove
          </button>
        ) : null}
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}
