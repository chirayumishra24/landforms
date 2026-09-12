"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LandformType } from '@/types/game';
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Compass, Eye } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  landform: LandformType;
  onSelectHotspot?: (name: string, description: string) => void;
  selectedHotspotName?: string | null;
}

export const LandformViewer3D: React.FC<Props> = ({
  landform,
  onSelectHotspot,
  selectedHotspotName
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (selectedHotspotName) {
      setActiveHotspot(selectedHotspotName);
    }
  }, [selectedHotspotName]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 9.5, 14.5);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Warm Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.0);
    sunLight.position.set(14, 22, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-12, 10, -10);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x1e293b, 0.7);
    scene.add(hemiLight);

    // Diorama Group
    const dioramaGroup = new THREE.Group();
    scene.add(dioramaGroup);
    groupRef.current = dioramaGroup;

    // Floating Island Pedestal Base
    const baseRadius = 5.4;
    const baseHeight = 1.6;

    // Layer 1: Stratified Soil Core
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x3d2817,
      roughness: 0.9,
      flatShading: true
    });
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(baseRadius, baseRadius * 0.85, baseHeight, 28),
      pedestalMat
    );
    pedestal.position.y = -baseHeight / 2;
    pedestal.receiveShadow = true;
    dioramaGroup.add(pedestal);

    // Layer 2: Deep Bedrock Foundation
    const bedrockMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.95 });
    const bedrock = new THREE.Mesh(
      new THREE.CylinderGeometry(baseRadius * 0.86, baseRadius * 0.75, 0.6, 28),
      bedrockMat
    );
    bedrock.position.y = -baseHeight - 0.3;
    dioramaGroup.add(bedrock);

    // Animated Elements Tracker
    const animItems: { update: (time: number) => void }[] = [];
    const interactivePins: { mesh: THREE.Mesh; name: string }[] = [];

    // Helper: Clustered Pine Tree
    const createPine = (x: number, y: number, z: number, scale = 1, snowTipped = false) => {
      const tree = new THREE.Group();
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x45220c, roughness: 0.9 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * scale, 0.12 * scale, 0.6 * scale, 5), trunkMat);
      trunk.position.y = 0.3 * scale;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliageMat = new THREE.MeshStandardMaterial({
        color: snowTipped ? 0x1e3a29 : 0x14532d,
        roughness: 0.85,
        flatShading: true
      });

      const snowMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });

      for (let i = 0; i < 3; i++) {
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry((0.55 - i * 0.12) * scale, 0.7 * scale, 6),
          foliageMat
        );
        cone.position.y = (0.6 + i * 0.4) * scale;
        cone.castShadow = true;
        tree.add(cone);

        if (snowTipped && i === 2) {
          const snowCap = new THREE.Mesh(
            new THREE.ConeGeometry(0.25 * scale, 0.3 * scale, 6),
            snowMat
          );
          snowCap.position.y = 1.6 * scale;
          tree.add(snowCap);
        }
      }

      tree.position.set(x, y, z);
      dioramaGroup.add(tree);
    };

    // Helper: Broadleaf Deciduous Tree
    const createBroadleaf = (x: number, y: number, z: number, scale = 1, isFruit = false) => {
      const tree = new THREE.Group();
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x543d2b, roughness: 0.9 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1 * scale, 0.16 * scale, 0.7 * scale, 6), trunkMat);
      trunk.position.y = 0.35 * scale;
      tree.add(trunk);

      const crownMat = new THREE.MeshStandardMaterial({
        color: isFruit ? 0x16a34a : 0x22c55e,
        roughness: 0.7,
        flatShading: true
      });
      const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55 * scale), crownMat);
      crown.position.y = 0.95 * scale;
      crown.castShadow = true;
      tree.add(crown);

      if (isFruit) {
        const appleMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
        for (let i = 0; i < 5; i++) {
          const apple = new THREE.Mesh(new THREE.SphereGeometry(0.08 * scale, 4, 4), appleMat);
          const angle = (i / 5) * Math.PI * 2;
          apple.position.set(
            Math.cos(angle) * 0.45 * scale,
            (0.85 + (i % 2) * 0.25) * scale,
            Math.sin(angle) * 0.45 * scale
          );
          tree.add(apple);
        }
      }

      tree.position.set(x, y, z);
      dioramaGroup.add(tree);
    };

    // Helper: Cloud
    const createCloud = (x: number, y: number, z: number, scale = 1) => {
      const cloud = new THREE.Group();
      const cloudMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        transparent: true,
        opacity: 0.92
      });

      const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.6 * scale, 8, 8), cloudMat);
      const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.45 * scale, 8, 8), cloudMat);
      p2.position.set(0.5 * scale, -0.1 * scale, 0.1 * scale);
      const p3 = new THREE.Mesh(new THREE.SphereGeometry(0.4 * scale, 8, 8), cloudMat);
      p3.position.set(-0.48 * scale, -0.1 * scale, -0.1 * scale);

      cloud.add(p1, p2, p3);
      cloud.position.set(x, y, z);
      dioramaGroup.add(cloud);

      const initX = x;
      animItems.push({
        update: (time) => {
          cloud.position.x = initX + Math.sin(time * 0.7 + initX) * 0.45;
          cloud.position.y = y + Math.cos(time * 0.5 + initX) * 0.15;
        }
      });
    };

    // Helper: 3D Glowing Hotspot Pin
    const create3DPin = (x: number, y: number, z: number, name: string) => {
      const pinGroup = new THREE.Group();
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.9,
        roughness: 0.2
      });
      const pinMesh = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), sphereMat);
      pinMesh.position.y = 0.5;
      pinGroup.add(pinMesh);

      const stemMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8 });
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), stemMat);
      stem.position.y = 0.25;
      pinGroup.add(stem);

      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.35, 16), ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.05;
      pinGroup.add(ring);

      pinGroup.position.set(x, y, z);
      dioramaGroup.add(pinGroup);

      interactivePins.push({ mesh: pinMesh, name });

      animItems.push({
        update: (time) => {
          pinMesh.position.y = 0.5 + Math.sin(time * 3.5 + x) * 0.12;
          ring.scale.setScalar(1.0 + Math.sin(time * 4.0 + z) * 0.3);
        }
      });
    };

    // ================= SPECIFIC LANDFORM DIORAMAS =================

    if (landform === 'mountains') {
      // 1. Foothill Alpine Meadow Turf
      const turfMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.85, flatShading: true });
      const turf = new THREE.Mesh(new THREE.CylinderGeometry(baseRadius, baseRadius, 0.18, 28), turfMat);
      turf.position.y = 0.09;
      turf.receiveShadow = true;
      dioramaGroup.add(turf);

      // 2. High-Altitude Slate Rock & Crags
      const rockMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.9,
        flatShading: true
      });
      const snowMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.15,
        flatShading: true
      });

      // Main Peak - Multi-faceted Jagged Ridge
      const hornGroup = new THREE.Group();
      const p1 = new THREE.Mesh(new THREE.ConeGeometry(3.2, 5.6, 7), rockMat);
      p1.position.set(0, 2.8, -0.4);
      p1.castShadow = true;
      hornGroup.add(p1);

      // Jagged Snowcap with dripping couloirs
      const snowHorn = new THREE.Mesh(new THREE.ConeGeometry(1.65, 2.7, 7), snowMat);
      snowHorn.position.set(0, 4.3, -0.4);
      hornGroup.add(snowHorn);

      // East Arête Ridge
      const eastRidge = new THREE.Mesh(new THREE.ConeGeometry(2.3, 4.4, 6), rockMat);
      eastRidge.position.set(2.2, 2.2, -0.8);
      eastRidge.castShadow = true;
      hornGroup.add(eastRidge);

      const eastSnow = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.0, 6), snowMat);
      eastSnow.position.set(2.2, 3.4, -0.8);
      hornGroup.add(eastSnow);

      // West Crag
      const westCrag = new THREE.Mesh(new THREE.ConeGeometry(2.4, 4.2, 6), rockMat);
      westCrag.position.set(-2.3, 2.1, 0.3);
      westCrag.castShadow = true;
      hornGroup.add(westCrag);

      const westSnow = new THREE.Mesh(new THREE.ConeGeometry(1.15, 1.9, 6), snowMat);
      westSnow.position.set(-2.3, 3.25, 0.3);
      hornGroup.add(westSnow);

      // Rocky scree boulders at base
      for (let i = 0; i < 7; i++) {
        const boulder = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.35 + (i % 3) * 0.15),
          rockMat
        );
        const angle = (i / 7) * Math.PI * 2;
        boulder.position.set(Math.cos(angle) * 3.4, 0.25, Math.sin(angle) * 3.4);
        boulder.rotation.set(i * 0.5, i * 0.8, 0);
        dioramaGroup.add(boulder);
      }
      dioramaGroup.add(hornGroup);

      // 3. Glacial Lake (Tarn) & Torrent Stream
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.05,
        metalness: 0.35,
        transparent: true,
        opacity: 0.92
      });
      const tarn = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.12, 16), waterMat);
      tarn.position.set(0.6, 0.15, 2.0);
      dioramaGroup.add(tarn);

      const stream = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.1, 2.8), waterMat);
      stream.position.set(0.5, 0.14, 3.5);
      stream.rotation.y = -0.15;
      dioramaGroup.add(stream);

      // 4. Stepped Terrace Farming (Human Land Adaptation)
      const terraceSoilMat = new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.8 });
      const terraceWallMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9 });
      for (let i = 0; i < 4; i++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(1.5 - i * 0.18, 0.2, 0.7),
          terraceSoilMat
        );
        step.position.set(-1.8, 0.25 + i * 0.22, 1.5 + i * 0.4);
        step.rotation.y = 0.2;

        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(1.55 - i * 0.18, 0.22, 0.08),
          terraceWallMat
        );
        wall.position.set(-1.8, 0.25 + i * 0.22, 1.85 + i * 0.4);
        wall.rotation.y = 0.2;

        dioramaGroup.add(step, wall);
      }

      // 5. Alpine Pine Forest
      createPine(-3.2, 0.18, 1.0, 1.2, true);
      createPine(-2.8, 0.18, 2.4, 0.95, false);
      createPine(-3.6, 0.18, 1.9, 0.85, false);
      createPine(2.5, 0.18, 1.8, 1.1, true);
      createPine(3.1, 0.18, 0.9, 0.9, false);
      createPine(2.9, 0.18, 2.6, 0.8, false);

      // 6. Mountaineering Basecamp Tents & Campfire
      const tentMat1 = new THREE.MeshStandardMaterial({ color: 0xf97316 }); // Orange dome tent
      const tent1 = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.5, 4), tentMat1);
      tent1.position.set(1.6, 0.4, 2.6);
      tent1.rotation.y = Math.PI / 4;
      dioramaGroup.add(tent1);

      const tentMat2 = new THREE.MeshStandardMaterial({ color: 0x06b6d4 }); // Cyan tent
      const tent2 = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.45, 4), tentMat2);
      tent2.position.set(2.2, 0.38, 2.2);
      tent2.rotation.y = Math.PI / 6;
      dioramaGroup.add(tent2);

      // Flickering campfire
      const fireMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      const fire = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12), fireMat);
      fire.position.set(1.7, 0.22, 2.1);
      dioramaGroup.add(fire);

      const fireLight = new THREE.PointLight(0xf97316, 1.2, 3);
      fireLight.position.set(1.7, 0.35, 2.1);
      dioramaGroup.add(fireLight);

      animItems.push({
        update: (time) => {
          fireLight.intensity = 1.0 + Math.sin(time * 12) * 0.4;
        }
      });

      // 7. Alpine Clouds
      createCloud(-1.6, 5.0, 0.6, 1.1);
      createCloud(2.2, 4.6, -0.4, 0.9);

      // 8. 3D Hotspot Pins
      create3DPin(0, 5.8, -0.4, "Glacial Summit");
      create3DPin(-1.8, 1.4, 2.0, "Terrace Steps");
      create3DPin(1.8, 0.8, 2.4, "Alpine Basecamp");

    } else if (landform === 'plateaus') {
      // 1. Stratified Volcanic Tableland (Mesa)
      // Basaltic Tableland Structure
      const mesaMat = new THREE.MeshStandardMaterial({
        color: 0x854d0e,
        roughness: 0.9,
        flatShading: true
      });
      const mesa = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.6, 2.8, 18), mesaMat);
      mesa.position.y = 1.4;
      mesa.castShadow = true;
      mesa.receiveShadow = true;
      dioramaGroup.add(mesa);

      // Red Sandstone Strata Band
      const bandMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.9 });
      const band = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.35, 0.8, 18), bandMat);
      band.position.y = 1.1;
      dioramaGroup.add(band);

      // Tableland Top Cap
      const capMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.8 });
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(3.78, 3.78, 0.2, 18), capMat);
      cap.position.y = 2.88;
      dioramaGroup.add(cap);

      // 2. Cascading Waterfall over the Plateau Cliff!
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.05,
        transparent: true,
        opacity: 0.92
      });
      const waterfall = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.8), waterMat);
      waterfall.position.set(0, 1.4, 3.82);
      dioramaGroup.add(waterfall);

      // Splashing pool at base
      const pool = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.12, 16), waterMat);
      pool.position.set(0, 0.1, 4.0);
      dioramaGroup.add(pool);

      animItems.push({
        update: (time) => {
          waterfall.scale.y = 1.0 + Math.sin(time * 8) * 0.02;
          pool.scale.setScalar(1.0 + Math.sin(time * 4) * 0.04);
        }
      });

      // 3. Opencast Mineral Quarry with Gold / Iron Ore Nodes
      const mineMat = new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.95 });
      const minePit = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.8, 0.35, 10), mineMat);
      minePit.position.set(1.6, 2.85, -1.0);
      dioramaGroup.add(minePit);

      // Sparkling Gold & Bauxite Ore Crystals
      const oreMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      for (let i = 0; i < 4; i++) {
        const ore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12), oreMat);
        ore.position.set(1.4 + (i % 2) * 0.3, 3.0, -1.1 + Math.floor(i / 2) * 0.3);
        dioramaGroup.add(ore);
      }

      // Minecart & Track
      const trackMat = new THREE.MeshStandardMaterial({ color: 0x44403c });
      const track = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 0.2), trackMat);
      track.position.set(1.6, 2.95, -0.3);
      track.rotation.y = 0.3;
      dioramaGroup.add(track);

      const cartMat = new THREE.MeshStandardMaterial({ color: 0x713f12 });
      const cart = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.3), cartMat);
      cart.position.set(1.8, 3.1, -0.25);
      cart.rotation.y = 0.3;
      dioramaGroup.add(cart);

      // Plateau Acacia & Scrub Trees
      createBroadleaf(-1.8, 2.9, 0.8, 0.75, false);
      createBroadleaf(-0.8, 2.9, -1.4, 0.7, false);
      createBroadleaf(1.4, 2.9, 1.4, 0.65, false);

      createCloud(0, 4.8, 0, 1.2);

      // 3D Hotspot Pins
      create3DPin(-1.2, 3.4, 0.5, "Tableland Summit");
      create3DPin(0, 3.2, 3.8, "Plunging Waterfall");
      create3DPin(1.6, 3.5, -0.8, "Mineral Quarry");

    } else if (landform === 'plains') {
      // 1. Vast Alluvial Plain Turf
      const soilMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 });
      const plainBed = new THREE.Mesh(new THREE.CylinderGeometry(baseRadius, baseRadius, 0.4, 28), soilMat);
      plainBed.position.y = 0.2;
      plainBed.receiveShadow = true;
      dioramaGroup.add(plainBed);

      // 2. Patchwork Agricultural Fields (Wheat, Paddy, Silt)
      const wheatMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.7 });
      const paddyMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.75 });
      const loamMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });

      const f1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.8), wheatMat);
      f1.position.set(-2.2, 0.44, -1.4);
      dioramaGroup.add(f1);

      const f2 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.9), paddyMat);
      f2.position.set(2.1, 0.44, -1.2);
      dioramaGroup.add(f2);

      const f3 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.5), loamMat);
      f3.position.set(2.2, 0.44, 1.6);
      dioramaGroup.add(f3);

      // 3. Wide Meandering Blue River
      const riverMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.1,
        metalness: 0.35
      });
      const river = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.14, 10.2), riverMat);
      river.position.set(0, 0.42, 0);
      river.rotation.y = 0.38;
      dioramaGroup.add(river);

      // 4. Arched Stone Bridge
      const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.85 });
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 0.8), bridgeMat);
      bridge.position.set(0, 0.65, 0.2);
      dioramaGroup.add(bridge);

      // 5. Traditional Farmhouse & Working Windmill!
      const barnGroup = new THREE.Group();
      const barnWalls = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.7, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xb91c1c })
      );
      barnWalls.position.y = 0.35;
      const barnRoof = new THREE.Mesh(
        new THREE.ConeGeometry(0.85, 0.5, 4),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      barnRoof.position.y = 0.95;
      barnRoof.rotation.y = Math.PI / 4;
      barnGroup.add(barnWalls, barnRoof);
      barnGroup.position.set(-2.4, 0.4, 1.6);
      dioramaGroup.add(barnGroup);

      // Animated Windmill
      const millTower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.45, 1.4, 8),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9 })
      );
      millTower.position.set(-3.6, 1.1, 0.2);
      dioramaGroup.add(millTower);

      const millBladesGroup = new THREE.Group();
      millBladesGroup.position.set(-3.6, 1.7, 0.45);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      for (let i = 0; i < 4; i++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.02), bladeMat);
        blade.rotation.z = (i * Math.PI) / 2;
        blade.position.set(
          Math.cos((i * Math.PI) / 2) * 0.45,
          Math.sin((i * Math.PI) / 2) * 0.45,
          0
        );
        millBladesGroup.add(blade);
      }
      dioramaGroup.add(millBladesGroup);

      animItems.push({
        update: (time) => {
          millBladesGroup.rotation.z = time * 2.2;
        }
      });

      // Deciduous Trees
      createBroadleaf(-1.4, 0.4, -2.8, 0.8, false);
      createBroadleaf(3.4, 0.4, 0, 0.85, false);
      createBroadleaf(1.4, 0.4, 3.2, 0.75, false);

      createCloud(-1.5, 3.6, 1.2, 0.9);
      createCloud(2.2, 3.8, -0.6, 1.0);

      // 3D Hotspot Pins
      create3DPin(-2.0, 1.1, -1.2, "Alluvial Farms");
      create3DPin(0, 1.2, 0.3, "Perennial River");
      create3DPin(-2.6, 1.4, 1.8, "Grain Barn & Silo");

    } else if (landform === 'valleys') {
      // 1. High Flanking Mountain Ridges creating a Sheltered U-Trough
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9, flatShading: true });
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 });

      // Left Ridge Wall
      const leftWall = new THREE.Mesh(new THREE.ConeGeometry(3.0, 5.2, 7), wallMat);
      leftWall.position.set(-3.4, 2.4, -0.5);
      leftWall.castShadow = true;
      dioramaGroup.add(leftWall);

      // Right Ridge Wall
      const rightWall = new THREE.Mesh(new THREE.ConeGeometry(3.0, 5.2, 7), wallMat);
      rightWall.position.set(3.4, 2.4, -0.5);
      rightWall.castShadow = true;
      dioramaGroup.add(rightWall);

      // Valley Low Floor
      const floor = new THREE.Mesh(new THREE.CylinderGeometry(baseRadius, baseRadius, 0.4, 28), floorMat);
      floor.position.y = 0.2;
      floor.receiveShadow = true;
      dioramaGroup.add(floor);

      // 2. Crystal Valley River
      const riverMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.05,
        metalness: 0.3
      });
      const river = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 10.2), riverMat);
      river.position.set(0, 0.42, 0);
      dioramaGroup.add(river);

      // 3. Wooden Footbridge
      const footbridgeMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
      const footbridge = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.15, 0.5), footbridgeMat);
      footbridge.position.set(0, 0.55, 0.4);
      dioramaGroup.add(footbridge);

      // 4. Clustered Valley Village Chalets
      const chaletMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x0369a1 });
      for (let i = 0; i < 3; i++) {
        const chalet = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.45), chaletMat);
        base.position.y = 0.22;
        const rf = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.4, 4), roofMat);
        rf.position.y = 0.65;
        rf.rotation.y = Math.PI / 4;
        chalet.add(base, rf);
        chalet.position.set(-1.4, 0.4, -1.6 + i * 1.5);
        dioramaGroup.add(chalet);
      }

      // 5. Apple & Peach Orchards
      createBroadleaf(1.6, 0.4, -2.0, 0.85, true);
      createBroadleaf(1.8, 0.4, -0.6, 0.9, true);
      createBroadleaf(1.5, 0.4, 1.2, 0.8, true);
      createBroadleaf(2.0, 0.4, 2.6, 0.75, true);

      createCloud(0, 4.2, 0, 1.15);

      // 3D Hotspot Pins
      create3DPin(0, 1.0, 0.4, "Sheltered Corridor");
      create3DPin(-1.4, 1.2, 0, "Terrace Settlements");
      create3DPin(1.7, 1.3, -0.6, "Fruit Orchards");

    } else if (landform === 'coasts') {
      // 1. Ocean Basin with Rolling Waves
      const oceanMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.1,
        metalness: 0.4,
        transparent: true,
        opacity: 0.9
      });
      const ocean = new THREE.Mesh(new THREE.CylinderGeometry(baseRadius, baseRadius, 0.35, 28), oceanMat);
      ocean.position.y = 0.18;
      dioramaGroup.add(ocean);

      // 2. Coastal Headland & Sandy Beach
      const grassMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8 });
      const sandMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.85 });

      const landBluff = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.7, 10.2), grassMat);
      landBluff.position.set(-3.0, 0.45, 0);
      dioramaGroup.add(landBluff);

      const beach = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.45, 10.2), sandMat);
      beach.position.set(-0.35, 0.35, 0);
      dioramaGroup.add(beach);

      // 3. Iconic Red & White Spiraled Lighthouse Tower!
      const lhGroup = new THREE.Group();
      const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
      const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });

      const lhBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.52, 2.4, 14), whiteMat);
      lhBase.position.y = 1.2;
      const stripe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.45, 0.6, 14), redMat);
      stripe1.position.y = 1.2;
      const lanternRoom = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 10, 10),
        new THREE.MeshStandardMaterial({
          color: 0xfef08a,
          emissive: 0xfef08a,
          emissiveIntensity: 0.95
        })
      );
      lanternRoom.position.y = 2.5;

      // Volumetric rotating light beam
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const beam = new THREE.Mesh(new THREE.ConeGeometry(0.9, 5.5, 8), beamMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.set(2.75, 0, 0);
      lanternRoom.add(beam);

      lhGroup.add(lhBase, stripe1, lanternRoom);
      lhGroup.position.set(-3.0, 0.7, -2.2);
      dioramaGroup.add(lhGroup);

      animItems.push({
        update: (time) => {
          lanternRoom.rotation.y = time * 2.2;
        }
      });

      // 4. Harbor Pier & Bobbing Sailboat
      const pierMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
      const pier = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 0.65), pierMat);
      pier.position.set(0.6, 0.45, 1.4);
      dioramaGroup.add(pier);

      const boat = new THREE.Group();
      const hull = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.35, 0.45),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      hull.position.y = 0.18;
      const sail = new THREE.Mesh(
        new THREE.ConeGeometry(0.45, 0.9, 3),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 })
      );
      sail.position.set(0, 0.7, 0);
      boat.add(hull, sail);
      boat.position.set(2.5, 0.3, -0.4);
      dioramaGroup.add(boat);

      animItems.push({
        update: (time) => {
          boat.position.y = 0.3 + Math.sin(time * 2.4) * 0.06;
          boat.rotation.z = Math.sin(time * 1.8) * 0.07;
        }
      });

      // Coastal Palms
      createBroadleaf(-2.4, 0.8, 1.8, 1.1, false);
      createBroadleaf(-3.4, 0.8, 0.4, 1.0, false);
      createBroadleaf(-1.6, 0.8, 3.2, 0.9, false);

      createCloud(1.8, 3.8, 0, 1.05);

      // 3D Hotspot Pins
      create3DPin(-3.0, 3.4, -2.2, "Coastal Lighthouse");
      create3DPin(0.6, 0.9, 1.4, "Natural Bay & Dock");
      create3DPin(-0.4, 0.9, -1.0, "Sandy Dunes & Palms");
    }

    // Touch & Mouse Orbit Interaction (Smart Board Friendly)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !dioramaGroup) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;

      dioramaGroup.rotation.y += deltaX * 0.008;
      dioramaGroup.rotation.x = Math.max(-0.2, Math.min(0.5, dioramaGroup.rotation.x + deltaY * 0.005));

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Raycast on 3D Hotspot Click / Tap
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = interactivePins.map(p => p.mesh);
      const intersects = raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        const hit = interactivePins.find(p => p.mesh === intersects[0].object);
        if (hit) {
          soundEngine.playPlacement();
          setActiveHotspot(hit.name);
          const desc = hotspotsByLandform[landform]?.find(h => h.name === hit.name)?.desc || '';
          if (onSelectHotspot) onSelectHotspot(hit.name, desc);
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onCanvasClick);

    container.addEventListener('touchstart', onPointerDown);
    window.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDragging && dioramaGroup) {
        dioramaGroup.rotation.y += 0.005;
      }

      animItems.forEach(item => item.update(elapsedTime));
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
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onCanvasClick);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [landform, autoRotate]);

  const handleZoom = (inDir: boolean) => {
    soundEngine.playClick();
    if (cameraRef.current) {
      const step = inDir ? -1.5 : 1.5;
      cameraRef.current.position.z = Math.max(7, Math.min(19, cameraRef.current.position.z + step));
    }
  };

  const hotspotsByLandform: Record<LandformType, { name: string; icon: string; desc: string }[]> = {
    mountains: [
      { name: "Glacial Summit", icon: "❄️", desc: "Perpetual snowpack & glaciers serve as water towers for entire continents." },
      { name: "Terrace Steps", icon: "🚜", desc: "Carved hillside steps slow water runoff and make mountain agriculture possible." },
      { name: "Alpine Basecamp", icon: "⛺", desc: "Eco-tourism, trekking routes, and shepherd shelters in the safe lower valleys." }
    ],
    plateaus: [
      { name: "Tableland Summit", icon: "🟫", desc: "Elevated flat tableland composed of ancient volcanic basalt & sandstone." },
      { name: "Plunging Waterfall", icon: "💧", desc: "Rivers dropping over steep cliff edges create clean hydroelectric power." },
      { name: "Mineral Quarry", icon: "⛏️", desc: "Immense storehouses of iron ore, bauxite, and coal for heavy industries." }
    ],
    plains: [
      { name: "Alluvial Farms", icon: "🌾", desc: "Vast fertile river silt beds yielding multiple harvests of wheat and paddy." },
      { name: "Perennial River", icon: "🌊", desc: "Slow, wide river channels vital for irrigation networks and transport." },
      { name: "Grain Barn & Silo", icon: "🚜", desc: "Dense settlements and food storage feeding millions of people." }
    ],
    valleys: [
      { name: "Sheltered Corridor", icon: "🏞️", desc: "Naturally protected transport corridor shielded from freezing alpine winds." },
      { name: "Terrace Settlements", icon: "🏘️", desc: "Homes clustered on river terraces safely above seasonal flash floods." },
      { name: "Fruit Orchards", icon: "🍎", desc: "Sunlit mountain valley slopes famous for crisp apples, apricots, and walnuts." }
    ],
    coasts: [
      { name: "Coastal Lighthouse", icon: "🚨", desc: "Essential navigational beacon safely guiding cargo ships through reefs." },
      { name: "Natural Bay & Dock", icon: "⚓", desc: "Sheltered harbor docks connecting global maritime trade and fisheries." },
      { name: "Sandy Dunes & Palms", icon: "🌴", desc: "Coastal vegetation buffer that shields coastal villages from tidal storms." }
    ]
  };

  const currentHotspots = hotspotsByLandform[landform] || [];

  return (
    <div className="relative w-full h-[340px] sm:h-[400px] rounded-3xl overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50/80 border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col justify-between select-none">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Controls Overlay */}
      <div className="relative z-20 p-3 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-slate-900 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
          <Compass className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="capitalize text-sm">{landform} 3D Diorama</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEngine.playClick();
              setAutoRotate(prev => !prev);
            }}
            className={`p-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-xs font-black transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              autoRotate ? 'bg-yellow-300 text-slate-950' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
            title="Toggle Auto-Rotation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(true)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-slate-950 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(false)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-slate-950 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Interactive Feature Hotspots (Smart Board Touch Buttons) */}
      <div className="relative z-20 p-3 bg-gradient-to-t from-white/95 via-white/80 to-transparent flex flex-col gap-2 pointer-events-auto">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-black tracking-wider text-slate-900 flex items-center gap-1.5 bg-yellow-300/80 px-2.5 py-0.5 rounded-full border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive 3D Pins • Tap to Scan</span>
          </span>
          <span className="text-[11px] text-slate-700 font-bold flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Drag 360°</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {currentHotspots.map((hs, idx) => {
            const isSelected = activeHotspot === hs.name;

            return (
              <button
                key={idx}
                onClick={() => {
                  soundEngine.playPlacement();
                  setActiveHotspot(hs.name);
                  if (onSelectHotspot) onSelectHotspot(hs.name, hs.desc);
                }}
                className={`p-2.5 rounded-2xl border-2.5 border-slate-900 text-left transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-yellow-300 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] ring-2 ring-yellow-400 scale-[1.02]'
                    : 'bg-white hover:bg-amber-50 text-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                }`}
              >
                <span className="text-xl shrink-0">{hs.icon}</span>
                <span className="text-xs font-black truncate leading-tight">{hs.name}</span>
              </button>
            );
          })}
        </div>

        {/* Hotspot Description Instant Insight */}
        {activeHotspot && (
          <div className="p-2.5 rounded-2xl bg-amber-100 border-2.5 border-slate-900 text-xs text-slate-950 font-bold flex items-start gap-2 shadow-[3px_3px_0px_0px_#0f172a] animate-fade-in">
            <span className="text-amber-600 text-base">💡</span>
            <span>
              <strong className="text-slate-950">{activeHotspot}:</strong>{' '}
              {currentHotspots.find(h => h.name === activeHotspot)?.desc}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
