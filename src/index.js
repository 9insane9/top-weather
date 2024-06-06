import "./style.css"
import loading from "./loading.gif"

async function getClientIP() {
  const data = await fetch("https://api-bdc.net/data/client-ip", {
    mode: "cors",
  })
  const dataObj = await data.json()
  const ipString = await dataObj["ipString"]
  console.log(`${typeof ipString} ${ipString}`)
  return ipString
}

async function initialize() {
  const ip = await getClientIP()
  displayCurrent(ip)
}

initialize()

const searchField = document.querySelector(".search-field")
const searchBtn = document.querySelector(".search-btn")

searchField.oninput = validateSearch

function validateSearch() {
  const term = searchField.value
  if (term === "") {
    searchBtn.setAttribute("disabled", "disabled")
  } else {
    searchBtn.removeAttribute("disabled")
  }
}

searchBtn.addEventListener("click", (event) => {
  const searchTerm = searchField.value
  displayCurrent(searchTerm)
  //displayForecast(searchTerm)
})

// function search(location = "tartu estonia") {}

// document.querySelector("iframe").src = loading

async function fetchCurrent(searchTerm = "Tartu estonia") {
  const link = `https://api.weatherapi.com/v1/current.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&aqi=no`
  const response = await fetch(link, { mode: "cors" })
  const responseObj = await response.json()
  console.log(responseObj)
  return responseObj
}

async function fetchForecast(searchTerm = "tartu estonia") {
  const link = `http://api.weatherapi.com/v1/forecast.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&days=3&aqi=no&alerts=no`
  const response = await fetch(link, { mode: "cors" })
  const responseObj = await response.json()
  console.log(responseObj)
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

async function displayCurrent(searchTerm) {
  const data = await fetchCurrent(searchTerm)
  const current = data["current"]
  const location = data["location"]
  const condition = data["current"]["condition"]
  currentEls().name.textContent = location["name"]
  currentEls().region.textContent = location["region"]
  currentEls().country.textContent = location["country"]
  currentEls().conditionImg.src = condition["icon"]
  currentEls().conditionText.textContent = condition["text"]
  currentEls().temp.textContent = `${current["temp_c"]}°`
  currentEls().feelsLike.textContent = `Feels like ${current["feelslike_c"]}°`
  currentEls().precip.textContent = `${current["precip_mm"]} mm`
  currentEls().windDirection.textContent = current["wind_dir"]
  currentEls().windSpeed.textContent = `${Math.round(
    Number(current["wind_kph"]) / 3.6
  )} m/s`
}

async function displayForecast() {
  const data = await fetchForecast(searchTerm)
  const forecast = await data["forecast"]["forecastday"]
  console.log(forecast)
}

fetchForecast()

//filter data
async function filteredForecast() {
  const data = await fetchForecast()
  const filteredData = {
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
  datesArr.push(data["forecast"]["forecastday"]["0"]["date"])
  datesArr.push(data["forecast"]["forecastday"]["1"]["date"])
  datesArr.push(data["forecast"]["forecastday"]["2"]["date"])
  console.log(datesArr)
  return datesArr
}

function getParameterArr(data, parameter, parameter2 = null) {
  const parameterArr = []
  const allDays = data["forecast"]["forecastday"]

  allDays.forEach((day) => {
    day["hour"].forEach((hour) => {
      if (parameter2 === null) {
        parameterArr.push(hour[parameter])
      } else {
        parameterArr.push(hour[parameter][parameter2])
      }
    })
  })

  console.log(parameterArr)
  return parameterArr
}

filteredForecast()
