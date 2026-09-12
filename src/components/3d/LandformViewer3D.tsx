"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LandformType } from '@/types/game';

interface Props {
  landform: LandformType;
}

export const LandformViewer3D: React.FC<Props> = ({ landform }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 260;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 7, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
    sunLight.position.set(10, 15, 10);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    fillLight.position.set(-10, 8, -10);
    scene.add(fillLight);

    // Group for animated rotation
    const landformGroup = new THREE.Group();
    scene.add(landformGroup);

    // Build geometry based on landform type
    if (landform === 'mountains') {
      // Create multi-peak mountain range
      const mountainMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        roughness: 0.8,
        flatShading: true
      });
      const snowMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.3,
        flatShading: true
      });

      // Main Peak
      const peak1 = new THREE.Mesh(new THREE.ConeGeometry(3.2, 4.5, 7), mountainMat);
      peak1.position.set(0, 2.25, 0);
      landformGroup.add(peak1);

      // Snowcap
      const cap1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.0, 7), snowMat);
      cap1.position.set(0, 3.5, 0);
      landformGroup.add(cap1);

      // Secondary peaks
      const peak2 = new THREE.Mesh(new THREE.ConeGeometry(2.2, 3.2, 6), mountainMat);
      peak2.position.set(-2.5, 1.6, -1);
      landformGroup.add(peak2);

      const peak3 = new THREE.Mesh(new THREE.ConeGeometry(2.5, 3.5, 6), mountainMat);
      peak3.position.set(2.4, 1.75, -0.5);
      landformGroup.add(peak3);

    } else if (landform === 'plateaus') {
      // Flat-topped elevated tableland with sheer cliffs
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.85,
        flatShading: true
      });
      const topMat = new THREE.MeshStandardMaterial({
        color: 0x854d0e,
        roughness: 0.9,
        flatShading: true
      });

      // Elevated tableland cylinder with wide flat top
      const plateauMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 4.2, 2.8, 8),
        baseMat
      );
      plateauMesh.position.set(0, 1.4, 0);
      landformGroup.add(plateauMesh);

      // Flat top surface cap
      const topCap = new THREE.Mesh(
        new THREE.CylinderGeometry(3.48, 3.48, 0.2, 8),
        topMat
      );
      topCap.position.set(0, 2.85, 0);
      landformGroup.add(topCap);

      // Cascading waterfall strip
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.1,
        metalness: 0.3
      });
      const waterfall = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 2.6),
        waterMat
      );
      waterfall.position.set(0, 1.4, 3.7);
      waterfall.rotation.y = 0;
      landformGroup.add(waterfall);

    } else if (landform === 'plains') {
      // Broad lush green undulating plain with gentle river
      const plainsMat = new THREE.MeshStandardMaterial({
        color: 0x65a30d,
        roughness: 0.7,
        flatShading: true
      });
      const plainMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(4.8, 5.0, 0.8, 12),
        plainsMat
      );
      plainMesh.position.set(0, 0.4, 0);
      landformGroup.add(plainMesh);

      // Meandering river ribbon on the plain
      const riverMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        roughness: 0.2,
        metalness: 0.4
      });
      const river = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.85, 8.5),
        riverMat
      );
      river.position.set(0, 0.45, 0);
      river.rotation.y = 0.4;
      landformGroup.add(river);

      // Small trees
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
      const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d });
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const rad = 2.8;
        const tree = new THREE.Group();
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.5, 4), trunkMat);
        trunk.position.y = 0.25;
        const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35), foliageMat);
        foliage.position.y = 0.6;
        tree.add(trunk, foliage);
        tree.position.set(Math.cos(angle) * rad, 0.8, Math.sin(angle) * rad);
        landformGroup.add(tree);
      }

    } else if (landform === 'valleys') {
      // Two flanking ridges with a low river gorge between them
      const ridgeMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.85,
        flatShading: true
      });
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x4ade80,
        roughness: 0.8
      });
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.1
      });

      // Left Ridge
      const leftRidge = new THREE.Mesh(new THREE.ConeGeometry(2.8, 3.8, 5), ridgeMat);
      leftRidge.position.set(-2.8, 1.9, 0);
      landformGroup.add(leftRidge);

      // Right Ridge
      const rightRidge = new THREE.Mesh(new THREE.ConeGeometry(2.8, 3.8, 5), ridgeMat);
      rightRidge.position.set(2.8, 1.9, 0);
      landformGroup.add(rightRidge);

      // Valley Floor
      const floor = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.6, 7), floorMat);
      floor.position.set(0, 0.3, 0);
      landformGroup.add(floor);

      // River streaming through the valley floor
      const river = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.65, 7.2), waterMat);
      river.position.set(0, 0.35, 0);
      landformGroup.add(river);

    } else if (landform === 'coasts') {
      // Coastline: Land meets the shimmering ocean
      const landMat = new THREE.MeshStandardMaterial({
        color: 0x84cc16,
        roughness: 0.8,
        flatShading: true
      });
      const sandMat = new THREE.MeshStandardMaterial({
        color: 0xfde047,
        roughness: 0.9
      });
      const seaMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.15,
        metalness: 0.5,
        transparent: true,
        opacity: 0.85
      });

      // Inland grassy ground
      const inland = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.2, 8), landMat);
      inland.position.set(-2.2, 0.6, 0);
      landformGroup.add(inland);

      // Beach sand transition
      const beach = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 8), sandMat);
      beach.position.set(0.4, 0.35, 0);
      landformGroup.add(beach);

      // Ocean waters
      const ocean = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.5, 8), seaMat);
      ocean.position.set(2.8, 0.25, 0);
      landformGroup.add(ocean);
    }

    // Animation Loop (gentle continuous rotation)
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      landformGroup.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [landform]);

  return (
    <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-800/80 border border-white/10 shadow-inner flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 right-3 pointer-events-none px-2 py-1 rounded bg-black/40 text-[10px] text-slate-300 backdrop-blur-sm">
        3D Landform Model • Auto-Rotating
      </div>
    </div>
  );
};
