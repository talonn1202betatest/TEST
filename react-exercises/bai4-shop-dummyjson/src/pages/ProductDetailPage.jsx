import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, formatPrice } from "../api.js";
import useFetch from "../hooks/useFetch.js";
import { ErrorMessage, Loading } from "../components/Status.jsx";

export default function ProductDetailPage({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`${BASE_URL}/${id}`);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message="Không tải được sản phẩm" />;

  const mainImage = selectedImage ?? product.thumbnail;

  return (
    <section>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-slate-500 hover:text-orange-600"
      >
        ← Quay lại
      </button>

      <div className="grid gap-8 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <img
            src={mainImage}
            alt={product.title}
            className="h-80 w-full rounded-lg bg-slate-100 object-contain"
          />
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {product.images.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                onClick={() => setSelectedImage(src)}
                className={`h-16 w-16 shrink-0 cursor-pointer rounded border-2 bg-slate-100 object-contain ${
                  src === mainImage ? "border-orange-600" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {product.category} · {product.brand}
          </p>
          <h1 className="mb-2 text-2xl font-bold">{product.title}</h1>
          <p className="mb-4 text-sm text-slate-500">
            ★ {product.rating} · Còn {product.stock} sản phẩm
          </p>
          <p className="mb-1 text-3xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </p>
          <p className="mb-4 text-sm text-green-600">
            Giảm {product.discountPercentage}%
          </p>
          <p className="mb-6 text-slate-600">{product.description}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-slate-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-slate-100"
              >
                −
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="px-3 py-2 hover:bg-slate-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAdd(product, quantity)}
              disabled={product.stock === 0}
              className="rounded-lg bg-orange-600 px-6 py-2 font-medium text-white hover:bg-orange-700 disabled:opacity-40"
            >
              Thêm vào giỏ
            </button>
            <Link to="/cart" className="text-sm text-orange-600 hover:underline">
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>

      {product.reviews?.length > 0 && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-semibold">Đánh giá</h2>
          <ul className="space-y-3">
            {product.reviews.map((review, index) => (
              <li key={index} className="border-b pb-3 last:border-0">
                <p className="text-sm font-medium">
                  {review.reviewerName} · ★ {review.rating}
                </p>
                <p className="text-sm text-slate-600">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
