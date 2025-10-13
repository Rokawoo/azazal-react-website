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
          <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
              <img src={getAssetUrl("about/c.webp")} alt="c-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Hiya!</h3>
                <p>Lorem Ipsum<br />Lorem Ipsum</p>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img src={getAssetUrl("about/m.webp")} alt="m-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Lorem Ipsum</h3>
                <p>Lorem Ipsum<br />Lorem Ipsum</p>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img src={getAssetUrl("about/y.webp")} alt="y-icon" draggable="false"/>
              <div className={styles.aboutItemText}>
                <h3>Lorem Ipsum</h3>
                <p>Lorem Ipsum<br />Lorem Ipsum</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};