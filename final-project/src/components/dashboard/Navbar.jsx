import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
import { DashboardContext } from "../../context/DashboardContext";
import { Transition } from "@headlessui/react";

export const Navbar = () => {
	let history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
	const { setIsLogin, setActionMessage } = useContext(AppContext);
	const { profile, setProfile } = useContext(DashboardContext);

	return (
		<header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center min-h-16 h-fit rounded-2xl z-40">
			<div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
				<div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0 my-2">
					<div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
						<div className="relative flex items-center w-full lg:w-64 h-full group">
							<div className="block lg:hidden">
								<div className="-mr-2 flex lg:hidden">
									<button
										onClick={() => setIsOpen(!isOpen)}
										type="button"
										className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										aria-controls="mobile-menu"
										aria-expanded="false"
									>
										<span className="sr-only">Open main menu</span>
										{!isOpen ? (
											<svg
												className="block h-6 w-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M4 6h16M4 12h16M4 18h16"
												/>
											</svg>
										) : (
											<svg
												className="block h-6 w-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										)}
									</button>
								</div>
								<Transition
									show={isOpen}
									enter="transition ease-out duration-100 transform"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="transition ease-in duration-75 transform"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									{(ref) => (
										<div className="lg:hidden" id="mobile-menu">
											<div
												ref={ref}
												className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
											>
												<Link
													to="/dashboard"
													className="hover:bg-gray-700 text-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
												>
													Dashboard
												</Link>
												<Link
													to="/dashboard/list-job-vacancy"
													className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
												>
													List Data Table
												</Link>
												<Link
													to="/dashboard/list-job-vacancy/create"
													className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
												>
													Data Form
												</Link>
												<Link
													to="/profile"
													className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
												>
													Profile
												</Link>
												<Link
													to="/change-password"
													className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
												>
													Change Password
												</Link>
												<Link
													to="/"
													className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
												>
													Landing Page
												</Link>
											</div>
											<div className="px-4 pb-3 space-y-1 sm:px-5">
												<form>
													<button
														type="button"
														onClick={() => {
															Cookies.remove("token");
															Cookies.remove("user");
															setProfile({
																id: "",
																name: "",
																email: "",
																image_url: "",
															});
															setIsLogin(false);
															setActionMessage({
																type: "Green",
																title: "Success",
																message: "Berhasil Logout",
															});
															setTimeout(() => {
																setActionMessage({
																	type: "",
																	title: "",
																	message: "",
																});
															}, 3000);
															history.push("/");
														}}
														className="my-2 md:my-0 py-2 px-4 w-fit bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
													>
														Logout
													</button>
													<Link to="/profile" className="block relative">
														<img
															alt="profil"
															src={profile.image_url}
															className="inline-block mt-5 mx-auto object-cover rounded-full h-10 w-10"
														/>
													</Link>
												</form>
											</div>
										</div>
									)}
								</Transition>
							</div>
							<button
								type="button"
								onClick={() => {
									Cookies.remove("token");
									Cookies.remove("user");
									setProfile({
										id: "",
										name: "",
										email: "",
										image_url: "",
									});
									setIsLogin(false);
									setActionMessage({
										type: "Green",
										title: "Success",
										message: "Berhasil Logout",
									});
									setTimeout(() => {
										setActionMessage({ type: "", title: "", message: "" });
									}, 3000);
									history.push("/");
								}}
								className="hidden lg:block mx-4 py-2 px-4 w-fit bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								Logout
							</button>
						</div>
					</div>
					<div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
						<Link to="/profile" className="block relative">
							<img
								alt="profil"
								src={profile.image_url}
								className="hidden lg:block mx-auto object-cover rounded-full h-10 w-10"
							/>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
