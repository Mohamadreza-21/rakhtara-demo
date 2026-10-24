import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../../lib/motion";
import { TestimonialsSkeleton } from "../../../components/skeletons/SiteSkeletons";
import ErrorState from "../../../components/errors/ErrorState";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../lib/query/keys";
import { getTopComments } from "../../../services/comments";
import StarRating from "./StarRating";

const fetchTopComments = () => getTopComments(3);

export default function TestimonialsSection() {
	const { data: featured = [], isPending: loading, error, refetch: reload } = useQuery({ queryKey: keys.comments.top, queryFn: fetchTopComments });

	return (
		<section className="max-w-7xl mx-auto px-6 py-20">
			<div className="text-center mb-14">
				<h2 className="text-3xl font-extrabold text-forest mb-3">
					از زبان مشتریان
				</h2>
			</div>

			{loading ? (
				<TestimonialsSkeleton />
			) : error ? (
				<ErrorState
					error={error}
					variant="inline"
					subject="نظرات مشتریان"
					onRetry={reload}
				/>
			) : featured.length === 0 ? (
				<p className="text-center text-ink/50">هنوز نظری ثبت نشده است.</p>
			) : (
				<motion.div
					variants={stagger(0.12)}
					initial="hidden"
					animate="show"
					className="grid md:grid-cols-3 gap-8"
				>
					{featured.map((comment) => (
						<motion.div
							key={comment.id}
							variants={fadeUp}
							whileHover={{ y: -6 }}
							className="bg-white rounded-3xl p-8 border border-ink/10"
						>
							<StarRating rating={Number(comment.rating || 0)} />
							<p className="text-ink/70 leading-8 my-6">«{comment.text}»</p>
							<p className="font-bold text-forest">{comment.name}</p>
						</motion.div>
					))}
				</motion.div>
			)}
		</section>
	);
}
