export const posts = [
  {
    id: 1,
    title: "Bắt đầu với React trong 30 phút",
    author: "Minh Anh",
    date: "2026-09-01",
    category: "React",
    excerpt: "Component, props và state là ba khái niệm nền tảng bạn cần nắm đầu tiên.",
    content:
      "React xây dựng giao diện từ các component nhỏ có thể tái sử dụng. Mỗi component nhận dữ liệu qua props và tự quản lý trạng thái bằng state. Khi state thay đổi, React tự động render lại phần giao diện liên quan.\n\nHãy bắt đầu bằng cách tạo một component hiển thị lời chào, sau đó thêm một nút bấm để tăng bộ đếm bằng useState.",
  },
  {
    id: 2,
    title: "Flexbox và Grid: khi nào dùng cái nào",
    author: "Quốc Bảo",
    date: "2026-09-05",
    category: "CSS",
    excerpt: "Flexbox mạnh ở một chiều, Grid mạnh ở hai chiều. Chọn đúng công cụ cho bố cục.",
    content:
      "Flexbox phù hợp với thanh điều hướng, hàng nút hoặc danh sách căn giữa. Grid phù hợp với lưới sản phẩm, dashboard hoặc bố cục trang có nhiều vùng.\n\nTrong thực tế hai công cụ này thường được kết hợp: Grid chia khung trang, Flexbox căn chỉnh nội dung bên trong từng ô.",
  },
  {
    id: 3,
    title: "Hiểu rõ useEffect và mảng phụ thuộc",
    author: "Minh Anh",
    date: "2026-09-12",
    category: "React",
    excerpt: "Mảng phụ thuộc quyết định khi nào effect chạy lại. Sai ở đây là nguồn gốc của nhiều bug.",
    content:
      "useEffect chạy sau khi component render. Mảng rỗng nghĩa là chỉ chạy một lần khi mount. Không truyền mảng nghĩa là chạy sau mỗi lần render.\n\nLuôn nhớ trả về hàm dọn dẹp khi effect tạo ra timer, listener hoặc request cần huỷ.",
  },
  {
    id: 4,
    title: "JavaScript bất đồng bộ: Promise và async/await",
    author: "Thu Hà",
    date: "2026-09-18",
    category: "JavaScript",
    excerpt: "Từ callback đến async/await: cách viết code bất đồng bộ dễ đọc hơn.",
    content:
      "Promise đại diện cho một giá trị sẽ có trong tương lai. async/await là cú pháp giúp viết code bất đồng bộ trông giống code tuần tự.\n\nĐừng quên bọc lời gọi trong try/catch để xử lý lỗi mạng và kiểm tra response.ok trước khi đọc dữ liệu.",
  },
  {
    id: 5,
    title: "Tailwind CSS: tư duy utility-first",
    author: "Quốc Bảo",
    date: "2026-09-25",
    category: "CSS",
    excerpt: "Thay vì viết CSS riêng, bạn ghép các lớp tiện ích ngay trong JSX.",
    content:
      "Tailwind cung cấp các lớp nhỏ như p-4, text-lg, flex hay rounded. Bạn ghép chúng lại để tạo giao diện mà không cần rời khỏi file component.\n\nVới các biến thể như hover, focus hay md, chỉ cần thêm tiền tố vào tên lớp.",
  },
  {
    id: 6,
    title: "React Router: điều hướng trong ứng dụng một trang",
    author: "Thu Hà",
    date: "2026-10-02",
    category: "React",
    excerpt: "Route, Link, useParams và useNavigate đủ để dựng hầu hết luồng điều hướng.",
    content:
      "BrowserRouter bao quanh ứng dụng, Routes khai báo danh sách đường dẫn và Route ánh xạ đường dẫn tới component.\n\nuseParams đọc tham số động như id bài viết, còn useSearchParams giúp lưu bộ lọc trực tiếp trên URL để có thể chia sẻ liên kết.",
  },
];

export const categories = [...new Set(posts.map((p) => p.category))];
