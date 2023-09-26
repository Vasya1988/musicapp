interface AudioProps {
    track?: string,
    audioRef: React.RefObject<HTMLAudioElement>
} 

const Audio: React.FC<AudioProps> = ({track, audioRef}) => {
    return (
        <audio src={track} id='audio' ref={audioRef} />
    )
}
export default Audio