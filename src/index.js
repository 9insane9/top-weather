import "./style.css"
import { format } from "date-fns"
import arrow from "./arrow-up.png"
import loading from "./loading.gif"

const searchField = document.querySelector(".search-field")
const searchBtn = document.querySelector(".search-btn")
const unitBtn = document.querySelector(".btn-toggle-unit")
const currentForecastToggleBtn = document.querySelector(".btn-current-forecast")
const loadingDialog = document.querySelector(".loading")
const loadingGif = document.querySelector(".loading-gif")
loadingGif.src = loading

searchField.oninput = validateSearch

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

  function getType() {
    return type
  }

  return { toggle, getType }
})()

function toggleUnitHeaders() {
  const tempHeaders = document.querySelectorAll(".temp-header")
  const precipHeaders = document.querySelectorAll(".precip-header")
  const windHeaders = document.querySelectorAll(".wind-header")

  if (unitType.getType() === "metric") {
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

function toggleCurrentOrForecast() {
  const currentContainer = document.querySelector(".current-container")
  const forecastContainer = document.querySelector(".forecast-container")
  const currentClasslist = currentContainer.classList
  const forecastClasslist = forecastContainer.classList

  if (currentClasslist.contains("invisible")) {
    currentContainer.classList.remove("invisible")
    forecastContainer.classList.add("invisible")
  } else {
    currentContainer.classList.add("invisible")
    forecastContainer.classList.remove("invisible")
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

//loading function
function loadingScreen() {
  loadingDialog.classList.remove("invisible")
  loadingDialog.showModal()
  setTimeout(() => loadingDialog.close(), 1000)
  setTimeout(() => loadingDialog.classList.add("invisible"), 1000)
}

async function initialize() {
  loadingScreen()
  const ip = await getClientIP()
  displayCurrent(ip, unitType.getType())

  fetchForecast(ip)
    .then((data) => getFilteredForecast(data))
    .then((data) => displayForecast(data, unitType.getType()))
}

initialize()

function validateSearch() {
  const term = searchField.value
  if (term === "") {
    searchBtn.setAttribute("disabled", "disabled")
  } else {
    searchBtn.removeAttribute("disabled")
  }
}

searchBtn.addEventListener("click", (event) => {
  loadingScreen()
  const searchTerm = searchField.value
  displayCurrent(searchTerm, unitType.getType())

  fetchForecast(searchTerm)
    .then((data) => getFilteredForecast(data))
    .then((data) => displayForecast(data, unitType.getType()))
})

unitBtn.addEventListener("click", () => {
  unitType.toggle()
  toggleUnitHeaders()
  const term = searchSaver.get()

  displayCurrent(term, unitType.getType())

  fetchForecast(term)
    .then((data) => getFilteredForecast(data))
    .then((data) => displayForecast(data, unitType.getType()))
})

currentForecastToggleBtn.addEventListener("click", toggleCurrentOrForecast)

//core functions
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

function currentEls() {
  const name = document.querySelector(".name")
  const region = document.querySelector(".region")
  const country = document.querySelector(".country")
  const conditionImg = document.querySelector(".current-condition-img")
  const conditionText = document.querySelector(".current-condition-text")
  const temp = document.querySelector(".current-temp")
  const feelsLike = document.querySelector(".feels-like")
  const precip = document.querySelector(".current-precip")
  const windDirection = document.querySelector(".current-wind-direction")
  const windSpeed = document.querySelector(".current-wind-speed")

  return {
    name,
    region,
    country,
    conditionImg,
    conditionText,
    temp,
    feelsLike,
    precip,
    windDirection,
    windSpeed,
  }
}

function forecastEls() {
  const dateHeaders = document.querySelectorAll(".date-header")
  const times = document.querySelectorAll(".time")
  const conditionImgs = document.querySelectorAll(".condition-img")
  const temps = document.querySelectorAll(".temp")
  const precips = document.querySelectorAll(".precip")
  const windSpeeds = document.querySelectorAll(".wind-speed")
  const windDirs = document.querySelectorAll(".wind-dir")

  return {
    dateHeaders,
    times,
    conditionImgs,
    temps,
    precips,
    windSpeeds,
    windDirs,
  }
}

async function displayCurrent(searchTerm, unitType) {
  searchSaver.set(searchTerm)
  const data = await fetchCurrent(searchTerm)
  const current = data["current"]
  const location = data["location"]
  const condition = data["current"]["condition"]
  console.log(current)
  currentEls().name.textContent = location["name"]
  currentEls().region.textContent = location["region"]
  currentEls().country.textContent = location["country"]
  currentEls().conditionImg.src = condition["icon"]
  currentEls().conditionText.textContent = condition["text"]
  currentEls().windDirection.src = arrow
  currentEls().windDirection.style.transform = `rotate(${current["wind_degree"]}deg)`
  if (unitType === "metric") {
    currentEls().temp.textContent = `${current["temp_c"]}°C`
    currentEls().feelsLike.textContent = `Feels like ${current["feelslike_c"]}°C`
    currentEls().precip.textContent = `0 - ${current["precip_mm"]} mm`
    currentEls().windSpeed.textContent = `${convertKphToMs(
      current["wind_kph"]
    )} m/s`
  } else {
    currentEls().temp.textContent = `${current["temp_f"]}°F`
    currentEls().feelsLike.textContent = `Feels like ${current["feelslike_f"]}°F`
    currentEls().precip.textContent = `0 - ${current["precip_in"]} in`
    currentEls().windSpeed.textContent = `${Math.round(
      Number(current["wind_mph"])
    )} mph`
  }
}

function displayForecast(data, unitType) {
  renderForecastText(forecastEls().dateHeaders, data["datesArr"])
  renderForecastText(forecastEls().times, data["timeArr"])
  renderForecastConditions(
    forecastEls().conditionImgs,
    data["conditionIconArr"],
    data["conditionTextArr"]
  )
  renderForecastWindDirection(
    forecastEls().windDirs,
    data["windDegreeArr"],
    data["windDirArr"]
  )
  if (unitType === "metric") {
    renderForecastText(forecastEls().temps, data["tempCarr"])
    renderForecastText(forecastEls().precips, data["precipMmArr"])
    renderForecastWindSpeedMs(forecastEls().windSpeeds, data["windKphArr"])
  } else {
    renderForecastText(forecastEls().temps, data["tempFarr"])
    renderForecastText(forecastEls().precips, data["precipInArr"])
    renderForecastWindSpeedMs(forecastEls().windSpeeds, data["windMphArr"])
  }
}

//render functions
function renderForecastText(nodeList, dataArr) {
  nodeList.forEach((node, index) => {
    node.textContent = dataArr[index]
  })
}

function renderForecastConditions(nodeList, imgArr, textArr) {
  nodeList.forEach((node, index) => {
    node.src = imgArr[index]
    node.alt = textArr[index]
  })
}

function renderForecastWindDirection(nodeList, degreeArr, dirArr) {
  nodeList.forEach((node, index) => {
    node.src = arrow
    node.style.transform = `rotate(${degreeArr[index]}deg)`
    node.alt = dirArr[index]
  })
}

function renderForecastWindSpeedMs(nodeList, speedKphArr) {
  nodeList.forEach((node, index) => {
    node.textContent = convertKphToMs(speedKphArr[index])
  })
}

function convertKphToMs(numOrNumString) {
  return Math.round(Number(numOrNumString) / 3.6)
}

//data filtering functions
async function getFilteredForecast() {
  const data = await fetchForecast()
  const filteredData = {
    datesArr: getDatesArr(data),
    timeArr: getParameterArr(data, "time"),
    conditionTextArr: getParameterArr(data, "condition", "text"),
    conditionIconArr: getParameterArr(data, "condition", "icon"),
    tempCarr: getParameterArr(data, "temp_c"),
    tempFarr: getParameterArr(data, "temp_f"),
    precipInArr: getParameterArr(data, "precip_in"),
    precipMmArr: getParameterArr(data, "precip_mm"),
    windKphArr: getParameterArr(data, "wind_kph"),
    windMphArr: getParameterArr(data, "wind_mph"),
    windDirArr: getParameterArr(data, "wind_dir"),
    windDegreeArr: getParameterArr(data, "wind_degree"),
  }

  console.log("here is filtered data:")
  console.log(filteredData)

  return filteredData
}

function getDatesArr(data) {
  const datesArr = []
  const date1 = new Date(
    Date.parse(data["forecast"]["forecastday"]["0"]["date"])
  )
  const date2 = Date.parse(data["forecast"]["forecastday"]["1"]["date"])
  const date3 = Date.parse(data["forecast"]["forecastday"]["2"]["date"])
  datesArr.push(`${format(date1, "do MMMM yyyy")}`)
  datesArr.push(`${format(date2, "do MMMM yyyy")}`)
  datesArr.push(`${format(date3, "do MMMM yyyy")}`)
  return datesArr
}

function getParameterArr(data, parameter, parameter2 = null) {
  const parameterArr = []
  const allDays = data["forecast"]["forecastday"]

  allDays.forEach((day) => {
    day["hour"].forEach((hour) => {
      if (parameter2 === null) {
        if (parameter === "time") {
          parameterArr.push(hour[parameter].slice(-5))
        } else if (parameter.includes("precip")) {
          parameterArr.push(`0 - ${hour[parameter]}`)
        } else {
          parameterArr.push(hour[parameter])
        }
      } else {
        parameterArr.push(hour[parameter][parameter2])
      }
    })
  })

  return parameterArr
}
