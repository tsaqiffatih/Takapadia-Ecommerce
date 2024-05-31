import ToHome from "@/components/BackToHome";
import ErrorNotif from "@/components/ErrorNotif";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function LoginPage() {
	async function login(formData: FormData) {
		"use server";
		const rawFormData = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const response = await fetch( process.env.NEXT_PUBLIC_URL_API +"/login", {
			method: "POST",
			cache: "no-store",
			body: JSON.stringify(rawFormData),
		});

		if (!response.ok) {
			const data = await response.json();
			redirect(`/login?error=${data.message}`);
		}

		const data = (await response.json()) as {
			message: string;
			accessToken: string;
		};

		cookies().set("Authorization", `Bearer ${data.accessToken}`);

		redirect("/");
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div
				className="bg-no-repeat bg-cover bg-center relative"
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)",
				}}
			>
				<div className="absolute bg-green-400 opacity-75 inset-0 z-0"></div>
				<div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
					<div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
						<div className="self-start hidden lg:flex flex-col text-white">
							<h1 className="mb-3 font-bold text-5xl">
								Hi,Selamat Datang kembali di Takapedia
							</h1>
							<p className="pr-5">Segera masuk, banyak diskon menantimu !!!</p>
						</div>
						<ToHome />
					</div>
					<div className="flex justify-center self-center z-10">
						<div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
							<div className="mb-4">
								<h3 className="font-semibold text-2xl text-gray-800">
									Sign In{" "}
								</h3>
								<p className="text-gray-500">Please sign in to your account.</p>
							</div>
							{/* form begin */}
							<form action={login} >
								<div className="space-y-5">
									<div className="space-y-2">
										{/* <ErrorNotif/> */}
										<label className="text-sm font-medium text-gray-700 tracking-wide">
											Email
										</label>
										<input
											className="w-full text-base px-4 py-2 border bg-blue-100 border-gray-300 rounded-lg focus:outline-none focus:border-black"
											type="text"
											name="email"
											placeholder="mail@gmail.com"
										/>
									</div>
									<div className="space-y-2">
										<label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
											Password
										</label>
										<input
											className="w-full content-center text-base bg-blue-100 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
											type="password"
											name="password"
											placeholder="Enter your password"
										/>
									</div>
									<div>
										<button
											type="submit"
											className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
										>
											Sign in
										</button>
									</div>

									<div className="text-center flex-none text-gray-700">
										<p>Doesn&apos;t have an account?</p>
										<a
											href=""
											className="underline hover:text-red-700 font-semibold"
										>
											Register here!
										</a>
									</div>
								</div>
							</form>
							{/* form end */}
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
