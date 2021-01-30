import { NavBarButtons } from '../constants/buttons'

import Button from './Button'
import SearchBar from '../components/SearchBar'
import { useStateValue } from '../components/StateProvider'
import styles from '../styles/NavBar.module.css'

export default function NavBar() {
    const [, dispatch] = useStateValue()

    return (
        <div className={styles.navBar}>
            <SearchBar type='regular' />
            <span role='buttons'>
                {NavBarButtons.map((button, index) => (
                    <Button backgroundColor={button.backgroundColor} borderColor={button.borderColor} color={button.color} key={index} onClick={() => {
                        dispatch({
                            type: 'UPDATE_COVER',
                            item: true
                        })
                    }}>
                        <>
                            {button.type === 'left' && button.icon}
                            <h4 style={{
                                margin: button.type === 'left' ? '0 0 0 4px' : '0 4px 0 0'
                            }}>{button.title}</h4>
                            {button.type === 'right' && button.icon}
                        </>
                    </Button>
                ))}
            </span>
        </div>
    )
}