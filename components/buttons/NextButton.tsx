import React, { MouseEvent } from 'react'
import styles from './Buttons.module.sass'

interface NextButtonProps {func: (event: MouseEvent) => void}
const NextButon: React.FC<NextButtonProps> = ({func}) => {
    return (
        <button onClick={func} data-direction='next' className={styles.Next}>
            <svg width="36" height="22" viewBox="0 0 36 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Icons-Pattern-One" transform="translate(-558.000000, -286.000000)" fill="var(--ButtonsColor)"><path d="M17.804 7.182A1.39 1.39 0 0 0 17.116 7c-.754 0-1.366.598-1.366 1.336v6.659L2.054 7.182A1.39 1.39 0 0 0 1.366 7C.612 7 0 7.598 0 8.336V27.04c0 .235.064.467.186.672.38.637 1.217.853 1.868.48L15.75 20.38v6.659c0 .235.064.467.186.672.38.637 1.217.853 1.868.48L31.5 20.38v5.745a2.25 2.25 0 1 0 4.5 0V9.25a2.25 2.25 0 1 0-4.5 0v5.745L17.804 7.182z" id="Next" transform="translate(558.000000, 279.000000)"/>
                    </g>
                </g>
            </svg>
        </button>
    )
}
export default NextButon