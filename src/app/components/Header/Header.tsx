"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
export default function Header() {
  const path = usePathname();
  const links = [
    {
      href: "/",
      label: "CHAT",
    },
    {
      href: "/images",
      label: "IMAGES",
    },
    {
      href: "/docs",
      label: "DOCS",
    },
  ];
  return (
    <header className={styles.header}>
      <div className={styles.links}>
        {links.map((link) => (
          <Link
            className={link.href === path ? styles.active : ""}
            key={link.label}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <svg width="50" height="50">
        <circle cx="25" cy="32" r="12" fill="white" />
      </svg>
    </header>
  );
}
