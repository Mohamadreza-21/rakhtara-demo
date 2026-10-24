import { FIELD_TONES } from "./tones";

export default function FieldError({ error, tone = "site", id }) {
	if (!error) return null;
	return (
		<p id={id} role="alert" className={FIELD_TONES[tone].error}>
			{error.message ?? error}
		</p>
	);
}
