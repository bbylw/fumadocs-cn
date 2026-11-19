'use client';
import { useMemo, useState } from 'react';
import Link from 'fumadocs-core/link';

export interface GraphNode {
  id: string;
  text: string;
  description?: string;
  url: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface PositionedNode extends GraphNode {
  x: number;
  y: number;
  neighbors: Set<string>;
}

/** Lightweight interactive SVG relationship graph for documentation pages */
export function GraphView({ graph }: { graph: Graph }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const layout = useMemo(() => {
    const sampleNodes = graph.nodes.slice(0, 36);
    const idSet = new Set(sampleNodes.map((n) => n.id));
    const sampleLinks = graph.links.filter((l) => idSet.has(l.source) && idSet.has(l.target));
    const neighborsMap = new Map<string, Set<string>>();
    for (const n of sampleNodes) neighborsMap.set(n.id, new Set());
    for (const l of sampleLinks) {
      neighborsMap.get(l.source)?.add(l.target);
      neighborsMap.get(l.target)?.add(l.source);
    }

    const cx = 420;
    const cy = 220;
    const positioned: PositionedNode[] = sampleNodes.map((node, idx) => {
      const ring = idx < 8 ? 0 : idx < 22 ? 1 : 2;
      const ringIndex = idx - (ring === 0 ? 0 : ring === 1 ? 8 : 22);
      const ringCount = ring === 0 ? Math.min(8, sampleNodes.length) : ring === 1 ? Math.min(14, sampleNodes.length - 8) : Math.max(1, sampleNodes.length - 22);
      const angle = (ringIndex / ringCount) * Math.PI * 2 - Math.PI / 2;
      const rx = ring === 0 ? 115 : ring === 1 ? 235 : 345;
      const ry = ring === 0 ? 72 : ring === 1 ? 138 : 185;
      return {
        ...node,
        x: Math.round(cx + Math.cos(angle) * rx),
        y: Math.round(cy + Math.sin(angle) * ry),
        neighbors: neighborsMap.get(node.id) ?? new Set(),
      };
    });

    const nodeById = new Map(positioned.map((n) => [n.id, n]));
    return { positioned, nodeById, links: sampleLinks };
  }, [graph]);

  const hovered = hoveredId ? layout.nodeById.get(hoveredId) : undefined;

  return (
    <div className="relative overflow-hidden rounded-xl border bg-fd-background not-prose">
      <svg
        viewBox="0 0 840 440"
        className="block h-[360px] w-full select-none sm:h-[440px]"
        role="img"
        aria-label="文档关联图谱示例"
      >
        <g>
          {layout.links.map((link, i) => {
            const from = layout.nodeById.get(link.source);
            const to = layout.nodeById.get(link.target);
            if (!from || !to) return null;
            const active =
              hoveredId !== null && (from.id === hoveredId || to.id === hoveredId);
            return (
              <line
                key={`${link.source}-${link.target}-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={active ? 'var(--color-fd-primary)' : 'var(--color-fd-border)'}
                strokeOpacity={hoveredId && !active ? 0.25 : active ? 0.9 : 0.65}
                strokeWidth={active ? 1.8 : 1}
              />
            );
          })}
        </g>
        <g>
          {layout.positioned.map((node) => {
            const isHovered = node.id === hoveredId;
            const isNeighbor = hovered ? hovered.neighbors.has(node.id) : false;
            const dimmed = hoveredId !== null && !isHovered && !isNeighbor;
            return (
              <Link
                key={node.id}
                href={node.url}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
                className="outline-none"
              >
                <g opacity={dimmed ? 0.35 : 1}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 7 : isNeighbor ? 6 : 4.5}
                    fill={
                      isHovered || isNeighbor
                        ? 'var(--color-fd-primary)'
                        : 'var(--color-fd-muted-foreground)'
                    }
                  />
                  <text
                    x={node.x}
                    y={node.y + 16}
                    textAnchor="middle"
                    className="fill-fd-foreground text-[10px]"
                  >
                    {node.text.length > 14 ? `${node.text.slice(0, 14)}…` : node.text}
                  </text>
                </g>
              </Link>
            );
          })}
        </g>
      </svg>
      <div className="flex min-h-10 items-center justify-between border-t bg-fd-card px-4 py-2 text-xs text-fd-muted-foreground">
        {hovered ? (
          <span>
            <strong className="font-medium text-fd-foreground">{hovered.text}</strong>
            {hovered.description ? ` — ${hovered.description}` : ''}
          </span>
        ) : (
          <span>悬停或聚焦节点查看页面关联关系（展示前 {layout.positioned.length} 个节点）</span>
        )}
        <span className="shrink-0 font-mono">
          {graph.nodes.length} 页 / {graph.links.length} 条链接
        </span>
      </div>
    </div>
  );
}
