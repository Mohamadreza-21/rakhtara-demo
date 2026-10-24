export const SHOW_DEMO_ACCOUNTS = import.meta.env.VITE_SHOW_DEMO_ACCOUNTS !== "false";

export const DEMO_ACCOUNTS = [
	{
		label: "مشتری آزمایشی",
		hint: "پنل کاربری",
		identifier: "demo.user@example.com",
		password: "Demo#User1",
	},
	{
		label: "مدیر آزمایشی",
		hint: "پنل مدیریت",
		identifier: "demo.admin@example.com",
		password: "Demo#Admin1",
	},
];
