import { SaveTrip } from './js/app'
import { RemoveTrip } from './js/app'
import { RetrieveData } from './js/app'

import './styles/style.scss'

//binds the functions to go on click
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save').addEventListener("click", SaveTrip)
    document.getElementById('remove').addEventListener("click", RemoveTrip)
})
document.addEventListener('DOMContentLoaded', RetrieveData('http://localhost:3000/get'))

//Calculate todays date to set minimum value for date field
let today = new Date()
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
let yyyy = today.getFullYear()
today = yyyy + '-' + mm + '-' + dd

//Set a limit of 5 years out for future vacation dates
const limit = (yyyy + 5) + '-' + mm + '-' + dd

//Set starting, minimum, and maximum values for the date field
document.getElementById('date').value = today
document.getElementById('date').min = today
document.getElementById('date').max = limit


