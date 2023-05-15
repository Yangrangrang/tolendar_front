export default function LoginPage () {
  return (
    // <div className="login-container flex justify-center items-center h-screen">
    //   <div className="login-card w-3/5 min-w-[50%] h-[350px] border">
    //     <p className="text-center text-3xl text-orange-500">Login</p>
      
    //   </div>
    // </div>
    <div className="relative flex flex-col justify-center min-h-[85%] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-400 underline">
                   Sign in
                </h1>
                <form className="mt-6" action={"/auth/login"} method="post">
                    <div className="mb-2">
                        <label
                            // for="email"
                            className="block text-m font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            // for="password"
                            className="block text-m font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-s text-orange-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-orange-300 focus:outline-none focus:bg-orange-500">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-s font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-orange-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
