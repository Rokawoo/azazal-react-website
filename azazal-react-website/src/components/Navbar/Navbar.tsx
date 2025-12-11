import { useState } from "react";

import styles from "./Navbar.module.css";
import { getAssetUrl } from "../../utils";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={styles.backgroundColor}>
            <nav className={styles.navbar}>
                <img
                    className={`${styles.navbarImg} clickable`}
                    src={getAssetUrl("nav/navbarImage.webp")}
                    alt="azazal-icon"
                    draggable="false"
                    onClick={() => window.location.reload()}
                />

                <div className={styles.menu}>
                    <img
                        className={styles.menuBtn}
                        src={menuOpen
                            ? getAssetUrl("nav/closeIcon.webp")
                            : getAssetUrl("nav/menuIcon.webp")}
                        alt="menu-button"
                        draggable="false"
                        onClick={() => setMenuOpen(!menuOpen)} />
                    <ul
                        className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <li className={styles.menuItem}>
                            <a href="#about">[ About ]</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="#socials">[Socials]</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="#fanart">[ Fan Art ]</a>
                        </li>
                        <li className={styles.menuItem}>
                            <a href="#store">[Store]</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
