const v8 = require('v8')

const procureVaccines = (array, object) => {
  // Requires node17!
  // If on node14 use the below:
  //
  // const structuredClone = (o) => v8.deserialize(v8.serialize(o));
  let activeReqs = structuredClone(array)
  let newReq = structuredClone(object)

  let procuredArray = []
  let nonProcuredArray = []

  if (activeReqs.length === 0) {
    procuredArray.push(newReq)

    return procuredArray
  }

  for (let i = 0; i < activeReqs.length; i++) {
    const activeReq = activeReqs[i]

    if (reqTypeMatch(newReq, activeReq) && reqBrandMatch(newReq, activeReq)) {
      const procuredReq = fulfillProcurement(newReq, activeReq)

      if (procuredReq.units > 0) {
        procuredArray.push(procuredReq)
      }
    } else {
      nonProcuredArray.push(activeReq)
    }
  }

  if (newReq.units > 0) {
    procuredArray.push(newReq)
  }

  let returnArray = [...nonProcuredArray, ...procuredArray]

  return returnArray
}

const fulfillProcurement = (newReq, activeReq) => {
  const procurementQty = getProcurementQty(newReq, activeReq)

  activeReq.units -= procurementQty
  newReq.units -= procurementQty

  return activeReq
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

const structuredClone = (o) => v8.deserialize(v8.serialize(o))

module.exports = procureVaccines
