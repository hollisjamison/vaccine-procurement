# Vaccine Procurement
You have been tasked to assist a set of clinics manage their inventory of COVID-19 vaccines. Some clinics are in areas where there is a shortage of vaccines and some have surpluses.

Make a function that accepts one requirement of vaccines (either a surplus or a shortage) and a list of the active requirements in the system. The function should look at the list of active requirements and tries to match your incoming requirement with an existing one to fulfill both needs, then return the new list of active requirements.

## Procurement Rules
- You must match a surplus with a shortage or vice versa.
- Requirements that were not fulfilled completely should be entered back into the list so they can be fulfilled later.
- Vaccine types much match (As in Moderna to Moderna, but you cannot fulfill a Pfizer request with a Moderna surplus)
- Requirements should be stored and fullfiled in an oldest to newest format. As requirements are partially fulfilled they should be moved to the front and are now deemed as new.

## Example 1
### Incoming Requirement
```
{
  brand: "Pfizer"
  type: "surplus",
  units: 100,
  clinicId: 291,
}
```
### Active Requirement List
```
[

]
```
### Expected Output
```
[
  {
    brand: "Pfizer"
    type: "surplus",
    units: 100,
    clinicId: 291
  }
]
```
You would expect that with no active requirements the new requirement would simply be added to the list of active requirements and returned.

## Example 2
### Incoming Requirement
```
{
  brand: "Moderna",
  type: "shortage",
  units: 150,
  clinicId: 189
}
```
### Active Requirement List
```
[
  {
    brand: "J&J",
    type: "surplus",
    units: 125,
    clinicId: 265
  },
    {
    brand: "Moderna",
    type: "surplus",
    units: 150,
    clinicId: 288
  }
]
```
### Expected Output
```
[
  {
    brand: "J&J",
    type: "surplus",
    units: 125,
    clinicId: 265
  }
]
```
We would expect the new shortage to seek out the surpluses in the active requirements. It would skip the first one as it is a J&J vaccine, then fulfill the surplus of clinic 288 and thus remove it from the list. The new requirement would also have a unit count of 0 and thus would not need to be added leaving only the J&J surplus in the list.
