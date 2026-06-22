'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHRINE_IMG = "/shrine.png";

/* ── THEMES ─────────────────────────────────────────────────────────── */
const THEMES = {
  kaven:  { neon:"#FF2020", kanji:"破", label:"KAVEN",      romaji:"YABURU",  sub:"REV / PWN / CRYPTO"      },
  vishnu: { neon:"#00D4FF", kanji:"侵", label:"VISHNU",     romaji:"OKASU",   sub:"WEB / OSINT"              },
  kalai:  { neon:"#C050FF", kanji:"解", label:"KALAISELVAN",romaji:"TOKU",    sub:"STEGO / FORENSICS"        },
} as const;

type ThemeKey = keyof typeof THEMES;

/* ── MEMBERS ─────────────────────────────────────────────────────────── */
const MEMBERS = [
  {
    id:"kaven",
    name:"Kaven",
    fullName:"KAVEN",
    username:"M4D4R4",
    kanji:"破",
    romaji:"YABURU",
    role:"Reverse Engineering · PWN · Cryptography",
    bio:"Multi-domain CTF operator specializing in APK reversing, ELF patching, AES-DFA fault injection, RSA recovery, LCG reconstruction, and sandbox escapes.",
    quote:"The binary doesn't lie. Everything else does.",
    wip:"Reversing obfuscated Go binary · heap feng shui exploit chain",
    links:{ github:"#", leetcode:"#", linkedin:"#", resume:"#", email:"#" },
    platforms:[
      { name:"CTFtime", handle:"M4D4R4", url:"#" },
      { name:"HackTheBox", handle:"M4D4R4", url:"#" },
      { name:"PicoCTF", handle:"M4D4R4", url:"#" },
    ],
    stats:[
      { label:"CTFs", value:"40+" },
      { label:"FLAGS", value:"180+" },
      { label:"1ST PLACE", value:"6" },
      { label:"WRITEUPS", value:"3" },
    ],
    heatmap:[
      { cat:"REV",     level:5 },
      { cat:"PWN",     level:4 },
      { cat:"CRYPTO",  level:5 },
      { cat:"WEB",     level:2 },
      { cat:"STEGO",   level:1 },
      { cat:"FORENSIC",level:2 },
      { cat:"OSINT",   level:1 },
      { cat:"MISC",    level:3 },
    ],
    arsenal:["Ghidra","IDA Free","GDB-pwndbg","pwntools","SageMath","Frida","jadx","angr"],
    specs:["REVERSE ENGINEERING","BINARY PWN","AES-DFA ORACLE","ELF PATCHING","LCG BRUTE-FORCE","RSA BÉZOUT","PYJAIL ESCAPE","ANDROID JNI","CRYPTO ANALYSIS"],
    writeups:[
      { title:"AES-DFA Key Recovery via Fault Injection", url:"#" },
      { title:"LCG State Reconstruction — Predictable PRNG", url:"#" },
      { title:"Pyjail Escape: Breaking Python Sandboxes", url:"#" },
    ],
  },
  {
    id:"vishnu",
    name:"Vishnu",
    fullName:"VISHNU",
    username:"Mat_Hatter",
    kanji:"侵",
    romaji:"OKASU",
    role:"Web Exploitation · OSINT",
    bio:"Specialist in prototype pollution, client-side sandbox escapes, S3 policy bypasses, and deep recon pipelines across passive and active attack surfaces.",
    quote:"Every surface is an attack surface if you look hard enough.",
    wip:"Automated OSINT pipeline · WAF bypass research",
    links:{ github:"#", leetcode:"#", linkedin:"#", resume:"#", email:"#" },
    platforms:[
      { name:"CTFtime", handle:"Mat_Hatter", url:"#" },
      { name:"HackTheBox", handle:"Mat_Hatter", url:"#" },
      { name:"TryHackMe", handle:"Mat_Hatter", url:"#" },
    ],
    stats:[
      { label:"CTFs", value:"40+" },
      { label:"FLAGS", value:"120+" },
      { label:"1ST PLACE", value:"6" },
      { label:"WRITEUPS", value:"2" },
    ],
    heatmap:[
      { cat:"REV",     level:1 },
      { cat:"PWN",     level:2 },
      { cat:"CRYPTO",  level:2 },
      { cat:"WEB",     level:5 },
      { cat:"STEGO",   level:1 },
      { cat:"FORENSIC",level:2 },
      { cat:"OSINT",   level:5 },
      { cat:"MISC",    level:3 },
    ],
    arsenal:["Burp Suite","Caido","ffuf","nuclei","amass","sqlmap","Postman","Shodan"],
    specs:["PROTO POLLUTION","XSS / CSRF","SSRF","VM SANDBOX ESC","S3 POLICY BYPASS","DNS COVERT CH","OSINT RECON","PCAP ANALYSIS","API ABUSE"],
    writeups:[
      { title:"Prototype Pollution to RCE", url:"#" },
      { title:"DNS Covert Channel Exfiltration", url:"#" },
    ],
  },
  {
    id:"kalai",
    name:"Kalaiselvan",
    fullName:"KALAISELVAN",
    username:"Cyber_Vanguard",
    kanji:"解",
    romaji:"TOKU",
    role:"Steganography · Digital Forensics",
    bio:"Forensic analyst focused on LSB steganography recovery, ICMP tunnel extraction, SQLite page carving, and multi-layer stego pipelines across image and network artifacts.",
    quote:"The flag was always there. Hidden in plain frequency.",
    wip:"Multi-layer image stego pipeline · NTFS artifact analysis",
    links:{ github:"#", leetcode:"#", linkedin:"#", resume:"#", email:"#" },
    platforms:[
      { name:"CTFtime", handle:"Cyber_Vanguard", url:"#" },
      { name:"HackTheBox", handle:"Cyber_Vanguard", url:"#" },
      { name:"PicoCTF", handle:"Cyber_Vanguard", url:"#" },
    ],
    stats:[
      { label:"CTFs", value:"40+" },
      { label:"FLAGS", value:"150+" },
      { label:"1ST PLACE", value:"6" },
      { label:"WRITEUPS", value:"3" },
    ],
    heatmap:[
      { cat:"REV",     level:1 },
      { cat:"PWN",     level:1 },
      { cat:"CRYPTO",  level:3 },
      { cat:"WEB",     level:2 },
      { cat:"STEGO",   level:5 },
      { cat:"FORENSIC",level:5 },
      { cat:"OSINT",   level:3 },
      { cat:"MISC",    level:3 },
    ],
    arsenal:["Autopsy","Volatility","Wireshark","steghide","zsteg","binwalk","foremost","CyberChef"],
    specs:["LSB STEGO","IMAGE FORENSICS","ICMP TUNNEL","SQLITE CARVING","MEMORY ANALYSIS","HOMOGLYPH DET","XOR RECOVERY","AUTOKEY","FILE CARVING"],
    writeups:[
      { title:"Autokey Vigenère + XOR Stego Recovery", url:"#" },
      { title:"ICMP Tunnel Extraction Workflow", url:"#" },
      { title:"SQLite Page Carving from Memory Dumps", url:"#" },
    ],
  },
];

/* ── TEAM ACHIEVEMENTS — WINS ──────────────────────────────────────── */
const WINS = [
  { title:"CyberNoir CTF — Innovatia 4.0",           sub:"🥇 1st Place",                          year:"2025" },
  { title:"NullCore CTF — Noctivus Symposium",        sub:"🥇 1st Place",                          year:"2025" },
  { title:"Protocol 26E CTF — SV University",         sub:"🥇 1st Place",                          year:"2026" },
  { title:"Tech Arena 2K26 CTF — VELS University",    sub:"🥇 1st Place",                          year:"2026" },
  { title:"AMOR.MORTIS — Cybercom CTF",               sub:"🥇 1st Place (International)",          year:"2026" },
  { title:"ClawCTF — Rendezvous 26",                  sub:"🥇 1st Place",                          year:"2026" },
  { title:"Across Dimensions CTF — AIRO 5.0",         sub:"🥉 3rd Place",                          year:"2025" },
  { title:"CYBERTRON CTF",                            sub:"7th Place Global · 9440 XP · 78+ solves", year:"2026" },
  { title:"DEF CON Chennai CTF (TamilCTF)",           sub:"Top 20 / 45 teams (Top 10 peak)",       year:"2026" },
  { title:"Black Hat USA CTF (Bugcrowd)",             sub:"88th Place Global",                      year:"2025" },
];

/* ── TEAM ACHIEVEMENTS — PARTICIPATIONS ───────────────────────────── */
const PARTICIPATIONS = [
  { title:"KICTF — KI Cyber Conclave",               sub:"14th Place · 6315 points",              year:"2026" },
  { title:"Phantom Flags 2.0",                        sub:"21st Place",                             year:"2025" },
  { title:"Technex CTF",                              sub:"26th Place · 1020 points",               year:"2025" },
  { title:"N3XT_L3V3L CTF",                           sub:"34th Place · 4176 points",               year:"2025" },
  { title:"Terrier Cyberquest",                       sub:"42nd / 300 participants",                year:"2024" },
  { title:"Eschaton CTF Qualifiers",                  sub:"79th Place (International)",             year:"2026" },
  { title:"HITCON CTF",                               sub:"176th / 1278 teams (Global)",            year:"2025" },
  { title:"TFC CTF",                                  sub:"Global Participant (High difficulty)",   year:"2025" },
  { title:"Amrita Cyber Nation CTF (4th Edition)",    sub:"19th Place · 3290 points (Top 10 peak)",year:"2025" },
  { title:"Yukthi CTF 2.0",                           sub:"Top 50 / 300+ teams (Top 5 peak)",      year:"2025" },
  { title:"Hackers Gambit CTF (CTF7)",                sub:"26/40 flags · 5595 points",             year:"2025" },
  { title:"H4CKP13T 0x01 CTF",                        sub:"Participant (Reverse Engineering Focus)",year:"2025" },
  { title:"CodeFest CTF",                             sub:"70th Place · 724 points",               year:"2026" },
  { title:"Alpacahack CTF",                           sub:"Participant",                            year:"2025" },
  { title:"HackZero CTF",                             sub:"Finalist",                               year:"2025" },
];

/* ── UTILS ─────────────────────────────────────────────────────────── */
function hex2rgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ── SAKURA PETAL ───────────────────────────────────────────────────── */
function Petal({ x, delay, dur, neon }: { x: number; delay: number; dur: number; neon: string }) {
  return (
    <motion.div
      style={{
        position:"absolute", top:-16, left:`${x}%`,
        width:7, height:10, borderRadius:"60% 40% 55% 45%",
        background:neon,
        boxShadow:`0 0 8px 2px ${neon}CC`,
        opacity:0, pointerEvents:"none", zIndex:3,
      }}
      animate={{ y:["0vh","110vh"], x:[0,35,-25,55,-10,0],
                 rotate:[0,270,540,720], opacity:[0,0.7,0.5,0.3,0.1,0] }}
      transition={{ duration:dur, delay, repeat:Infinity, ease:"linear" }}
    />
  );
}

/* ── SCANLINES ──────────────────────────────────────────────────────── */
function Scanlines() {
  return (
    <div style={{
      position:"fixed", inset:0, pointerEvents:"none", zIndex:200,
      backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
    }}/>
  );
}

/* ── PULSE DOT ──────────────────────────────────────────────────────── */
function PulseDot({ neon }: { neon: string }) {
  return (
    <span style={{ position:"relative", display:"inline-flex", width:8, height:8, flexShrink:0 }}>
      <motion.span animate={{ scale:[1,2.2,1], opacity:[0.7,0,0.7] }}
        transition={{ duration:1.8, repeat:Infinity }}
        style={{ position:"absolute", inset:0, borderRadius:"50%", background:neon }}/>
      <span style={{ position:"absolute", inset:1.5, borderRadius:"50%", background:neon }}/>
    </span>
  );
}

/* ── CORNER BRACKETS ────────────────────────────────────────────────── */
function Corners({ neon, size=20, thickness=1.5 }: { neon: string; size?: number; thickness?: number }) {
  const style = (pos: string): React.CSSProperties => {
    const base: React.CSSProperties = { position:"absolute", width:size, height:size };
    if (pos==="tl") return {...base, top:0, left:0,   borderTop:`${thickness}px solid ${neon}`, borderLeft:`${thickness}px solid ${neon}`};
    if (pos==="tr") return {...base, top:0, right:0,  borderTop:`${thickness}px solid ${neon}`, borderRight:`${thickness}px solid ${neon}`};
    if (pos==="bl") return {...base, bottom:0, left:0, borderBottom:`${thickness}px solid ${neon}`, borderLeft:`${thickness}px solid ${neon}`};
    return {...base, bottom:0, right:0, borderBottom:`${thickness}px solid ${neon}`, borderRight:`${thickness}px solid ${neon}`};
  };
  return <>
    <div style={style("tl")}/><div style={style("tr")}/>
    <div style={style("bl")}/><div style={style("br")}/>
  </>;
}

/* ── ICON SVGs ──────────────────────────────────────────────────────── */
function GithubIcon(){return(<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>)}
function LinkedinIcon(){return(<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>)}
function LeetcodeIcon(){return(<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>)}
function EmailIcon(){return(<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>)}
function ResumeIcon(){return(<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
function WriteupIcon(){return(<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>)}
function TrophyIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/>
      <path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
      <path d="M6 2h12v7a6 6 0 0 1-12 0V2z"/>
      <line x1="12" y1="15" x2="12" y2="19"/>
      <line x1="8" y1="22" x2="16" y2="22"/>
    </svg>
  );
}
function FlagIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SHRINE REFLECTION CANVAS
══════════════════════════════════════════════════════════════════════ */
function ShrineReflection({ imgRef, neon, ready }: { imgRef: React.RefObject<HTMLImageElement | null>; neon: string; ready: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(null);

  useEffect(() => {
    const img    = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || !ready) return;

    const [r, g, b] = hex2rgb(neon).split(",");

    function draw() {
      if (!canvas || !img) return;
      const W = img.naturalWidth;
      const H = img.naturalHeight;
      if (!W || !H) { animRef.current = requestAnimationFrame(draw); return; }

      const reflectH = Math.floor(H * 0.44);
      if (canvas.width !== W || canvas.height !== reflectH) {
        canvas.width  = W;
        canvas.height = reflectH;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const time = Date.now() * 0.0008;

      ctx.clearRect(0, 0, W, reflectH);
      ctx.save();
      ctx.translate(0, reflectH);
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, W, reflectH);
      ctx.restore();

      const id  = ctx.getImageData(0, 0, W, reflectH);
      const src = new Uint8ClampedArray(id.data);
      for (let y = 0; y < reflectH; y++) {
        const depth = y / reflectH;
        const amp   = depth * 8;
        const xOff  = Math.round(Math.sin(y * (0.022 + depth * 0.05) + time) * amp);
        const yOff  = Math.round(Math.sin(y * 0.065 + time * 0.55) * depth * 2.5);
        for (let x = 0; x < W; x++) {
          const sx = Math.max(0, Math.min(W - 1, x + xOff));
          const sy = Math.max(0, Math.min(reflectH - 1, y + yOff));
          const di = (y * W + x) * 4;
          const si = (sy * W + sx) * 4;
          id.data[di]   = src[si];
          id.data[di+1] = src[si+1];
          id.data[di+2] = src[si+2];
          id.data[di+3] = src[si+3];
        }
      }
      ctx.putImageData(id, 0, 0);

      const grad = ctx.createLinearGradient(0, 0, 0, reflectH);
      grad.addColorStop(0,    "rgba(14,14,17,0)");
      grad.addColorStop(0.45, "rgba(14,14,17,0.45)");
      grad.addColorStop(1,    "rgba(14,14,17,1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, reflectH);

      ctx.fillStyle = `rgba(${r},${g},${b},0.06)`;
      ctx.fillRect(0, 0, W, reflectH);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [ready, neon]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        verticalAlign: "bottom",
        lineHeight: 0,
        opacity: 0.75,
        pointerEvents: "none",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════════════════ */
function HeroSection({ neon, theme }: { neon: string; theme: typeof THEMES[keyof typeof THEMES] }) {
  const [ready, setReady]         = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const shrineRef                 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const petals = Array.from({length:8}, (_,i) => ({
    x: 8 + i * 11, delay: i * 3.2, dur: 22 + i * 2,
  }));

  return (
    <section style={{
      position: "relative",
      height: "100vh",
      minHeight: 680,
      background: "#0E0E11",
      overflow: "clip",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {petals.map((p,i) => <Petal key={i} {...p} neon={neon}/>)}

      <div style={{
        position:"absolute", inset:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        pointerEvents:"none", userSelect:"none", zIndex:0,
      }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={neon}
            initial={{ opacity:0, scale:0.85 }}
            animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0, scale:1.1 }}
            transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{
              fontFamily:"'Noto Serif JP', serif",
              fontSize:"clamp(140px, 20vw, 260px)",
              lineHeight:1,
              color: neon,
              textShadow:`0 0 40px ${neon}, 0 0 80px ${neon}CC, 0 0 160px ${neon}88, 0 0 320px ${neon}44`,
              opacity:0.08,
            }}
          >
            {theme.kanji}
          </motion.span>
        </AnimatePresence>
      </div>

      <div style={{
        position: "absolute",
        bottom: "10vh",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(860px, 88vw)",
        zIndex: 4,
        pointerEvents: "none",
        fontSize: 0,
        lineHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}>
        <motion.img
          ref={shrineRef}
          src={SHRINE_IMG}
          alt="Torii"
          crossOrigin="anonymous"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "100%",
            display: "block",
            verticalAlign: "bottom",
            lineHeight: 0,
            filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.85))",
          }}
          onLoad={() => setImgLoaded(true)}
        />
        {imgLoaded && (
          <>
            <div style={{
              width: "100%",
              height: 2,
              background: `linear-gradient(to right, transparent, ${neon}CC, white, ${neon}CC, transparent)`,
              boxShadow: `0 0 18px 4px ${neon}88, 0 0 40px 8px ${neon}33`,
            }}/>
            <ShrineReflection imgRef={shrineRef} neon={neon} ready={ready} />
          </>
        )}
      </div>

      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 700,
        height: 260,
        background: `radial-gradient(ellipse at 50% 100%, ${neon}18 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 3,
        transition: "background 0.8s ease",
      }}/>

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background: "linear-gradient(to bottom, transparent, #0E0E11)",
        pointerEvents: "none",
        zIndex: 5,
      }}/>

      <div style={{
        position: "relative",
        zIndex: 6,
        textAlign: "center",
        paddingBottom: "40vh",
      }}>
        <motion.p
          initial={{ opacity:0, letterSpacing:"0.15em" }}
          animate={ready ? { opacity:1, letterSpacing:"0.6em" } : {}}
          transition={{ duration:2, delay:1.5, ease:[0.16,1,0.3,1] }}
          style={{
            fontFamily:"'JapanRamen', 'Rajdhani', sans-serif",
            fontSize: 12,
            color: neon,
            marginBottom: 4,
            textShadow: `0 0 20px ${neon}`,
          }}
        >
         HESITATION IS DEFEAT
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:16 }}
          animate={ready ? { opacity:1, y:0 } : {}}
          transition={{ duration:1.6, delay:1.8, ease:[0.16,1,0.3,1] }}
          style={{
            fontFamily:"'JapanRamen', 'Rajdhani', sans-serif",
            fontSize:"clamp(36px,6vw,88px)",
            fontWeight:600,
            letterSpacing:"0.2em",
            color:"#F4F1EA",
            lineHeight:1,
            marginBottom:4,
          }}
        >
          THE_K3RNEL_K1NGS
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PROFILE SECTION
══════════════════════════════════════════════════════════════════════ */
function ProfileSection({ neon, onMemberChange }: { neon: string; onMemberChange: (id: string) => void }) {
  const [active, setActive] = useState<ThemeKey>("kaven");
  const member = MEMBERS.find(m => m.id === active);
  const theme  = THEMES[active];

  const switchMember = (id: ThemeKey) => {
    setActive(id);
    onMemberChange(id);
  };

  const LinkRow = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => (
    <a href={href} target="_blank" rel="noreferrer"
      style={{
        display:"flex", alignItems:"center", gap:10,
        padding:"10px 14px",
        border:`1px solid ${theme.neon}22`,
        color:`${theme.neon}88`,
        textDecoration:"none",
        fontFamily:"'Rajdhani', sans-serif",
        fontSize:9, letterSpacing:"0.4em",
        transition:"border-color 0.2s, color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e=>{
        e.currentTarget.style.borderColor=theme.neon;
        e.currentTarget.style.color=theme.neon;
        e.currentTarget.style.boxShadow=`0 0 12px ${theme.neon}44, inset 0 0 12px ${theme.neon}0A`;
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.borderColor=`${theme.neon}22`;
        e.currentTarget.style.color=`${theme.neon}88`;
        e.currentTarget.style.boxShadow="none";
      }}
    >
      {icon}{label}
    </a>
  );

  return (
    <section style={{ background:"#0E0E11", padding:"0 0 80px" }}>

      <div style={{ maxWidth:1300, margin:"0 auto", padding:"60px clamp(20px,4vw,60px) 40px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:8 }}>
          <div style={{ width:40, height:1, background:neon, boxShadow:`0 0 8px ${neon}` }}/>
          <span style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:9,
            letterSpacing:"0.6em", color:`${neon}99` }}>OPERATORS</span>
        </div>
        <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:"clamp(22px,3vw,40px)",
          fontWeight:600, letterSpacing:"0.12em", color:"#F4F1EA" }}>
          隊員 · THE TEAM
        </div>
      </div>

      <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 clamp(20px,4vw,60px) 0" }}>
        <div style={{ display:"flex", gap:2, marginBottom:0 }}>
          {MEMBERS.map(m => {
            const t = THEMES[m.id as ThemeKey];
            const isA = active === m.id;
            return (
              <button
                key={m.id}
                onClick={() => switchMember(m.id as ThemeKey)}
                style={{
                  flex:1, padding:"16px 20px",
                  background: isA ? "#0E0E11" : "transparent",
                  border:"none",
                  borderBottom: isA ? `2px solid ${t.neon}` : "2px solid #1A1A1E",
                  cursor:"pointer",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                  transition:"border-color 0.3s ease",
                }}
              >
                <span style={{
                  fontFamily:"'Noto Serif JP', serif", fontSize:22,
                  color: isA ? t.neon : "#333",
                  textShadow: isA ? `0 0 20px ${t.neon}, 0 0 40px ${t.neon}88` : "none",
                  transition:"color 0.3s ease, text-shadow 0.3s ease",
                }}>{m.kanji}</span>
                <span style={{
                  fontFamily:"'Rajdhani', sans-serif", fontSize:9,
                  letterSpacing:"0.4em",
                  color: isA ? t.neon : "#3A3A3A",
                  transition:"color 0.3s ease",
                }}>{m.fullName}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-10 }}
          transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
          style={{ maxWidth:1300, margin:"0 auto", padding:"0 clamp(20px,4vw,60px)" }}
        >
          <div style={{
            border:`1px solid ${theme.neon}22`,
            position:"relative", overflow:"hidden",
          }}>
            <Corners neon={theme.neon} size={28} thickness={1.5}/>

            <div style={{
              position:"absolute", right:-40, top:-40,
              fontFamily:"'Noto Serif JP', serif",
              fontSize:500, color:theme.neon,
              opacity:0.025, lineHeight:1,
              textShadow:`0 0 60px ${theme.neon}`,
              pointerEvents:"none", userSelect:"none",
            }}>{member?.kanji}</div>

            <div style={{
              height:2,
              background:`linear-gradient(to right, transparent, ${theme.neon}, ${theme.neon}88, transparent)`,
              boxShadow:`0 0 20px 2px ${theme.neon}`,
            }}/>

            <div
              style={{ padding:"clamp(28px,4vw,52px)", display:"grid",
                gridTemplateColumns:"360px 1fr", gap:"clamp(32px,4vw,60px)",
                alignItems:"stretch" }}
              className="profile-grid"
            >
              {/* LEFT */}
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

                <div style={{
                  position:"relative", aspectRatio:"3/4",
                  background:"#0A0A0D",
                  border:`1px solid ${theme.neon}33`,
                  overflow:"hidden", maxHeight:460,
                }}>
                  <Corners neon={theme.neon} size={16} thickness={1}/>

                  <div style={{
                    position:"absolute", inset:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <span style={{
                      fontFamily:"'Noto Serif JP', serif", fontSize:160,
                      color:theme.neon,
                      textShadow:`0 0 40px ${theme.neon}, 0 0 80px ${theme.neon}88`,
                      opacity:0.12, userSelect:"none",
                    }}>{member?.kanji}</span>
                  </div>

                  <div style={{
                    position:"absolute", bottom:0, left:"15%", right:"15%",
                    height:"78%",
                    background:`linear-gradient(to top, #111114, #0A0A0D88)`,
                    borderRadius:"80px 80px 0 0",
                    border:`1px solid ${theme.neon}22`,
                    borderBottom:"none",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <span style={{
                      fontFamily:"'Noto Serif JP', serif", fontSize:64,
                      color:theme.neon, opacity:0.2,
                    }}>{member?.kanji}</span>
                  </div>

                  <div style={{
                    position:"absolute", top:14, left:14,
                    fontFamily:"'Rajdhani', sans-serif", fontSize:8,
                    letterSpacing:"0.4em", color:theme.neon,
                    border:`1px solid ${theme.neon}66`,
                    padding:"3px 8px",
                    background:"#0E0E11CC",
                    backdropFilter:"blur(4px)",
                    zIndex:2,
                  }}>
                    {member?.role.split("·")[0].trim().toUpperCase()}
                  </div>

                  <motion.div
                    animate={{ y:["0%","110%"] }}
                    transition={{ duration:4, repeat:Infinity, ease:"linear" }}
                    style={{
                      position:"absolute", left:0, right:0, top:0, height:2,
                      background:`linear-gradient(to bottom, transparent, ${theme.neon}66, transparent)`,
                      boxShadow:`0 0 12px ${theme.neon}44`,
                      zIndex:3,
                    }}
                  />
                </div>

                <div style={{ borderLeft:`2px solid ${theme.neon}`, paddingLeft:14 }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:4 }}>
                    <span style={{
                      fontFamily:"'Noto Serif JP', serif", fontSize:28,
                      color:theme.neon,
                      textShadow:`0 0 20px ${theme.neon}, 0 0 40px ${theme.neon}88`,
                      lineHeight:1,
                    }}>{member?.kanji}</span>
                    <span style={{ fontFamily:"'Rajdhani', sans-serif", fontSize:9,
                      letterSpacing:"0.45em", color:`${theme.neon}88` }}>{member?.romaji}</span>
                  </div>
                  <div style={{ fontFamily:"'Rajdhani', sans-serif",
                    fontSize:"clamp(22px,2.5vw,32px)", fontWeight:600,
                    letterSpacing:"0.08em", color:"#F4F1EA", lineHeight:1, marginBottom:6 }}>
                    {member?.fullName}
                  </div>
                  <div style={{ fontFamily:"'Rajdhani', sans-serif", fontSize:11,
                    letterSpacing:"0.3em", color:theme.neon, marginBottom:4 }}>
                    @{member?.username}
                  </div>
                  <div style={{ fontFamily:"'Rajdhani', sans-serif", fontSize:10,
                    letterSpacing:"0.35em", color:`${theme.neon}99` }}>
                    {THEMES[active].sub}
                  </div>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <LinkRow icon={<GithubIcon/>}   label="GITHUB"   href={member?.links.github   ?? "#"} />
                  <LinkRow icon={<LeetcodeIcon/>} label="LEETCODE" href={member?.links.leetcode ?? "#"} />
                  <LinkRow icon={<LinkedinIcon/>} label="LINKEDIN" href={member?.links.linkedin ?? "#"} />
                  <LinkRow icon={<ResumeIcon/>}   label="RESUME"   href={member?.links.resume   ?? "#"} />
                  <LinkRow icon={<EmailIcon/>}    label="EMAIL"    href={member?.links.email    ?? "#"} />
                </div>
              </div>

              {/* RIGHT */}
              <div style={{
                display:"flex", flexDirection:"column",
                justifyContent:"space-between",
                gap:0,
              }}>

                <div style={{ marginBottom:24 }}>
                  <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:8,
                    letterSpacing:"0.6em", color:`${theme.neon}66`, marginBottom:10 }}>
                    OPERATIVE PROFILE
                  </div>
                  <p style={{
                    fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:15,
                    color:"#AAAAAA", lineHeight:1.9, fontWeight:400,
                    letterSpacing:"0.02em",
                  }}>{member?.bio}</p>
                </div>

                <div style={{
                  borderLeft:`2px solid ${theme.neon}44`,
                  paddingLeft:16, position:"relative",
                  marginBottom:24,
                }}>
                  <div style={{
                    fontFamily:"'Noto Serif JP', serif",
                    fontSize:32, color:theme.neon, opacity:0.15,
                    lineHeight:1, position:"absolute", top:-6, left:10,
                    userSelect:"none",
                  }}>"</div>
                  <p style={{
                    fontFamily:"'Rajdhani', sans-serif", fontSize:13,
                    color:`${theme.neon}99`, letterSpacing:"0.06em",
                    fontStyle:"italic", lineHeight:1.6, paddingTop:6,
                  }}>{member?.quote}</p>
                </div>

                <div style={{ marginBottom:24 }}>
                  <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:8,
                    letterSpacing:"0.6em", color:`${theme.neon}66`, marginBottom:12 }}>
                    DOMAIN PROFICIENCY
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                    {member?.heatmap.map((h,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <span style={{
                          fontFamily:"'Rajdhani', sans-serif", fontSize:8,
                          letterSpacing:"0.35em", color:`${theme.neon}55`,
                          width:68, flexShrink:0, textAlign:"right",
                        }}>{h.cat}</span>
                        <div style={{ flex:1, display:"flex", gap:3 }}>
                          {[1,2,3,4,5].map(lvl => (
                            <motion.div
                              key={lvl}
                              initial={{ opacity:0, scaleX:0 }}
                              animate={{ opacity:1, scaleX:1 }}
                              transition={{ delay:0.04*i + 0.025*lvl, duration:0.3 }}
                              style={{
                                flex:1, height:7,
                                background: lvl <= h.level ? theme.neon : `${theme.neon}12`,
                                boxShadow: lvl <= h.level ? `0 0 6px ${theme.neon}88` : "none",
                                transformOrigin:"left",
                              }}
                            />
                          ))}
                        </div>
                        <span style={{
                          fontFamily:"'Rajdhani', sans-serif", fontSize:8,
                          color:`${theme.neon}30`, width:14, flexShrink:0,
                        }}>{h.level}/5</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom:24 }}>
                  <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:8,
                    letterSpacing:"0.6em", color:`${theme.neon}66`, marginBottom:12 }}>
                    TECHNICAL CAPABILITIES
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {member?.specs.map((s,i) => (
                      <motion.div key={i}
                        initial={{ opacity:0, scale:0.88 }}
                        animate={{ opacity:1, scale:1 }}
                        transition={{ delay:0.05*i }}
                        style={{
                          fontFamily:"'Rajdhani', sans-serif", fontSize:9,
                          letterSpacing:"0.35em", color:theme.neon,
                          border:`1px solid ${theme.neon}44`,
                          padding:"5px 12px", fontWeight:500,
                          boxShadow:`0 0 8px ${theme.neon}18`,
                        }}
                      >{s}</motion.div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom:24 }}>
                  <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:8,
                    letterSpacing:"0.6em", color:`${theme.neon}66`, marginBottom:10 }}>
                    ARSENAL
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {member?.arsenal.map((tool,i) => (
                      <motion.span key={i}
                        initial={{ opacity:0 }}
                        animate={{ opacity:1 }}
                        transition={{ delay:0.04*i }}
                        style={{
                          fontFamily:"'Rajdhani', sans-serif", fontSize:9,
                          letterSpacing:"0.25em", color:"#484848",
                          background:"#0D0D10", border:"1px solid #1E1E22",
                          padding:"5px 11px",
                        }}
                      >{tool}</motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:8,
                    letterSpacing:"0.6em", color:`${theme.neon}66`, marginBottom:12 }}>
                    WRITEUPS
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    {member?.writeups.map((w,i) => (
                      <motion.a
                        key={i} href={w.url} target="_blank" rel="noreferrer"
                        initial={{ opacity:0, x:-8 }}
                        animate={{ opacity:1, x:0 }}
                        transition={{ delay:0.06*i }}
                        style={{
                          display:"flex", alignItems:"center", gap:10,
                          padding:"11px 14px",
                          border:`1px solid ${theme.neon}1A`,
                          color:`${theme.neon}77`,
                          textDecoration:"none",
                          fontFamily:"'Rajdhani', sans-serif",
                          fontSize:13, letterSpacing:"0.04em",
                          transition:"border-color 0.2s, color 0.2s, background 0.2s",
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>)=>{
                          e.currentTarget.style.borderColor=`${theme.neon}55`;
                          e.currentTarget.style.color=theme.neon;
                          e.currentTarget.style.background=`${theme.neon}08`;
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>)=>{
                          e.currentTarget.style.borderColor=`${theme.neon}1A`;
                          e.currentTarget.style.color=`${theme.neon}77`;
                          e.currentTarget.style.background="transparent";
                        }}
                      >
                        <span style={{ flexShrink:0, opacity:0.5 }}><WriteupIcon/></span>
                        {w.title}
                      </motion.a>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div style={{
              height:1,
              background:`linear-gradient(to right, transparent, ${theme.neon}88, transparent)`,
              boxShadow:`0 0 12px ${theme.neon}66`,
            }}/>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ACHIEVEMENT ROW
══════════════════════════════════════════════════════════════════════ */
function AchievementRow({ item, idx, vis, neon, accent }: { item: { title: string; sub: string; year: string }; idx: number; vis: boolean; neon: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity:0, y:8 }}
      animate={vis ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.55, delay: idx * 0.045 }}
      style={{
        padding:"16px 0",
        borderBottom:`1px solid ${accent}0E`,
        display:"flex", justifyContent:"space-between",
        alignItems:"center", gap:12,
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:14, minWidth:0 }}>
        <p style={{
          fontFamily:"'Rajdhani', sans-serif", fontSize:15,
          color:"#D0CCC5", fontWeight:500, letterSpacing:"0.04em",
          marginBottom:3, lineHeight:1.3,
        }}>
          {item.title}
        </p>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:16, flexShrink:0 }}>
        <p style={{
          fontFamily:"'Rajdhani', sans-serif", fontSize:11,
          color:"#525252", letterSpacing:"0.05em",
          textAlign:"right", lineHeight:1.5,
        }}>{item.sub}</p>
        <span style={{
          fontFamily:"'Rajdhani', sans-serif", fontSize:10,
          color:"#2A2A2A", flexShrink:0, minWidth:32, textAlign:"right",
        }}>{item.year}</span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ACHIEVEMENTS SECTION
══════════════════════════════════════════════════════════════════════ */
function AchievementsSection({ neon }: { neon: string }) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const [tab, setTab] = useState<"wins"|"participations">("wins");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, {threshold:0.05});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const WIN_COLOR  = "#FFD700";
  const PART_COLOR = neon;

  const activeData   = tab === "wins" ? WINS : PARTICIPATIONS;
  const activeAccent = tab === "wins" ? WIN_COLOR : PART_COLOR;

  return (
    <section ref={ref} style={{ background:"#0E0E11", padding:"80px 0 100px" }}>
      <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 clamp(20px,4vw,60px)" }}>

        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:8 }}>
          <div style={{ width:40, height:1, background:neon, boxShadow:`0 0 8px ${neon}` }}/>
          <span style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:9,
            letterSpacing:"0.6em", color:`${neon}99` }}>TEAM RECORD</span>
        </div>
        <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:"clamp(22px,3vw,40px)",
          fontWeight:600, letterSpacing:"0.12em", color:"#F4F1EA", marginBottom:12 }}>
          战绩 · ACHIEVEMENTS
        </div>
        <p style={{
          fontFamily:"'Rajdhani', sans-serif", fontSize:13,
          color:"#3A3A3A", letterSpacing:"0.08em", marginBottom:48, maxWidth:520,
        }}>
          COLLECTIVE RECORD — ALL VICTORIES AND BUILDS EARNED AS ONE UNIT
        </p>

        <div style={{
          display:"flex", gap:2, marginBottom:0,
          borderBottom:`1px solid #1A1A1E`,
        }}>
          <button
            onClick={() => setTab("wins")}
            style={{
              padding:"14px 28px",
              background: tab === "wins" ? "#0E0E11" : "transparent",
              border:"none",
              borderBottom: tab === "wins" ? `2px solid ${WIN_COLOR}` : "2px solid transparent",
              cursor:"pointer",
              display:"flex", alignItems:"center", gap:10,
              transition:"border-color 0.25s",
              marginBottom:"-1px",
            }}
          >
            <span style={{ color: tab === "wins" ? WIN_COLOR : "#333", transition:"color 0.25s", display:"flex", alignItems:"center" }}>
              <TrophyIcon size={15} color={tab === "wins" ? WIN_COLOR : "#333"} />
            </span>
            <span style={{
              fontFamily:"'Rajdhani', sans-serif", fontSize:10,
              letterSpacing:"0.45em", fontWeight:600,
              color: tab === "wins" ? WIN_COLOR : "#333",
              transition:"color 0.25s",
              textShadow: tab === "wins" ? `0 0 12px ${WIN_COLOR}88` : "none",
            }}>WINS</span>
            <span style={{
              fontFamily:"'Rajdhani', sans-serif", fontSize:8, letterSpacing:"0.2em",
              color: tab === "wins" ? `${WIN_COLOR}99` : "#222",
              background: tab === "wins" ? `${WIN_COLOR}18` : "#161616",
              border:`1px solid ${tab === "wins" ? `${WIN_COLOR}44` : "#222"}`,
              padding:"1px 7px", transition:"all 0.25s",
            }}>{WINS.length}</span>
          </button>

          <button
            onClick={() => setTab("participations")}
            style={{
              padding:"14px 28px",
              background: tab === "participations" ? "#0E0E11" : "transparent",
              border:"none",
              borderBottom: tab === "participations" ? `2px solid ${neon}` : "2px solid transparent",
              cursor:"pointer",
              display:"flex", alignItems:"center", gap:10,
              transition:"border-color 0.25s",
              marginBottom:"-1px",
            }}
          >
            <span style={{ color: tab === "participations" ? neon : "#333", transition:"color 0.25s", display:"flex", alignItems:"center" }}>
              <FlagIcon size={14} color={tab === "participations" ? neon : "#333"} />
            </span>
            <span style={{
              fontFamily:"'Rajdhani', sans-serif", fontSize:10,
              letterSpacing:"0.45em", fontWeight:600,
              color: tab === "participations" ? neon : "#333",
              transition:"color 0.25s",
              textShadow: tab === "participations" ? `0 0 12px ${neon}88` : "none",
            }}>PARTICIPATIONS</span>
            <span style={{
              fontFamily:"'Rajdhani', sans-serif", fontSize:8, letterSpacing:"0.2em",
              color: tab === "participations" ? `${neon}99` : "#222",
              background: tab === "participations" ? `${neon}18` : "#161616",
              border:`1px solid ${tab === "participations" ? `${neon}44` : "#222"}`,
              padding:"1px 7px", transition:"all 0.25s",
            }}>{PARTICIPATIONS.length}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity:0, y:14 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
          >
            <div style={{
              display:"flex", alignItems:"center", gap:20,
              padding:"28px 0 20px",
              borderBottom:`1px solid ${activeAccent}18`,
              marginBottom:4,
            }}>
              <div style={{
                fontFamily:"'Rajdhani', sans-serif", fontSize:8,
                letterSpacing:"0.55em", color: activeAccent,
                border:`1px solid ${activeAccent}44`,
                padding:"4px 14px", fontWeight:600,
                boxShadow:`0 0 12px ${activeAccent}22`,
                textShadow:`0 0 10px ${activeAccent}`,
                flexShrink:0,
              }}>
                {tab === "wins" ? "勝利 · VICTORIES" : "参加 · FIELD OPS"}
              </div>
              <div style={{ fontFamily:"'Rajdhani', sans-serif", fontSize:12, letterSpacing:"0.1em", color:"#282828" }}>
                {tab === "wins"
                  ? "1ST PLACE · PODIUM · NOTABLE HIGH-RANK FINISHES"
                  : "COMPETITIVE PARTICIPATIONS · ALL PLATFORMS · ALL TIERS"}
              </div>
              <div style={{ flex:1, height:1, background:`linear-gradient(to right, ${activeAccent}33, transparent)` }}/>
              <span style={{ fontFamily:"'Rajdhani', sans-serif", fontSize:10, color:`${activeAccent}55`, letterSpacing:"0.2em" }}>{activeData.length} ENTRIES</span>
            </div>

            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",
              columnGap:60, rowGap:0,
            }}>
              {activeData.map((item, idx) => (
                <AchievementRow
                  key={item.title}
                  item={item}
                  idx={idx}
                  vis={vis}
                  neon={neon}
                  accent={activeAccent}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  { text:"REVERSE ENGINEERING", glyph:"破" },
  { text:"BINARY EXPLOITATION", glyph:"▸" },
  { text:"WEB VULNERABILITIES", glyph:"侵" },
  { text:"OSINT & RECON", glyph:"◈" },
  { text:"STEGANOGRAPHY", glyph:"解" },
  { text:"DIGITAL FORENSICS", glyph:"◉" },
  { text:"CRYPTANALYSIS", glyph:"⬡" },
  { text:"CTF COMPETITION", glyph:"旗" },
  { text:"BUG BOUNTY", glyph:"◆" },
  { text:"ZERO TRUST ARCH", glyph:"⬢" },
  { text:"THREAT INTELLIGENCE", glyph:"目" },
  { text:"HESITATION IS DEFEAT", glyph:"不" },
];

function Marquee({ neon }: { neon: string }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div style={{
      position:"relative", overflow:"hidden",
      borderTop:`1px solid ${neon}22`,
      borderBottom:`1px solid ${neon}22`,
      background:`linear-gradient(to right, #0E0E11 0%, transparent 8%, transparent 92%, #0E0E11 100%)`,
      zIndex:10,
    }}>
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:2,
        background:`linear-gradient(to right, #0E0E11 0%, transparent 120px, transparent calc(100% - 120px), #0E0E11 100%)`,
      }}/>
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:1,
        background:`linear-gradient(to right, transparent, ${neon}66, transparent)`,
        boxShadow:`0 0 8px ${neon}44`, transition:"background 0.8s ease",
      }}/>
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:1,
        background:`linear-gradient(to right, transparent, ${neon}66, transparent)`,
        boxShadow:`0 0 8px ${neon}44`, transition:"background 0.8s ease",
      }}/>

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{ display:"flex", alignItems:"center", width:"max-content", gap:0, padding:"18px 0" }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:20, paddingRight:52, flexShrink:0 }}>
            <span style={{
              fontFamily:"'Noto Serif JP', serif", fontSize:13, color:neon,
              textShadow:`0 0 12px ${neon}`, opacity:0.7, flexShrink:0,
              transition:"color 0.8s ease, text-shadow 0.8s ease",
            }}>{item.glyph}</span>
            <span style={{
              fontFamily:"'Rajdhani', sans-serif", fontSize:11, fontWeight:500,
              letterSpacing:"0.45em", color:"#3A3A3A", whiteSpace:"nowrap",
            }}>{item.text}</span>
            <span style={{
              display:"inline-block", width:4, height:4,
              background:`${neon}55`, boxShadow:`0 0 6px ${neon}`, flexShrink:0,
              transition:"background 0.8s ease",
            }}/>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════ */
export default function KernelKings() {
  const [globalNeon, setGlobalNeon] = useState("#FF2020");
  const [activeId,   setActiveId]   = useState<ThemeKey>("kaven");

  const handleMemberChange = (id: string) => {
    const key = id as ThemeKey;
    setActiveId(key);
    setGlobalNeon(THEMES[key].neon);
  };

  const theme  = THEMES[activeId];
  const petals = Array.from({length:6}, (_,i) => ({
    x: 5 + i * 16, delay: i * 4.5, dur: 24 + i * 2.5,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400&family=Rajdhani:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html, body { background:#0E0E11; overflow-x:hidden; }
        ::-webkit-scrollbar { width:2px; background:#0E0E11; }
        ::-webkit-scrollbar-thumb { background:${globalNeon}55; }
        .profile-grid { grid-template-columns: 360px 1fr !important; }
        @media (max-width:860px) { .profile-grid { grid-template-columns:1fr !important; } }
        @media (max-width:600px) { .profile-grid { padding:24px !important; } }
        @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.7} 94%{opacity:1} }
        @font-face {
          font-family: 'JapanRamen';
          src: url('/fonts/JAPAN_RAMEN.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <Scanlines />

      <div style={{
        position:"fixed", bottom:"-20%", left:"50%",
        transform:"translateX(-50%)",
        width:600, height:600, borderRadius:"50%",
        boxShadow:`0 0 200px 80px ${globalNeon}08`,
        pointerEvents:"none", zIndex:0,
        transition:"box-shadow 0.8s ease",
      }}/>

      {petals.map((p,i) => <Petal key={i} {...p} neon={globalNeon}/>)}

      <div style={{
        position:"fixed", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        fontFamily:"'Noto Serif JP', serif",
        fontSize:"min(32vw,32vh)",
        color:globalNeon,
        textShadow:`0 0 80px ${globalNeon}22`,
        opacity:0.025, pointerEvents:"none", userSelect:"none",
        zIndex:0, lineHeight:1,
        transition:"color 0.8s ease, text-shadow 0.8s ease",
      }}>不</div>

      <motion.header
        initial={{ opacity:0, y:-20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.9, delay:0.3 }}
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          padding:"16px 40px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          borderBottom:`1px solid ${globalNeon}1A`,
          background:"#0E0E11E8",
          backdropFilter:"blur(8px)",
          transition:"border-color 0.8s ease",
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{
            width:30, height:30,
            border:`1px solid ${globalNeon}`,
            boxShadow:`0 0 12px ${globalNeon}66`,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"border-color 0.8s ease, box-shadow 0.8s ease",
          }}>
            <span style={{
              fontFamily:"'Noto Serif JP', serif", fontSize:13,
              color:globalNeon, lineHeight:1,
              textShadow:`0 0 10px ${globalNeon}`,
              transition:"color 0.8s ease",
            }}>不</span>
          </div>
          <div>
            <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:12,
              letterSpacing:"0.45em", color:"#F4F1EA", fontWeight:500 }}>
              THE_K3RNEL_K1NGS
            </div>
            <div style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:8,
              letterSpacing:"0.5em", color:`${globalNeon}88`,
              transition:"color 0.8s ease" }}>
              HESITATION IS DEFEAT
            </div>
          </div>
        </div>
        
      </motion.header>

      <div style={{ position:"relative", zIndex:4, paddingTop:62 }}>
        <HeroSection neon={globalNeon} theme={theme} />
        <Marquee neon={globalNeon} />
        <ProfileSection neon={globalNeon} onMemberChange={handleMemberChange} />
        <AchievementsSection neon={globalNeon} />

        <footer style={{
          borderTop:`1px solid ${globalNeon}18`,
          padding:"32px clamp(20px,4vw,60px)",
          display:"flex", justifyContent:"space-between",
          alignItems:"center", flexWrap:"wrap", gap:20,
          maxWidth:1300, margin:"0 auto",
          transition:"border-color 0.8s ease",
        }}>
          <div style={{ textAlign:"right", display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontFamily:"'Noto Serif JP', serif", fontSize:22,
              color:globalNeon, opacity:0.3,
              textShadow:`0 0 20px ${globalNeon}`,
              transition:"color 0.8s ease, text-shadow 0.8s ease" }}>不敗</span>
            <span style={{ fontFamily:"'JapanRamen', 'Rajdhani', sans-serif", fontSize:9,
              letterSpacing:"0.4em", color:"#2A2A2A" }}>
              THE_K3RNEL_K1NGS © 2025
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}