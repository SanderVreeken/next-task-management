import Admin from './admin'

export const Settings = [{
    description: `This is the first name that will be used within ${Admin.name}.`,
    requirements: 'Please enter a name between the 2 and 16 characters.',
    title: 'Your First Name',
    type: 'user',
    value: 'firstName',
}, {
    description: `This is the last name that will be used within ${Admin.name}.`,
    requirements: 'Please enter a name between the 2 and 16 characters.',
    title: 'Your Last Name',
    type: 'user',
    value: 'lastName',
}, {
    description: `This is the email address that will be used to login into ${Admin.name}.`,
    requirements: 'Please enter a valid email address.',
    title: 'Your Email',
    type: 'user',
    value: 'email',
}]