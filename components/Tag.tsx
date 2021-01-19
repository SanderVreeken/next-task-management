import styles from '../styles/Tag.module.css'

type Props = {
    title: string
}

export default function Tag({ title }: Props) {
    return (
        <div className={styles.tag}>
            <h6>{title}</h6>
        </div>
    )
}