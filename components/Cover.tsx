import styles from '../styles/Cover.module.css'

type Props = {
    children: JSX.Element
}

export default function Cover({ children }: Props) {
    return (
        <div className={styles.cover}>
            {children}
        </div>
    )
}