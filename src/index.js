import "./style.css"

// async function getClientIP() {
//   const data = await fetch("https://api-bdc.net/data/client-ip", {
//     mode: "cors",
//   })
//   const dataObj = await data.json()
//   const ip = await dataObj["ipString"]
//   console.log(ip)
//   return ip
// }

// const clientIP = () => {
//   return getClientIP()
// }

async function fetchCurrent(searchTerm = "London") {
  const link = `https://api.weatherapi.com/v1/current.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&aqi=no`
  const response = await fetch(link, { mode: "cors" })
  const responseObj = await response.json()
  console.log(responseObj)
}

async function fetchThreeDayForecast(searchTerm = "London") {
  const link = `http://api.weatherapi.com/v1/forecast.json?key=f80d0c3108cc4ceea9f122718243005&q=${searchTerm}&days=3&aqi=no&alerts=no`
  const response = await fetch(link, { mode: "cors" })
  const responseObj = await response.json()
  console.log(responseObj)
}

fetchThreeDayForecast()
