import logo from "../assests/img/logo.png";

import Button1 from "../components/Button1";
import {useEffect, useLayoutEffect, useState} from "react";

import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkUserAsync, selectAuth} from "../features/auth/authSlice";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const {user: userId, error} = useSelector(selectAuth);
	const location = useLocation();
	const dispatch = useDispatch();
	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const onRememberChange = (e) => {
		setRemember(e.target.checked);
	};
	const onFormSubmit = (e) => {
		e.preventDefault();

		dispatch(checkUserAsync({email, password}));
	};
	function resetFields() {
		setEmail("");
		setPassword("");
	}
	const navigate = useNavigate();
	useLayoutEffect(() => {
		if (userId) navigate(location?.state?.from || "/user");
	}, [userId]);
	return (
		<div className="flex px-6 sm:items-center justify-center min-h-[80vh] ring">
			<form
				className="flex flex-col items-stretch min-w-full gap-6 p-8 my-6 border-2 rounded-md shadow-sm sm:min-w-min sm:p-12 group solid border-violet-300 dark:border-violet-600"
				noValidate
				onSubmit={onFormSubmit}
			>
				<div className="flex justify-center mx-4 my-2 ">
					<img src={logo} className="size-12 " alt="Logo" />
					<div className="flex flex-col justify-center leading-[16px]  font-medium bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-violet-500 font-jose text-lg ">
						<span className="">SHOP</span>
						<span className="">NOW</span>
					</div>
				</div>

				<label htmlFor="email" className="flex flex-col gap-1">
					<span className="p-0.5 text-lg font-medium text-gray-500 dark:text-gray-300 ">
						Email
					</span>
					<input
						type="email"
						id="email"
						name="user_email"
						value={email}
						onChange={onEmailChange}
						className=" block px-3 py-2 text-lg border-2  dark:border-gray-600 rounded-sm focus:outline-none bg-transparent focus:bg-indigo-200/10 focus:border-indigo-500 min-w-48 sm:min-w-64 lg:min-w-72 [&:not(:placeholder-shown):not(:focus):invalid~span]:visible invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-200/10 valid:[&:not(:placeholder-shown)]:border-green-500  valid:[&:not(:placeholder-shown)]:bg-green-200/10"
						placeholder="abc@xyz.com"
						required
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
					/>
					<span className="invisible text-sm text-red-400 ">
						Enter valid email address.
					</span>
				</label>

				<label htmlFor="password" className="flex flex-col gap-1">
					<span className="p-0.5 text-lg font-medium text-gray-500 dark:text-gray-300">
						Password
					</span>
					<input
						type="password"
						id="password"
						value={password}
						onChange={onPasswordChange}
						className=" block px-3 py-2 text-lg border-2 dark:border-gray-600 rounded-sm focus:outline-none bg-transparent focus:bg-indigo-200/10 focus:border-indigo-500 min-w-48 sm:min-w-64 lg:min-w-72 [&:not(:placeholder-shown):not(:focus):invalid~span]:visible invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-200/10 valid:[&:not(:placeholder-shown)]:border-green-500  valid:[&:not(:placeholder-shown)]:bg-green-200/10"
						placeholder="Password"
						required
						pattern=".{7,}"
					/>
					<span className="invisible text-sm text-red-400 ">
						Password must atleast be 7 letters.
					</span>
				</label>
				<div className="flex justify-between ">
					<span className=" hover:text-indigo-500">Forgot Password ?</span>{" "}
					<span className=" hover:text-violet-500">
						<Link to="/register">New User ?</Link>
					</span>
				</div>
				<div className="flex flex-col items-stretch gap-4">
					<Button1
						type="submit"
						className={
							"rounded-lg shadow-none group-invalid:bg-gray-400 group-invalid:pointer-events-none group-invalid:cursor-not-allowed"
						}
					>
						Login
					</Button1>
					<div className="px-2 ">
						<input
							type="checkbox"
							name=""
							id="remember"
							checked={remember}
							onChange={onRememberChange}
							className="hidden peer"
						/>

						<label
							htmlFor="remember"
							className="flex items-center gap-4 text-lg peer-checked:*:bg-emerald-400 peer-checked:*:ring-emerald-200 text-gray-600 dark:text-gray-300"
						>
							<span className="inline-block w-3 h-3 rounded-full ring ring-violet-600 "></span>
							Remember Me
						</label>
					</div>
				</div>
				<div className="px-2 text-center text-gray-500 dark:text-gray-400">
					<p className={`${error ? "text-red-400" : "text-gray-700"}`}>
						{error
							? error.message
							: "Enter your email address and password to login."}
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
