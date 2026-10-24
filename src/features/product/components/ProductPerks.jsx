import { memo } from "react";
import { Truck, ShieldCheck, Scissors } from "lucide-react";

const PERKS = [
	{ icon: Truck, label: "ارسال سریع" },
	{ icon: ShieldCheck, label: "ضمانت اصالت" },
	{ icon: Scissors, label: "دوخت دست‌ساز" },
];

function ProductPerks() {
	return (
		<div className="grid grid-cols-3 gap-3">
			{PERKS.map(({ icon: Icon, label }) => (
				<div key={label} className="text-center bg-white/70 border border-ink/10 rounded-2xl py-4 px-2">
					<Icon size={20} className="mx-auto mb-1.5 text-forest" />
					<p className="text-xs font-medium text-ink/60">{label}</p>
				</div>
			))}
		</div>
	);
}

export default memo(ProductPerks);
