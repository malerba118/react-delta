import useDeltaArray from './useDeltaArray'


export default {
    title: 'useDeltaArray'
}

export const Basic = () => {
    let a = 1
    let b = '2'
    const values = useDeltaArray([a, b])  
    if (values[0]) {
        values[0].prev
    }
}