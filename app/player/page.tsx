import styles from './Player.module.sass'
import PlayButton from '../../components/buttons/PlayButton'
import PreviousButon from '@/components/buttons/PreviousButton'
import NextButon from '@/components/buttons/NextButton'

const Player = () => {
    return (
        <div className={styles.Player}>
            hh
            <PreviousButon />
            <PlayButton />
            <NextButon />
        </div>
    )
}
export default Player