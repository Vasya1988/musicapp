'use client'
import styles from './Player.module.sass'
import PlayButton from '../../components/buttons/PlayButton'
import PreviousButon from '@/components/buttons/PreviousButton'
import NextButon from '@/components/buttons/NextButton'
import {List} from '../Play-list'
import Audio from '@/components/audio/Audio'
import Title from '@/components/title/Title'
import { useRef, useEffect, useState } from 'react'

const Player = () => {

    interface Track {
        path: string,
        art: string,
        artist: string,
        song: string
    }

    const 
        [currentTrack, setCurrentTrack] = useState<Track | null>(null),
        [playPauseIcons, setPlayPauseIcons] = useState(true),
        [currentTime, setCurrentTime] = useState<number | null>(null),
        [duration, setDuration] = useState(0),
        [fullTime, setFullTime] = useState({min: '0', seconds: '00'}),
        audioRef = useRef<HTMLAudioElement | null>(null),
        [startTime, setStartTime] = useState({min: '0', seconds: '00'});
        const [randomTrack, setRandomTrack] = useState(Math.floor(Math.random() * List.length))
        
    useEffect(() => {
        const playTrack = List[randomTrack]

        setCurrentTrack(playTrack)

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

    // Get minutes and seconds of song
    const getFullTimeSong = (time: number) => {

        let minutes: string, seconds: string;

        minutes = String(Math.floor((time / 60) % 60))
        seconds = String(Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60))
        setFullTime({min: minutes, seconds: seconds})
    }

    // Current seconds
    const currentSeconds = (time: number) => {
        let minutes = ''
        let seconds = ''

        minutes = String(Math.floor((time / 60) % 60) < 1 ? `${Math.floor((time / 60) % 60)}` : Math.floor((time / 60) % 60))
        seconds = String(Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60))
        setStartTime({min: minutes, seconds: seconds})
    }
    
    interface ProgressLineEvent {
        target: {value: string}

    }
    // Calculate new time
    const handleProgressLine = (event: ProgressLineEvent) => {

        audioRef.current && (
            setCurrentTime(Number(event.target.value)),
            audioRef.current.currentTime = Number(event.target.value),
            setDuration(audioRef.current?.duration)
        )
    }

    // Change color of progrees line
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

    // Previous track
    interface PlayPrevProps  { ( direction: string): void }
    
    const playPreviousTrack:PlayPrevProps = (direction) => {
        setPlayPauseIcons(true)
        setStartTime(({min: '0', seconds: '00'}))
        direction === 'previous' 
            ? (
                setRandomTrack(() => {
                    let newRandomTrack = randomTrack - 1
                    newRandomTrack < 0
                        ? (
                            setCurrentTrack(List[List.length - 1]), 
                            newRandomTrack = List.length - 1
                            )
                        : (setCurrentTrack(List[newRandomTrack]))
                    return newRandomTrack
                })
            )
            : setRandomTrack(() => {
                let newRandomTrack = randomTrack + 1
                newRandomTrack >= List.length
                    ? (
                        setCurrentTrack(List[0]), 
                        newRandomTrack = 0
                        )
                    : (setCurrentTrack(List[newRandomTrack]))
                return newRandomTrack
            })
    }

    return (
        <div className={styles.Player}>
            <div className={styles['album-art']}>
                <img src={currentTrack?.art} alt="" />
            </div>
            <Title artist={currentTrack?.artist} name={currentTrack?.song}/>
            <Audio  track={currentTrack?.path} audioRef={audioRef}/>
            <div className={styles.songLine}>
                <div className={styles.Time}>
                    <span className={styles.TimeStart}>{`${startTime.min}:${startTime.seconds}`}</span>
                    <span className={styles.TimeStop}>{`${fullTime.min}:${fullTime.seconds}`}</span>
                </div>
                <input style={{background: `linear-gradient(to right, #a7a7a7 ${progressLineCurrentColor()}%, #e6e6e6 ${progressLineCurrentColor()}%)`}} name='my input' min={0} value={String(currentTime)} max={duration} onChange={(event) => {handleProgressLine(event)}} id={styles.Progress} type="range"/>
            </div>
            <nav className={styles['player-nav']}>
                <PreviousButon func={(event) => {playPreviousTrack(event.currentTarget.dataset.direction)}} />
                <PlayButton func={()=>playSong()} play={playPauseIcons}/>
                <NextButon func={(event) => {playPreviousTrack(event.currentTarget.dataset.direction)}} />
            </nav>
            
        </div>
    )
}
export default Player