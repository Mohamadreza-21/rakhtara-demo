import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

export default function ImagePicker({ label, value, onChange, error, previewAlt = "پیش‌نمایش" }) {
	const inputRef = useRef(null);
	const [pickError, setPickError] = useState("");

	const handlePick = (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			setPickError("لطفاً یک فایل تصویری انتخاب کنید");
			return;
		}
		if (file.size > MAX_IMAGE_SIZE) {
			setPickError("حجم تصویر باید کمتر از ۳ مگابایت باشد");
			return;
		}

		setPickError("");
		const reader = new FileReader();
		reader.onload = () => onChange(reader.result);
		reader.readAsDataURL(file);
	};

	const message = pickError || error?.message;

	return (
		<div>
			<span className="block text-sm font-medium text-[#374151] mb-1.5">{label}</span>
			<input ref={inputRef} type="file" accept="image/*" onChange={handlePick} className="hidden" />
			{value ? (
				<div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#EEF0F5] group">
					<img loading="lazy" decoding="async" src={value} alt={previewAlt} className="w-full h-full object-cover" />
					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
						<button
							type="button"
							onClick={() => inputRef.current?.click()}
							className="cursor-pointer bg-white text-[#111827] text-xs font-medium px-3 py-1.5 rounded-lg"
						>
							تغییر تصویر
						</button>
						<button
							type="button"
							onClick={() => onChange("")}
							className="cursor-pointer bg-white text-[#DC2626] text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1"
						>
							<X size={13} /> حذف
						</button>
					</div>
				</div>
			) : (
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					className="cursor-pointer w-full h-40 rounded-xl border-2 border-dashed border-[#EEF0F5] flex flex-col items-center justify-center gap-2 text-[#9CA3AF] hover:border-[#6C63FF] hover:text-[#6C63FF] transition bg-[#FAFAFC]"
				>
					<ImagePlus size={26} />
					<span className="text-sm font-medium">برای بارگذاری تصویر کلیک کنید</span>
					<span className="text-xs">PNG یا JPG، حداکثر ۳ مگابایت</span>
				</button>
			)}
			{message && <p className="text-xs text-[#DC2626] mt-1.5">{message}</p>}
		</div>
	);
}
