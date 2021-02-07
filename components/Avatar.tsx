import UserT from '../types/User'

import styles from '../styles/Avatar.module.css'

type Props = {
    type: 'large' | 'medium' | 'small'
    user: UserT
}

export default function Avatar({ type, user }: Props) {
    // Switch statement within a function to determine the sizes of the component.
    const determineSizes = (type: 'large' | 'medium' | 'small') => {
        switch(type) {
            case 'large':
                return {
                    fontSize: '16px',
                    height: '49px'
                }
            case 'medium':
                return {
                    fontSize: '13px',
                    height: '36.5px'
                }
            case 'small':
                return {
                    fontSize: '10px',
                    height: '24px'
                }
        }
    }

    // Function return the intials of the user.
    const getInitialsFromUser = (user: UserT): string => {
        // Lastname processed seperately to use the length method in the return statement.
        const lastNameSplit = user.lastName.split(' ')
        return user.firstName.split(' ')[0].charAt(0) + lastNameSplit[lastNameSplit.length - 1].charAt(0)
    }

    return (
        <div className={styles.avatar} style={{
            height: determineSizes(type).height,
            minWidth: determineSizes(type).height,
        }}>
            <p style={{
                fontSize: determineSizes(type).fontSize,
            }}>{getInitialsFromUser(user)}</p>
        </div>
    )
}