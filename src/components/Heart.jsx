import React from "react";
import {GoHeart, GoHeartFill} from "react-icons/go";
const Heart = ({onClick, liked}) => {
	return (
		<button
			onClick={onClick}
			className={`relative py-2 px-4 text-2xl text-rose-500  *:hover:scale-[115%]  *:transition-all *:transition-500`}
		>
			<GoHeart
				className={`${
					liked ? "opacity-0" : "opacity-100"
				} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 active:animate-ping `}
			/>
			<GoHeartFill
				className={`${
					!liked ? "opacity-10" : "opacity-100"
				} active:animate-ping  bg-transparent `}
			/>
		</button>
	);
};

export default Heart;
