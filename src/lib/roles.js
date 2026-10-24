export const ROLES = {
	USER: "user",
	ADMIN: "admin",
};

export const PANEL_ROLES = ["مدیر فروشگاه", "پشتیبانی"];

export function getAccessRole(user) {
	if (!user) return null;
	return PANEL_ROLES.includes(user.role) ? ROLES.ADMIN : ROLES.USER;
}

export function hasAccess(user, requiredRole) {
	const current = getAccessRole(user);
	if (!current) return false;
	return requiredRole === ROLES.ADMIN ? current === ROLES.ADMIN : true;
}

export function canAccessPanel(user) {
	return getAccessRole(user) === ROLES.ADMIN;
}

export const USER_ROLE_OPTIONS = ["مشتری", ...PANEL_ROLES];
export const USER_STATUS_OPTIONS = ["فعال", "غیرفعال"];
