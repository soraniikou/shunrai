"use client";

import React, { useState } from "react";

export default function Shunrai() {
  const [text, setText] = useState("");
  const [stage, setStage] = useState("input");

  const words = ["淋しい", "うそつき", "苦しい", "私をみて", "行かないで"];

  const handleCleanse = () => {
    if (!text.trim()) return;
    setStage("cleansing");
    setTimeout(() => setStage("words"), 3000);
    setTimeout(() => setStage("final"), 9000);
  };

  const reset = () => {
    setText("");
    setStage("input");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-indigo-800 to-purple-900 overflow-hidden text-white">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Input Stage */}
      {stage === "input" && (
        <div
          className="flex flex-col items-center gap-6 w-full max-w-xl px-6 z-10 animate-fade-in"
          style={{
            animation: "fadeIn 1s ease-out",
          }}
        >
          <h1 className="text-4xl font-light tracking-widest mb-4">
            春雷 <span className="text-xl opacity-70">- Shunrai -</span>
          </h1>

          <p className="text-sm text-white/70 text-center mb-2">
            受け取ってしまった痛い言葉を、ここへ...
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="誰かに言われた言葉を入力してください"
            className="w-full h-40 p-5 bg-white/10 backdrop-blur-md rounded-2xl outline-none text-white placeholder-white/40 border border-white/20 focus:border-white/40 transition-all resize-none"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          />

          <button
            onClick={handleCleanse}
            disabled={!text.trim()}
            className="px-10 py-4 rounded-full bg-white/20 hover:bg-white/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30 text-lg tracking-wider"
            style={{
              boxShadow: "0 4px 16px rgba(255,255,255,0.1)",
            }}
          >
            浄化する
          </button>
        </div>
      )}

      {/* Cleansing Stage */}
      {stage === "cleansing" && (
        <div
          className="absolute text-2xl tracking-widest z-10"
          style={{
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <p>浄化しています…</p>
          </div>
        </div>
      )}

      {/* Words Stage */}
      {stage === "words" && (
        <div className="absolute flex flex-col gap-6 text-2xl z-10 px-6">
          {words.map((word, index) => (
            <div
              key={word}
              className="text-white/80 text-center"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 1.2}s both`,
              }}
            >
              {word}
            </div>
          ))}
        </div>
      )}

      {/* Final Stage */}
      {stage === "final" && (
        <div
          className="absolute text-center px-6 text-lg max-w-2xl z-10"
          style={{
            animation: "fadeIn 2s ease-out",
          }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
            <p className="text-2xl mb-6 leading-relaxed">
              これはあなたのせいではありません。
            </p>
            <p className="text-xl mb-8 leading-relaxed text-white/80">
              相手の心の叫びを、ここに置いていきましょう。
            </p>
            <button
              onClick={reset}
              className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm border border-white/30"
            >
              もう一度
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}