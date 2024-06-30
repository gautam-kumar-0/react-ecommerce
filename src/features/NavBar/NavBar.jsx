import {useState} from "react";
import logo from "../../assests/img/logo.png";

import {LuHeart, LuShoppingCart} from "react-icons/lu";
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCart} from "../cart/cartListSlice";
import {selectWish} from "../wishlist/wishListSlice";
import useUser from "../../hooks/useUser";

const StyledItem = ({children, to, className, activeClass}) => {
	const styles = `text-gray-700  dark:text-gray-200 border-b-2 border-transparent hover:border-violet-500 bg-white/50  dark:border dark:bg-transparent dark:border-gray-900 backdrop-blur-sm dark:hover:bg-violet-700  active:shadow-none transition font-thin font-geo px-3  ${className}`;
	return (
		<NavLink
			className={({isActive}) =>
				isActive ? `${styles} ${activeClass}` : `${styles}`
			}
			to={to}
		>
			{children}
		</NavLink>
	);
};
const NavBar = () => {
	const navItems = [
		{name: "Home", to: "/"},

		{name: "Product", to: "/products"},
	];

	const [showMenu, setShowMenu] = useState(true);
	const cart = Object.keys(useSelector(selectCart)).length;
	const wishlist = Object.keys(useSelector(selectWish)).length;
	const user = useUser();
	return (
		<header className="z-50 flex flex-wrap items-stretch justify-between mb-12 overflow-hidden bg-white lg:mb-0 lg:flex-nowrap md:py-0 lg:justify-start text-lg/loose backdrop-blur-md dark:bg-black ">
			<div className="flex order-1 my-1 ml-3">
				<img src={logo} className="size-12 " alt="Logo" />
				<div className="flex flex-col justify-center leading-[16px]  font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-violet-500 font-jose text-lg ">
					<span className="">SHOP</span>
					<span className="">NOW</span>
				</div>
			</div>

			<div
				className="flex flex-col items-end justify-between order-3 w-12 h-10 p-2 mx-1 my-auto overflow-hidden md:hidden "
				onClick={() => setShowMenu((prev) => !prev)}
			>
				<span
					className={`${
						showMenu ? "rotate-45 translate-x-1 w-8" : "w-10"
					}  h-[2px] bg-violet-900 dark:bg-white/70 rounded-full  transition origin-bottom-left`}
				></span>
				<span
					className={`${
						showMenu ? "hidden" : ""
					} w-7 h-[1.5px] bg-violet-900 dark:bg-white/70 rounded-full transition `}
				></span>
				<span
					className={`${
						showMenu ? "-rotate-45 translate-x-1 !w-8 !h-[2px]" : ""
					} w-5 h-[1px] bg-violet-900 dark:bg-white/70 rounded-full transition origin-bottom-left`}
				></span>
			</div>
			<menu
				className={`${
					!showMenu ? "max-md:translate-x-full max-md:h-0" : "translate-x-0"
				}  flex  justify-center items-stretch lg:items-center   transition-transform transition-300 min-w-full md:min-w-[auto] overflow-hidden order-3 lg:order-2 `}
			>
				<nav className="flex flex-col items-stretch justify-center min-w-full gap-2 border-solid border-t-1 border-violet-300 md:border-none md:flex-row md:justify-start md:px-4 md:py-3 md:border-y ">
					{navItems.map((nav, i) => {
						return (
							<div className="" key={i}>
								<StyledItem
									className="hidden md:inline-block "
									activeClass={"!border-violet-500 "}
									to={nav.to}
								>
									{nav.name}
								</StyledItem>
								{
									//One item for bigger screen and other for smaller
								}
								<Link
									className="block w-full px-6 py-3 font-thin tracking-wide text-center text-gray-700 transition border-b border-solid md:hidden dark:text-gray-200 hover:bg-violet-500 hover:text-gray-100 dark:hover:bg-violet-700 active:shadow-none font-geo border-white/5"
									to={nav.to}
								>
									{nav.name}
								</Link>
							</div>
						);
					})}
				</nav>
			</menu>
			<div
				className={` ${
					!showMenu ? "max-md:translate-x-full max-md:h-0" : "translate-x-0"
				}  transition  overflow-hidden flex  lg:static  z-10 top-full left-0 border-t-1 border  lg:bg-transparent border-b lg:border-none  border-indigo-200 dark:border-white/5 py-2  pr-8  flex-row-reverse lg:flex-row justify-end  items-center flex-1 gap-8 order-4 lg:order-3 min-w-full lg:min-w-[auto]`}
			>
				<StyledItem
					className="relative  hover:!text-rose-500 py-2"
					activeClass={"!text-rose-500 "}
					to={"/wishlist"}
					title="Wishlist"
				>
					<LuHeart />
					<span
						style={{display: wishlist ? "flex" : "none"}}
						className="text-gray-100 absolute  -top-2 right-0 w-7 h-7 flex justify-center items-center text-xs rounded-full bg-violet-500/80 shadow-[inherit]"
					>
						{wishlist}
					</span>
				</StyledItem>
				<StyledItem
					className="relative hover:!text-indigo-500   py-2 bg-white"
					activeClass={"text-indigo-500 "}
					to={"/cart"}
				>
					<LuShoppingCart />
					<span
						style={{display: cart ? "flex" : "none"}}
						className="text-gray-100 absolute -z-1 -top-2 right-0 w-7 h-7 flex justify-center items-center text-xs rounded-full bg-violet-500/80 shadow-[inherit]"
					>
						{cart}
					</span>
				</StyledItem>

				<div className="flex items-center justify-start flex-grow lg:flex-grow-0 lg:justify-end w-28 h-14">
					{user?.email ? (
						<Link to={"/user"}>
							<p className="">{user.email}</p>
						</Link>
					) : (
						<StyledItem
							className="relative mx-4 hover:text-indigo-500"
							to={"/login"}
						>
							Login
						</StyledItem>
					)}
				</div>
			</div>
		</header>
	);
};

export default NavBar;
