import { AiOutlineSearch } from 'react-icons/ai'
import styles from '../styles/SearchBar.module.css'

type Props = {
    onChange?: (...args: any) => void
    type: 'dropdown' | 'regular'
    value: string
}

export default function SearchBar({ onChange, type, value }: Props) {
    return (
        <div className={styles.searchBar} style={{
            borderRadius: type === 'dropdown' ? '0' : '5px'
        }}>
            <AiOutlineSearch />
            <input onChange={(event) => onChange(event.target.value)} placeholder='Search Items' value={value} />
        </div>
    )
}