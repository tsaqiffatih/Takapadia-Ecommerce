
import ToHome from "@/components/BackToHome";
import Image from "next/image";

export default function RegisterPage() {
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
            <form>
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
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign up
                  </button>
                </div>

                <div className="text-center flex-none text-gray-700">
                  <p>Already have an account?</p>
                  <a
                    href=""
                    className="underline hover:text-red-700 font-semibold"
                  >
                    Login here!
                  </a>
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
