import { newValue } from "lib/newValue";
import { useMemo } from "react";

export class Game {
  map = new Uint32Array(16)
  counter = 1

  constructor() {
    this.push(2)
  }

  getMap() {
    return [...this.map].map((e, i) => {
      const id = e >> 16
      const val = e & 0xffff
      const x = i % 4
      const y = (i - x) / 4

      return {
        id, 
        val,
        x, 
        y
      }
    }).filter(e => e.val)
  }

  push(count = 1) {
    for(let i = 0; i < count; i++) {
      const id = this.counter++
      const val = newValue()
      const finalValue = (id << 16) | (val & 0xffff)
      const [index] = this.map
        .map((_, i) => i)
        .filter(e => !this.map[e])
        .sort(() => Math.random() > 0.5 ? 1 : -1)
  
      if(typeof index != 'number')
        throw new Error('Cant push new value')
      
      console.log(index, finalValue)
      this.map[index] = finalValue
    }
  }

  static use() {
    return useMemo(() => new Game(), [])
  }
}