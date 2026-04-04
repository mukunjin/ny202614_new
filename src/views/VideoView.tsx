import { useState } from 'react'
import AnnouncementBar from '../components/AnnouncementBar'
import VideoPlayer from '../components/VideoPlayer'
import VideoList from '../components/VideoList'
import type { Video } from '../types'

function VideoView() {
  const [currentVideoSrc, setCurrentVideoSrc] = useState('videos/video1.mp4')
  const [currentVideoTitle, setCurrentVideoTitle] = useState('入站必刷')

  const handleVideoSelect = (video: Video) => {
    setCurrentVideoSrc(video.src)
    setCurrentVideoTitle(video.title)
  }

  return (
    <div className="video-view">
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-icon" aria-hidden>
            <img src="/images/home/nav1.jpg" alt="" className="title-icon-img" />
          </span>
          视频专区
        </h1>
        <p className="page-desc">记录超人视频</p>
      </div>

      <AnnouncementBar />

      <VideoPlayer currentSrc={currentVideoSrc} currentTitle={currentVideoTitle} />

      <VideoList onSelectVideo={handleVideoSelect} />
    </div>
  )
}

export default VideoView
