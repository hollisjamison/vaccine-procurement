const v8 = require('v8')

const procureVaccines = (array, object) => {
  // Requires node17!
  // If on node14 or below use the following:
  // const v8 = require('v8')
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

const reqTypeMatch = (newReq, activeReq) => newReq.type !== activeReq.type

const reqBrandMatch = (newReq, activeReq) => newReq.brand === activeReq.brand

const getProcurementQty = (newReq, activeReq) => Math.min(newReq.units, activeReq.units)

const structuredClone = (o) => v8.deserialize(v8.serialize(o))

module.exports = procureVaccines
