import "./style.css"
import { display } from "./display.js"
import { filter } from "./filter.js"

const searchField = document.querySelector(".search-field")
const searchBtn = document.querySelector(".search-btn")

const searchSaver = (function () {
  let term = null

  return {
    get: function () {
      return term
    },
    set: function (newString) {
      if (typeof newString === "string") {
        term = newString
      } else {
        console.error("Input must be a string")
      }
    },
  }
})()

const unitType = (function () {
  let type = "metric"

  function toggle() {
    type = type === "metric" ? "imperial" : "metric"
    return type
  }

  function get() {
    return type
  }

  function set(newType) {
    if (newType === "metric" || newType === "imperial") {
      type = newType
    } else {
      console.log("Invalid unit type")
    }
  }

  return { toggle, get, set }
})()

const errorHandler = (function () {
  const errorEl = document.querySelector(".error")

  function reset() {
    errorEl.textContent = ""
  }

  function set(errorText) {
    errorEl.textContent = errorText
  }

  function handle(error) {
    set(error.message)
    console.error("Error:", error)
  }

  return { reset, set, handle }
})()

initialize()

async function fetchCurrent(searchTerm) {
  try {
    const link = `https://api.weatherapi.com/v1/current.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&aqi=no`
    const response = await fetch(link, { mode: "cors" })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseObj = await response.json()
    return responseObj
  } catch (error) {
    console.error("Error fetching current weather:", error.message)
    throw error
  }
}

async function fetchForecast(searchTerm) {
  try {
    const link = `https://api.weatherapi.com/v1/forecast.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&days=3&aqi=no&alerts=no`
    const response = await fetch(link, { mode: "cors" })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseObj = await response.json()
    return responseObj
  } catch (error) {
    console.error("Error fetching weather forecast:", error.message)
    throw error
  }
}

async function getClientIP() {
  const data = await fetch("https://api-bdc.net/data/client-ip", {
    mode: "cors",
  })
  const dataObj = await data.json()
  const ipString = await dataObj["ipString"]
  return ipString
}

async function initialize() {
  display.loadingScreen()
  const unitBtn = document.querySelector(".btn-toggle-unit")
  const currentOrforecastBtn = document.querySelector(".btn-current-forecast")

  //attach event listeners
  searchField.oninput = validateSearch
  searchField.addEventListener("keypress", (event) => searchWithEnterKey(event))
  searchBtn.addEventListener("click", search)
  unitBtn.addEventListener("click", toggleUnits)
  currentOrforecastBtn.addEventListener(
    "click",
    display.toggleCurrentOrForecast
  )

  //fetch and display data
  const ip = await getClientIP()
  searchSaver.set(ip)
  fetchCurrent(ip)
    .then((data) => setUnitBasedOnLocation(data))
    .then((data) => display.displayCurrent(data, unitType.get()))

  fetchForecast(ip)
    .then((data) => filter.getFilteredForecast(data))
    .then((data) => display.displayForecast(data, unitType.get()))
}

async function search() {
  display.loadingScreen()
  errorHandler.reset()
  searchSaver.set(searchField.value)
  searchField.value = ""

  const searchTerm = searchSaver.get()
  const currentUnitType = unitType.get()

  if (searchTerm) {
    fetchCurrent(searchTerm)
      .then((data) => display.displayCurrent(data, currentUnitType))
      .catch((data) => {
        errorHandler.handle(data)
      })

    fetchForecast(searchTerm)
      .then((data) => filter.getFilteredForecast(data))
      .then((data) => display.displayForecast(data, currentUnitType))
      .catch((data) => {
        errorHandler.handle(data)
      })
    validateSearch()
    return
  }
  console.log("No search term saved!")
}

function searchWithEnterKey(event) {
  if (event.keyCode === 13) {
    search()
  }
}

function validateSearch() {
  if (searchField.value.trim() === "") {
    searchBtn.setAttribute("disabled", "disabled")
    return
  }
  searchBtn.removeAttribute("disabled")
}

async function toggleUnits() {
  unitType.toggle()
  const searchTerm = searchSaver.get()
  const currentUnitType = unitType.get()

  display.toggleUnitHeaders(currentUnitType)

  fetchCurrent(searchTerm).then((data) =>
    display.displayCurrent(data, currentUnitType)
  )

  fetchForecast(searchTerm)
    .then((data) => filter.getFilteredForecast(data))
    .then((data) => display.displayForecast(data, currentUnitType))
}

async function setUnitBasedOnLocation(data) {
  const country = await data["location"]["country"]
  if (
    country === "United States of America" ||
    country === "Liberia" ||
    country === "Myanmar"
  ) {
    unitType.set("imperial")
    display.setUnitBtnText(unitType.get())
    return data
  }
  unitType.set("metric")
  display.setUnitBtnText(unitType.get())
  return data
}
