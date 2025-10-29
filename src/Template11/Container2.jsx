import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import sanitizeHtml from "sanitize-html";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import ImageRender from "../components/EditingTool/ImageRender";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import styles from "./Template11.module.scss";

function Container2({
	editable,
	introImg1,
	introImg1Mobile,
	introImg2,
	introImg2Mobile,
	setIntroImg1,
	setIntroImg1Mobile,
	setIntroImg2,
	setIntroImg2Mobile,
	introText,
	setIntroText,
	galleryText,
	setGalleryText,
	introImg1Position,
	introImg2Position,
	setIntroImg1Position,
	setIntroImg2Position,
}) {
	const onContentBlur1 = useCallback((evt) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] },
		};

		setGalleryText(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
	}, []);
	const onContentBlur2 = useCallback((evt) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] },
		};

		setIntroText(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
	}, []);

	const { width, height } = useSelector((state) => state.auth);
	return (
		<div className={styles.Container2}>
			<div className={styles.leftSection}>
				<div className={styles.myIntro}>My Intro</div>

				<div className={styles.TextWrapper}>
					{!editable && <img src={EditTextIcon} alt="" className={styles.editIntroText} />}

					<div
						className={styles.introText}
						contentEditable={!editable}
						onBlur={onContentBlur2}
						dangerouslySetInnerHTML={{ __html: introText }}>
						{/* {introText} */}
					</div>
				</div>
				<div className={styles.buttons}>
					<button>About Me</button>
					{/* <button>Hire Me</button> */}
				</div>
			</div>
			<div className={styles.rightSection}>
				<div className={styles.introImages}>
					<div className={styles.introImg1}>
						{!editable && (
							<ImageUpload
								className={styles.intro1ChangeIcon}
								setImage={setIntroImg1}
								setImageMobile={setIntroImg1Mobile}
								image={introImg1}
								imageMobile={introImg1Mobile}
								activeId={"introImg1Position"}
								initialPosition={introImg1Position}
								setInitialPosition={setIntroImg1Position}
							/>
						)}
						<ImageRender initialPosition={introImg1Position} editable={editable} currentId={"introImg1Position"}>
							{width < 931 && height > 600 ? (
								<img src={introImg1Mobile} alt="introImg1Mobile" />
							) : (
								<img src={introImg1} alt="introImg1" />
							)}
						</ImageRender>
						<button>About Me</button>
					</div>
					<div className={styles.introImg2}>
						{!editable && (
							<ImageUpload
								className={styles.intro2ChangeIcon}
								setImage={setIntroImg2}
								setImageMobile={setIntroImg2Mobile}
								image={introImg2}
								imageMobile={introImg2Mobile}
								activeId={"introImg2Position"}
								initialPosition={introImg2Position}
								setInitialPosition={setIntroImg2Position}
							/>
						)}
						<ImageRender initialPosition={introImg2Position} editable={editable} currentId={"introImg2Position"}>
							{width < 931 && height > 600 ? (
								<img src={introImg2Mobile} alt="introImg2Mobile" />
							) : (
								<img src={introImg2} alt="introImg2" />
							)}
						</ImageRender>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Container2;
