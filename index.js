const procureVaccines = (activeReqs, newReq) => {
  let procuredArray = []

  if (activeReqs.length === 0) {
    procuredArray.push(newReq)

    return procuredArray
  }

  for (let i = 0; i < activeReqs.length; i++) {
    const activeReq = activeReqs[i]

    if (reqTypeMatch(newReq, activeReq) && reqBrandMatch(newReq, activeReq)) {
      const procurementQty = getProcurementQty(newReq, activeReq)

      activeReq.units -= procurementQty
      newReq.units -= procurementQty

      if (activeReq.units > 0) {
        procuredArray.push(activeReq)
      }

      activeReqs.splice(i, 1)
      i--
    }
  }

  let returnArray = activeReqs.concat(procuredArray)

  if (newReq.units > 0) {
    returnArray.push(newReq)
  }

  return returnArray
}

const reqTypeMatch = (newReq, activeReq) => {
  return newReq.type !== activeReq.type
}

const reqBrandMatch = (newReq, activeReq) => {
  if (newReq.brand === activeReq.brand) {
    return true
  } else {
    return false
  }
}

const getProcurementQty = (newReq, activeReq) => {
  let procurementQty = Math.min(newReq.units, activeReq.units)

  return procurementQty
}

module.exports = procureVaccines
