import { proxy, useSnapshot } from 'valtio'

export const counter = proxy({
  count: 0
})

export const useCounter = 
  () => useSnapshot(counter)

export const inc = () => {
  return counter.count++
}

export const dec = () => {
  return counter.count--
}

export const res = () => {
  return counter.count = 0
}

export const set = (v = 0) => {
  return counter.count = v
}