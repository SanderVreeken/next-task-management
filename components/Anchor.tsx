import Link from 'next/link'

type Props = {
    children: JSX.Element
    href: string
}

// Component translating the children into a clickable link.
export default function Anchor({ children, href }: Props) {
    return (
        <Link href={href}>
            <a>
                {children}
            </a>
        </Link>
    )
}