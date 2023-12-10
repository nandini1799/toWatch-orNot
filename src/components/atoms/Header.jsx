import clsx from "clsx";
import React, { useState } from "react";
import { LINKS } from "../../utils/constants.js";
import { GrGithub } from "react-icons/gr";
import { TbApi } from "react-icons/tb";
import { SiThemoviedatabase } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { HiOutlineGlobe } from "react-icons/hi";
import { themeColors } from "../../utils/theme.js";

const getLinkIcon = (icon) => {
	switch (icon) {
		case "github":
			return <GrGithub size={20} color={themeColors["gray-text"]} />;
		case "api":
			return <TbApi size={22} color={themeColors["gray-text"]} />;
		case "dataset":
			return <FaDatabase size={18} color={themeColors["gray-text"]} />;
		case "movieDB":
			return <SiThemoviedatabase size={20} color={themeColors["gray-text"]} />;
		default:
			return <HiOutlineGlobe />;
	}
};

const Header = ({ header, about }) => {
	const [showAbout, setShowAbout] = useState(false);
	return (
		<>
			{showAbout && (
				<div
					className='fixed top-0 left-0 z-[49] w-screen h-screen backdrop-blur-sm'
					onClick={() => {
						setShowAbout(false);
					}}
				/>
			)}
			<div
				className={clsx(
					!showAbout ? "translate-y-[-100%]" : "translate-y-[0]",
					"fixed px-8 pt-10 pb-5 max-w-[700px] rounded-br-xl max-h-[500px] bg-black/80 border-white/10 backdrop-blur-xl shadow-[0_0_2px_1px_rgba(255,255,255,0.03)] top-0 left-[20px] z-[50] transition-all duration-300"
				)}
			>
				<div className='flex flex-col items-center gap-4'>
					<p className='text-lg font-light text-justify text-gray-text'>
						{about}
					</p>
					<div className='flex justify-end w-full gap-4 text-white'>
						{LINKS.map(({ id, icon, label, link }) => (
							<a
								title={label}
								key={id}
								href={link}
								target='_blank'
								rel='noreferrer'
							>
								{getLinkIcon(icon)}
							</a>
						))}
					</div>
				</div>
				<div
					onClick={() => {
						setShowAbout((prev) => !prev);
					}}
					className='absolute top-full left-0 animate-colorShift font-bebas bg-black/80 backdrop-blur-xl rounded-b-xl cursor-pointer font-black shadow-[0_0_2px_1px_rgba(255,255,255,0.03)] border-white/10 text-3xl px-4 py-[3px] '
				>
					{header}
				</div>
			</div>
		</>
	);
};

export default Header;
