import { useState } from 'react'

import Dropdown from './Dropdown'
import Selected from './Selected'
import styles from '../styles/Selector.module.css'

type Props = {
    onSelect?: (...args: any) => void
    options: any[]
    optionType: 'list' | 'tag' | 'user' 
}

export default function Selector({ onSelect, options, optionType }: Props) {
    const [selected, setSelected] = useState([])

    return (
        <div className={styles.selector}>
            <div role='selected'>
                {selected && selected.map((option, index) => (
                    <Selected key={index} option={option.option} type={option.type} />
                ))}
            </div>
            <Dropdown onSelect={(option) => {
                onSelect(option)
                setSelected(selected => [...selected, {
                    option: option,
                    type: optionType
                }])
            }} options={options} optionType={optionType} type='search' />
        </div>
    )
}