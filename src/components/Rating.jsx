import {TiStarFullOutline} from "react-icons/ti";

const Rating = ({rating}) => {
	const integer = Math.floor(rating);
	const decimal = Math.floor((rating - integer).toFixed(2) * 100);
	const semiWidth = `${decimal < 40 ? decimal + 5 : decimal}%`;
	const stars = Array(5);
	for (let i = 0; i < rating; i++) {
		stars[i] = <TiStarFullOutline key={i} />;
	}
	if (decimal !== 0) {
		stars[integer] = (
			<div key={integer} className="flex relative w-[min-content]">
				<TiStarFullOutline className="absolute text-violet-300 dark:text-gray-700" />
				<span
					style={{width: semiWidth}}
					className={` relative z-10 overflow-hidden`}
				>
					<TiStarFullOutline />
				</span>
			</div>
		);
	}

	let currentRate = rating;
	while (5 - currentRate >= 1) {
		stars[Math.floor(currentRate)] = (
			<TiStarFullOutline key={currentRate * 5} className="text-violet-300" />
		);
		currentRate++;
	}
	return (
		<div className="flex p-0 text-yellow-400 opacity-50 dark:opacity-80">
			<div className="flex flex-row items-center gap-1 text-2xl  hover:*:scale-110">
				{stars.map((star) => star)}
			</div>
			<span className="relative mt-1 ml-1 text-xl text-indigo-800 -top-2 dark:text-indigo-200 dark:opacity-50 font-jose">{`${rating.toFixed(
				1
			)}`}</span>
		</div>
	);
};

export default Rating;
