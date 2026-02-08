import { useGameStore } from '@stores/useGameStore';
import { cn } from '@utils/cn';
import { Heart } from 'lucide-react';
import './App.css';

function App() {
  const { stats, updateStats } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Tamagotchi Debug</h1>

      <div className={cn("p-6 rounded-xl border-4 shadow-lg transition-all", stats.hunger < 30 ? "border-red-500 bg-red-50" : "border-green-500 bg-white")}>
        <div className="flex items-center gap-3 mb-6">
          <Heart className={cn("w-8 h-8 transition-colors", stats.hunger < 30 ? "text-red-500 animate-pulse" : "text-green-500")} />
          <span className="text-2xl font-mono font-bold text-gray-700">Hunger: {stats.hunger}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => updateStats({ hunger: Math.min(100, stats.hunger + 10) })}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-md font-semibold"
          >
            Feed (+10)
          </button>

          <button
            onClick={() => updateStats({ hunger: Math.max(0, stats.hunger - 10) })}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors shadow-md font-semibold"
          >
            Starve (-10)
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center max-w-md">
        Test Integration:
        <br />✅ Zustand (Global Store)
        <br />✅ CN (Conditional Classes)
        <br />✅ Lucide (Icons)
      </p>
    </div>
  )
}

export default App
