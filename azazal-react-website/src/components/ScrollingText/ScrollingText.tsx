import { useRef, useEffect, useState, useMemo, useId } from 'react';
import styles from './ScrollingText.module.css';

interface ScrollingTextProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  color?: 'primary' | 'secondary';
}

const ScrollingText = ({
  marqueeText = 'Placeholder',
  speed = 2,
  className = '',
  direction = 'left',
  color = 'primary',
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = "M-100,-21.5 Q160,-4 370,-5 Q540,-5 720,-15.5 Q900,-25.1 1030,-25 Q1230,-30 1540,-7.5";
  const dirRef = useRef<'left' | 'right'>(direction);
  const animationRef = useRef<number>(0);

  const repetitions = spacing > 0 ? Math.ceil(2000 / spacing) + 3 : 1;
  const totalText = Array(repetitions).fill(text).join('');
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
    return () => clearTimeout(timer);
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      textPathRef.current.setAttribute('startOffset', '0px');
      setOffset(0);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;

    const step = () => {
      if (textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (dirRef.current === 'left') {
          if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        } else {
          if (newOffset >= wrapPoint) newOffset -= wrapPoint;
        }

        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [spacing, speed, ready]);

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ visibility: ready ? 'visible' : 'hidden' }}
    >
      <svg
        className={styles.svg}
        viewBox="0 -80 1440 120"
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible' }}
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
              startOffset={offset + 'px'}
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