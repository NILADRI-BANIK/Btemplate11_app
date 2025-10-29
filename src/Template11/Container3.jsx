import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import axios from "../components/Hooks/axios";
import { redirectToSocialMedia } from "../components/Hooks/RedirectToSocialMedia";
import { defaultPostData } from "../redux/store";
import styles from "./Template11.module.scss";

function Container3({ editable, galleryText, setGalleryText }) {
	const navigate = useNavigate();
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const { userId } = useSelector((state) => state.auth);
	const [postData, setPostData] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (userId === "") return setPostData(defaultPostData);
		axios
			.get(`/post/${userId}`)
			.then(({ data }) => {
				if (data.length === 0) setPostData(defaultPostData);
				else setPostData(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [userId]);
	const SmallCards = ({ data, index }) => {
		if (data.mediaType === "image")
			return (
				<div className={styles.smallCards} onClick={() => setActiveIndex(index)}>
					<img src={data.mediaUrl} alt="" />
				</div>
			);
	};

	useEffect(() => {
		function handelResize() {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, [width, height]);
	const onContentBlur1 = useCallback((evt) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] },
		};

		setGalleryText(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
	}, []);

	const handleGallery = () => {
		if (redirectToSocialMedia()) return window.open(process.env.REACT_APP_SOCIAL_MEDIA_URL, "_self");
		navigate("/Gallery");
	};
	return (
		<div className={styles.Container3}>
			<div className={styles.myGallery}>
				{!editable && <img src={EditTextIcon} alt="" className={styles.editGalleryText} />}
				<h1>My Gallery</h1>
				<div
					className={styles.galleryText}
					contentEditable={!editable}
					onBlur={onContentBlur1}
					dangerouslySetInnerHTML={{ __html: galleryText }}>
					{/* {galleryText} */}
				</div>
			</div>
			<div className={styles.galleryItems}>
				<div className={styles.leftSection}>
					<div className={styles.frame}>
						<div className={styles.mainImage}>
							<img src={postData[activeIndex]?.mediaUrl} alt="" />
							<div className={styles.leftImg}>
								{activeIndex === 0 ? (
									postData.length <= 15 ? (
										<img src={postData[postData.length - 1]?.mediaUrl} alt="gallery2" />
									) : (
										<img src={postData[15]?.mediaUrl} alt="gallery2" />
									)
								) : (
									<img src={postData[activeIndex - 1]?.mediaUrl} alt="gallery2" />
								)}
							</div>
							<div className={styles.rightImg}>
								{activeIndex === 15 ? (
									<img src={postData[0]?.mediaUrl} alt="gallery3" />
								) : postData.length === activeIndex + 1 ? (
									<img src={postData[0]?.mediaUrl} alt="gallery3" />
								) : (
									<img src={postData[activeIndex + 1]?.mediaUrl} alt="gallery3" />
								)}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.rightSection}>
					<div className={styles.postContainer}>
						{width < 950 && height > 600
							? postData.slice(0, 16).map((post, i) => <SmallCards data={post} index={i} key={i} />)
							: postData.slice(0, 16).map((post, i) => <SmallCards data={post} index={i} key={i} />)}
					</div>
					<div className={styles.ViewAll}>
						<p onClick={handleGallery}>View All {">"}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Container3;
