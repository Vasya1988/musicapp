import styles from './Buttons.module.sass'

const pauseIcon = <svg width="21" height="36" viewBox="0 0 21 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons-Pattern-One" transform="translate(-716.000000, -93.000000)" fill="var(--ButtonsColor)"><path d="M10.75 0a3.75 3.75 0 0 1 3.75 3.75v28.5a3.75 3.75 0 0 1-7.5 0V3.75A3.75 3.75 0 0 1 10.75 0zM24.18 0a3.75 3.75 0 0 1 3.749 3.75l-.001 28.5a3.75 3.75 0 0 1-7.501 0l-.001-28.5A3.75 3.75 0 0 1 24.178 0z" id="Pause" transform="translate(709.000000, 93.000000)" />
        </g>
    </g>
</svg>

const playIcon = <svg width="32" height="36" viewBox="0 0 32 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Icons-Pattern-One" transform="translate(-560.000000, -93.000000)" fill="var(--ButtonsColor)"><path d="M32.388 19.944 5.384 35.694A2.25 2.25 0 0 1 2 33.748V2.25A2.25 2.25 0 0 1 5.384.306l27.004 15.75a2.25 2.25 0 0 1 0 3.888z" id="Play" transform="translate(558.000000, 93.000000)" />
        </g>
    </g>
</svg>

interface PlayButtonProps {func: () => void, play: boolean}

const PlayButton: React.FC<PlayButtonProps> = ({func, play}) => {
    return (
        <button onClick={func} className={styles.PlayButton}>
            {
                play 
                    ? playIcon
                    : pauseIcon
            }
        </button>
    )
}
export default PlayButton