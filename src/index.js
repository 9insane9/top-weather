import "./style.css"
import { display } from "./display.js"
import { filter } from "./filter.js"

//initialize app
const searchField = document.querySelector(".search-field")
const searchBtn = document.querySelector(".search-btn")

const searchSaver = (function () {
  let term = "tartu estonia"

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

  return { toggle, get }
})()

initialize()

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
  searchBtn.addEventListener("click", search)
  unitBtn.addEventListener("click", toggleUnits)
  currentOrforecastBtn.addEventListener(
    "click",
    display.toggleCurrentOrForecast
  )

  //fetch and display data
  const ip = await getClientIP()
  const currentUnitType = unitType.get()
  fetchCurrent(ip).then((data) => display.displayCurrent(data, currentUnitType))

  fetchForecast(ip)
    .then((data) => filter.getFilteredForecast(data))
    .then((data) => display.displayForecast(data, currentUnitType))
}

function validateSearch() {
  if (searchField.value === "") {
    searchBtn.setAttribute("disabled", "disabled")
    return
  }
  searchBtn.removeAttribute("disabled")
}

async function search() {
  display.loadingScreen()
  searchSaver.set(searchField.value)
  const searchTerm = searchSaver.get()
  const currentUnitType = unitType.get()
  fetchCurrent(searchTerm).then((data) =>
    display.displayCurrent(data, currentUnitType)
  )

  fetchForecast(searchTerm)
    .then((data) => filter.getFilteredForecast(data))
    .then((data) => display.displayForecast(data, currentUnitType))
}

async function toggleUnits() {
  unitType.toggle()
  toggleUnitHeaders()
  const term = searchSaver.get()
  const currentUnitType = unitType.get()

  fetchCurrent(term).then((data) =>
    display.displayCurrent(data, currentUnitType)
  )

  fetchForecast(term)
    .then((data) => filter.getFilteredForecast(data))
    .then((data) => display.displayForecast(data, currentUnitType))
}

function toggleUnitHeaders() {
  const tempHeaders = document.querySelectorAll(".temp-header")
  const precipHeaders = document.querySelectorAll(".precip-header")
  const windHeaders = document.querySelectorAll(".wind-header")

  if (unitType.get() === "metric") {
    tempHeaders.forEach((header) => {
      header.textContent = "Temp. °C"
    })
    precipHeaders.forEach((header) => {
      header.textContent = "Precip. mm"
    })
    windHeaders.forEach((header) => {
      header.textContent = "Wind (m/s)"
    })
  } else {
    tempHeaders.forEach((header) => {
      header.textContent = "Temp. °F"
    })
    precipHeaders.forEach((header) => {
      header.textContent = "Precip. in"
    })
    windHeaders.forEach((header) => {
      header.textContent = "Wind (mph)"
    })
  }
}

async function fetchCurrent(searchTerm = "Tartu estonia") {
  const link = `https://api.weatherapi.com/v1/current.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&aqi=no`
  const response = await fetch(link, { mode: "cors" })
  const responseObj = await response.json()
  return responseObj
}

async function fetchForecast(searchTerm = "Tartu estonia") {
  const link = `http://api.weatherapi.com/v1/forecast.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&days=3&aqi=no&alerts=no`
  const response = await fetch(link, { mode: "cors" })
  const responseObj = await response.json()
  return responseObj
}
