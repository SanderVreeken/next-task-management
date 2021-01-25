import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'

import ListT from '../types/List'

import Avatar from './Avatar'
import SearchBar from './SearchBar'
import styles from '../styles/Dropdown.module.css'

type Props = {
    onSelect?: (...args: any) => void
    type: 'regular' | 'search'
    options: any[]
    optionType: 'list' | 'tag' | 'user' 
    value?: any 
}

export default function Dropdown({ onSelect, type, options, optionType, value }: Props) {
    const [searchText, setSearchText] = useState(null)
    const [isShown, setIsShown] = useState(false)

    const filterOptions = options.filter(option => {
        const regExp = new RegExp(searchText, 'i')
        const filterValue = optionType === 'tag' ? option.title : option.firstName
        return regExp.test(filterValue)
    })

    const selectOption = option => {
        onSelect(option)
        setIsShown(false)
        setSearchText(null)
    }

    const updateTextValue = (value) => {
        value !== '' ? setSearchText(value) : setSearchText(null)
    }

    return (
        <div className={styles.dropdown}>
            {type === 'regular' ? (
                <div onClick={() => setIsShown(!isShown)} role='button'>
                    <>
                        <h5>{value ? value.title : ''}</h5>
                        <AiOutlineDown />
                    </>
                </div>
            ) : (
                <SearchBar onChange={(event) => updateTextValue(event)} type='dropdown' value={searchText} />
            )}
            {(type === 'regular' ? isShown : filterOptions.length > 0) && (
                <section role='options'>
                    {(type === 'regular' ? options : filterOptions).map(option => (
                        <div role='option' onClick={() => selectOption(option)}>
                            <span role='user'>
                                {(optionType === 'list' || optionType === 'tag') && (
                                    <span role='titles'>
                                        <h5>{option.title}</h5>
                                    </span>
                                )}
                                {optionType === 'user' && (
                                    <>
                                        <Avatar type='small' user={option} />
                                        <span role='titles'>
                                            <h5>{`${option.firstName} ${option.lastName}`}</h5>
                                        </span>
                                    </>
                                )}
                            </span>
                        </div>
                    ))} 
                </section>
            )}
        </div>
    )
}