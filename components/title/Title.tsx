import styles from './Title.module.sass'
import React from 'react'

interface TitleProps { artist: String, name: String }

const Title: React.FC<TitleProps> = ({ artist, name }) => {

    return (
        <div className={styles.Title}>
            <h2 className={styles.Artist}>{artist}</h2>
            <h4 className={styles.NameSong}>{name}</h4>
        </div>
    )

}

export default Title