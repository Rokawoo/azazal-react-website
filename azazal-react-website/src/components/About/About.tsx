import styles from "./About.module.css";

import { getAssetUrl } from "../../utils";
import { useBounceClickAnimation } from "./scripts/bounce-click-animation";


export const About = () => {
  const audioSrc = getAssetUrl("about/awoo.mp3");
  const {
    isAnimated,
    handleHover,
    handleAnimationEnd,
    handleClick
  } = useBounceClickAnimation(audioSrc);

  return (
    <div className={styles.backgroundColor}>
      <section className={styles.container} id="about">
        <h2 className={styles.title}>About Me</h2>
        <div className={styles.content}>
          <img 
            src={getAssetUrl("about/aboutImage.webp")}
            alt="azazal-mascot-about-me"
            className={`${styles.aboutImg} ${isAnimated ? styles.animated : ""}`}
            onMouseEnter={handleHover}
            onAnimationEnd={handleAnimationEnd}
            onClick={handleClick}
            draggable="false"
          />
          <div className={styles.textBox}>
            <p>
              Lorem ipsum dolor sit amet, <span className={`${styles.highlight} ${styles.bigger}`}>consectetur adipiscing elit</span>, sed do
              eiusmod tempor incididunt ut <span className={styles.underline}>labore et dolore</span> magna 
              aliqua. Ut enim ad minim veniam, <span className={styles.underline}>quis nostrud exercitation</span> ullamco laboris.
              <br /><br />
              Duis aute irure dolor in <span className={styles.accent}>reprehenderit in voluptate</span> velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum. &nbsp; 
              <span className={styles.accent}>~Azazal</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};