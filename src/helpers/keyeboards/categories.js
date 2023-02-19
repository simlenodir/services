import { fetchData } from "../../utils/pg.js"

export const Categories = async() => {
    const allCategories = await fetchData(`select * from categories`)
    return [...allCategories]
}

const foundCategories = await Categories()

let pulledCategories = []
for (let i = 0; i < foundCategories.length; i += 2) {
    let arr = []

    if (foundCategories[i]) {
        arr.push(foundCategories[i].title, foundCategories[i + 1]?.title)
    }
    pulledCategories.push(arr.filter(e => e))
}
pulledCategories.push(['bak to menu'])

export {pulledCategories}