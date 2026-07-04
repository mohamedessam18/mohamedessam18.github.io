import { useEffect, useRef, useState } from 'react';
import { X, Play, RotateCcw } from 'lucide-react';

interface RetroGameProps {
  onClose: () => void;
}

const RetroGame = ({ onClose }: RetroGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('flappy-dash-high') || 0);
  });

  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Sound synthesizer using Web Audio API
  const playSound = (type: 'jump' | 'score' | 'fail') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'jump') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'score') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(587, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (_) {
      // AudioContext fails silently if browser policy blocks autoplay before interaction
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 400;

    // Game variables
    let dashY = 200;
    let dashVY = 0;
    const gravity = 0.22;
    const jumpForce = -4.5;
    const dashRadius = 10;

    interface Pipe {
      x: number;
      topHeight: number;
      bottomHeight: number;
      passed: boolean;
    }

    let pipes: Pipe[] = [];
    const pipeWidth = 40;
    const pipeGap = 105;
    let frameCount = 0;
    let localScore = 0;

    // Handle spacebar / click actions
    const triggerJump = () => {
      if (gameStateRef.current === 'playing') {
        dashVY = jumpForce;
        playSound('jump');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerJump();
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      e.preventDefault();
      triggerJump();
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousedown', handleCanvasClick);

    let animationFrameId: number;
    const resetGame = () => {
      dashY = 200;
      dashVY = 0;
      pipes = [
        {
          x: canvas.width + 50,
          topHeight: 120,
          bottomHeight: canvas.height - 120 - pipeGap,
          passed: false,
        },
      ];
      localScore = 0;
      setScore(0);
      frameCount = 0;
    };

    resetGame();
    const draw = () => {
      // Clear Screen
      ctx.fillStyle = '#090d16'; // Retro deep space blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid Pattern lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (gameStateRef.current === 'start') {
        // Start Menu Screen overlay
        ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('FLAPPY DASH', canvas.width / 2, 130);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px monospace';
        ctx.fillText('HELP DASH DODGE MALWARE PIPES!', canvas.width / 2, 160);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('PRESS SPACE OR CLICK SCREEN', canvas.width / 2, 230);
        ctx.fillText('TO FLAP AND FLY UPWARDS', canvas.width / 2, 250);
      }

      if (gameStateRef.current === 'playing') {
        frameCount++;

        // Apply physics
        dashVY += gravity;
        dashY += dashVY;

        // Draw Dash (cyan glowing circle with a yellow beak)
        ctx.beginPath();
        ctx.arc(60, dashY, dashRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee'; // Dash Cyan
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow

        // Beak
        ctx.beginPath();
        ctx.moveTo(60 + dashRadius - 2, dashY - 3);
        ctx.lineTo(60 + dashRadius + 4, dashY);
        ctx.lineTo(60 + dashRadius - 2, dashY + 3);
        ctx.fillStyle = '#fbbf24'; // Yellow
        ctx.fill();

        // Eye
        ctx.beginPath();
        ctx.arc(60 + 3, dashY - 3, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();

        // Spawn pipes every 130 frames
        if (frameCount % 120 === 0) {
          const minHeight = 40;
          const maxHeight = canvas.height - pipeGap - minHeight - 40;
          const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
          pipes.push({
            x: canvas.width,
            topHeight,
            bottomHeight: canvas.height - topHeight - pipeGap,
            passed: false,
          });
        }

        // Draw and update pipes
        pipes.forEach((pipe) => {
          pipe.x -= 2; // move left

          // Pipe styling (gradient neon green/blue)
          const grad = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
          grad.addColorStop(0, '#10b981');
          grad.addColorStop(1, '#047857');

          // Top pipe
          ctx.fillStyle = grad;
          ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
          ctx.strokeStyle = '#34d399';
          ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.topHeight);

          // Bottom pipe
          ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
          ctx.strokeRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);

          // Check collisions
          const hitTop = 60 + dashRadius > pipe.x && 60 - dashRadius < pipe.x + pipeWidth && dashY - dashRadius < pipe.topHeight;
          const hitBottom = 60 + dashRadius > pipe.x && 60 - dashRadius < pipe.x + pipeWidth && dashY + dashRadius > canvas.height - pipe.bottomHeight;
          const hitBoundaries = dashY - dashRadius < 0 || dashY + dashRadius > canvas.height;

          if (hitTop || hitBottom || hitBoundaries) {
            playSound('fail');
            setGameState('gameover');
          }

          // Score check
          if (!pipe.passed && pipe.x + pipeWidth < 60) {
            pipe.passed = true;
            localScore++;
            setScore(localScore);
            playSound('score');
          }
        });

        // Delete passed pipes offscreen
        pipes = pipes.filter((p) => p.x + pipeWidth > 0);

        // Draw current score
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(localScore.toString(), canvas.width / 2, 45);
      }

      if (gameStateRef.current === 'gameover') {
        // Draw dead Dash
        ctx.beginPath();
        ctx.arc(60, Math.min(dashY, canvas.height - dashRadius), dashRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444'; // Red
        ctx.fill();

        // Game Over Panel
        ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SYSTEM CRASHED', canvas.width / 2, 120);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px monospace';
        ctx.fillText(`SCORE: ${score}`, canvas.width / 2, 160);

        // Record HighScore
        if (score > highScore) {
          localStorage.setItem('flappy-dash-high', score.toString());
          setHighScore(score);
          ctx.fillStyle = '#fbbf24';
          ctx.fillText(`NEW HIGH SCORE!`, canvas.width / 2, 185);
        } else {
          ctx.fillText(`HIGH SCORE: ${highScore}`, canvas.width / 2, 185);
        }

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('CLICK THE RETRY BUTTON BELOW', canvas.width / 2, 250);
        ctx.fillText('TO INITIALIZE REBOOT SEQUENCE', canvas.width / 2, 270);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('mousedown', handleCanvasClick);
    };
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
  };

  const retryGame = () => {
    setGameState('playing');
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-[360px] rounded-3xl border-4 border-slate-700 bg-slate-900 shadow-2xl p-4 overflow-hidden flex flex-col items-center">
        
        {/* Header bar controls */}
        <div className="w-full flex items-center justify-between text-slate-400 font-mono text-[10px] pb-3 border-b border-slate-800">
          <span className="uppercase tracking-widest font-black text-cyan-400">DASH-ARCADE v1.0</span>
          <button 
            onClick={onClose} 
            className="p-1 rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Game"
          >
            <X size={16} />
          </button>
        </div>

        {/* Screen canvas */}
        <div className="relative border-4 border-slate-950 bg-black rounded-lg mt-3 overflow-hidden shadow-inner">
          <canvas ref={canvasRef} className="block w-[280px] h-[350px] sm:w-[320px] sm:h-[400px]" />
        </div>

        {/* Console Buttons */}
        <div className="w-full mt-4 flex items-center justify-between px-3">
          <div className="flex flex-col items-center">
            <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider mb-1">High Score</span>
            <span className="font-mono text-sm text-amber-500 font-black">{highScore}</span>
          </div>

          <div className="flex gap-4">
            {gameState === 'start' && (
              <button
                onClick={startGame}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Play size={12} />
                START
              </button>
            )}

            {gameState === 'gameover' && (
              <button
                onClick={retryGame}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-rose-500/20 transition-all"
              >
                <RotateCcw size={12} />
                RETRY
              </button>
            )}
          </div>
        </div>

        {/* Bottom D-Pad mock design */}
        <div className="w-full mt-4 flex items-center justify-between text-slate-700 font-mono text-[7px] select-none pointer-events-none opacity-40 uppercase tracking-widest px-2">
          <span>D-PAD EMULATOR</span>
          <span>FLAPPY DASH v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default RetroGame;
