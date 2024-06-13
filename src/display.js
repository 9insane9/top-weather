import loading from "./loading.gif"
import arrow from "./arrow-up.svg"

export const display = (function () {
  function loadingScreen() {
    const loadingDialog = document.querySelector(".loading")
    const loadingGif = document.querySelector(".loading-gif")
    loadingGif.src = loading

    loadingDialog.classList.remove("invisible")
    loadingDialog.showModal()
    setTimeout(() => loadingDialog.close(), 1000)
    setTimeout(() => loadingDialog.classList.add("invisible"), 1000)
  }
  // elements
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
  //toggle functions
  function toggleCurrentOrForecast() {
    const currentContainer = document.querySelector(".current-container")
    const forecastContainer = document.querySelector(".forecast-container")

    if (currentContainer.classList.contains("invisible")) {
      currentContainer.classList.remove("invisible")
      forecastContainer.classList.add("invisible")
    } else {
      currentContainer.classList.add("invisible")
      forecastContainer.classList.remove("invisible")
    }
  }

  function toggleUnitHeaders(currentUnitType) {
    const tempHeaders = document.querySelectorAll(".temp-header")
    const precipHeaders = document.querySelectorAll(".precip-header")
    const windHeaders = document.querySelectorAll(".wind-header")

    if (currentUnitType === "metric") {
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
  //main render functions
  function displayCurrent(data, unitType) {
    const current = data["current"]
    const location = data["location"]
    const condition = data["current"]["condition"]
    //display unit-agnostic data
    currentEls().name.textContent = location["name"]
    currentEls().region.textContent = location["region"]
    currentEls().country.textContent = location["country"]
    currentEls().conditionImg.src = condition["icon"]
    currentEls().conditionText.textContent = condition["text"]
    currentEls().windDirection.src = arrow
    currentEls().windDirection.style.transform = `rotate(${current["wind_degree"]}deg)`

    //display unit-specific data
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
    //display unit-agnostic data
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
    //display unit-specific data
    if (unitType === "metric") {
      renderForecastText(forecastEls().temps, data["tempCarr"])
      renderForecastText(forecastEls().precips, data["precipMmArr"])
      renderForecastWindSpeedMs(forecastEls().windSpeeds, data["windKphArr"])
    } else {
      renderForecastText(forecastEls().temps, data["tempFarr"])
      renderForecastText(forecastEls().precips, data["precipInArr"])
      renderForecastWindSpeedMs(forecastEls().windSpeeds, data["windMphArr"])
    }

    //reset visibility and hide forecast data older than current hour
    const firstDayHoursNodeList = document.querySelectorAll(".day-one > .hour")

    resetFirstDayVisibility(firstDayHoursNodeList)
    hideOlderThanCurrentHour(firstDayHoursNodeList)
  }
  //render helper functions
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

  //old info filter
  function resetFirstDayVisibility(hoursNodeList) {
    hoursNodeList.forEach((hourContainer) => {
      hourContainer.classList.remove("invisible")
    })
  }

  function hideOlderThanCurrentHour(hoursNodeList) {
    const currentDate = new Date()
    const currentHourNumber = currentDate.getHours()

    hoursNodeList.forEach((hourContainer) => {
      console.log(hourContainer.children[0])
      const childHourFullString = hourContainer.children[0].textContent
      const childHourShortString = childHourFullString.slice(0, 2)
      const childHourNumber = Number(childHourShortString)

      if (childHourNumber < currentHourNumber) {
        hourContainer.classList.add("invisible")
      }
    })
  }

  return {
    loadingScreen,
    toggleCurrentOrForecast,
    toggleUnitHeaders,
    displayCurrent,
    displayForecast,
  }
})()
