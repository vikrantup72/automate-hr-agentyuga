import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../../redux/Actions/UserAction";
import TableForm from "../DepartmentTableForm";
import styles from "./modalStyles.module.css";

const ModalManager = ({ children }) => {
	const { modalVisible, modalData, modalType } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setOpenModal({ modalVisible: false }));
	};

	// // Memoize the RenderComponent to avoid unnecessary re-renders
	// const RenderComponent = useMemo(() => {
	// 	switch (modalType) {
	// 		case "Form":
	// 			return <TableForm {...modalData} />;
	// 		default:
	// 			return null;
	// 	}
	// }, [modalType, modalData]);

	if (!modalVisible) return null;

	return (
		<div className={styles.modalVisibleContainer}>
			<div className={styles.slideInFromRight}>
				<button className={styles.closeButton} onClick={handleClose}>
					×
				</button>
				<div
					style={{
						height: "90%",
						overflow: "scroll",
						marginTop: 50,
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default ModalManager;
