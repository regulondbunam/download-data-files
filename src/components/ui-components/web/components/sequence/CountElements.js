export default function countElemets(
    sequence
) {
    let elements = []
    Array.from(sequence).map((item) => {
        let fItem = elements.find(el => el.l === item)
        let ob = {}
        if (fItem === undefined) {
            ob = { l: item, n: 1 }
            elements.push(ob)
            return null
        } else {
            ob = { l: item, n: fItem.n++ }
            return null
        }

    })
    
    return elements
}