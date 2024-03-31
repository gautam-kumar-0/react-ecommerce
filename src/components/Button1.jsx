import React from "react";

const Button1 = ({children, onClick, className}) => {
	return (
		<button
			onClick={onClick}
			className={`focus:outline-none focus:ring-1 flex items-center justify-center font-jose py-2 px-6  text-lg tracking-wide text-white  bg-violet-600 hover:bg-indigo-500 ${className}`}
		>
			{children}
		</button>
	);
};

export default Button1;
