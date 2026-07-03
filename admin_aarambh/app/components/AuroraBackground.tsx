'use client';

import React from 'react';
import { useApp } from '../context/AppContext';

/**
 * AuroraBackground — pure CSS animated background.
 * Theme-aware edition supporting light pastel and deep space themes.
 */
export default function AuroraBackground() {
  const { theme } = useApp();
  const isDark = theme === 'fun';

  return (
    <>
      <style>{`
        @keyframes aurora-drift-1 {
          0%   { transform: translate(0%, 0%)   scale(1);   opacity: 0.65; }
          33%  { transform: translate(6%, -10%) scale(1.12); opacity: 0.8;  }
          66%  { transform: translate(-5%, 6%)  scale(0.96); opacity: 0.55; }
          100% { transform: translate(0%, 0%)   scale(1);   opacity: 0.65; }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate(0%, 0%)    scale(1.08); opacity: 0.55; }
          33%  { transform: translate(-8%, 8%)   scale(0.92); opacity: 0.75; }
          66%  { transform: translate(10%, -6%)  scale(1.15); opacity: 0.45; }
          100% { transform: translate(0%, 0%)    scale(1.08); opacity: 0.55; }
        }
        @keyframes aurora-drift-3 {
          0%   { transform: translate(0%, 0%)   scale(1);    opacity: 0.5;  }
          50%  { transform: translate(-6%, -6%) scale(1.12); opacity: 0.7;  }
          100% { transform: translate(0%, 0%)   scale(1);    opacity: 0.5;  }
        }
        @keyframes aurora-drift-4 {
          0%   { transform: translate(0%, 0%)  scale(0.96); opacity: 0.55; }
          40%  { transform: translate(8%, 4%)  scale(1.08); opacity: 0.75; }
          100% { transform: translate(0%, 0%)  scale(0.96); opacity: 0.55; }
        }
        @keyframes grid-fade {
          0%, 100% { opacity: 0.03; }
          50%       { opacity: 0.06; }
        }
        @keyframes particle-float {
          0%   { transform: translateY(0px)   rotate(0deg);   opacity: 0;   }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes shimmer-ring {
          0%   { transform: scale(0.7); opacity: 0.5; }
          100% { transform: scale(2.0); opacity: 0;  }
        }
        .aurora-orb-1 { animation: aurora-drift-1 16s ease-in-out infinite; }
        .aurora-orb-2 { animation: aurora-drift-2 20s ease-in-out infinite; }
        .aurora-orb-3 { animation: aurora-drift-3 24s ease-in-out infinite; }
        .aurora-orb-4 { animation: aurora-drift-4 18s ease-in-out infinite; }
        .aurora-grid  { animation: grid-fade 8s ease-in-out infinite; }
        .shimmer-ring { animation: shimmer-ring 5s ease-out infinite; }
        .shimmer-ring-2 { animation: shimmer-ring 5s ease-out infinite 2.5s; }

        .particle { animation: particle-float linear infinite; }
        .p1  { left:5%;   animation-duration:14s; animation-delay:0s;   width:4px; height:4px; }
        .p2  { left:15%;  animation-duration:11s; animation-delay:2s;   width:3px; height:3px; }
        .p3  { left:28%;  animation-duration:16s; animation-delay:1s;   width:5px; height:5px; }
        .p4  { left:40%;  animation-duration:12s; animation-delay:3.5s; width:3px; height:3px; }
        .p5  { left:52%;  animation-duration:18s; animation-delay:0.5s; width:4px; height:4px; }
        .p6  { left:63%;  animation-duration:13s; animation-delay:4s;   width:5px; height:5px; }
        .p7  { left:74%;  animation-duration:15s; animation-delay:1.5s; width:3px; height:3px; }
        .p8  { left:85%;  animation-duration:10s; animation-delay:2.5s; width:4px; height:4px; }
        .p9  { left:92%;  animation-duration:17s; animation-delay:0s;   width:4px; height:4px; }
        .p10 { left:35%;  animation-duration:14s; animation-delay:5s;   width:3px; height:3px; }
        .p11 { left:58%;  animation-duration:12s; animation-delay:3s;   width:5px; height:5px; }
        .p12 { left:78%;  animation-duration:19s; animation-delay:1s;   width:4px; height:4px; }
      `}</style>

      {/* === Base Background === */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: isDark 
            ? 'linear-gradient(135deg, #050B18 0%, #091020 40%, #0F1A30 75%, #050B18 100%)'
            : 'linear-gradient(135deg, #F3F6FA 0%, #E8EDF4 40%, #DFE5F0 75%, #F3F6FA 100%)',
          zIndex: 0,
          transition: 'background 0.4s ease'
        }}
      />

      {/* === Orb 1 === */}
      <div
        className="aurora-orb-1"
        style={{
          position: 'absolute',
          top: '-15%', left: '-5%',
          width: '55vw', height: '55vw',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle at 40% 40%, rgba(255,107,0,0.12) 0%, rgba(255,107,0,0.03) 50%, transparent 75%)'
            : 'radial-gradient(circle at 40% 40%, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0.05) 50%, transparent 75%)',
          filter: 'blur(50px)',
          zIndex: 1,
        }}
      />

      {/* === Orb 2 === */}
      <div
        className="aurora-orb-2"
        style={{
          position: 'absolute',
          bottom: '-15%', right: '-8%',
          width: '60vw', height: '60vw',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle at 60% 60%, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.03) 50%, transparent 75%)'
            : 'radial-gradient(circle at 60% 60%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.05) 50%, transparent 75%)',
          filter: 'blur(55px)',
          zIndex: 1,
        }}
      />

      {/* === Orb 3 === */}
      <div
        className="aurora-orb-3"
        style={{
          position: 'absolute',
          top: '10%', right: '5%',
          width: '38vw', height: '38vw',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(255,154,60,0.08) 0%, rgba(255,107,0,0.02) 55%, transparent 80%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255,154,60,0.14) 0%, rgba(255,107,0,0.03) 55%, transparent 80%)',
          filter: 'blur(45px)',
          zIndex: 1,
        }}
      />

      {/* === Orb 4 === */}
      <div
        className="aurora-orb-4"
        style={{
          position: 'absolute',
          top: '40%', left: '10%',
          width: '30vw', height: '30vw',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(96,165,250,0.08) 0%, rgba(59,130,246,0.02) 60%, transparent 80%)'
            : 'radial-gradient(circle at 50% 50%, rgba(96,165,250,0.12) 0%, rgba(59,130,246,0.03) 60%, transparent 80%)',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />

      {/* === Subtle Shimmer rings === */}
      <div
        className="shimmer-ring"
        style={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translateX(-50%)',
          width: '300px', height: '300px',
          borderRadius: '50%',
          border: isDark ? '1px solid rgba(255,107,0,0.05)' : '1px solid rgba(255,107,0,0.08)',
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
          border: isDark ? '1px solid rgba(59,130,246,0.05)' : '1px solid rgba(59,130,246,0.08)',
          zIndex: 2,
        }}
      />

      {/* === Mesh dot grid === */}
      <div
        className="aurora-grid"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(99,102,241,0.08) 1.2px, transparent 1.2px)'
            : 'radial-gradient(circle, rgba(99,102,241,0.06) 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px',
          zIndex: 2,
        }}
      />

      {/* === Floating soft particles === */}
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
                ? 'radial-gradient(circle, rgba(255,107,0,0.4), rgba(255,107,0,0))'
                : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(59,130,246,0.4), rgba(59,130,246,0))'
                  : 'radial-gradient(circle, rgba(255,154,60,0.4), rgba(255,154,60,0))',
            }}
          />
        ))}
      </div>

      {/* === Soft vignette overlay === */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        background: isDark
          ? 'radial-gradient(ellipse at center, transparent 60%, rgba(5,11,24,0.6) 100%)'
          : 'radial-gradient(ellipse at center, transparent 60%, rgba(243,246,250,0.3) 100%)',
        pointerEvents: 'none',
      }} />
    </>
  );
}
