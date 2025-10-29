import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import setting from "../assets/images/Setting.svg";
import AboutMe from "../components/AboutMe/AboutMe";
import HomeButton from "../components/HomeButton/HomeButton";
import Lodging from "../components/Lodging/Lodging";
import NavBar from "../components/NavBar/NavBar";
import Rating from "../components/Rating/Rating";
import Container1 from "./Container1";
import Container2 from "./Container2";
import Container3 from "./Container3";
import Container4 from "./Container4";
import styles from "./Template11.module.scss";

const Template11 = () => {
	document.documentElement.style.setProperty("--base-font-size", "100%");
	const { user, templateData, isLoading, currentUserId, userId } = useSelector((state) => state.auth);
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const { state } = useLocation();

	useEffect(() => {
		function handelResize() {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, [width, height]);

	if (width < 1928) document.documentElement.style.setProperty("--base-font-size", "90%");
	if (width < 1728) document.documentElement.style.setProperty("--base-font-size", "90%");
	if (width < 1500) document.documentElement.style.setProperty("--base-font-size", "80%");
	if (width < 1350) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 1420 && height < 600) document.documentElement.style.setProperty("--base-font-size", "65%");
	if (width < 1250) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 1150) document.documentElement.style.setProperty("--base-font-size", "65%");
	if (width < 1025) document.documentElement.style.setProperty("--base-font-size", "50%");
	if (width < 1025 && height > 912) document.documentElement.style.setProperty("--base-font-size", "80%");
	if (width < 900) document.documentElement.style.setProperty("--base-font-size", "80%");
	if (width < 1000 && height < 600) document.documentElement.style.setProperty("--base-font-size", "60%");

	if (width < 800) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 700) document.documentElement.style.setProperty("--base-font-size", "60%");
	if (width < 800 && height < 600) document.documentElement.style.setProperty("--base-font-size", "55%");
	if (width < 600) document.documentElement.style.setProperty("--base-font-size", "55%");
	if (width < 500) document.documentElement.style.setProperty("--base-font-size", "50%");
	if (width < 400) document.documentElement.style.setProperty("--base-font-size", "45%");
	if (width < 300) document.documentElement.style.setProperty("--base-font-size", "35%");

	const [editable, setEditable] = useState(true);
	const [showNav, setShowNav] = useState(false);
	const [showRating, setShowRating] = useState(false);
	const [ratingData, setRatingData] = useState("");
	const [showAboutMe, setShowAboutMe] = useState(false);
	const [name, setName] = useState("");

	const [coverImage, setCoverImage] = useState("");
	const [coverImageMobile, setCoverImageMobile] = useState("");
	const [coverText, setCoverText] = useState("");
	const [postCount, setPostCount] = useState("");
	const [followers, setFollowers] = useState("");
	const [followings, setFollowings] = useState("");
	const [introText, setIntroText] = useState("");
	const [introImg1, setIntroImg1] = useState("");
	const [introImg1Mobile, setIntroImg1Mobile] = useState("");
	const [introImg2, setIntroImg2] = useState("");
	const [introImg2Mobile, setIntroImg2Mobile] = useState("");
	const [shortMessage, setShortMessage] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [liveIn, setLiveIn] = useState("");
	const [schooling, setSchooling] = useState("");
	const [profession, setProfession] = useState("");
	const [galleryText, setGalleryText] = useState("");
	const [coverImgPosition, setCoverImgPosition] = useState("");
	const [introImg1Position, setIntroImg1Position] = useState("");
	const [introImg2Position, setIntroImg2Position] = useState("");

	useEffect(() => {
		// if (user === null) return;
		if (state?.viewMode) setEditable(false);
		if (templateData === null) return;
		// console.log(templateData);
		setRatingData(user?.Rating === undefined ? "0" : user?.Rating);
		setName(user?.username === "" || user?.username === undefined ? templateData?.name : user?.username);
		setCoverImage(templateData?.coverImage);
		setCoverImageMobile(templateData?.coverImageMobile);
		setCoverText(templateData?.coverText);
		setPostCount(user?.postCount || "0");
		setFollowers(user?.followersData?.length || "0");
		setFollowings(user?.followingData?.length || "0");
		// setIntroText(templateData?.introText);
		setIntroText(user?.bio === "" ? templateData?.introText : user?.bio);
		setIntroImg1(templateData?.introImg1);
		setIntroImg1Mobile(templateData?.introImg1Mobile);
		setIntroImg2(templateData?.introImg2);
		setIntroImg2Mobile(templateData?.introImg2Mobile);
		setGalleryText(templateData?.galleryText);
		setShortMessage(templateData?.shortMessage);
		setEmail(user?.email === "" || user?.email === undefined ? "James.test@mail.co" : user?.email);
		setPhone(user?.mobile_number === "" || user?.mobile_number === undefined ? "+91 323 323 3245" : user?.mobile_number);
		setLiveIn(templateData?.aboutMe?.liveIn);
		setSchooling(templateData?.aboutMe?.schooling);
		setProfession(templateData?.aboutMe?.profession);
		setCoverImgPosition(templateData?.coverImgPosition);
		setIntroImg1Position(templateData?.introImg1Position);
		setIntroImg2Position(templateData?.introImg2Position);
	}, [user, templateData]);

	const templateUpdatedData = {
		name,
		coverImage,
		coverImageMobile,
		coverText,
		introText,
		introImg1,
		introImg1Mobile,
		introImg2,
		introImg2Mobile,
		galleryText,
		shortMessage,
		coverImgPosition,
		introImg1Position,
		introImg2Position,
		aboutMe: {
			email,
			phone,
			liveIn,
			schooling,
			profession,
		},
		hireMe: {
			hireable: false,
		},
	};

	return (
		<>
			{isLoading && <Lodging />}
			<NavBar
				editable={editable}
				setEditable={setEditable}
				showNav={showNav}
				setShowNav={setShowNav}
				templateUpdatedData={templateUpdatedData}
			/>
			{showRating && <Rating setShowRating={setShowRating} setRatingData={setRatingData} />}
			{showAboutMe && (
				<AboutMe
					editable={editable}
					setShowAboutMe={setShowAboutMe}
					email={email}
					setEmail={setEmail}
					phone={phone}
					setPhone={setPhone}
					liveIn={liveIn}
					setLiveIn={setLiveIn}
					schooling={schooling}
					setSchooling={setSchooling}
					profession={profession}
					setProfession={setProfession}
				/>
			)}
			<div className={styles.TemplateWrapper} id="Temp11" style={{ background: "" }}>
				{!showNav && currentUserId === userId && user && !state.viewMode && (
					<img src={setting} alt="" className={styles.Setting} onClick={() => setShowNav(true)} />
				)}
				<div className={styles.Template11}>
					<HomeButton {...{ templateUpdatedData }} />
					<Container1
						editable={editable}
						name={name}
						coverImage={coverImage}
						coverImageMobile={coverImageMobile}
						setCoverImage={setCoverImage}
						setCoverImageMobile={setCoverImageMobile}
						setName={setName}
						setShowRating={setShowRating}
						ratingData={ratingData}
						coverText={coverText}
						setCoverText={setCoverText}
						followings={followings}
						followers={followers}
						coverImgPosition={coverImgPosition}
						setCoverImgPosition={setCoverImgPosition}
					/>
					<Container2
						editable={editable}
						introText={introText}
						setIntroText={setIntroText}
						introImg1={introImg1}
						introImg1Mobile={introImg1Mobile}
						introImg2={introImg2}
						introImg2Mobile={introImg2Mobile}
						setIntroImg1={setIntroImg1}
						setIntroImg1Mobile={setIntroImg1Mobile}
						setIntroImg2={setIntroImg2}
						setIntroImg2Mobile={setIntroImg2Mobile}
						galleryText={galleryText}
						setGalleryText={setGalleryText}
						introImg1Position={introImg1Position}
						introImg2Position={introImg2Position}
						setIntroImg1Position={setIntroImg1Position}
						setIntroImg2Position={setIntroImg2Position}
					/>
					<Container3 {...{ editable, galleryText, setGalleryText }} />
					<Container4 editable={editable} shortMessage={shortMessage} setShortMessage={setShortMessage} />
				</div>
			</div>
		</>
	);
};

export default Template11;
