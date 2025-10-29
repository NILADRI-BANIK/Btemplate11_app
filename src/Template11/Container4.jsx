import React, { useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import styles from "./Template11.module.scss";
function Container4({ shortMessage, setShortMessage, editable }) {
	const onContentBlur = useCallback((evt) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] },
		};

		setShortMessage(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
	}, []);
	return (
		<div className={styles.Container4}>
			{!editable && <h1>Short Message</h1>}

			<div className={styles.TextWrapper}>
				{!editable && <img src={EditTextIcon} alt="" className={styles.editShortText} />}
				<div
					className={styles.shortMessage}
					contentEditable={!editable}
					onBlur={onContentBlur}
					dangerouslySetInnerHTML={{ __html: shortMessage }}></div>
			</div>
			<div className={styles.thankYou}>Thank you ! Visit Again</div>
		</div>
	);
}

export default Container4;
