'use client'
import styles from './Player.module.sass'
import PlayButton from '../../components/buttons/PlayButton'
import PreviousButon from '@/components/buttons/PreviousButton'
import NextButon from '@/components/buttons/NextButton'
import PlayLIst from '../Play-list'
import Audio from '@/components/audio/Audio'
import { useRef, useEffect, useState } from 'react'

const Player = () => {

    interface Track {
        path: string,
        art: string
    }

    const 
        [currentTrack, setCurrentTrack] = useState<Track | null>(null),
        [playPauseIcons, setPlayPauseIcons] = useState(true),
        [currentTime, setCurrentTime] = useState<number | null>(null),
        [duration, setDuration] = useState(0);
        
    useEffect(() => {
        const randomTrack = Math.floor(Math.random() * PlayLIst().length)
        const playTrack = PlayLIst()[randomTrack]
        setCurrentTrack(playTrack)

        // Function for time line/ progrees
        const handleTimeUpdate = () => {
            audioRef.current?.currentTime && setCurrentTime(audioRef.current.currentTime)
        }
        audioRef.current?.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    interface ProgressLineEvent {
        target: {value: string}

    }
    const handleProgressLine = (event: ProgressLineEvent) => {

        // Get value of line
        const value = event.target.value
        // Calculate new time
        const newTime = (Number(value) / 100) * duration

        // Set new time into audioRef
        audioRef.current?.currentTime = newTime
    }

    const audioRef = useRef<HTMLAudioElement | null>(null)
    
    // Start play or pause, and change the icons
    const playSong = () => {
        audioRef.current && audioRef.current.paused 
            ? (audioRef.current.play(), setPlayPauseIcons(false)) 
            : audioRef.current 
            ? (audioRef.current.pause(), setPlayPauseIcons(true)) 
            : null
    }

    const track = {path: currentTrack?.path}
    console.log(currentTime)
    return (
        <div className={styles.Player}>
            <div className={styles['album-art']}>
                <img src={currentTrack?.art} alt="" />
            </div>
            <Audio  track={currentTrack?.path} audioRef={audioRef}/>
            <div className={styles.songLine}>
                <input min='0' value='0' id={styles.Progress} type="range"/>
            </div>
            <nav className={styles['player-nav']}>
                <PreviousButon />
                <PlayButton func={()=>playSong()} play={playPauseIcons}/>
                <NextButon />
            </nav>
            
        </div>
    )
}
export default Player