import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'

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
    const [searchText, setSearchText] = useState('')
    const [isShown, setIsShown] = useState(false)

    const filterOptions = options.filter(option => {
        if (searchText === '') {
            return null
        } else {
            const regExp = new RegExp(searchText, 'i')
            const filterValue = optionType === 'tag' ? option.title : option.firstName
            return regExp.test(filterValue)
        }
    })

    const selectOption = option => {
        onSelect(option)
        setIsShown(false)
        setSearchText('')
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
                <SearchBar onChange={(event) => setSearchText(event)} type='dropdown' value={searchText} />
            )}
            {(type === 'regular' ? isShown : filterOptions.length >= 1) && (
                <section role='options'>
                    {(type === 'regular' ? options : filterOptions).map(option => (
                        <div key={option._id} role='option' onClick={() => selectOption(option)}>
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