/* eslint-disable max-len */
const { expect } = require('chai')
const { describe, it } = require('mocha')
const procureVaccines = require('../index')

describe('procureVaccines', () => {
  it('Adds a new requirement to the active list if the list is empty', () => {
    const activeReqs = []
    const newReq = {
      brand: 'Pfizer',
      type: 'surplus',
      units: 150,
      clinicId: 291,
    }

    const resolvedActiveReqs = procureVaccines(activeReqs, newReq)

    const expectedResult = [
      {
        brand: 'Pfizer',
        type: 'surplus',
        units: 150,
        clinicId: 291,
      },
    ]

    expect(resolvedActiveReqs).to.deep.equal(expectedResult)
  })

  it('Adds a new requirement to the active list if there is no matching vaccine type', () => {
    const activeReqs = [
      {
        brand: 'Moderna',
        type: 'shortage',
        units: 250,
        clinicId: 288,
      },
    ]
    const newReq = {
      brand: 'Pfizer',
      type: 'surplus',
      units: 250,
      clinicId: 277,
    }

    const resolvedActiveReqs = procureVaccines(activeReqs, newReq)

    const expectedResult = [
      {
        brand: 'Moderna',
        type: 'shortage',
        units: 250,
        clinicId: 288,
      },
      {
        brand: 'Pfizer',
        type: 'surplus',
        units: 250,
        clinicId: 277,
      },
    ]

    expect(resolvedActiveReqs).to.deep.equal(expectedResult)
  })

  it('Fulfills a request in the active requests if it matches the incoming exactly', () => {
    const activeReqs = [
      {
        brand: 'J&J',
        type: 'shortage',
        units: 50,
        clinicId: 251,
      },
    ]
    const newReq = {
      brand: 'J&J',
      type: 'surplus',
      units: 50,
      clinicId: 253,
    }

    const resolvedActiveReqs = procureVaccines(activeReqs, newReq)

    const expectedResult = []

    expect(resolvedActiveReqs).to.deep.equal(expectedResult)
  })

  it('Partially fulfills an incoming request if the existing request has less than needed.', () => {
    const activeReqs = [
      {
        brand: 'Pfizer',
        type: 'shortage',
        units: 25,
        clinicId: 243,
      },
    ]
    const newReq = {
      brand: 'Pfizer',
      type: 'surplus',
      units: 50,
      clinicId: 266,
    }

    const resolvedActiveReqs = procureVaccines(activeReqs, newReq)

    const expectedResult = [
      {
        brand: 'Pfizer',
        type: 'surplus',
        units: 25,
        clinicId: 266,
      },
    ]

    expect(resolvedActiveReqs).to.deep.equal(expectedResult)
  })

  it('Partially fulfills an existing request if the incoming request has less than needed.', () => {
    const activeReqs = [
      {
        brand: 'Moderna',
        type: 'shortage',
        units: 100,
        clinicId: 233,
      },
      {
        brand: 'J&J',
        type: 'shortage',
        units: 50,
        clinicId: 295,
      },
    ]
    const newReq = {
      brand: 'Moderna',
      type: 'surplus',
      units: 50,
      clinicId: 255,
    }

    const resolvedActiveReqs = procureVaccines(activeReqs, newReq)

    const expectedResult = [
      {
        brand: 'J&J',
        type: 'shortage',
        units: 50,
        clinicId: 295,
      },
      {
        brand: 'Moderna',
        type: 'shortage',
        units: 50,
        clinicId: 233,
      },
    ]

    expect(resolvedActiveReqs).to.deep.equal(expectedResult)
  })
})
