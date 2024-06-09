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
            if (input.password === "") throw new Error("Please fill your Password");

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

    return (
        <div className="font-[sans-serif] text-[#333]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
                    <div className="border border-black rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                        <form className="space-y-6" onSubmit={login}>
                            <div className="mb-10">
                                <h3 className="text-3xl font-extrabold">
                                    Welcome to Takapadia
                                </h3>
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
                                    <button
                                        type="button"
                                        aria-label={
                                            isPasswordVisible
                                                ? "Password Visible"
                                                : "Password Invisible."
                                        }
                                        className="text-black dark:text-white"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {isPasswordVisible ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="black"
                                                className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                ></path>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                ></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="black"
                                                className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                ></path>
                                            </svg>
                                        )}
                                    </button>
                                </div>
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
                            alt="shopping Experience"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
