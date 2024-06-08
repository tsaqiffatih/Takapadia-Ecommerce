'use client'
import { setCookies } from "@/actions/setCookies";
import ToHome from "@/components/BackToHome";
import ErrorNotif from "@/components/ErrorNotif";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [input, setInput] = useState({
    name: "",
    username: "",
		email: "",
		password: "",
	});

  const [isLoading, setIsLoading] = useState(false);
	const route = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (input.name === "") throw new Error("Please fill your name");
			if (input.username === "") throw new Error(" Please fill your username");
      if (input.email === "") throw new Error("Please fill your Email");
			if (input.password === "") throw new Error(" Please fill your Password");
			
			const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/register", {
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

      Swal.fire({
        icon: 'success',
        title: 'Register Success',
        text: 'You have successfully registered',
      });
			route.push("/login");

		} catch (error: any) {
			// console.log(error);
			if (error instanceof Error && 'message' in error) {
				route.push(`/register?error=${error.message}`);
			  } else {
				Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: 'An error occurred. Please try again later.',
				});
			  }
		} finally {
			setIsLoading(false);
		}
	};

  return (
    <div className="bg-no-repeat bg-cover bg-center relative">
      <div className="absolute bg-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <Image
              src="https://images.tokopedia.net/img/content/register_new.png"
              className="mb-3 max-w-80 "
              alt="banner-register"
              width={500}
              height={500}
            />
            <h1 className="mb-3 font-bold text-4xl">
              Jual Beli Mudah Hanya di Takapedia
            </h1>
            <p className="pr-5">
              Gabung dan rasakan kemudahan bertransaksi di Tokopedia
            </p>
          </div>
          <ToHome/>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 shadow-2xl ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
              <p className="text-gray-500"></p>
            </div>
            {/* form begin */}
            <ErrorNotif/>
            <form onSubmit={handleRegister} >
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Name
                  </label>
                  <input
                    className="w-full text-base px-4 py-2 border bg-blue-100 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={input.name}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Username
                  </label>
                  <input
                    className="w-full text-base px-4 py-2 border bg-blue-100 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={input.username}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className="w-full text-base px-4 py-2 border bg-blue-100 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    type="text"
                    name="email"
                    placeholder="mail@gmail.com"
                    value={input.email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="space-y-1">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base bg-blue-100 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={input.password}
                    onChange={handleChangeInput}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    {isLoading ? (
											<span className="loading loading-spinner loading-md">
												Loading...
											</span>
										) : (
											"Sign Up"
										)}
                  </button>
                </div>

                <div className="text-center flex-none text-gray-700">
                  <p>Already have an account?</p>
                  <Link
                    href="/login"
                    className="underline hover:text-red-700 font-semibold"
                  >
                    Login here!
                  </Link>
                </div>
              </div>
            </form>
            {/* form end */}
          </div>
        </div>
      </div>
    </div>
  );
}
