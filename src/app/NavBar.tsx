import React from 'react';
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";

const NavBar = () => {
    const links = [
        {label: "Dashboard", href: '/'},
        {label: "Issues", href: '/api/issue'}
    ]

    return (
        <nav className="flex space-x-6 border-b mb-5 px-6 h-16 items-center justify-center">
            <Link href="/"><GoHomeFill/></Link>
            <ul className="flex space-x-6">
                {links.map(link => <Link key={link.href} className="text-zinc-500 hover:text-zinc-800 transition-colors"
                                         href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    );
};

export default NavBar;