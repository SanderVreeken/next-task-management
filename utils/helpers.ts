export const groupObject = (object: any, key: string) => {
    const groups: any = {}
    object.forEach(item => {
        if (item[key]) {
            if (groups[item[key]]) {
                const object = groups[item[key]]
                object.push(item)
                groups[item[key]] = object
            } else {
                groups[item[key]] = [item]
            }
        }
    })
    return groups
}

// TODO: Set the correct type for data, as this is not explicitly set to any.
export const sortData = (data: any, parameter: string) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => (a[parameter] > b[parameter] ? 1 : -1))
}