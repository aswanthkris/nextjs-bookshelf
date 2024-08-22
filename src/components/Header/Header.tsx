"use client";
import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname, useRouter } from "next/navigation";
const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <div onClick={handleLogoClick} className={styles.logoContainer}>
        <img src="/bookLogo.png" alt="Logo" className={styles.logo} />
        <span className={styles.logoText}>Bookshelf</span>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={`${styles.navItem} ${
              pathname === "/books/dashboard" ? styles.active : ""
            }`}
          >
            <Link href="/books/dashboard">Get Books</Link>
          </li>
          <li
            className={`${styles.navItem} ${
              pathname === "/books/addBooks" ? styles.active : ""
            }`}
          >
            <Link href="/books/addBooks">Sell Books</Link>
          </li>
          <li
            className={`${styles.navItem} ${
              pathname === "/auth/signin" ? styles.active : ""
            }`}
          >
            <Link href="/auth/signin">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
