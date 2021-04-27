const procureVaccines = (activeReqs, newReq) => {
  let procuredArray = []

  if (activeReqs.length === 0) {
    procuredArray.push(newReq)

    return procuredArray
  }

  activeReqs.forEach((activeReq, i) => {
    if (newReq.units !== 0 && reqTypeMatch(newReq, activeReq) && reqBrandMatch(newReq, activeReq)) {
      const procurementQty = getProcurementQty(newReq, activeReq)

      activeReq.units -= procurementQty
      newReq.units -= procurementQty

      if (activeReq.units > 0) {
        procuredArray.push(activeReq)
      }

      activeReqs.splice(i, 1)
    }
  })

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
  return newReq.brand === activeReq.brand
}

const getProcurementQty = (newReq, activeReq) => {
  let surplusQty = 0

  if (newReq.type === 'surplus') {
    surplusQty = newReq.units
  }

  if (activeReq.type === 'surplus') {
    surplusQty = activeReq.units
  }

  let procurementQty = Math.min(surplusQty, newReq.units, activeReq.units)

  return procurementQty
}

module.exports = procureVaccines
