import styles from './Buttons.module.sass'

const PreviousButon = () => {
    return (
        <button className={styles.Previous}>
            <svg width="37" height="22" viewBox="0 0 37 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Icons-Pattern-One" transform="translate(-709.000000, -286.000000)" fill="var(--ButtonsColor)"><path d="m31.535 15.004-13.71-7.822a1.39 1.39 0 0 0-.69-.182c-.755 0-1.368.599-1.368 1.338v6.666L2.057 7.182A1.39 1.39 0 0 0 1.367 7C.613 7 0 7.6 0 8.338V27.06c0 .238.064.47.186.675.38.638 1.218.854 1.87.481l13.712-7.821v6.666c0 .238.064.47.186.675.38.638 1.218.854 1.87.481l13.71-7.821v5.751a2.253 2.253 0 0 0 4.506 0V9.253a2.253 2.253 0 1 0-4.505 0v5.75z" transform="translate(709.000000, 279.000000) translate(18.020000, 17.699375) scale(-1, 1) translate(-18.020000, -17.699375) " id="Previous" />
                    </g>
                </g>
            </svg>
        </button>
    )
}
export default PreviousButon