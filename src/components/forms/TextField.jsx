import { useId } from "react";
import FieldError from "./FieldError";
import { FIELD_TONES } from "./tones";

export default function TextField({
	label,
	error,
	tone = "site",
	as: Control = "input",
	className = "",
	wrapperClassName = "",
	endAdornment,
	children,
	...controlProps
}) {
	const id = useId();
	const styles = FIELD_TONES[tone];

	return (
		<div className={wrapperClassName}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<div className="relative">
				<Control
					id={id}
					aria-invalid={Boolean(error)}
					aria-describedby={error ? `${id}-error` : undefined}
					className={`${styles.input} ${error ? styles.invalid : styles.ok} ${endAdornment ? "pl-11" : ""} ${className}`}
					{...controlProps}
				>
					{children}
				</Control>
				{endAdornment && (
					<span className="absolute left-3 top-1/2 -translate-y-1/2 flex">{endAdornment}</span>
				)}
			</div>
			<FieldError id={`${id}-error`} error={error} tone={tone} />
		</div>
	);
}
