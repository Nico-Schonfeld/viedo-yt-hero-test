"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Menu, Star, User, Calendar, Users, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
            onStateChange?: (event: { data: number }) => void
          }
        }
      ) => YTPlayer
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  setVolume: (volume: number) => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
}

export default function YouTubeHero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const playerRef = useRef<YTPlayer | null>(null)

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: "5RpzdVLdv2k",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playlist: "5RpzdVLdv2k",
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo()
            setIsPlayerReady(true)
          },
          onStateChange: (event) => {
            // Loop the video when it ends
            if (event.data === 0) {
              playerRef.current?.seekTo(0, true)
              playerRef.current?.playVideo()
            }
          },
        },
      })
    }

    return () => {
      window.onYouTubeIframeAPIReady = () => { }
    }
  }, [])

  const toggleMute = () => {
    if (playerRef.current && isPlayerReady) {
      if (isMuted) {
        playerRef.current.unMute()
        playerRef.current.setVolume(100)
      } else {
        playerRef.current.mute()
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "300%",
            height: "300%",
            minWidth: "100vw",
            minHeight: "100vh",
          }}
        >
          <div
            id="youtube-player"
            className="w-full h-full"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40 pointer-events-none" />

      {/* Navigation */}
      {/* <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </div>
            <span className="font-medium hidden sm:inline">Menú</span>
          </button>
          <span className="text-white/60 hidden sm:inline">|</span>
          <a href="#" className="text-white hover:text-white/80 transition-colors hidden sm:inline">
            Agencias
          </a>
        </div>

     
        <div className="absolute left-1/2 -translate-x-1/2 text-center text-white">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 lg:w-20 lg:h-20 mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
                <text x="50" y="45" textAnchor="middle" fontSize="24" fontFamily="serif" fontWeight="bold">
                  H
                </text>
                <text x="50" y="65" textAnchor="middle" fontSize="12" fontFamily="serif">
                  E
                </text>
              </svg>
            </div>
            <div className="font-serif tracking-widest hidden lg:block">
              <div className="text-xs tracking-[0.3em]">HOTEL</div>
              <div className="text-2xl font-light tracking-[0.2em]">EMPERADOR</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className="text-xs tracking-[0.3em]">MADRID</span>
              </div>
              <div className="flex justify-center gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-2 h-2 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors hidden sm:flex">
            <Star className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors hidden sm:flex">
            <span className="text-xs font-bold">360°</span>
          </button>
          <button className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Acceder</span>
          </button>
        </div>
      </nav> */}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center text-white px-4">
        <p className="text-sm lg:text-base tracking-[0.3em] text-amber-200 mb-4">
          HOTEL EMPERADOR MADRID
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-light tracking-wide text-balance">
          Tu hotel en el corazón de la Gran Vía
        </h1>
      </div>

      {/* Audio Control Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-36 lg:bottom-40 right-6 lg:right-12 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>


      {/*   <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
     
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-200">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Cuándo</p>
                <p className="text-sm font-medium text-gray-700">Entrada — Salida</p>
              </div>
            </div>


            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-200">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Quién</p>
                <p className="text-sm font-medium text-gray-700">2 adultos · 1 habitación</p>
              </div>
            </div>


            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-200">
              <Tag className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Promoción</p>
                <p className="text-sm font-medium text-gray-400">Código</p>
              </div>
            </div>


            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base font-medium">
              Buscar
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
