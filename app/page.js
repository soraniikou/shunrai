"use client";

import React, { useState } from "react";

export default function Shunrai() {
  const [text, setText] = useState("");
  const [stage, setStage] = useState("input");
  // ランダムに選ばれた言葉を保存するための箱を追加
  const [selectedWord, setSelectedWord] = useState("");

  const words = ["淋しい", "うそつき", "苦しい", "私をみて", "行かないで"];

  const handleCleanse = () => {
    if (!text.trim()) return;

    // ボタンを押した瞬間に、言葉リストから一つだけランダムに選ぶ
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);

    setStage("cleansing");
    
    // 3秒後に「言葉」を表示
    setTimeout(() => setStage("words"), 3000);
    // 7秒後（少し早めました）に最終メッセージを表示
    setTimeout(() => setStage("final"), 7000);
  };

  const reset = () => {
    setText("");
    setStage("input");
    setSelectedWord("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-indigo-800 to-purple-900 overflow-hidden text-white">
      {/* 浮遊する光の粒子 */}
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

      {/* 入力ステージ */}
      {stage === "input" && (
        <div className="flex flex-col items-center gap-6 w-full max-w-xl px-6 z-10" style={{ animation: "fadeIn 1s ease-out" }}>
          {/* タイトルを「春来」に変更 */}
          <h1 className="text-4xl font-light tracking-widest mb-4">
            春来 <span className="text-xl opacity-70">- Shunkai -</span>
          </h1>

          <p className="text-sm text-white/70 text-center mb-2">
            受け取ってしまった痛い言葉を、ここへ...
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="誰かに言われた言葉を入力してください"
            className="w-full h-40 p-5 bg-white/10 backdrop-blur-md rounded-2xl outline-none text-white placeholder-white/40 border border-white/20 focus:border-white/40 transition-all resize-none"
          />

          <button
            onClick={handleCleanse}
            disabled={!text.trim()}
            className="px-10 py-4 rounded-full bg-white/20 hover:bg-white/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30 text-lg tracking-wider"
          >
            浄化する
          </button>
        </div>
      )}

      {/* 浄化中ステージ */}
      {stage === "cleansing" && (
        <div className="absolute text-2xl tracking-widest z-10" style={{ animation: "pulse 2s ease-in-out infinite" }}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <p>浄化しています…</p>
          </div>
        </div>
      )}

      {/* 言語表示ステージ：ランダムに選ばれた1つだけを表示 */}
      {stage === "words" && (
        <div className="absolute z-10 px-6 text-center">
          <div
            className="text-white/80 text-3xl font-light tracking-widest"
            style={{ animation: "fadeInUp 1.5s ease-out both" }}
          >
            {selectedWord}
          </div>
        </div>
      )}

      {/* 最終ステージ */}
      {stage === "final" && (
        <div className="absolute text-center px-6 text-lg max-w-2xl z-10" style={{ animation: "fadeIn 2s ease-out" }}>
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}