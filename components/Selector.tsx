import { useState } from 'react'

import Dropdown from './Dropdown'
import Selected from './Selected'
import styles from '../styles/Selector.module.css'

type Props = {
    current?: any[]
    onSelect?: (...args: any) => void
    options: any[]
    optionType: 'tag' | 'user' 
}

export default function Selector({ current, onSelect, options, optionType }: Props) {
    return (
        <div className={styles.selector}>
            <div role='selected'>
                {current && current.map((option, index) => (
                    <Selected key={index} option={option} type={optionType} />
                ))}
            </div>
            <Dropdown onSelect={onSelect} options={options} optionType={optionType} type='search' />
        </div>
    )
}