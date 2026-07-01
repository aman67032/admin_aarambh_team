'use client';

import React from 'react';

/**
 * AuroraBackground — pure CSS animated background.
 * Orange + Midnight Blue brand theme. No WebGL, works everywhere.
 */
export default function AuroraBackground() {
  return (
    <>
      <style>{`
        @keyframes aurora-drift-1 {
          0%   { transform: translate(0%, 0%)   scale(1);   opacity: 0.55; }
          33%  { transform: translate(8%, -12%) scale(1.15); opacity: 0.7;  }
          66%  { transform: translate(-6%, 8%)  scale(0.95); opacity: 0.5;  }
          100% { transform: translate(0%, 0%)   scale(1);   opacity: 0.55; }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate(0%, 0%)    scale(1.1); opacity: 0.45; }
          33%  { transform: translate(-10%, 10%) scale(0.9); opacity: 0.65; }
          66%  { transform: translate(12%, -8%)  scale(1.2); opacity: 0.4;  }
          100% { transform: translate(0%, 0%)    scale(1.1); opacity: 0.45; }
        }
        @keyframes aurora-drift-3 {
          0%   { transform: translate(0%, 0%)   scale(1);    opacity: 0.4;  }
          50%  { transform: translate(-8%, -8%) scale(1.18); opacity: 0.6;  }
          100% { transform: translate(0%, 0%)   scale(1);    opacity: 0.4;  }
        }
        @keyframes aurora-drift-4 {
          0%   { transform: translate(0%, 0%)  scale(0.95); opacity: 0.5;  }
          40%  { transform: translate(12%, 6%) scale(1.1);  opacity: 0.7;  }
          100% { transform: translate(0%, 0%)  scale(0.95); opacity: 0.5;  }
        }
        @keyframes grid-fade {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.08; }
        }
        @keyframes particle-float {
          0%   { transform: translateY(0px)   rotate(0deg);   opacity: 0;   }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes shimmer-ring {
          0%   { transform: scale(0.7); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;  }
        }
        .aurora-orb-1 { animation: aurora-drift-1 14s ease-in-out infinite; }
        .aurora-orb-2 { animation: aurora-drift-2 18s ease-in-out infinite; }
        .aurora-orb-3 { animation: aurora-drift-3 22s ease-in-out infinite; }
        .aurora-orb-4 { animation: aurora-drift-4 16s ease-in-out infinite; }
        .aurora-grid  { animation: grid-fade 8s ease-in-out infinite; }
        .shimmer-ring { animation: shimmer-ring 4s ease-out infinite; }
        .shimmer-ring-2 { animation: shimmer-ring 4s ease-out infinite 2s; }

        .particle { animation: particle-float linear infinite; }
        .p1  { left:5%;   animation-duration:12s; animation-delay:0s;   width:4px; height:4px; }
        .p2  { left:15%;  animation-duration:9s;  animation-delay:2s;   width:3px; height:3px; }
        .p3  { left:28%;  animation-duration:14s; animation-delay:1s;   width:5px; height:5px; }
        .p4  { left:40%;  animation-duration:10s; animation-delay:3.5s; width:3px; height:3px; }
        .p5  { left:52%;  animation-duration:16s; animation-delay:0.5s; width:4px; height:4px; }
        .p6  { left:63%;  animation-duration:11s; animation-delay:4s;   width:6px; height:6px; }
        .p7  { left:74%;  animation-duration:13s; animation-delay:1.5s; width:3px; height:3px; }
        .p8  { left:85%;  animation-duration:8s;  animation-delay:2.5s; width:5px; height:5px; }
        .p9  { left:92%;  animation-duration:15s; animation-delay:0s;   width:4px; height:4px; }
        .p10 { left:35%;  animation-duration:12s; animation-delay:5s;   width:3px; height:3px; }
        .p11 { left:58%;  animation-duration:10s; animation-delay:3s;   width:6px; height:6px; }
        .p12 { left:78%;  animation-duration:17s; animation-delay:1s;   width:4px; height:4px; }
      `}</style>

      {/* === Deep background gradient === */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #050B18 0%, #0A1628 40%, #0D1F3C 70%, #050B18 100%)',
          zIndex: 0,
        }}
      />

      {/* === Orb 1 — large orange blob top-left === */}
      <div
        className="aurora-orb-1"
        style={{
          position: 'absolute',
          top: '-10%', left: '-5%',
          width: '55vw', height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(255,107,0,0.45) 0%, rgba(255,107,0,0.12) 50%, transparent 75%)',
          filter: 'blur(60px)',
          zIndex: 1,
        }}
      />

      {/* === Orb 2 — rich blue blob bottom-right === */}
      <div
        className="aurora-orb-2"
        style={{
          position: 'absolute',
          bottom: '-15%', right: '-8%',
          width: '60vw', height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 60%, rgba(29,78,216,0.5) 0%, rgba(29,78,216,0.15) 50%, transparent 75%)',
          filter: 'blur(70px)',
          zIndex: 1,
        }}
      />

      {/* === Orb 3 — orange accent top-right === */}
      <div
        className="aurora-orb-3"
        style={{
          position: 'absolute',
          top: '10%', right: '5%',
          width: '38vw', height: '38vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,154,60,0.35) 0%, rgba(255,107,0,0.1) 55%, transparent 80%)',
          filter: 'blur(50px)',
          zIndex: 1,
        }}
      />

      {/* === Orb 4 — deep blue mid-left === */}
      <div
        className="aurora-orb-4"
        style={{
          position: 'absolute',
          top: '40%', left: '10%',
          width: '30vw', height: '30vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3) 0%, rgba(29,78,216,0.08) 60%, transparent 80%)',
          filter: 'blur(45px)',
          zIndex: 1,
        }}
      />

      {/* === Shimmer rings (pulse from center) === */}
      <div
        className="shimmer-ring"
        style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translateX(-50%)',
          width: '300px', height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(255,107,0,0.3)',
          zIndex: 2,
        }}
      />
      <div
        className="shimmer-ring-2"
        style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translateX(-50%)',
          width: '300px', height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(29,78,216,0.3)',
          zIndex: 2,
        }}
      />

      {/* === Mesh dot grid === */}
      <div
        className="aurora-grid"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,107,0,0.35) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          zIndex: 2,
        }}
      />

      {/* === Diagonal glowing streaks === */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none',
      }}>
        {[
          { top: '8%',  left: '-5%',  rotate: '30deg',  color: 'rgba(255,107,0,0.07)',  width: '80vw', height: '1px' },
          { top: '20%', left: '10%',  rotate: '30deg',  color: 'rgba(29,78,216,0.08)',  width: '70vw', height: '1px' },
          { top: '45%', left: '-10%', rotate: '-20deg', color: 'rgba(255,154,60,0.06)', width: '90vw', height: '1px' },
          { top: '65%', left: '5%',   rotate: '15deg',  color: 'rgba(59,130,246,0.07)', width: '75vw', height: '1px' },
          { top: '80%', left: '-5%',  rotate: '25deg',  color: 'rgba(255,107,0,0.05)', width: '85vw', height: '1px' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: s.top, left: s.left,
            width: s.width, height: s.height,
            background: `linear-gradient(90deg, transparent, ${s.color}, ${s.color}, transparent)`,
            transform: `rotate(${s.rotate})`,
            filter: 'blur(1px)',
          }} />
        ))}
      </div>

      {/* === Floating particles === */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
        {['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12'].map((cls, i) => (
          <div
            key={cls}
            className={`particle ${cls}`}
            style={{
              position: 'absolute',
              bottom: '-10px',
              borderRadius: '50%',
              background: i % 3 === 0
                ? 'radial-gradient(circle, #FF6B00, rgba(255,107,0,0))'
                : i % 3 === 1
                  ? 'radial-gradient(circle, #3B82F6, rgba(59,130,246,0))'
                  : 'radial-gradient(circle, #FF9A3C, rgba(255,154,60,0))',
            }}
          />
        ))}
      </div>

      {/* === Vignette overlay to keep edges dark === */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,11,24,0.65) 100%)',
        pointerEvents: 'none',
      }} />
    </>
  );
}
