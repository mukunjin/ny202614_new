import { useEffect, useRef } from 'react'

export function useImagePreloader(imageUrls: string[]) {
  const preloadedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    // 使用 requestIdleCallback 在浏览器空闲时预加载
    const preloadImages = () => {
      imageUrls.forEach(url => {
        if (preloadedRef.current.has(url)) return

        const img = new Image()
        img.src = url
        // 尝试调用 decode() 以提前解码图像，减少首次绘制延迟
        if ('decode' in img && typeof img.decode === 'function') {
          img.decode().catch(() => {})
        }
        preloadedRef.current.add(url)
      })
    }

    // 如果浏览器支持 requestIdleCallback，使用它
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(preloadImages, { timeout: 2000 })
      return () => cancelIdleCallback(id)
    } else {
      // 降级方案：使用 setTimeout
      const timer = setTimeout(preloadImages, 100)
      return () => clearTimeout(timer)
    }
  }, [imageUrls])
}

export function usePriorityPreloader(imageUrls: string[]) {
  useEffect(() => {
    imageUrls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })

    return () => {
      // 清理预加载标签
      const links = document.querySelectorAll('link[rel="preload"][as="image"]')
      links.forEach(link => link.remove())
    }
  }, [imageUrls])
}
