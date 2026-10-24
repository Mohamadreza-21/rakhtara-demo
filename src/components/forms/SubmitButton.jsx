import { Loader2 } from "lucide-react";

const VARIANTS = {
	forest: "bg-forest hover:bg-forest-light shadow-lg shadow-forest/20",
	ink: "bg-ink/90 hover:bg-ink",
};

export default function SubmitButton({ loading, label, loadingLabel, icon: Icon, fullWidth = true, variant = "forest" }) {
	return (
		<button
			type="submit"
			disabled={loading}
			className={`cursor-pointer flex items-center justify-center gap-2 font-bold rounded-full text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 ${
				VARIANTS[variant]
			} ${
				fullWidth ? "w-full py-3.5" : "w-full sm:w-auto px-8 py-3.5"
			}`}
		>
			{loading ? <Loader2 size={18} className="animate-spin" /> : Icon && <Icon size={18} />}
			{loading ? loadingLabel : label}
		</button>
	);
}
