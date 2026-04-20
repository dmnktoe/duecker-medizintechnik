'use client';

import createGlobe, { type COBEOptions } from 'cobe';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSpring } from 'react-spring';

import clsxm from '@/lib/clsxm';

export type GlobeAnchorLabel = {
  markerId: string;
  children: React.ReactNode;
};

function anchorBadgeStyle(markerId: string): CSSProperties {
  return {
    position: 'absolute',
    zIndex: 10,
    pointerEvents: 'none',
    maxWidth: '12rem',
    // CSS anchor positioning (COBE v2) — https://cobe.vercel.app
    ['positionAnchor' as keyof CSSProperties & string]: `--cobe-${markerId}`,
    bottom: 'anchor(top)',
    left: 'anchor(center)',
    translate: '-50% -10px',
    opacity: `var(--cobe-visible-${markerId}, 0)`,
    transition: 'opacity 0.35s ease, filter 0.35s ease',
    filter: `blur(calc((1 - var(--cobe-visible-${markerId}, 0)) * 5px))`,
  } as CSSProperties;
}

/**
 * Default globe (CTA, etc.). COBE v2: use `arcs`, `arcWidth`, `arcHeight`, `markerElevation`,
 * marker `id` for CSS anchors — see https://cobe.vercel.app & `distributionGlobeConfig.ts`.
 */
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  phi: 0,
  theta: 0.3,
  mapSamples: 50000,
  mapBrightness: 3.5,
  mapBaseBrightness: 0.01,
  dark: 0.9,
  diffuse: 4,
  baseColor: [0.122, 0.627, 0.882],
  markerColor: [0.82, 0.93, 1.0],
  glowColor: [0.122, 0.627, 0.882],
  scale: 1.1,
  devicePixelRatio: 2,
  markerElevation: 0.018,
  markers: [
    { location: [14.5995, 120.9842], size: 0.018 },
    { location: [19.076, 72.8777], size: 0.032 },
    { location: [23.8103, 90.4125], size: 0.022 },
    { location: [30.0444, 31.2357], size: 0.028 },
    { location: [39.9042, 116.4074], size: 0.03 },
    { location: [-23.5505, -46.6333], size: 0.034 },
    { location: [19.4326, -99.1332], size: 0.034 },
    { location: [40.7128, -74.006], size: 0.034 },
    { location: [34.6937, 135.5022], size: 0.022 },
    { location: [41.0082, 28.9784], size: 0.024 },
  ],
};

export default function Globe({
  className,
  config = GLOBE_CONFIG,
  anchorLabels,
}: {
  className?: string;
  config?: COBEOptions;
  anchorLabels?: GlobeAnchorLabel[];
}) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [globeHost, setGlobeHost] = useState<HTMLElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  /** Marker ids only — avoids recreating the WebGL globe when the parent passes a new array each render. */
  const anchorIds = useMemo(
    () => anchorLabels?.map((a) => a.markerId).join('\0') ?? '',
    [anchorLabels],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    });

    const host = canvas.parentElement;
    if (host && anchorIds) {
      setGlobeHost(host);
    } else {
      setGlobeHost(null);
    }

    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    let frame = 0;
    const tick = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.005;
      }
      globe.update({
        phi: phiRef.current + r.get(),
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      setGlobeHost(null);
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [anchorIds, config, onResize, r]);

  return (
    <div className={clsxm('absolute aspect-[1/1] w-full', className)}>
      <canvas
        className={clsxm(
          'h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]',
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      {globeHost && anchorLabels?.length
        ? anchorLabels.map((label) =>
            createPortal(
              <div
                key={label.markerId}
                style={anchorBadgeStyle(label.markerId)}
                className={clsxm(
                  'border-primary-300/40 bg-primary-950/80 text-primary-50 inline-block rounded-full border px-2.5 py-1 text-center text-[10px] leading-tight font-semibold whitespace-nowrap shadow-lg backdrop-blur-md sm:px-3 sm:text-xs',
                )}
              >
                {label.children}
              </div>,
              globeHost,
            ),
          )
        : null}
    </div>
  );
}
