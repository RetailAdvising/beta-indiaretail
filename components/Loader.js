import styles from '@/styles/Header.module.scss';
export default function Loader() {

    return (
        <div className={`${styles.body}`}>
            <div class={`${styles.eloadholder}`}>
                <div class={`${styles.mloader}`}>
                    <span class={`${styles.etext}`}>Loading</span>
                </div>
            </div>
            <div id={`${styles.particleCanvasBlue}`}></div>
            <div id={`${styles.particleCanvasWhite}`}></div>
        </div>
    )
}