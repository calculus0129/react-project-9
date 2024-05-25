'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
    const path = usePathname();
    // Currently active domain name
    // e.g. /meals, /community, etc.

    return (
        <Link href={href} className=
            {
                path.startsWith(href)
                    ? `${classes.link} ${classes.active}`
                    : classes.link
            }>{children}</Link>
    );
};