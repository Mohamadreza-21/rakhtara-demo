import { memo } from "react";
import { ImageOff, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";

function ShowcaseImageCard({ image, isFirst, isLast, reordering, onEdit, onDelete, onMove }) {
	return (
		<div
			className="border border-[#EEF0F5] rounded-xl overflow-hidden group"
		>
			<div className="relative w-full h-32 bg-[#F5F6FA]">
				{image.src ? (
					<img loading="lazy" decoding="async"
						src={image.src}
						alt={image.alt}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<ImageOff size={18} className="text-[#9CA3AF]" />
					</div>
				)}
				<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
					<button
						type="button"
						onClick={() => onEdit(image)}
						className="cursor-pointer bg-white text-[#111827] p-2 rounded-lg"
						aria-label="ویرایش عکس"
					>
						<Pencil size={14} />
					</button>
					<button
						type="button"
						onClick={() => onDelete(image)}
						className="cursor-pointer bg-white text-[#DC2626] p-2 rounded-lg"
						aria-label="حذف عکس"
					>
						<Trash2 size={14} />
					</button>
				</div>
			</div>
			<div className="flex items-center justify-between px-3 py-2.5">
				<div className="flex items-center gap-1">
					<button
						type="button"
						disabled={isFirst || reordering}
						onClick={() => onMove(-1)}
						className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#6B7280] hover:text-[#111827] p-1"
						aria-label="انتقال به عقب"
						title="انتقال به عقب"
					>
						<ArrowUp size={14} />
					</button>
					<button
						type="button"
						disabled={isLast || reordering}
						onClick={() => onMove(1)}
						className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#6B7280] hover:text-[#111827] p-1"
						aria-label="انتقال به جلو"
						title="انتقال به جلو"
					>
						<ArrowDown size={14} />
					</button>
				</div>
				<div className="text-xs text-[#6B7280] truncate max-w-[70%]" title={image.alt}>
					{image.alt || "بدون عنوان"}
				</div>
			</div>
		</div>
	);
}

export default memo(ShowcaseImageCard);
