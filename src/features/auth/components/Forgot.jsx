import {useForm} from "react-hook-form";

export default function Forgot() {
	const {register, handleSubmit} = useForm();
	const onSubmit = (data) => console.log(data);

	return (
		<section className="flex items-center justify-center font-geo">
			<form
				className="flex flex-col items-start gap-4 p-1"
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className="flex flex-col gap-2 text-lg" htmlFor="email">
					Enter your Email.
					<input
						className="px-1 py-2 border-b-2 border-gray-500 border-solid focus:outline-none focus:border-indigo-600"
						{...register("email")}
						type="email"
						id="email"
					/>
				</label>
				<input
					className="px-6 py-2 text-lg font-bold text-gray-100 bg-indigo-500 rounded-full hover:bg-indigo-600"
					type="submit"
				/>
			</form>{" "}
		</section>
	);
}
