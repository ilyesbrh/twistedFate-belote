import { mockGame } from './data/mockGame.js';
import { GameTable } from './components/GameTable/GameTable.js';

export default function App() {
  return <GameTable game={mockGame} />;
}
