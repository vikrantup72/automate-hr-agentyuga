import {
	TOKEN_FUNCTION,
	USERINFO,
	NAV_BAR,
	OPENMODAL,
	CLOSEMODAL,
	LOADER,
} from "../ActionTypes";

export const setTokenFunction = (data) => {
	return { type: TOKEN_FUNCTION, payload: data };
};
export const setNavbar = (data) => {
	return { type: NAV_BAR, payload: data };
};
export const setUserInfo = (data) => {
	return { type: USERINFO, payload: data };
};

export const setOpenModal = (data) => {
	return { type: OPENMODAL, payload: data };
};
export const setCloseModal = (data) => {
	return { type: CLOSEMODAL, payload: data };
};
export const setLoader = (data) => {
	return { type: LOADER, payload: data };
};
