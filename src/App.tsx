import { Coffee, Heart, Pill, Play, Skull, Sparkles, Zap } from 'lucide-react';
import './App.css';
import { GameCanvas } from './components/Game/GameCanvas';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameStore } from './stores/useGameStore';

function App() {
  useGameLoop(); // Start the heartbeat
  const { stats, state, transitionTo, updateStats, clean, heal } = useGameStore();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      gap: '24px',
      padding: '16px',
      fontFamily: 'monospace',
      overflowY: 'auto'
    }}>
      <h1 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1f2937',
        position: 'relative',
        zIndex: 10,
        marginTop: '32px'
      }}>Tamagotchi Debug</h1>

      {/* PixiJS Canvas */}
      <GameCanvas state={state} timeOfDay={useGameStore((s) => s.timeOfDay)} />

      {/* State Indicator */}
      <div style={{
        padding: '8px 24px',
        borderRadius: '9999px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: state === 'IDLE' ? "#3b82f6" :
          state === 'SLEEPING' ? "#4f46e5" :
            state === 'EATING' ? "#f97316" :
              state === 'PLAYING' ? "#ec4899" :
                state === 'SICK' ? "#ca8a04" :
                  state === 'DEAD' ? "#1f2937" : "#ef4444"
      }}>
        {state === 'SICK' && <Skull className="w-5 h-5 animate-bounce" />}
        STATUS: {state}
      </div>

      {/* Stats Card */}
      <div style={{
        padding: '24px',
        borderRadius: '0.75rem',
        border: '4px solid',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '384px',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 10,
        borderColor: state === 'DEAD' ? "#6b7280" :
          state === 'SICK' ? "#eab308" : "#3b82f6",
        filter: state === 'DEAD' ? "grayscale(1)" : ""
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Hunger */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart style={{ width: '24px', height: '24px', color: stats.hunger < 30 ? "#ef4444" : "#22c55e" }} />
              <span>Hunger</span>
            </div>
            <div style={{ width: '128px', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{ height: '100%', backgroundColor: '#22c55e', width: `${stats.hunger}%`, transition: 'all 500ms' }}
              />
            </div>
            <span style={{ width: '32px', textAlign: 'right' }}>{Math.round(stats.hunger)}</span>
          </div>

          {/* Energy */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap style={{ width: '24px', height: '24px', color: '#eab308' }} />
              <span>Energy</span>
            </div>
            <div style={{ width: '128px', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{ height: '100%', backgroundColor: '#eab308', width: `${stats.energy}%`, transition: 'all 500ms' }}
              />
            </div>
            <span style={{ width: '32px', textAlign: 'right' }}>{Math.round(stats.energy)}</span>
          </div>

          {/* Fun */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Play style={{ width: '24px', height: '24px', color: '#ec4899' }} />
              <span>Fun</span>
            </div>
            <div style={{ width: '128px', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{ height: '100%', backgroundColor: '#ec4899', width: `${stats.fun}%`, transition: 'all 500ms' }}
              />
            </div>
            <span style={{ width: '32px', textAlign: 'right' }}>{Math.round(stats.fun)}</span>
          </div>

          {/* Hygiene */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles style={{ width: '24px', height: '24px', color: '#06b6d4' }} />
              <span>Clean</span>
            </div>
            <div style={{ width: '128px', height: '16px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{ height: '100%', backgroundColor: '#06b6d4', width: `${stats.hygiene}%`, transition: 'all 500ms' }}
              />
            </div>
            <span style={{ width: '32px', textAlign: 'right' }}>{Math.round(stats.hygiene)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '384px',
        position: 'relative',
        zIndex: 10
      }}>
        <button
          onClick={() => {
            if (state === 'SLEEPING') transitionTo('IDLE');
            else transitionTo('SLEEPING');
          }}
          disabled={state === 'DEAD' || state === 'SICK'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#4f46e5',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: state === 'DEAD' || state === 'SICK' ? 'not-allowed' : 'pointer',
            opacity: state === 'DEAD' || state === 'SICK' ? 0.5 : 1
          }}
        >
          <Coffee style={{ width: '20px', height: '20px' }} />
          {state === 'SLEEPING' ? 'WAKE UP' : 'SLEEP'}
        </button>

        <button
          onClick={() => {
            updateStats({ hunger: Math.min(100, stats.hunger + 10) });
            transitionTo('EATING');
            setTimeout(() => transitionTo('IDLE'), 2000);
          }}
          disabled={state === 'SLEEPING' || state === 'DEAD' || state === 'SICK' || state === 'EATING'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#f97316',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: state === 'SLEEPING' || state === 'DEAD' || state === 'SICK' || state === 'EATING' ? 'not-allowed' : 'pointer',
            opacity: state === 'SLEEPING' || state === 'DEAD' || state === 'SICK' || state === 'EATING' ? 0.5 : 1
          }}
        >
          <Heart style={{ width: '20px', height: '20px' }} />
          FEED
        </button>

        <button
          onClick={() => {
            updateStats({ fun: Math.min(100, stats.fun + 10) });
            transitionTo('PLAYING');
            setTimeout(() => transitionTo('IDLE'), 2000);
          }}
          disabled={state === 'SLEEPING' || state === 'DEAD' || state === 'SICK' || state === 'PLAYING'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#ec4899',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: state === 'SLEEPING' || state === 'DEAD' || state === 'SICK' || state === 'PLAYING' ? 'not-allowed' : 'pointer',
            opacity: state === 'SLEEPING' || state === 'DEAD' || state === 'SICK' || state === 'PLAYING' ? 0.5 : 1
          }}
        >
          <Play style={{ width: '20px', height: '20px' }} />
          PLAY
        </button>

        <button
          onClick={clean}
          disabled={state === 'SLEEPING' || state === 'DEAD'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#06b6d4',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: state === 'SLEEPING' || state === 'DEAD' ? 'not-allowed' : 'pointer',
            opacity: state === 'SLEEPING' || state === 'DEAD' ? 0.5 : 1
          }}
        >
          <Sparkles style={{ width: '20px', height: '20px' }} />
          CLEAN
        </button>

        <button
          onClick={useGameStore.getState().toggleLights}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: useGameStore((s) => s.isLightsOn) ? '#facc15' : '#4b5563',
            color: useGameStore((s) => s.isLightsOn) ? '#854d0e' : 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {useGameStore((s) => s.isLightsOn) ? <Zap style={{ width: '20px', height: '20px' }} /> : <Coffee style={{ width: '20px', height: '20px' }} />}
          {useGameStore((s) => s.isLightsOn) ? 'LIGHTS ON' : 'LIGHTS OFF'}
        </button>

        <button
          onClick={useGameStore((s) => s.toggleTime)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#1f2937',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>
            {useGameStore((s) => s.timeOfDay === 'DAY' ? '☀️' : '🌙')}
          </span>
          {useGameStore((s) => s.timeOfDay === 'DAY' ? 'NIGHT' : 'DAY')}
        </button>

        <button
          onClick={heal}
          disabled={state !== 'SICK'}
          style={{
            gridColumn: 'span 2 / span 2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#22c55e',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: state !== 'SICK' ? 'not-allowed' : 'pointer',
            opacity: state !== 'SICK' ? 0.5 : 1
          }}
        >
          <Pill style={{ width: '20px', height: '20px' }} />
          USE MEDICINE
        </button>

        <div style={{
          gridColumn: 'span 2 / span 2',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '16px',
          borderTop: '1px solid #d1d5db'
        }}>
          <button
            onClick={() => useGameStore.setState({ state: 'SICK' })}
            disabled={state === 'DEAD'}
            style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Debug: Sick
          </button>

          <button
            onClick={() => {
              useGameStore.setState({ stats: { ...useGameStore.getState().stats, hygiene: 20 } });
            }}
            style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#e2e8f0', color: '#475569', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Debug: Dirty
          </button>

          <button
            onClick={() => useGameStore.setState({ state: 'DEAD', stats: { ...useGameStore.getState().stats, hunger: 0, energy: 0 } })}
            style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Debug: Kill
          </button>

          <button
            onClick={() => useGameStore.setState({
              state: 'IDLE',
              stats: { ...useGameStore.getState().stats, hunger: 100, energy: 100, fun: 100, hygiene: 100 },
              stage: 'baby1',
              evolutionBranch: null,
              age: 0
            })}
            style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#22c55e', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Debug: Revive
          </button>

          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => useGameStore.getState().setStage('egg')}
              style={{ fontSize: '0.65rem', padding: '2px 4px', backgroundColor: '#e5e7eb', color: 'black', borderRadius: '4px' }}
            >
              Stage 1 (Egg)
            </button>
            <button
              onClick={() => useGameStore.getState().setStage('baby1')}
              style={{ fontSize: '0.65rem', padding: '2px 4px', backgroundColor: '#4b5563', color: 'white', borderRadius: '4px' }}
            >
              Stage 2 (Baby I)
            </button>
            <button
              onClick={() => useGameStore.getState().setStage('baby2')}
              style={{ fontSize: '0.65rem', padding: '2px 4px', backgroundColor: '#db2777', color: 'white', borderRadius: '4px' }}
            >
              Stage 3 (Baby II)
            </button>
            <button
              onClick={() => useGameStore.getState().setStage('child')} // Branch defaults to Agumon visually
              style={{ fontSize: '0.65rem', padding: '2px 4px', backgroundColor: '#eab308', color: 'black', borderRadius: '4px' }}
            >
              Stage 4 (Child)
            </button>
            <button
              onClick={() => {
                // Force Greymon branch for debug
                useGameStore.setState({ stage: 'adult', evolutionBranch: 'GREY' });
              }}
              style={{ fontSize: '0.65rem', padding: '2px 4px', backgroundColor: '#f97316', color: 'white', borderRadius: '4px' }}
            >
              Stage 5 (Adult)
            </button>
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '0.75rem',
        color: '#9ca3af',
        marginTop: '16px',
        textAlign: 'center',
        maxWidth: '448px',
        position: 'relative',
        zIndex: 10,
        paddingBottom: '32px'
      }}>
        Debug Info: Tick Rate 1000ms | Global State Machine Active
      </p>
    </div>
  )
}

export default App
