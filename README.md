# Flow Prompts — kho prompt dùng chung của team

Vault Obsidian chứa thư viện prompt cho Google Flow, đồng bộ qua GitHub
và hiển thị trong extension SlashPrompt của team.

## Cấu trúc

```
prompts/     Mỗi prompt là một file .md (frontmatter + nội dung prompt)
images/      Ảnh preview kết quả — dán ảnh trong Obsidian sẽ tự lưu vào đây
templates/   Mẫu note cho prompt mới
```

## Thêm prompt mới (trong Obsidian)

1. Tạo note mới trong `prompts/`, copy nội dung từ `templates/prompt-template.md`
2. Điền `name`, `tags`, dán nội dung prompt
3. Dán ảnh kết quả mẫu vào cuối note (Cmd+V) — tự động thành ảnh preview
4. Plugin Obsidian Git sẽ tự đẩy lên GitHub, cả team nhận được qua extension

## Thêm/sửa prompt không cần Obsidian (dành cho cộng sự)

1. Mở repo trên github.com → vào thư mục `prompts/`
2. Bấm vào file cần sửa → biểu tượng bút chì → sửa → Commit changes
3. Thêm mới: nút "Add file" → "Create new file", đặt tên `ten-prompt.md`,
   copy khung frontmatter từ một file có sẵn

## Cú pháp biến tích chọn

Cụm `{a / b / c}` trong prompt sẽ hiện thành các chip bật/tắt trong extension.
Người dùng chọn giá trị muốn giữ; chọn đúng 1 giá trị thì extension điền
thẳng giá trị đó (bỏ ngoặc), chọn nhiều thì giữ dạng `{a / b}` để AI random.

Nhãn tiếng Việt cho chip (tùy chọn): viết `giá trị|nhãn`, ví dụ
`{red|Đỏ / navy|Xanh than}` — chip hiển thị "Đỏ", prompt điền vào Flow
vẫn là "red" (AI luôn nhận tiếng Anh). Không có `|` thì chip hiện nguyên giá trị.

## Quy ước đặt tên

- Tên file: không dấu, gạch nối, ví dụ `mug-cozy-flatlay.md`
- `name`: mô tả rõ sản phẩm + phong cách, ví dụ "Mug cozy flat-lay"
- `tags`: thống nhất theo dòng sản phẩm — `sweatshirt`, `tee`, `mug`, `tote`...

## Plugin Obsidian khuyên cài (Settings → Community plugins)

- **Obsidian Git** — tự động commit & push lên GitHub theo chu kỳ
- **Paste image rename** — hỏi tên file mỗi khi dán ảnh, tránh tên vô nghĩa
