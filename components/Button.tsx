type Props = {
    backgroundColor: string
    borderColor?: string
    children: JSX.Element
    color?: string
    onClick?: (...args: any) => void
}

  /* Arbitrary high number used for the borderRadius to ensure the borders of the buttons are rounded. */
export default function Button({ backgroundColor, borderColor, children, color, onClick }: Props) {
    return (
        <button onClick={onClick} style={{
            backgroundColor: backgroundColor,
            borderColor: borderColor ? borderColor : backgroundColor,
            color: color
        }}>
            {children}
        </button>
    )
}