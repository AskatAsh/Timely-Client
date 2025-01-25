import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/icons/timely-logo.png";
import { Button } from "../ui/button";

const Footer = () => {
    return (
        <section className="py-10 bg-background sm:pt-16 lg:pt-24 border-t border-secondary-700 mt-20">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <div className="flex items-center gap-2">
                <img className="w-auto h-8" src={logo} alt="timely website logo" />
                <span className="font-extrabold text-xl">Timely</span>
                </div>

                <p className="text-base leading-relaxed text-text-600 mt-7">Optimize delivery routes, boost efficiency, and scale easily with the world&apos;s most popular delivery software for couriers.</p>

                <ul className="flex items-center space-x-3 mt-9">
                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 hover:bg-accent focus:bg-accent">
                           <FaFacebook />
                        </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 hover:bg-accent focus:bg-accent">
                            <FaLinkedin />
                        </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 hover:bg-accent focus:bg-accent">
                            <FaTwitter />
                        </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 hover:bg-accent focus:bg-accent">
                            <FaInstagram />
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-text-500 uppercase">Company</p>

                <ul className="mt-6 space-y-4">
                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> About </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> Features </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> Works </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> Career </a>
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-text-500 uppercase">Help</p>

                <ul className="mt-6 space-y-4">
                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> Customer Support </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> Delivery Details </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> Terms & Conditions </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-text transition-all duration-200 hover:text-accent focus:text-accent"> Privacy Policy </a>
                    </li>
                </ul>
            </div>

            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                <p className="text-sm font-semibold tracking-widest text-text-500 uppercase">Subscribe to newsletter</p>

                <form action="#" method="POST" className="mt-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full p-4 text-text placeholder-gray-500 transition-all duration-200 bg-background border border-secondary-800 rounded-md focus:outline-none focus:border-accent caret-accent" />
                    </div>

                    <Button size="lg" type="submit" className="mt-4 bg-accent-500 hover:bg-accent-700 text-text">Subscribe</Button>
                </form>
            </div>
        </div>

        <hr className="mt-16 mb-10 border-secondary-500" />

        <p className="text-sm text-center text-gray-600">© Copyright 2025, All Rights Reserved by Timely</p>
    </div>
</section>

    );
};

export default Footer;