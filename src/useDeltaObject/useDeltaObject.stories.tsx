import useDeltaObject from './useDeltaObject'
import every from '../every'

export default {
    title: 'useDeltaObject'
}

export const Basic = () => {
    const deltas = useDeltaObject({cheese: 1, pepperoni: '2'})
    const a = Object.values(deltas)
}