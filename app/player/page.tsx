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
            audioRef.current?.currentTime && (setCurrentTime(audioRef.current.currentTime), setDuration(audioRef.current?.duration))
        }
        audioRef.current?.addEventListener('timeupdate', handleTimeUpdate)

        

        return () => {
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    interface ProgressLineEvent {
        target: {value: string}

    }

    // Calculate new time
    const [newTime, setNewTime] = useState(0)

    const handleProgressLine = (event: ProgressLineEvent) => {
        
        console.log('input time ', Number(event.target.value))
        console.log('audio time ', audioRef.current?.currentTime)
        
        audioRef.current && (
            setCurrentTime(Number(event.target.value)),
            audioRef.current.currentTime = Number(event.target.value),
            setDuration(audioRef.current?.duration)
        )

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
    // console.log(typeof(String(audioRef.current?.duration)))
    return (
        <div className={styles.Player}>
            <div className={styles['album-art']}>
                <img src={currentTrack?.art} alt="" />
            </div>
            <Audio  track={currentTrack?.path} audioRef={audioRef}/>
            <div className={styles.songLine}>
                <div className={styles.Time}>
                    <span className={styles.TimeStart}>{'0'}</span>
                    <span className={styles.TimeStop}>{`${2}:${55}`}</span>
                </div>
                <input name='my input' min='0' max={duration} value={String(currentTime)} onChange={(event) => handleProgressLine(event)} id={styles.Progress} type="range"/>
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