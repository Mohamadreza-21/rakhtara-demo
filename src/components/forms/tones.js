export const FIELD_TONES = {
	site: {
		label: "block text-sm font-bold mb-2 text-ink/70",
		input: "w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors bg-white",
		ok: "border-ink/15",
		invalid: "border-rust",
		error: "text-xs text-rust mt-1.5",
	},
	cms: {
		label: "block text-sm font-medium text-[#374151] mb-1.5",
		input: "w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition bg-white",
		ok: "border-[#EEF0F5] focus:border-[#6C63FF]",
		invalid: "border-[#DC2626]",
		error: "text-xs text-[#DC2626] mt-1.5",
	},
	comment: {
		label: "sr-only",
		input: "w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none focus:border-forest",
		ok: "border-ink/15",
		invalid: "border-rust",
		error: "text-xs text-rust mt-1.5",
	},
};
