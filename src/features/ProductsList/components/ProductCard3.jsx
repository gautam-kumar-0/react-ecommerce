import React from "react";

const ProductCard3 = ({product}) => {
	return (
		<div className=" flex-shrink-0 flex  border-t-2 justify-start gap-1 p-3 overflow-hidden bg-white shadow-sm   ring-0.5 ring-violet-400 cursor-pointer">
			<div className="flex gap-4 ">
				<img
					src={product.thumbnail}
					alt=""
					className="w-24 aspect-square rounded-xl"
				/>
				<div className="flex-grow group ">
					<h2 className="text-lg font-md line-clamp-1 group-hover:underline group-hover:text-violet-600">
						Product Name
					</h2>
					<p className="px-1 mt-1 leading-tight text-gray-600 line-clamp-2 max-w-fit min-h-fit">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
						blanditiis architecto corrupti distinctio soluta dolor?
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductCard3;
