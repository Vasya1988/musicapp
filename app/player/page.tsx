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
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
    const [playPauseIcons, setPlayPauseIcons] = useState(true)
    
    useEffect(() => {
        const randomTrack = Math.floor(Math.random() * PlayLIst().length)
        const playTrack = PlayLIst()[randomTrack]
        setCurrentTrack(playTrack)
        console.log(playTrack.artist)

    }, [])

    const audioRef = useRef<HTMLAudioElement | null>(null)
    
    const playSong = () => {
        audioRef.current && audioRef.current.paused 
            ? (audioRef.current.play(), setPlayPauseIcons(false)) 
            : audioRef.current 
            ? (audioRef.current.pause(), setPlayPauseIcons(true)) 
            : null
    } 
    const track = {path: currentTrack?.path}
    return (
        <div className={styles.Player}>
            <div className={styles['album-art']}>
                <img src={currentTrack?.art} alt="" />
            </div>
            <Audio track={currentTrack?.path} audioRef={audioRef}/>
            <div className={styles.songLine}>
                <input id={styles.Progress} type="range"/>
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