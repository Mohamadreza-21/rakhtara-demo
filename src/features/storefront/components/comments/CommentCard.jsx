import { memo } from "react";
import { motion } from "framer-motion";
import StarRating from "../StarRating";

function CommentCard({ comment, highlighted }) {
	return (
		<motion.div
			layout="position"
			initial={{ opacity: 0, y: -12, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.4 }}
			className={`bg-white border rounded-2xl p-5 shadow-sm ${
				highlighted ? "border-camel/60 comment-highlight" : "border-ink/10"
			}`}
		>
			<div className="flex items-center justify-between mb-2 flex-wrap gap-2">
				<span className="font-bold text-forest">{comment.name}</span>
				<div className="flex items-center gap-3">
					<StarRating rating={Number(comment.rating || 0)} />
					{comment.date && <span className="text-xs text-ink/40">{comment.date}</span>}
				</div>
			</div>
			<p className="text-ink/70 leading-7">{comment.text}</p>
		</motion.div>
	);
}

export default memo(CommentCard);
