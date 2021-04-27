# vaccine-procurement
You have been tasked to assist a set of clinics manage their inventory of COVID-19 vaccines. Some clinics are in areas where there is a shortage of vaccines and some have surpluses.

Make a function that accepts one requirement of vaccines (either a surplus or a shortage) and a list of the active requirements in the system. The function should look at the list of active requirements and tries to match your incoming requirement with an existing one to fulfill both needs.

## Procurement Rules
- You must match a surplus with a shortage or vice versa.
- Requirements that were not fulfilled completely should be entered back into the list so they can be fulfilled later.
- Vaccine types much match (As in Moderna to Moderna, but you cannot fulfill a Pfizer request with a Moderna surplus)
- Requirements should be stored and fullfiled in an oldest to newest format. As orders are partially fulfilled they should be moved to the front and are now deemed as new.

## Examples
### Incoming Requirement
```
{
  brand: "Pfizer"
  type: "Surplus"
  units: 100
  clinicId: 291
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
    type: "Surplus"
    units: 100
    clinicId: 291
  }
]
```

