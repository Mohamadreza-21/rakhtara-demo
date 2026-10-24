import { useEffect, useState } from "react";
import { useUrlParam } from "./useUrlPage";
import { useDebouncedValue } from "./useDebouncedValue";

export function useUrlSearch({ key = "q", delay = 350 } = {}) {
	const [urlQuery, setUrlQuery] = useUrlParam(key, "");
	const [input, setInput] = useState(urlQuery);
	const debounced = useDebouncedValue(input.trim(), delay);

	useEffect(() => {
		if (debounced !== urlQuery) setUrlQuery(debounced);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounced]);

	return { input, setInput, query: urlQuery };
}
