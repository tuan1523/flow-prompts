# Hướng dẫn dùng prompt "Mockup thêu clean minimal"

Tài liệu đi kèm [[Mockup-clean-minimal]] — note này nằm ngoài thư mục `prompts/`
nên KHÔNG xuất hiện trong extension, chỉ dành cho người đọc.

## Điểm khác biệt so với prompt mockup cũ

Phong cách clean/minimal: nền sạch, tối đa 2 đạo cụ luôn đặt ở rìa khung và
out nét, cùng tông trung tính. Không dùng bí ngô, nến, sách, la bàn, mũ —
những thứ này làm ảnh rối và kéo mắt khỏi phần thêu.

## Mẹo giữ chữ thêu không bị sai

1. Gõ rõ nội dung chữ ra trong prompt. Sau khi extension điền, thêm dòng:
   `The embroidered text must read exactly: "..." , nothing else.`
   Đây là cách hiệu quả nhất để AI không tự chế chữ (nội dung chữ thay đổi
   theo từng design nên phải tự điền tay).
2. Thiết kế đính kèm nên là PNG nền trong suốt, độ phân giải cao, chữ to rõ.
3. Nếu chữ vẫn lỗi → giảm độ khó: chọn góc "Flat-lay thẳng từ trên"
   (ít biến dạng vải hơn close-up 45°).
4. Với Nano Banana / Gemini: thêm
   `Keep the attached artwork unchanged; only restyle it as embroidery.`

## Cách tạo hàng loạt cho một design

Giữ nguyên khối EMBROIDERY + LIGHTING + STYLE + NEGATIVE, mỗi lượt chỉ đổi
3 chip: màu áo, góc chụp, nền. Mỗi thiết kế chạy 5–6 màu là đủ bộ listing Etsy:
Xanh rêu, Trắng, Kem ngà, Xanh bụi nhạt, Hồng phấn, Xám sport.

## Dùng cho công cụ khác Flow

Prompt này viết đa nền tảng: Nano Banana / Midjourney / ChatGPT Image /
Seedream đều dùng được — luôn đính kèm file thiết kế gốc.
