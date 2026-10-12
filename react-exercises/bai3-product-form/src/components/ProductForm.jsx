import { useState } from "react";

export const categories = ["Điện thoại", "Laptop", "Phụ kiện", "Gia dụng"];

const emptyValues = {
  name: "",
  price: "",
  quantity: "",
  category: categories[0],
  description: "",
};

const validate = (values) => {
  const errors = {};
  if (values.name.trim().length < 3) {
    errors.name = "Tên sản phẩm tối thiểu 3 ký tự";
  }
  if (values.price === "" || Number(values.price) <= 0) {
    errors.price = "Giá phải lớn hơn 0";
  }
  const quantity = Number(values.quantity);
  if (values.quantity === "" || !Number.isInteger(quantity) || quantity < 0) {
    errors.quantity = "Số lượng phải là số nguyên không âm";
  }
  if (values.description.length > 200) {
    errors.description = "Mô tả tối đa 200 ký tự";
  }
  return errors;
};

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-sky-500 ${
    hasError ? "border-red-400" : "border-slate-300"
  }`;

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function ProductForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues ?? emptyValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    onSubmit({
      name: values.name.trim(),
      price: Number(values.price),
      quantity: Number(values.quantity),
      category: values.category,
      description: values.description.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
    >
      <Field label="Tên sản phẩm" error={errors.name}>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          className={inputClass(errors.name)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Giá (VND)" error={errors.price}>
          <input
            name="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            className={inputClass(errors.price)}
          />
        </Field>
        <Field label="Số lượng" error={errors.quantity}>
          <input
            name="quantity"
            type="number"
            value={values.quantity}
            onChange={handleChange}
            className={inputClass(errors.quantity)}
          />
        </Field>
      </div>

      <Field label="Danh mục">
        <select
          name="category"
          value={values.category}
          onChange={handleChange}
          className={inputClass(false)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label={`Mô tả (${values.description.length}/200)`}
        error={errors.description}
      >
        <textarea
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          className={inputClass(errors.description)}
        />
      </Field>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
        >
          Huỷ
        </button>
        <button
          type="submit"
          className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
