import { AiFillAppstore, AiFillSignal, AiOutlineBook, AiOutlineDown, AiOutlineFilter, AiOutlineInbox, AiOutlinePlus } from 'react-icons/ai'

export const HeaderButtons = [{
    icon: <AiOutlineInbox />,
    title: 'Backlog'
}, {
    icon: <AiFillAppstore />,
    title: 'Board'
}, {
    icon: <AiOutlineBook />,
    title: 'Feed'
}, {
    icon: <AiFillSignal />,
    title: 'Report'
}]


export const NavBarButtons = [{
    backgroundColor: '#0d6efd',
    color: 'white',
    icon: <AiOutlinePlus />,
    title: 'New Item',
    type: 'left'
}, {
    backgroundColor: '#f8f8f8',
    borderColor: '#e6ecf0',
    icon: <AiOutlineFilter />,
    title: 'Filter',
    type: 'left'
}, {
    backgroundColor: '#f8f8f8',
    borderColor: '#e6ecf0',
    icon: <AiOutlineDown />,
    title: 'Board',
    type: 'right'
}]
