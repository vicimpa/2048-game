import { from, randitem } from "../library/array";
import { useEffect, useRef, useState } from "react";

import { wait } from "../library/wait";

export type GameItem = {
  id: number;
  value: number;
  helper?: { id: number; value: number; };
};


const store = {
  key: 'state',
  save(state: (GameItem | null)[]) {
    localStorage.setItem(this.key, state.map(item => item?.value ?? -1).join(';'));
  },
  get(): (GameItem | null)[] {
    const data = (localStorage.getItem(this.key)?.split(';') ?? []).map(Number);
    if (data.length !== 16 || data.findIndex(isNaN) !== -1)
      return [];

    return data.map((item, id) => item <= 0 ? null : { id: -16 + id, value: item });
  }
};

export const useGame = () => {
  const [state, setState] = useState<(GameItem | null)[]>(store.get());
  const id = useRef(0);
  const block = useRef(false);
  const change = useRef(false);

  useEffect(() => {
    store.save(state);
  }, [state]);

  function spawn(count = 1) {
    setState(map => {
      const free = new Set<number>();
      map.forEach((item, index) => !item && free.add(index));

      while (count--) {
        const item = randitem([...free]);
        free.delete(item);
        map = [...map];
        map[item] = {
          id: id.current++,
          value: Math.random() > .9 ? 4 : 2
        };
      }

      return map;
    });
  }

  function restart() {
    setState(from(16, null));
    spawn(2);
  }

  async function move(vert: boolean, dir: boolean) {
    if (block.current)
      return;
    block.current = true;
    setState(map => {
      const prev = map.map(e => e?.value).join(',');
      const newMap = from<GameItem | null>(16, null);
      const index = (a: number, b: number) => vert ? (
        a + b * 4
      ) : (
        a * 4 + b
      );

      from(4, a => from(4, b => map[index(a, b)]))
        .map(row => {
          const newRow = from<GameItem | null>(4, null);
          let i = 0;

          if (dir)
            row.reverse();

          row.forEach(item => {
            if (!item)
              return;

            if (newRow[i - 1]?.value === item.value && !newRow[i - 1]?.helper) {
              item.helper = newRow[i - 1]!;
              newRow[i - 1] = item;
            } else {
              newRow[i++] = item;
            }
          });

          if (dir)
            newRow.reverse();

          return newRow;
        })
        .forEach((row, a) => {
          row.forEach((item, b) => {
            newMap[index(a, b)] = item;
          });
        });

      change.current = newMap.map(e => e?.value).join(',') !== prev;
      return newMap;
    });
    await wait(100);
    collect();
    if (change.current)
      spawn();
    block.current = false;
  }

  function collect() {
    setState(map => map.map(item => {
      if (!item?.helper)
        return item;
      const { helper: _, value, ...other } = item;
      return { ...other, value: value * 2 };
    }));
  }

  function level(n: number) {
    return n.toString(2).slice(0, -1).length;
  }

  useEffect(() => {
    if (!state.find(Boolean)) {
      restart();
    }
  }, []);

  return {
    state,
    restart,
    move,
    level,
  };
};