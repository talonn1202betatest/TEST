import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm.jsx";

export default function ProductFormPage({ products = [], onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id !== undefined;
  const product = isEdit ? products.find((p) => p.id === Number(id)) : null;

  if (isEdit && !product) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-slate-500">Không tìm thấy sản phẩm</p>
        <Link to="/" className="text-sky-600 hover:underline">
          Về danh sách
        </Link>
      </div>
    );
  }

  const handleSubmit = (data) => {
    if (isEdit) {
      onSave(product.id, data);
    } else {
      onSave(data);
    }
    navigate("/");
  };

  const initialValues = product
    ? {
        name: product.name,
        price: String(product.price),
        quantity: String(product.quantity),
        category: product.category,
        description: product.description,
      }
    : undefined;

  return (
    <section className="mx-auto max-w-xl">
      <h1 className="mb-4 text-xl font-semibold">
        {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
      </h1>
      <ProductForm
        initialValues={initialValues}
        submitLabel={isEdit ? "Cập nhật" : "Thêm mới"}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </section>
  );
}
