import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'

import ListT from '../types/List'
import UserT from '../types/User'

import Avatar from './Avatar'
import SearchBar from './SearchBar'
import styles from '../styles/Dropdown.module.css'

type Props = {
    onSelect?: (...args: any) => void
    type: 'regular' | 'search'
    options: any
    optionType: 'list' | 'user'
    value?: ListT 
}

export default function Dropdown({ onSelect, type, options, optionType, value }: Props) {
    const [searchText, setSearchText] = useState(null)
    const [isShown, setIsShown] = useState(false)

    const filterUsers = options.filter(user => {
        const regExp = new RegExp(searchText, 'i')
        return regExp.test(user.firstName)
    })

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
            {(type === 'regular' ? isShown : filterUsers.length > 0) && (
                <section role='options'>
                    {(type === 'regular' ? options : filterUsers).map(option => (
                        <div role='option' onClick={() => {
                            onSelect(option)
                            setIsShown(false)
                            setSearchText(null)
                        }}>
                            <span role='user'>
                                {optionType === 'list' ? (
                                    <span role='titles'>
                                        <h5>{option.title}</h5>
                                    </span>
                                ) : (
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