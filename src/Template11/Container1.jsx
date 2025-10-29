import React from "react";
import { useSelector } from "react-redux";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import ratingIcon from "../assets/images/rating.png";
import { ContentEditableDiv, CreateSanitizeCallback } from "../components/ContentEditable/ContentEditable";
import ImageRender from "../components/EditingTool/ImageRender";
import FollowButton from "../components/GlobalButtons/FollowButton";
import MessageButton from "../components/GlobalButtons/MessageButton";
import { redirectToSocialMedia } from "../components/Hooks/RedirectToSocialMedia";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import styles from "./Template11.module.scss";

function Container1({
	editable,
	name,
	coverImage,
	coverImageMobile,
	setCoverImage,
	setCoverImageMobile,
	coverText,
	setCoverText,
	followers,
	followings,
	setShowRating,
	ratingData,
	coverImgPosition,
	setCoverImgPosition,
}) {
	const { userId, currentUserId, width, height } = useSelector((state) => state.auth);

	const handleRating = () => {
		if (redirectToSocialMedia()) return window.open(process.env.REACT_APP_SOCIAL_MEDIA_URL, "_self");
		setShowRating(true);
	};

	const onContentBlur = CreateSanitizeCallback(setCoverText);

	return (
		<div className={styles.Container1}>
			<img src={coverImage} alt="" className={styles.background} />
			<div className={styles.leftSection}>
				<div className={styles.hero}>
					{/* cut off borders */}
					<div className={styles.leftOne}></div>
					<div className={styles.leftTwo}></div>

					<div className={styles.rightOne}></div>
					<div className={styles.rightTwo}></div>

					<ImageRender initialPosition={coverImgPosition} editable={editable} currentId={"coverImgPosition"}>
						{width < 931 && height > 600 ? (
							<img src={coverImageMobile} alt="coverImageMobile" />
						) : (
							<img src={coverImage} alt="coverImage" />
						)}
					</ImageRender>
					{!editable && (
						<ImageUpload
							className={styles.coverChangeIcon}
							setImage={setCoverImage}
							setImageMobile={setCoverImageMobile}
							image={coverImage}
							imageMobile={coverImageMobile}
							activeId={"coverImgPosition"}
							initialPosition={coverImgPosition}
							setInitialPosition={setCoverImgPosition}
						/>
					)}
					<div className={styles.name}>
						<span>I'm </span>
						<div className={styles.introText}>{name}</div>
					</div>
					{userId === currentUserId ? (
						<div
							className={styles.follower}
							style={{ cursor: "pointer" }}
							onClick={() => {
								window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/FollowList`, "_self");
							}}>
							<div className={styles.followerCount}>{followers}</div>
							<div className={styles.textFollower}>followers</div>
						</div>
					) : (
						<div className={styles.follower}>
							<div className={styles.followerCount}>{followers}</div>
							<div className={styles.textFollower}>followers</div>
						</div>
					)}

					<div className={styles.RatingContainer} onClick={handleRating}>
						<img src={ratingIcon} alt="" />
						<span>{ratingData}</span>
					</div>
				</div>
			</div>

			<div className={styles.rightSection}>
				<div className={styles.TextareaWrapper}>
					{!editable && <img src={EditTextIcon} alt="" className={styles.EditTextIcon} />}

					<ContentEditableDiv
						className={styles.coverText}
						text={coverText}
						onChange={onContentBlur}
						contentEditable={!editable}
					/>
				</div>
				<div className={styles.buttons}>
					<MessageButton />
					{userId === currentUserId ? (
						<button
							onClick={() => {
								window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/FollowList`, "_self");
							}}>
							<p style={{ marginBottom: "1rem" }}>{followings}</p>
							Following
						</button>
					) : (
						<FollowButton />
					)}
				</div>
			</div>
		</div>
	);
}

export default Container1;
