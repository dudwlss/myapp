import React, { useState, useEffect } from 'react';
import vectorImg from './assets/Vector.png';      // 이전 버튼 이미지
import vector1Img from './assets/Vector1.png';    // 다음 버튼 이미지
import stopImg from './assets/stop.png';          // 정지 버튼 이미지
import moveImg from './assets/move.png';          // 재생 버튼 이미지
import './App.css';

/**
 * NewsSlider 컴포넌트 - 뉴스 아이템을 무한 슬라이드로 표시하는 컴포넌트
 * 자동 슬라이드 기능과 수동 제어 기능을 제공합니다.
 */
const NewsSlider = () => {
  // 슬라이더 상태 관리
  const [isPaused, setIsPaused] = useState(false);     // 슬라이더 일시정지 상태
  const [currentIndex, setCurrentIndex] = useState(8);  // 현재 표시 중인 슬라이드 인덱스

  // 뉴스 데이터 배열
  const newsItems = [
    {
      id: 1,
      title: "SW사업 설명회 1",
      description: "SW사업 설명회",
      date: "2024-11-14"
    },
    {
        id: 2,
        title: "SW사업 설명회 2",
        description: "SW사업 설명회",
        date: "2024-11-14"
      },
      {
        id: 3,
        title: "SW사업 설명회 3",
        description: "SW사업 설명회",
        date: "2024-11-14"
      },  
      {
        id: 4,
        title: "SW사업 설명회 4",
        description: "SW사업 설명회",
        date: "2024-11-14"
      },
      {
        id: 5,
        title: "SW사업 설명회 5",
        description: "SW사업 설명회",
        date: "2024-11-14"
      },
      {
        id: 6,
        title: "SW사업 설명회 6",
        description: "SW사업 설명회",
        date: "2024-11-14"
      },
      {
        id: 7,
        title: "SW사업 설명회 7",
        description: "SW사업 설명회",
        date: "2024-11-14"
      },
      {
        id: 8,
        title: "SW사업 설명회 8",
        description: "SW사업 설명회",
        date: "2024-11-14"
      },

  ];

  // 무한 슬라이드를 위해 원본 배열을 3번 복제
  const totalItems = [...newsItems, ...newsItems, ...newsItems];

  /**
   * 이전 슬라이드로 이동하는 함수
   * 첫 번째 세트의 끝에 도달하면 마지막 세트의 동일한 위치로 순간 이동
   */
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    // 첫 번째 세트의 끝에서 마지막 세트로 순간 이동
    if (currentIndex === 8) {
      setTimeout(() => setCurrentIndex(23), 500);
    }
  };

  /**
   * 다음 슬라이드로 이동하는 함수
   * 두 번째 세트의 끝에 도달하면 첫 번째 세트의 동일한 위치로 순간 이동
   */
  const goToNext = () => {
    if (currentIndex < totalItems.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
    // 두 번째 세트의 끝에서 첫 번째 세트로 순간 이동
    if (currentIndex === 15) {
      setTimeout(() => setCurrentIndex(8), 500);
    }
  };

  // 슬라이더 일시정지/재생 토글 함수
  const togglePause = () => setIsPaused(!isPaused);

  /**
   * 자동 슬라이드 효과를 위한 useEffect
   * isPaused가 false일 때 3초마다 다음 슬라이드로 이동
   */
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(goToNext, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, currentIndex]);

  return (
    <section className="slider-outer">
      {/* 컨트롤 버튼 영역 */}
      <nav className="controls">
        <button className="control-button" onClick={goToPrevious}>
          <img src={vectorImg} alt="Previous" />
        </button>
        <button className="control-button" onClick={togglePause}>
          <img src={isPaused ? moveImg : stopImg} alt={isPaused ? "Play" : "Pause"} />
        </button>
        <button className="control-button" onClick={goToNext}>
          <img src={vector1Img} alt="Next" />
        </button>
      </nav>

      {/* 슬라이더 트랙 영역 */}
      <main
        className="slider-track"
        style={{
          transform: `translateX(calc(-${currentIndex * (100 / 12)}%))`,  // 슬라이드 위치 계산
          transition: 'transform 0.5s ease'  // 슬라이드 전환 애니메이션
        }}
      >
        {/* 뉴스 카드 렌더링 */}
        {totalItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="news-card">
            <article>
              <figure className="news-image" />
              <h3 className="news-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
              <time className="news-date">{item.date}</time>
            </article>
          </div>
        ))}
      </main>
    </section>
  );
};

export default NewsSlider;