import { useRef, useEffect, useState, useMemo, useId } from 'react';
import styles from './ScrollingText.module.css';

interface ScrollingTextProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
  color?: 'primary' | 'secondary';
}

const ScrollingText = ({
  marqueeText = 'Placeholder',
  speed = 2,
  className = '',
  direction = 'left',
  color = 'primary',
}: ScrollingTextProps) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = "M-100,-21.5 Q160,-4 370,-5 Q540,-5 720,-15.5 Q900,-25.1 1030,-25 Q1230,-30 1540,-7.5";
  const dirRef = useRef<'left' | 'right'>(direction);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  const repetitions = spacing > 0 ? Math.ceil(2000 / spacing) + 3 : 1;
  const totalText = useMemo(() => Array(repetitions).fill(text).join(''), [repetitions, text]);
  const ready = spacing > 0;

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        const length = measureRef.current.getComputedTextLength();
        setSpacing(length);
      }
    };
    measure();
    const timer = setTimeout(measure, 50);
    if (document.fonts) {
      document.fonts.ready.then(measure);
    }
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      textPathRef.current.setAttribute('startOffset', '0px');
      offsetRef.current = 0;
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;

    const step = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Clamp delta to prevent speed burst after tab unfocus (max ~2 frames)
      const clampedDelta = Math.min(deltaTime, 32);

      if (textPathRef.current) {
        const delta = dirRef.current === 'right' 
          ? speed * (clampedDelta / 16) 
          : -speed * (clampedDelta / 16);
        
        let newOffset = offsetRef.current + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset >= wrapPoint) newOffset -= wrapPoint;

        offsetRef.current = newOffset;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      lastTimeRef.current = 0;
    };
  }, [spacing, speed, ready]);

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ visibility: ready ? 'visible' : 'hidden' }}
      onMouseDown={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <svg
        className={styles.svg}
        viewBox="0 -80 1440 120"
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible', pointerEvents: 'none' }}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={`${styles.text} ${styles[color]}`}
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>

        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" />
        </defs>

        {ready && (
          <text xmlSpace="preserve" className={`${styles.text} ${styles[color]}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset="0px"
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default ScrollingText;