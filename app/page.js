"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Shunrai() {
  const [text, setText] = useState("");
  const [stage, setStage] = useState("input");
  const [particles, setParticles] = useState([]);
  const [textChars, setTextChars] = useState([]);
  const [petals, setPetals] = useState([]);

  // 星パーティクル生成（固定シード的に位置を計算）
  const starPositions = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: ((i * 37 + 13) % 97) + 1,
    top: ((i * 53 + 7) % 93) + 1,
    delay: (i * 0.3) % 4,
    duration: 2 + (i % 3),
  }));

  const handleCleanse = () => {
    if (!text.trim()) return;

    // テキストを1文字ずつに分解
    const chars = text.trim().split("").map((char, i) => ({
      id: i,
      char,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50,
      delay: i * 0.6,
    }));
    setTextChars(chars);
    setStage("cleansing");

    setTimeout(() => setStage("words"), 16000);
    setTimeout(() => {
      // 桜の花びら生成
      const newPetals = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: (i * 4 + Math.floor(i * 1.7)) % 100,
        duration: 5 + (i % 5) * 1.5,
        delay: i * 0.4,
        size: 18 + (i % 4) * 8,
        swing: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15),
      }));
      setPetals(newPetals);
      setStage("final");
    }, 11000);
  };

  const reset = () => {
    setText("");
    setStage("input");
    setTextChars([]);
    setPetals([]);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background:
          stage === "final"
            ? "transparent"
            : "linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #1a0a2e 100%)",
        transition: "all 3s ease-in-out",
      }}
    >
      {/* 桜背景（finalステージ） */}
      {stage === "final" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/sakura.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* 星パーティクル */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.id % 5 === 0 ? "3px" : "2px",
              height: star.id % 5 === 0 ? "3px" : "2px",
              opacity: 0.4 + (star.id % 4) * 0.15,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Input Stage */}
      {stage === "input" && (
        <div
          className="flex flex-col items-center gap-6 w-full max-w-xl px-6 z-10"
          style={{ animation: "fadeIn 1.2s ease-out" }}
        >
          <h1
            className="text-4xl font-light tracking-widest mb-4 text-white"
            style={{
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
              textShadow: "0 0 30px rgba(180,160,255,0.4)",
            }}
          >
            春来{" "}
            <span className="text-xl opacity-60">- Shunrai -</span>
          </h1>

          <p
            className="text-sm text-center mb-2"
            style={{ color: "rgba(200,180,255,0.7)" }}
          >
            受け取った言葉を、ここへ...
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="誰かに言われた言葉を入力してください"
            className="w-full h-40 p-5 rounded-2xl outline-none resize-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          />

          <button
            onClick={handleCleanse}
            disabled={!text.trim()}
            style={{
              padding: "14px 40px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              fontSize: "1.1rem",
              letterSpacing: "0.15em",
              cursor: text.trim() ? "pointer" : "not-allowed",
              opacity: text.trim() ? 1 : 0.4,
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(255,255,255,0.08)",
              transition: "all 0.3s ease",
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
            }}
          >
            浄化する
          </button>
        </div>
      )}

      {/* Cleansing Stage — 文字が羽に乗って舞い上がり消える */}
      {stage === "cleansing" && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ pointerEvents: "none" }}
        >
          {/* 羽の画像 — 中央から上へ舞い上がる */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animation: "wingFloat 16s ease-in forwards",
              zIndex: 5,
            }}
          >
            <img
              src="/hane.png"
              alt="羽"
              style={{
                width: "180px",
                opacity: 0.85,
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))",
              }}
            />
          </div>

          {/* テキスト文字たちが羽と一緒に舞い上がって消える */}
          {textChars.map((c) => (
            <div
              key={c.id}
              style={{
                position: "absolute",
                left: `calc(50% + ${(c.id - textChars.length / 2) * 22}px)`,
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.9)",
                fontSize: "1.4rem",
                fontFamily:
                  "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
                animation: `charAscend 14s ease-in ${c.delay}s forwards`,
                zIndex: 10,
                textShadow: "0 0 15px rgba(255,220,255,0.8)",
              }}
            >
              {c.char}
            </div>
          ))}

          {/* 浄化テキスト */}
          <p
            style={{
              position: "absolute",
              bottom: "30%",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.9rem",
              letterSpacing: "0.3em",
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
              animation: "fadeIn 1s ease-out",
            }}
          >
            浄化しています…
          </p>
        </div>
      )}

      {/* Words Stage */}
      {stage === "words" && (
        <div
          className="absolute flex flex-col gap-6 text-2xl z-10 px-6 items-center"
        >
          <p
            className="text-white/80 text-center"
            style={{
              animation: "fadeInUp 0.8s ease-out",
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
            }}
          >
            さようなら
          </p>
        </div>
      )}

      {/* Final Stage — 桜背景、枠なし */}
      {stage === "final" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
          style={{ animation: "fadeIn 2s ease-out" }}
        >
          <p
            className="text-2xl mb-6 leading-relaxed text-center"
            style={{
              color: "rgba(80,40,20,0.9)",
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
              textShadow: "0 1px 3px rgba(255,255,255,0.6)",
              animation: "fadeInUp 1.5s ease-out",
            }}
          >
            流してみたり　消してみたり
          </p>
          <p
            className="text-lg mb-10 leading-relaxed text-center max-w-xs"
            style={{
              color: "rgba(80,40,20,0.75)",
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
              textShadow: "0 1px 3px rgba(255,255,255,0.6)",
              animation: "fadeInUp 1.5s ease-out 0.5s both",
            }}
          >
            相手の心の叫びを、ここに置いていきましょう。
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 36px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(200,150,150,0.4)",
              color: "rgba(80,30,30,0.85)",
              fontSize: "1rem",
              letterSpacing: "0.1em",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              animation: "fadeInUp 1.5s ease-out 1s both",
              fontFamily:
                "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
            }}
          >
            again
          </button>

          {/* 花びら */}
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute pointer-events-none"
              style={{
                left: `${petal.left}%`,
                top: "-30px",
                fontSize: `${petal.size}px`,
                animation: `petalFall ${petal.duration}s linear ${petal.delay}s forwards`,
                zIndex: 20,
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        @keyframes wingFloat {
          0%   { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.85; }
          30%  { transform: translate(-50%, -80%) scale(1.1) rotate(-8deg); opacity: 0.9; }
          70%  { transform: translate(-50%, -160%) scale(1.2) rotate(5deg); opacity: 0.6; }
          100% { transform: translate(-50%, -280%) scale(0.8) rotate(-10deg); opacity: 0; }
        }
        @keyframes charAscend {
          0%   { transform: translateY(-50%) scale(1); opacity: 1; }
          20%  { transform: translateY(calc(-50% - 40px)) scale(1.05); opacity: 1; }
          60%  { transform: translateY(calc(-50% - 120px)) scale(0.9) rotate(var(--rot, 5deg)); opacity: 0.7; }
          100% { transform: translateY(calc(-50% - 280px)) scale(0.5); opacity: 0; }
        }
        @keyframes petalFall {
          0%   { top: -30px; opacity: 0; transform: rotate(0deg) translateX(0); }
          10%  { opacity: 0.85; }
          90%  { opacity: 0.6; }
          100% { top: 110vh; opacity: 0; transform: rotate(720deg) translateX(60px); }
        }
      `}</style>
    </div>
  );
}

