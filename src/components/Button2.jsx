import React from "react";

const Button2 = ({children, onClick, className}) => {
	return (
		<button
			onClick={onClick}
			className={`font-jose py-2 pl-6 pr-8 text-xl  *:hover:-rotate-12 *:hover:scale-110  *:transition-all transition-all  bg-indigo-600  transition-200 text-white tracking-wide  ${className}`}
		>
			{children}
		</button>
	);
};

export default Button2;
