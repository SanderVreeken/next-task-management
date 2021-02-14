import Button from '../components/Button'
import styles from '../styles/Setting.module.css'

type Props = {
    description: string
    requirements: string
    title: string
    // TODO: Token should defined as a type.
    user: any
    value: string
}

export default function Setting({ description, requirements, title, user, value }: Props) {
    return (
        <div className={styles.setting} role='setting'>
            <div role='top'>
                <h3>{title}</h3>
                <p>{description}</p>
                <input value={user[value]} />
            </div>
            <div role='bottom'>
                <p>{requirements}</p>
                <Button backgroundColor='black' color='white'>
                    <h3>Save</h3>
                </Button>
            </div>
        </div>
    )
}