import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import TextField from "./TextField";

export default function PasswordField(props) {
	const [visible, setVisible] = useState(false);

	return (
		<TextField
			type={visible ? "text" : "password"}
			endAdornment={
				<button
					type="button"
					onClick={() => setVisible((current) => !current)}
					aria-label={visible ? "پنهان کردن رمز" : "نمایش رمز"}
					className="cursor-pointer text-ink/40"
				>
					{visible ? <EyeOff size={18} /> : <Eye size={18} />}
				</button>
			}
			{...props}
		/>
	);
}
