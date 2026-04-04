import { useRef, useCallback } from 'react'
import Carousel3D from '../components/Carousel3D'
import { Link } from 'react-router-dom'
import { usePriorityPreloader } from '../hooks/useImagePreloader'

// 首页优先加载的图片
const priorityImages = [
  'images/image1.jpg',
  'images/image2.jpg',
  'images/image3.jpg',
  'images/image4.jpg',
  'images/image5.jpg',
  'images/home/logo.jpg'
]

function HomeView() {
  const entranceRef = useRef<HTMLDivElement>(null)

  // 优先预加载首页关键图片
  usePriorityPreloader(priorityImages)

  const scrollToContent = useCallback(() => {
    const target = entranceRef.current
    if (!target) return

    const startPosition = window.scrollY
    const targetPosition = target.getBoundingClientRect().top + startPosition - 80
    const distance = targetPosition - startPosition
    const duration = 600
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeInOutQuad = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

      window.scrollTo(0, startPosition + distance * easeInOutQuad)

      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }, [])

  return (
    <div className="home-view">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">NY 2026.14班</h1>
            <p className="hero-subtitle">宣传网站</p>
            <button className="scroll-hint" type="button" onClick={scrollToContent} aria-label="下滑探索更多">
              <span className="scroll-text">下滑探索更多</span>
              <span className="scroll-arrow" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
            </button>
          </div>
          <div className="carousel-wrapper">
            <Carousel3D />
          </div>
        </div>
      </section>

      <section className="entrance-section" ref={entranceRef}>
        <div className="entrance-container">
          <h2 className="section-title">探索更多内容</h2>
          <div className="entrance-cards">
            <Link to="/video" className="entrance-card video-card">
              <div className="card-icon-wrapper">
                <span className="card-icon" aria-hidden>
                  <img src="/images/home/nav1.jpg" alt="" className="card-icon-img" />
                </span>
              </div>
              <h3 className="card-title">视频专区</h3>
              <p className="card-desc">上面这张图片是夏嘉兴参观南开拍的</p>
              <span className="card-link">
                <span>进入视频</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 博客已移除 */}
          </div>

          <div className="github-link">
            <a href="https://github.com/mukunjin/ny202614_new" target="_blank" rel="noopener noreferrer">
              <img src="/images/home/home1.png" alt="GitHub" className="github-icon" loading="lazy" />
              <span className="github-text">本网站开源至Github，欢迎贡献代码</span>
              <svg className="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeView
