import { FC, useEffect, useLayoutEffect, useState } from "react";
import { GameItem, useGame } from "./hooks/useGame";

import { from } from "./library/array";
import { useWindowEvent } from "./hooks/useWindowEvent";

type GamePos = { x: number; y: number; };

const color = (value: number) => {
  const level = value.toString(2).slice(0, -1).length - 1;
  return `hsl(${level * 35}deg 60% 60%)`;
};

const NumValue: FC<{ value: number; toFixed?: number; }> = ({ value, toFixed = 0 }) => {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCur(current => current + (value - current) * .05);
    }, 5);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return cur.toFixed(toFixed);
};

export const App = () => {
  const game = useGame();
  const [scale, setScale] = useState(1);

  const resize = () => {
    setScale(Math.min(innerHeight, innerWidth) / 700);
  };

  useWindowEvent('keydown', (e) => {
    switch (e.code) {
      case 'ArrowLeft': return game.move(false, false);
      case 'ArrowRight': return game.move(false, true);
      case 'ArrowUp': return game.move(true, false);
      case 'ArrowDown': return game.move(true, true);
    }
  });

  useLayoutEffect(resize, []);
  useWindowEvent('resize', resize);

  const items = game.state
    .reduce((acc, _item, index) => {
      if (!_item) return acc;
      const { helper, ...item } = _item;
      const x = index % 4, y = (index - x) / 4;

      acc.push({ ...item, x, y });

      if (helper)
        acc.push({ ...helper, x, y });

      return acc;
    }, [] as (GameItem & GamePos)[])
    .sort((a, b) => a.id - b.id);

  return (
    <div className="container" style={{ transform: `scale(${scale})` }}>
      <div className="header">
        <span>Score: <b><NumValue value={game.score} /></b></span>
        <span>Hiscore: <b><NumValue value={game.hiscore} /></b></span>
        <div className="grow" />
        <button onClick={() => game.restart()}>New game</button>
      </div>
      <div className="game" >
        <div className="map" >
          {from(16, i => <div className="grid" key={i} />)}
          {items.map(item => (
            <div
              key={`${item.id}:${item.value}`}
              className="item"
              style={{
                '--x': item.x,
                '--y': item.y,
                '--color': color(item.value),
                '--length': (item.value + '').length,
              }}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
      <a target="_BLANK" className="link" href="https://github.com/vicimpa/2048-game">GitHub Repository</a>
    </div>
  );
};