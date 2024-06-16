import loading from "./loading.gif"
import arrow from "./wind-icon1.svg"

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
  function toggleCurrentOrForecast(event) {
    const currentContainer = document.querySelector(".current-container")
    const forecastContainer = document.querySelector(".forecast-container")

    if (currentContainer.classList.contains("invisible")) {
      currentContainer.classList.remove("invisible")
      forecastContainer.classList.add("invisible")
      event.target.textContent = "Forecast"
    } else {
      currentContainer.classList.add("invisible")
      forecastContainer.classList.remove("invisible")
      event.target.textContent = "Current"
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
      setUnitBtnText(currentUnitType)
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
      setUnitBtnText(currentUnitType)
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

    //render appropriate background
    setBackground()
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
      renderForecastTemps(forecastEls().temps, data["tempCarr"])
      renderForecastText(forecastEls().precips, data["precipMmArr"])
      renderForecastWindSpeedMs(forecastEls().windSpeeds, data["windKphArr"])
    } else {
      renderForecastTemps(forecastEls().temps, data["tempFarr"])
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

  function renderForecastTemps(nodeList, tempsArr) {
    nodeList.forEach((node, index) => {
      node.textContent = `${tempsArr[index]}°`
      setColdClassForForecastTemps(tempsArr[index], node)
    })
  }

  function setColdClassForForecastTemps(tempValue, node) {
    if (tempValue > 0) {
      node.classList.add("warm")
    }
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

  function setUnitBtnText(unitType) {
    const unitBtn = document.querySelector(".btn-toggle-unit")
    if (unitType === "metric") {
      unitBtn.textContent = "Imperial"
      return
    }
    unitBtn.textContent = "Metric"
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
      const childHourFullString = hourContainer.children[0].textContent
      const childHourShortString = childHourFullString.slice(0, 2)
      const childHourNumber = Number(childHourShortString)

      if (childHourNumber < currentHourNumber) {
        hourContainer.classList.add("invisible")
      }
    })
  }

  //dynamic background
  function setBackground() {
    const htmlEl = document.documentElement
    const currentCondition =
      currentEls().conditionText.textContent.toLowerCase()
    console.log(currentCondition)
    let image

    if (currentCondition.includes("thunder")) {
      image = background.thunder
    } else if (
      currentCondition.includes("overcast") ||
      currentCondition.includes("cloudy")
    ) {
      image = background.cloudy
    } else if (currentCondition.includes("sunny")) {
      image = background.sunny
    } else if (currentCondition.includes("clear")) {
      image = background.nightClear
    } else if (currentCondition.includes("rain")) {
      image = background.rainy
    } else if (currentCondition.includes("snow")) {
      image = background.snow
    } else {
      image = background.sunny
    }

    htmlEl.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${image})`
  }

  const background = {
    rainy:
      "https://images.pexels.com/photos/243971/pexels-photo-243971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cloudy:
      "https://images.pexels.com/photos/12498026/pexels-photo-12498026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    sunny:
      "https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    nightClear:
      "https://images.pexels.com/photos/25606279/pexels-photo-25606279/free-photo-of-stars-on-night-sky-over-sea-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    thunder:
      "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    snow: "https://images.pexels.com/photos/1003124/pexels-photo-1003124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  }

  return {
    loadingScreen,
    toggleCurrentOrForecast,
    toggleUnitHeaders,
    displayCurrent,
    displayForecast,
    setUnitBtnText,
  }
})()
