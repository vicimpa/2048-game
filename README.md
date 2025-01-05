# 2048 Game

This is a React-based implementation of the popular 2048 game. The game is built using TypeScript and Vite, providing a modern development environment with fast build times and hot module replacement.

## Features

- **Responsive Gameplay**: The game adapts to different screen sizes and provides smooth animations.
- **State Management**: Utilizes React hooks for managing game state and effects.
- **Customizable**: Easily modify the game logic and appearance by adjusting the TypeScript and CSS code.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/2048-game.git
cd 2048-game
npm install
```

## Development

To start the development server with hot module replacement, run:

```bash
npm run dev
```

This will start a local server at `http://localhost:3000` where you can see your changes in real-time.

## Build

To build the project for production, use:

```bash
npm run build
```

This will create an optimized build in the `dist` directory.

## Preview

To preview the production build locally, run:

```bash
npm run preview
```

## Game Logic

The game logic is implemented using TypeScript, with key functions including:

- **`spawn`**: Adds new tiles to the board.
- **`move`**: Handles the movement and merging of tiles.
- **`collect`**: Collects and merges tiles after a move.
- **`restart`**: Resets the game state.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## License

This project is licensed under the MIT License.
