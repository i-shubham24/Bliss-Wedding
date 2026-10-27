"use client";

import type Lenis from "lenis";

// Smooth-scroll instance, shared so anything can scroll, stop or resume it.
let lenis: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenis) {
    // force: scroll even if a menu or the player paused smooth scrolling a moment ago
    lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4), force: true });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView({ behavior: "smooth" });
}

// Anchors whose real destination is a scroll position, not an element (the end of a pin)
const anchors = new Map<string, () => number>();
export function registerAnchor(hash: string, position: () => number) {
  anchors.set(hash, position);
  return () => {
    anchors.delete(hash);
  };
}
export const anchorPosition = (hash: string) => anchors.get(hash)?.();

// The hero announces when its chooda is ready to show (3D shaders compiled, or the still
// poster chosen instead), so the loader can play without jank. Pages without one never wait.
export const SCENE_READY_EVENT = "bliss:scene-ready";
export function markSceneReady() {
  document.documentElement.dataset.scene = "ready";
  window.dispatchEvent(new Event(SCENE_READY_EVENT));
}
export function onSceneReady(fn: () => void) {
  if (document.documentElement.dataset.scene === "ready") {
    fn();
    return () => {};
  }
  window.addEventListener(SCENE_READY_EVENT, fn, { once: true });
  return () => window.removeEventListener(SCENE_READY_EVENT, fn);
}

// The loader tells the hero when the curtain has lifted. The state lives on <html>
// (set before paint on repeat visits), so it survives remounts and dev double-effects.
const READY_EVENT = "bliss:ready";
const isReady = () => document.documentElement.dataset.loaded === "1";
export function markReady() {
  document.documentElement.dataset.loaded = "1";
  window.dispatchEvent(new Event(READY_EVENT));
}
export function onReady(fn: () => void) {
  if (isReady()) {
    fn();
    return () => {};
  }
  window.addEventListener(READY_EVENT, fn, { once: true });
  return () => window.removeEventListener(READY_EVENT, fn);
}

// Any card or button can open a reel in the shared player.
export type ReelRequest = { id: string; title: string };
export const REEL_EVENT = "bliss:reel";
export function openReel(reel: ReelRequest) {
  window.dispatchEvent(new CustomEvent<ReelRequest>(REEL_EVENT, { detail: reel }));
}

export const whatsappLink = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
