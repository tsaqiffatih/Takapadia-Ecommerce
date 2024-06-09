"use client";

import { setCookies } from "@/actions/setCookies";
import ToHome from "@/components/BackToHome";
import ErrorNotif from "@/components/ErrorNotif";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function LoginPage() {
	const [input, setInput] = useState({
		email: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const route = useRouter();

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (input.email === "") throw new Error("Please fill your Email");
			if (input.password === "") throw new Error(" Please fill your Password");

			const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(input),
				cache: "no-store",
			});

			if (!res.ok) {
				const data = (await res.json()) as { message: string };
				throw new Error(data.message);
			}

			const data = (await res.json()) as {
				message: string;
				accessToken: string;
			};

			setCookies(data);
			route.push("/");
		} catch (error: any) {
			// console.log(error);
			if (error instanceof Error && "message" in error) {
				route.push(`/login?error=${error.message}`);
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "An error occurred. Please try again later.",
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	const labelClassName = "text-sm font-medium text-black tracking-wide";

	return (
		<div className="font-[sans-serif] text-[#333]">
			<div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
				<div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
					<div className="border border-black rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
						<form className="space-y-6" onSubmit={login}>
							<div className="mb-10">
								<h3 className="text-3xl font-extrabold">Welcome to Takapadia</h3>
								<p className="text-sm mt-4">
									Sign in to your account and enjoy your shopping 
								</p>
							</div>
							<ErrorNotif />
							<div>
								<label className="text-sm mb-2 block">Email</label>
								<div className="relative flex items-center">
									<input
										name="email"
										type="text"
										required
										className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
										placeholder="Enter user name"
										value={input.email}
										onChange={handleChangeInput}
									/>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="black"
										stroke="black"
										className="w-[18px] h-[18px] absolute right-4"
										viewBox="0 0 24 24"
									>
										<circle
											cx="10"
											cy="7"
											r="6"
											data-original="#000000"
										></circle>
										<path
											d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
											data-original="#000000"
										></path>
									</svg>
								</div>
							</div>
							<div>
								<label className="text-sm mb-2 block">Password</label>
								<div className="relative flex items-center">
									<input
										name="password"
										type={isPasswordVisible ? "text" : "password"}
										required
										className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
										placeholder="Enter password"
										value={input.password}
										onChange={handleChangeInput}
									/>
									<svg
										onClick={togglePasswordVisibility}
										xmlns="http://www.w3.org/2000/svg"
										fill="black"
										stroke="black"
										className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
										viewBox="0 0 128 128"
									>
										<path
											d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
											data-original="#000000"
										></path>
									</svg>
								</div>
							</div>
							<div className="flex items-center justify-between gap-2">
								{/* <div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
									/>
									<label htmlFor="remember-me" className="ml-3 block text-sm">
										Remember me
									</label>
								</div>
								<div className="text-sm">
									<a
										href="javascript:void(0);"
										className="text-blue-600 hover:underline"
									>
										Forgot your password?
									</a>
								</div> */}
							</div>
							<div className="!mt-10">
								<button
									type="submit"
									className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wide rounded cursor-pointer transition ease-in duration-500 ${
									isLoading
										? "bg-gray-400"
										: "bg-[#333] hover:bg-black text-white"
								}`}
								disabled={isLoading}
								>
									{isLoading ? (
									<span className="loading loading-spinner loading-md">
										Loading...
									</span>
								) : (
									"Sign in"
								)}
								</button>
							</div>
							<p className="text-sm !mt-10 text-center">
								Don&apos;t have an account{" "}
								<Link
									href="/register"
									className="text-blue-600 hover:underline ml-1 whitespace-nowrap"
								>
									Register here
								</Link>
							</p>
						</form>
					</div>
					<div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
						<Image
							src="https://readymadeui.com/login-image.webp"
							width={600}
							height={400}
							className="w-full h-full object-cover"
							alt="Dining Experience"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
