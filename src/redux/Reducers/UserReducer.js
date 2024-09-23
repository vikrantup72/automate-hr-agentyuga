import {
	TOKEN_FUNCTION,
	USERINFO,
	NAV_BAR,
	OPENMODAL,
	CLOSEMODAL,
	LOADER,
} from "../ActionTypes";

let initialState = {
	token: null,
	tokenfunc: null,
	navbar: true,
	Userinfo: [],
	modalVisible: false,
	modalData: null,
	modalStyle: null,
	modalType: null,
	isLoading: true,
};

export const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOKEN_FUNCTION:
			return {
				...state,
				tokenfunc: action.payload,
			};
		case NAV_BAR:
			return {
				...state,
				navbar: action.payload,
			};
		case USERINFO:
			return {
				...state,
				Userinfo: action.payload,
			};
		case OPENMODAL:
			return {
				...state,
				modalVisible: action.payload?.modalVisible,
				modalData: action.payload?.modalData,
				modalStyle: action.payload?.modalStyle,
				modalType: action.payload?.modalType,
			};
		case CLOSEMODAL:
			return {
				...state,
				modalVisible: false,
				modalData: null,
				modalStyle: null,
				modalType: null,
			};
		case LOADER:
			return {
				...state,
				isLoading: action.payload,
			};

		default:
			return state;
	}
};
