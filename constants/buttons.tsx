import { AiFillAppstore, AiOutlineControl, AiOutlineDashboard, AiOutlineDotChart, AiOutlineDown, AiOutlineFilter, AiOutlinePlus } from 'react-icons/ai'

export const HeaderButtons = [{
    href: '/app/board',
    icon: <AiFillAppstore />,
    title: 'Board'
}, {
    href: '/app/feed',
    icon: <AiOutlineDashboard />,
    title: 'Feed'
}, {
    href: '/app/report',
    icon: <AiOutlineDotChart />,
    title: 'Report'
}, {
    href: '/app/settings',
    icon: <AiOutlineControl />,
    title: 'Settings'
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

export const TaskFormButtons = [{
    backgroundColor: '#0d6efd',
    color: 'white',
    title: 'Save',
}, {
    backgroundColor: '#f8f8f8',
    borderColor: '#e6ecf0',
    title: 'Cancel',
}]
