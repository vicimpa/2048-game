import { Game } from 'classes/Game'
import { For } from 'helpers/For'
import { Repeat } from 'helpers/Repeat'
import { useEvent } from 'lib/useEvent'
import { value } from 'lib/value'
import './Main.sass'


export const Main = () => {
  const game = Game.use()

  useEvent('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp': {

      } break

      case 'ArrowLeft': {

      } break

      case 'ArrowRight': {

      } break

      case 'ArrowDown': {

      } break
    }
  })

  return (
    <div className="game-box">
      <Repeat count={16}>
        <div className="empty" >
          <span>none</span>
        </div>
      </Repeat>

      <For of={game.getMap()}>
        {({id, val, x, y}) => (
          <div key={`id_${id}`} 
            className="value"
            style={value(x, y, val)} />
        )}
      </For>

      {/* <div style={value(state[0], state[1], 16)} className="value" /> */}
    </div>
  )
}