import styles from '../styles/Header.module.css'

type Props = {
    backgroundColor: string
    borderColor?: string
    children: JSX.Element
    justifyContent: 'center' | 'space-between'
    padding?: string
}

export default function({ backgroundColor, borderColor, children, justifyContent, padding }: Props) {
    return (
        <header className={styles.header} style={{
            backgroundColor: backgroundColor,
            borderColor: borderColor ? borderColor : backgroundColor,
            justifyContent: justifyContent,
            padding: padding
        }}>
            {children}
        </header>
    )
}