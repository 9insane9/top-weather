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
fetchForecast()

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
})

function search(location = "tartu estonia") {}

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
  const conditionImg = document.querySelector(".condition-img")
  const conditionText = document.querySelector(".condition-text")
  const temp = document.querySelector(".temp")
  const feelsLike = document.querySelector(".feels-like")
  const precip = document.querySelector(".precip")
  const windDirection = document.querySelector(".wind-direction")
  const windSpeed = document.querySelector(".wind-speed")

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
