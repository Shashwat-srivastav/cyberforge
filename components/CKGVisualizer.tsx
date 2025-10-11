import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { CKGNode, CKGEdge } from '../types';

interface CKGVisualizerProps {
  nodes: CKGNode[];
  edges: CKGEdge[];
}

// Constants for the physics simulation
const REPULSION_STRENGTH = 6000;
const ATTRACTION_STRENGTH = 0.05;
const IDEAL_EDGE_LENGTH = 120;
const DAMPING = 0.95;
const CENTER_GRAVITY = 0.05;
const STOP_THRESHOLD = 0.01;

const CKGVisualizer: React.FC<CKGVisualizerProps> = ({ nodes, edges }) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  // Fix: Use lazy initialization for useState to ensure the Map is created only once. This resolves a potential tooling issue and improves performance.
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(() => new Map());

  const velocitiesRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  // Fix: Initialize useRef with null to provide an initial value, resolving the "Expected 1 arguments, but got 0" error.
  const animationFrameRef = useRef<number | null>(null);

  if (nodes.length === 0) {
    return <div className="text-center text-gray-400">No visual graph to display.</div>;
  }

  const width = 500;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;

  useEffect(() => {
    // Initialize positions and velocities when nodes change
    const initialPositions = new Map<string, { x: number; y: number }>();
    const initialVelocities = new Map<string, { x: number; y: number }>();
    nodes.forEach(node => {
        initialPositions.set(node.id, {
            x: cx + (Math.random() - 0.5) * 50,
            y: cy + (Math.random() - 0.5) * 50
        });
        initialVelocities.set(node.id, { x: 0, y: 0 });
    });
    setNodePositions(initialPositions);
    velocitiesRef.current = initialVelocities;

    const runSimulation = () => {
        setNodePositions(currentPositions => {
            const positions = new Map(currentPositions);
            const velocities = velocitiesRef.current;
            if (positions.size !== nodes.length) {
                return currentPositions; // State not ready, wait
            }
    
            const forces = new Map<string, { x: number; y: number }>();
            nodes.forEach(node => forces.set(node.id, { x: 0, y: 0 }));
    
            // Repulsion forces
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeA = nodes[i];
                    const nodeB = nodes[j];
                    const posA = positions.get(nodeA.id)!;
                    const posB = positions.get(nodeB.id)!;
                    const dx = posA.x - posB.x;
                    const dy = posA.y - posB.y;
                    let distanceSq = dx * dx + dy * dy;
                    if (distanceSq === 0) distanceSq = 0.1; // prevent division by zero
                    const distance = Math.sqrt(distanceSq);
                    const force = REPULSION_STRENGTH / distanceSq;
                    const forceX = (dx / distance) * force;
                    const forceY = (dy / distance) * force;
                    forces.get(nodeA.id)!.x += forceX;
                    forces.get(nodeA.id)!.y += forceY;
                    forces.get(nodeB.id)!.x -= forceX;
                    forces.get(nodeB.id)!.y -= forceY;
                }
            }
            
            // Attraction forces (edges)
            edges.forEach(edge => {
                const sourcePos = positions.get(edge.source);
                const targetPos = positions.get(edge.target);
                if (!sourcePos || !targetPos) return;
    
                const dx = sourcePos.x - targetPos.x;
                const dy = sourcePos.y - targetPos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 0) {
                    const displacement = distance - IDEAL_EDGE_LENGTH;
                    const force = displacement * ATTRACTION_STRENGTH;
                    const forceX = (dx / distance) * force;
                    const forceY = (dy / distance) * force;
        
                    forces.get(edge.source)!.x -= forceX;
                    forces.get(edge.source)!.y -= forceY;
                    forces.get(edge.target)!.x += forceX;
                    forces.get(edge.target)!.y += forceY;
                }
            });
    
            // Center gravity
            nodes.forEach(node => {
                const pos = positions.get(node.id)!;
                const dx = cx - pos.x;
                const dy = cy - pos.y;
                forces.get(node.id)!.x += dx * CENTER_GRAVITY;
                forces.get(node.id)!.y += dy * CENTER_GRAVITY;
            });
            
            let totalMovement = 0;
            const newPositions = new Map<string, { x: number; y: number }>();
    
            nodes.forEach(node => {
                const vel = velocities.get(node.id)!;
                const force = forces.get(node.id)!;
                const pos = positions.get(node.id)!;
                
                vel.x = (vel.x + force.x) * DAMPING;
                vel.y = (vel.y + force.y) * DAMPING;
    
                let newX = pos.x + vel.x;
                let newY = pos.y + vel.y;
                
                // Boundary collision
                if (newX < 50) { newX = 50; vel.x *= -0.5; }
                if (newX > width - 50) { newX = width - 50; vel.x *= -0.5; }
                if (newY < 30) { newY = 30; vel.y *= -0.5; }
                if (newY > height - 30) { newY = height - 30; vel.y *= -0.5; }
    
                newPositions.set(node.id, { x: newX, y: newY });
                totalMovement += Math.abs(vel.x) + Math.abs(vel.y);
            });
    
            if (totalMovement > STOP_THRESHOLD) {
                animationFrameRef.current = requestAnimationFrame(runSimulation);
            }
            return newPositions;
        });
    };

    animationFrameRef.current = requestAnimationFrame(runSimulation);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [nodes, edges]);


  const neighbors = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const connectedNodes = new Set<string>([hoveredNodeId]);
    edges.forEach(edge => {
        if (edge.source === hoveredNodeId) connectedNodes.add(edge.target);
        if (edge.target === hoveredNodeId) connectedNodes.add(edge.source);
    });
    return connectedNodes;
  }, [hoveredNodeId, edges]);

  const getNodeColor = (type: CKGNode['type']) => {
    switch(type) {
      case 'Function': return '#3b82f6'; // blue-500
      case 'Class': return '#8b5cf6'; // purple-500
      case 'File': return '#10b981'; // emerald-500
      case 'Dependency': return '#f59e0b'; // amber-500
      default: return '#6b7280'; // gray-500
    }
  }

  const truncateLabel = (label: string, maxLength: number = 15) => {
    if (label.length <= maxLength) return label;
    return `${label.substring(0, maxLength)}...`;
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 mt-4 overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
        {/* Edges */}
        {edges.map((edge, i) => {
            const sourcePos = nodePositions.get(edge.source);
            const targetPos = nodePositions.get(edge.target);
            if (!sourcePos || !targetPos) return null;

            const isHighlighted = hoveredNodeId && 
                (neighbors.has(edge.source) && neighbors.has(edge.target));
          
            return (
              <line
                key={i}
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                className={`transition-opacity duration-300 ${isHighlighted ? 'stroke-gray-400' : 'stroke-gray-600'} ${hoveredNodeId && !isHighlighted ? 'opacity-20' : 'opacity-100'}`}
                strokeWidth="1"
              />
            );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;

          const isHighlighted = hoveredNodeId ? neighbors.has(node.id) : false;
          const isFaded = hoveredNodeId ? !isHighlighted : false;
          const radius = hoveredNodeId === node.id ? 8 : 6;

          return (
            <g 
                key={node.id} 
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className="cursor-pointer"
            >
              <circle
                r={radius}
                fill={getNodeColor(node.type)}
                className={`transition-all duration-300 ${isFaded ? 'opacity-20' : 'opacity-100'}`}
              />
              <text
                x={pos.x > cx ? -12 : 12}
                y="5"
                textAnchor={pos.x > cx ? 'end' : 'start'}
                className={`transition-opacity duration-300 text-xs ${isHighlighted ? 'fill-gray-100' : 'fill-gray-400'} ${isFaded ? 'opacity-20' : 'opacity-100'}`}
                style={{ pointerEvents: 'none' }}
              >
                  {truncateLabel(node.label)}
                  <title>{node.label}</title>
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CKGVisualizer;