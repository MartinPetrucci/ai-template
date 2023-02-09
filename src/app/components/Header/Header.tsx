"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import cn from "classnames";
export default function Header() {
  const path = usePathname();
  const links = [
    {
      href: "/",
      label: "Chat",
    },
    {
      href: "/images",
      label: "Images",
    },
  ];
  console.log(path);
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={cn(styles.link, path === "/" ? styles.active : "")}
      >
        Chat
      </Link>
      <Link
        href="/images"
        className={cn(styles.link, path === "/images" ? styles.active : "")}
      >
        Images
      </Link>
    </header>
  );
}
