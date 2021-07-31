import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import api from '../../services/axios';
import styles from './styles.module.scss';

const delay = 2500;

export function SlideShow() {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const timeoutRef = useRef(null);
  const fetchData = async () => {
    await api
      .get('images')
      .then((res) => {
        setImages(res.data);
      })
      .catch(() => {
        console.log('error');
      })
      .finally(() => {
        console.log('load ended');
      });
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    fetchData();
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, images.length]);

  return (
    <div className={styles.slideshow}>
      <div
        className={styles.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((item, index) => (
          <div className={styles.slide} key={index}>
            <Image
              src={item.image}
              alt={`Image ${index}`}
              width="500"
              height="500"
            />
          </div>
        ))}
      </div>

      <div className={styles.slideshowDots}>
        {images.map((_, idx) => (
          <div
            key={idx}
            className={
              index === idx
                ? styles.slideshowDot + ' ' + styles.active
                : styles.slideshowDot
            }
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
