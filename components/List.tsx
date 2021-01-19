import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai'

import styles from '../styles/List.module.css'
import Button from './Button'
import Card from './Card'
import Header from './Header'

type Props = {
    title: string
}

export default function List({ title }) {
    return (
        <div className={styles.list}>
            <Header backgroundColor='transparent' justifyContent='space-between' padding='0'>
                <>
                    <span>
                        <h4>{title}</h4>
                    </span>
                    <span>
                        <Button backgroundColor='#e6ecf0'>
                            <AiOutlinePlus />
                        </Button>
                        <Button backgroundColor='#e6ecf0'>
                            <AiOutlineEllipsis />
                        </Button>
                    </span>
                </>
            </Header>
            <section role='body'>
                <Card />
                <Card />
                <Card />
                <Card />
            </section>
        </div>
    )
}