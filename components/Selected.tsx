import TagT from '../types/Tag'
import UserT from '../types/User'

import Avatar from './Avatar'
import styles from '../styles/Selected.module.css'

type Props = { 
    option: any
    type: 'tag' | 'user'
}

export default function Selected({ option, type }: Props) {
    return (
        <div className={styles.selected}>
            {type === 'tag' && (
                <h5>{option.title}</h5>
            )}
            {type === 'user' && (
                <>
                    <Avatar type='small' user={option} />
                    <h5 style={{
                        marginLeft: '0.3rem'
                    }}>{`${option.firstName} ${option.lastName}`}</h5>
                </>
            )}
        </div>
    )
}