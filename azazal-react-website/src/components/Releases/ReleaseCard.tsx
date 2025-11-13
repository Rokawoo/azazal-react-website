import React from "react";
import styles from "./ReleaseCard.module.css";
import { getAssetUrl } from "../../utils";

interface Release {
  title: string;
  artist: string;
  coverArt: string;
  releaseDate: string;
  youtubeUrl?: string | null;
  spotifyUrl?: string | null;
  soundcloudUrl?: string | null;
  hypeeditUrl?: string | null;
  isNewRelease?: boolean;
}

interface ReleaseCardProps {
  release: Release;
  isActive: boolean;
  position: 'left' | 'center' | 'right' | 'far-left' | 'far-right';
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, isActive, position }) => {
  const {
    title,
    artist,
    coverArt,
    releaseDate,
    youtubeUrl,
    spotifyUrl,
    soundcloudUrl,
    hypeeditUrl,
    isNewRelease
  } = release;

  return (
    <div className={`${styles.card} ${styles[position]} ${isActive ? styles.active : ''}`}>
      {isNewRelease && <span className={styles.newBadge}>NEW</span>}
      
      <div className={styles.leftSection}>
        <img 
          src={getAssetUrl(coverArt)} 
          alt={`${title} cover art`}
          className={styles.coverArt}
          draggable="false"
        />
        <div className={styles.overlay}>
          <button className={styles.playButton}>▶</button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.info}>
          <h3 className={styles.songTitle}>{title}</h3>
          <p className={styles.artist}>{artist}</p>
          <p className={styles.releaseDate}>{releaseDate}</p>
        </div>

        <div className={styles.links}>
          {youtubeUrl && (
            <a 
              href={youtubeUrl} 
              className={`${styles.link} ${styles.youtube}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className={styles.linkText}>YouTube</span>
            </a>
          )}
          {spotifyUrl && (
            <a 
              href={spotifyUrl} 
              className={`${styles.link} ${styles.spotify}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className={styles.linkText}>Spotify</span>
            </a>
          )}
          {soundcloudUrl && (
            <a 
              href={soundcloudUrl} 
              className={`${styles.link} ${styles.soundcloud}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.01-.057-.05-.1-.1-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.055.045.094.09.094s.089-.045.104-.104l.165-1.308-.18-1.329c-.015-.06-.052-.104-.104-.104zm1.83-1.606c-.04 0-.08.04-.091.098l-.316 3.857.316 3.475c.012.058.05.098.091.098.048 0 .09-.04.099-.094v-.005l.36-3.479-.36-3.855c-.009-.059-.05-.095-.099-.095zm.923-.448c-.061 0-.105.045-.12.104l-.271 4.311.271 3.664c.015.06.06.104.12.104.06 0 .105-.045.119-.104l.301-3.664-.301-4.311c-.014-.061-.06-.104-.119-.104zm.944-.449c-.06 0-.12.06-.135.119l-.226 4.76.226 3.664c.016.06.075.119.135.119.061 0 .121-.06.136-.119l.256-3.664-.256-4.76c-.015-.06-.075-.119-.136-.119zm.988-.186c-.067 0-.134.061-.15.135l-.18 4.397.18 3.664c.016.074.083.135.15.135.074 0 .135-.061.15-.135l.211-3.664-.211-4.397c-.015-.074-.083-.135-.15-.135zm.943-.449c-.075 0-.15.075-.165.15l-.151 4.84.151 3.614c.015.074.09.149.165.149.074 0 .149-.075.165-.149l.18-3.614-.18-4.84c-.016-.075-.09-.15-.165-.15zm.991-.33c-.082 0-.164.082-.18.164l-.12 5.109.12 3.57c.016.083.098.165.18.165.09 0 .18-.082.195-.165v-.015l.135-3.555-.135-5.109c-.016-.083-.105-.164-.195-.164zm.976-.449c-.09 0-.18.09-.194.18l-.091 5.465.09 3.51c.015.09.105.18.195.18.09 0 .194-.09.21-.18l.105-3.51-.105-5.465c-.016-.09-.12-.18-.21-.18zm1.024-.27c-.098 0-.195.098-.21.21l-.06 5.114.06 3.439c.016.112.112.21.21.21.098 0 .195-.098.225-.209v-.003l.075-3.436-.075-5.116c-.015-.111-.127-.209-.225-.209zm1.039-.164c-.105 0-.209.105-.225.225l-.045 4.854.045 3.396c.016.12.12.225.225.225.113 0 .225-.105.24-.225v-.007l.06-3.389-.06-4.854c-.015-.12-.127-.225-.24-.225zM23.997 9.372c0-.82-.673-1.493-1.493-1.493h-9.355c-.225 0-.406.18-.406.404v8.899c0 .226.116.39.327.434.103.018.207.032.315.032H22.504c.82 0 1.493-.674 1.493-1.493V9.372z"/>
              </svg>
              <span className={styles.linkText}>SoundCloud</span>
            </a>
          )}
          {hypeeditUrl && (
            <a 
              href={hypeeditUrl} 
              className={`${styles.link} ${styles.hypeedit}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.34-2.88 8.36-7 9.68V12h-2v14.68c-4.12-1.32-7-5.34-7-9.68V8.18l8-4z"/>
                <path d="M8 10h8v2H8zm0 3h8v2H8z"/>
              </svg>
              <span className={styles.linkText}>HypeEdit</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};