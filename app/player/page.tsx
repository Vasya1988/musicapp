'use client'
import styles from './Player.module.sass'
import PlayButton from '../../components/buttons/PlayButton'
import PreviousButon from '@/components/buttons/PreviousButton'
import NextButon from '@/components/buttons/NextButton'
import PlayLIst from '../Play-list'
import Audio from '@/components/audio/Audio'
import { useRef, useEffect, useState } from 'react'
import React from 'react'
import { start } from 'repl'

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
        [currentSeconds, setCurrentSeconds] = useState(0);
        
    useEffect(() => {
        const randomTrack = Math.floor(Math.random() * PlayLIst().length)
        const playTrack = PlayLIst()[randomTrack]
        setCurrentTrack(playTrack)

        // Function for time line/ progrees
        const handleTimeUpdate = () => {
            audioRef.current?.currentTime && (setCurrentTime(audioRef.current.currentTime), setDuration(audioRef.current?.duration))
        }
        audioRef.current?.addEventListener('timeupdate', handleTimeUpdate)

        audioRef.current?.addEventListener('loadedmetadata', (event: Event) => {
            const audioEvent = event.target as HTMLAudioElement
            // console.log(audioEvent.duration)
            getFullTimeSong(audioEvent.duration)
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

    const getCurrentSeconds = () => {

        const startTime = setTimeout(() => {
            let seconds
            audioRef.current?.paused === false 
                ? (seconds = currentSeconds + 1,
                setCurrentSeconds(seconds), 
                console.log(currentSeconds))
                : false
        }, 1000)
    }
    getCurrentSeconds()
    
    interface ProgressLineEvent {
        target: {value: string}

    }
    // Calculate new time
    const handleProgressLine = (event: ProgressLineEvent) => {
        
        console.log('input time ', Number(event.target.value))
        console.log('audio time ', audioRef.current?.duration)
        
        audioRef.current && (
            setCurrentTime(Number(event.target.value)),
            audioRef.current.currentTime = Number(event.target.value),
            setDuration(audioRef.current?.duration)
        )

    }
    
    // Start play or pause, and change the icons
    const playSong = () => {
        audioRef.current && audioRef.current.paused 
            ? (audioRef.current.play(), setPlayPauseIcons(false)) 
            : audioRef.current 
            ? (audioRef.current.pause(), setPlayPauseIcons(true), getCurrentSeconds()) 
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
                    <span className={styles.TimeStart}>{`0:0${currentSeconds}`}</span>
                    <span className={styles.TimeStop}>{`${fullTime.min}:${fullTime.seconds}`}</span>
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