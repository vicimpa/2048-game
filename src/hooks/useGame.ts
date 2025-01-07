import { from, randitem } from "../library/array";
import { useEffect, useRef, useState } from "react";

import { storage } from "../library/storage";
import { wait } from "../library/wait";

export type GameItem = {
  id: number;
  value: number;
  helper?: { id: number; value: number; };
};

const game = storage(
  '2048-state',
  (v): (GameItem | null)[] => {
    const data = (v?.split(';') ?? []).map(Number);
    if (data.length !== 16 || data.findIndex(isNaN) !== -1)
      return [];

    return data.map((item, id) => item <= 0 ? null : { id: -16 + id, value: item });
  },
  (v) => {
    return v.map(item => item?.value ?? -1).join(';');
  }
);

const SCORE = storage(
  '2048-score',
  (v, _v = v ?? '0') => isNaN(+_v) ? 0 : +_v,
  (v) => v + ''
);

const HISCORE = storage(
  '2048-hiscore',
  (v, _v = v ?? '0') => isNaN(+_v) ? 0 : +_v,
  (v) => v + ''
);

export const useGame = () => {
  const [state, setState] = useState<(GameItem | null)[]>(game.restore());
  const [score, setScore] = useState(SCORE.restore());
  const [hiscore, setHiscore] = useState(HISCORE.restore());
  const id = useRef(0);
  const block = useRef(false);
  const change = useRef(false);

  function spawn(count = 1) {
    setState(map => {
      const free = new Set<number>();
      map.forEach((item, index) => !item && free.add(index));

      while (count--) {
        const item = randitem([...free]);
        free.delete(item);
        map = map.with(item, {
          id: id.current++,
          value: Math.random() > .9 ? 4 : 2
        });
      }

      return map;
    });
  }

  function restart() {
    setState(from(16, null));
    spawn(2);
    setScore(0);
  }

  async function move(vert: boolean, dir: boolean) {
    if (block.current)
      return;
    block.current = true;
    setState(map => {
      const prev = map.map(e => e?.value).join(',');
      const newMap = from<GameItem | null>(16, null);
      const index = (a: number, b: number) => vert ?
        (a + b * 4) : (a * 4 + b);

      from(4, a => from(4, b => map[index(a, b)]))
        .map(row => {
          const newRow = from<GameItem | null>(4, null);
          let i = 0;

          if (dir)
            row.reverse();

          row.forEach(item => {
            if (!item)
              return;

            if (newRow[i - 1] && newRow[i - 1]?.value === item.value && !newRow[i - 1]?.helper) {
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
    if (change.current) {
      collect();
      spawn();
    }
    block.current = false;
  }

  function collect() {
    setState(map => map.map(item => {
      if (!item?.helper)
        return item;
      const { helper: _, value, ...other } = item;
      setScore(v => v + value * 2);
      return { ...other, value: value * 2 };
    }));
  }

  function level(n: number) {
    return n.toString(2).slice(0, -1).length;
  }

  useEffect(() => {
    game.store(state);
  }, [state]);

  useEffect(() => {
    if (!state.find(Boolean)) {
      restart();
    }
  }, []);

  useEffect(() => {
    setHiscore(hiscore => Math.max(score, hiscore));
    SCORE.store(score);
  }, [score]);

  useEffect(() => {
    HISCORE.store(hiscore);
  }, [hiscore]);

  return {
    state,
    score,
    hiscore,
    restart,
    move,
    level,
  };
};