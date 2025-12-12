import styles from "./About.module.css";

import { getAssetUrl } from "../../utils";
import { useBounceClickAnimation } from "./scripts/bounce-click-animation";
import ScrollingText from "../ScrollingText/ScrollingText";


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
      <ScrollingText 
        marqueeText="Azazal Meow ฅ^>⩊<^ฅ"
        color="secondary"
      />
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
              meow! welcome to my website~
              <br /> <br />
              im <span className={`${styles.accent} ${styles.bigger}`}>Azazal</span>, also known as '<span className={styles.underline}>azazal meow</span>'.
              im a <span className={styles.accent}>demon cat</span>, music producer, youtuber and streamer.
              i enjoy going on <span className={styles.accent}>adventures</span>, playing <span className={styles.accent}>games</span>, listening to energetic <span className={styles.accent}>music</span>, and <span className={styles.underline}>making people smile</span>. 
              <br /> <br />
              here you'll find my <span className={styles.underline}>shop</span>, <span className={styles.underline}>latest releases</span>, <span className={styles.underline}>contact info</span>, and <span className={styles.underline}>ameowzing fanart</span> from all kinds of <span className={styles.accent}>talented artists</span>.
              hope you enjoy your stay!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};