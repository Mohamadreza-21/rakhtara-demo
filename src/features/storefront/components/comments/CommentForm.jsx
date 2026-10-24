import { memo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Loader2 } from "lucide-react";
import { commentSchema } from "../../../../utils/validators";
import TextField from "../../../../components/forms/TextField";

const EMPTY = { name: "", text: "", rating: 5 };

function CommentForm({ onSubmit, submitting }) {
	const [hoverRating, setHoverRating] = useState(0);
	const {
		register,
		handleSubmit,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm({ resolver: zodResolver(commentSchema), defaultValues: EMPTY });
	const rating = useWatch({ control, name: "rating" });

	async function submit(values) {
		const ok = await onSubmit(values);
		if (ok) reset(EMPTY);
	}

	return (
		<div className="bg-camel/10 border border-camel/20 rounded-2xl p-6">
			<h3 className="font-bold text-forest mb-4">ثبت نظر جدید</h3>
			<form onSubmit={handleSubmit(submit)} noValidate>
				<fieldset disabled={submitting} className="space-y-4 disabled:opacity-60">
					<div className="grid sm:grid-cols-2 gap-4">
						<TextField
							tone="comment"
							label="نام شما"
							placeholder="نام شما"
							error={errors.name}
							{...register("name")}
						/>
						<div className="flex items-center gap-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									type="button"
									key={star}
									onClick={() => setValue("rating", star)}
									onMouseEnter={() => setHoverRating(star)}
									onMouseLeave={() => setHoverRating(0)}
									aria-label={`امتیاز ${star}`}
									className="cursor-pointer"
								>
									<Star
										size={22}
										className="text-camel"
										fill={star <= (hoverRating || rating) ? "#D4A94E" : "none"}
									/>
								</button>
							))}
						</div>
					</div>
					<TextField
						as="textarea"
						tone="comment"
						label="متن نظر"
						rows={3}
						placeholder="نظر خود را درباره این محصول بنویسید..."
						className="resize-none"
						error={errors.text}
						{...register("text")}
					/>
					<button
						type="submit"
						className="cursor-pointer flex items-center gap-2 bg-forest text-cream font-bold px-6 py-2.5 rounded-full hover:bg-forest-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{submitting && <Loader2 size={16} className="animate-spin" />}
						{submitting ? "در حال ارسال..." : "ثبت نظر"}
					</button>
				</fieldset>
			</form>
		</div>
	);
}

export default memo(CommentForm);
