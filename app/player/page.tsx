'use client'
import styles from './Player.module.sass'
import PlayButton from '../../components/buttons/PlayButton'
import PreviousButon from '@/components/buttons/PreviousButton'
import NextButon from '@/components/buttons/NextButton'
import PlayLIst from '../Play-list'
import Audio from '@/components/audio/Audio'
import Title from '@/components/title/Title'
import { useRef, useEffect, useState } from 'react'
import React from 'react'

const Player = () => {

    interface Track {
        path: string,
        art: string
    }

    const 
        [currentTrack, setCurrentTrack] = useState<Track | null>(null),
        [playPauseIcons, setPlayPauseIcons] = useState(true),
        [currentTime, setCurrentTime] = useState<number | null>(null),
        [duration, setDuration] = useState(0),
        [fullTime, setFullTime] = useState({min: '', seconds: ''}),
        audioRef = useRef<HTMLAudioElement | null>(null),
        [sec,setSec] = useState({min: '0', seconds: '00'});
        
    useEffect(() => {
        const randomTrack = Math.floor(Math.random() * PlayLIst().length)
        const playTrack = PlayLIst()[randomTrack]
        setCurrentTrack(playTrack)
        console.log(currentTrack)
        // Function for time line/ progrees
        const handleTimeUpdate = () => {
            audioRef.current?.currentTime && (setCurrentTime(audioRef.current.currentTime), setDuration(audioRef.current?.duration), currentSeconds(audioRef.current.currentTime))
        }
        audioRef.current?.addEventListener('timeupdate', handleTimeUpdate)

        audioRef.current?.addEventListener('loadedmetadata', (event: Event) => {
            const audioEvent = event.target as HTMLAudioElement

            setDuration(audioEvent.duration)
            getFullTimeSong(audioEvent.duration)
            setCurrentTime(audioEvent.currentTime)
        })
        
        return () => {
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    // Find out minutes and seconds of song
    const getFullTimeSong = (time: number) => {

        let minutes: string, seconds: string;

        minutes = String(Math.floor((time / 60) % 60))
        seconds = String(Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60))
        setFullTime({min: minutes, seconds: seconds})

        // console.log('minutes: ', minutes, 'seconds: ', seconds)
    }

    // Current seconds
    const currentSeconds = (time: number) => {
        let minutes = ''
        let seconds = ''

        minutes = String(Math.floor((time / 60) % 60) < 1 ? `${Math.floor((time / 60) % 60)}` : Math.floor((time / 60) % 60))
        seconds = String(Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60))
        setSec({min: minutes, seconds: seconds})
    }
    
    interface ProgressLineEvent {
        target: {value: string}

    }
    // Calculate new time
    const handleProgressLine = (event: ProgressLineEvent) => {
        
        // console.log('input time ', Number(event.target.value))
        // console.log('audio time ', audioRef.current?.duration)
        
        audioRef.current && (
            setCurrentTime(Number(event.target.value)),
            audioRef.current.currentTime = Number(event.target.value),
            setDuration(audioRef.current?.duration)
        )
    }

    const progressLineCurrentColor = () => {
        return currentTime && (currentTime / duration) * 100
    }

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
            <Title artist={currentTrack?.artist} name={currentTrack?.song}/>
            <Audio  track={currentTrack?.path} audioRef={audioRef}/>
            <div className={styles.songLine}>
                <div className={styles.Time}>
                    <span className={styles.TimeStart}>{`${sec.min}:${sec.seconds}`}</span>
                    <span className={styles.TimeStop}>{`${fullTime.min}:${fullTime.seconds}`}</span>
                </div>
                <input style={{background: `linear-gradient(to right, #a7a7a7 ${progressLineCurrentColor()}%, #e6e6e6 ${progressLineCurrentColor()}%)`}} name='my input' min={0} value={String(currentTime)} max={duration} onChange={(event) => {handleProgressLine(event), console.log(event)}} id={styles.Progress} type="range"/>
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