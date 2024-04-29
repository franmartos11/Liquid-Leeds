"use client";
import Link from "next/link";

export default function () {
    return (
        <div className="relative  bg-black">
            <hr className="h-px mb-[5rem] mt-[-5.5rem] bg-black"></hr>
            <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-black p-1">
                <Link title="link" href={"#top-page"}>
                    
                </Link>
            </div>
            <nav
                aria-label="Footer Navigation"
                className="mx-auto  mb-10 flex max-w-lg flex-col gap-10 text-center justify-center sm:flex-row sm:text-left"
            >
                <a title="link" href="/" className="font-medium text-white">
                    Inicio
                </a>
                <a
                    title="link"
                    href="/"
                    className="font-medium text-white"
                >
                    Servicios
                </a>
                <a
                    title="link"
                    href="/"
                    className="font-medium text-white"
                >
                    Nosotros
                </a>
                <a
                    title="link"
                    href="/"
                    className="font-medium text-white"
                >
                    Contacto
                </a>
            </nav>
            <p className="py-10 text-center text-gray-300">
                © 2024 Aspa Software | All Rights Reserved
            </p>
        </div>
    );
}
