export const SORT_OPTIONS = [
	{ value: "default", label: "پیش‌فرض" },
	{ value: "top-rated", label: "پرستاره‌ترین" },
	{ value: "newest", label: "جدیدترین" },
	{ value: "price-asc", label: "ارزان‌ترین" },
	{ value: "price-desc", label: "گران‌ترین" },
	{ value: "name-asc", label: "بر اساس نام" },
];

export const SORT_VALUES = SORT_OPTIONS.map((option) => option.value);
