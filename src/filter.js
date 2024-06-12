import { format } from "date-fns"

export const filter = (function () {
  //main function
  function getFilteredForecast(data) {
    const filteredData = {
      datesArr: getDatesArr(data),
      timeArr: getTimesArr(data),
      conditionTextArr: getParameterArr(data, "condition", "text"),
      conditionIconArr: getParameterArr(data, "condition", "icon"),
      tempCarr: getParameterArr(data, "temp_c"),
      tempFarr: getParameterArr(data, "temp_f"),
      precipInArr: getPrecipArr(data, "precip_in"),
      precipMmArr: getPrecipArr(data, "precip_mm"),
      windKphArr: getParameterArr(data, "wind_kph"),
      windMphArr: getParameterArr(data, "wind_mph"),
      windDirArr: getParameterArr(data, "wind_dir"),
      windDegreeArr: getParameterArr(data, "wind_degree"),
    }

    return filteredData
  }
  //helper functions
  function getDatesArr(data) {
    const datesArr = []
    const dayOneString = data["forecast"]["forecastday"]["0"]["date"]
    const dayTwoString = data["forecast"]["forecastday"]["1"]["date"]
    const dayThreeString = data["forecast"]["forecastday"]["2"]["date"]
    const dayOneDate = new Date(Date.parse(dayOneString))
    const dayTwoDate = new Date(Date.parse(dayTwoString))
    const dayThreeDate = new Date(Date.parse(dayThreeString))
    datesArr.push(`${format(dayOneDate, "do MMMM yyyy")}`)
    datesArr.push(`${format(dayTwoDate, "do MMMM yyyy")}`)
    datesArr.push(`${format(dayThreeDate, "do MMMM yyyy")}`)
    return datesArr
  }

  function getTimesArr(data) {
    const timesArr = []
    const allDays = data["forecast"]["forecastday"]

    allDays.forEach((day) => {
      day["hour"].forEach((hour) => {
        timesArr.push(hour["time"].slice(-5))
      })
    })
    return timesArr
  }

  function getPrecipArr(data, parameter) {
    const parameterArr = []
    const allDays = data["forecast"]["forecastday"]

    allDays.forEach((day) => {
      day["hour"].forEach((hour) => {
        parameterArr.push(`0 - ${hour[parameter]}`)
      })
    })

    return parameterArr
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

    return parameterArr
  }

  return { getFilteredForecast }
})()
