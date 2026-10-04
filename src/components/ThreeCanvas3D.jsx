import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1500);
    camera.position.set(0, 0, 280);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Main 3D Container Group for global mouse tilt & scroll navigation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Custom glowing particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#38bdf8');
    grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const glowTexture = new THREE.CanvasTexture(canvas);

    // =========================================================================
    // 1. FULL BACKGROUND CONSTELLATION & PARTICLE NETWORK (ACROSS ENTIRE PAGE)
    // =========================================================================
    const particleCount = 160;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    const spreadX = 520;
    const spreadY = 320;
    const spreadZ = 220;

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        vz: (Math.random() - 0.5) * 0.14
      });
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 4.5,
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x38bdf8,
      opacity: 0.85
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particlesMesh);

    // Dynamic constellation line segments
    const maxLineConnections = 320;
    const linePositions = new Float32Array(maxLineConnections * 6);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const linesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    mainGroup.add(linesMesh);

    // =========================================================================
    // 2. MORPHING NEURAL WIREFRAME CORE & MULTI-AXIS ORBITAL RINGS
    // =========================================================================
    const coreGroup = new THREE.Group();
    coreGroup.position.set(width > 860 ? 55 : 0, 0, 0);
    mainGroup.add(coreGroup);

    const coreGeo = new THREE.IcosahedronGeometry(78, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Glowing nodes on the vertices of the core
    const coreVertexArray = coreGeo.attributes.position.array;
    const coreNodePositions = new Float32Array(coreVertexArray);
    const coreNodeGeo = new THREE.BufferGeometry();
    coreNodeGeo.setAttribute('position', new THREE.BufferAttribute(coreNodePositions, 3));

    const coreNodeMat = new THREE.PointsMaterial({
      size: 6,
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x38bdf8
    });
    const coreNodes = new THREE.Points(coreNodeGeo, coreNodeMat);
    coreGroup.add(coreNodes);

    // Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(110, 0.7, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 8;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(126, 0.5, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.25
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(142, 0.4, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.18
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 6;
    ring3.rotation.y = -Math.PI / 4;
    coreGroup.add(ring3);

    // =========================================================================
    // 3. DEEP AMBIENT STARFIELD
    // =========================================================================
    const starCount = 200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 600;
      starPositions[i + 1] = (Math.random() - 0.5) * 420;
      starPositions[i + 2] = (Math.random() - 0.5) * 320 - 90;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 2.8,
      map: glowTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      color: 0x7dd3fc
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // =========================================================================
    // 4. MOUSE AND SCROLL INTERACTION
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = window.scrollY / maxScroll;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      coreGroup.position.set(width > 860 ? 55 : 0, 0, 0);
    };

    window.addEventListener('resize', handleResize);

    // Initialize initial scroll
    handleScroll();

    // =========================================================================
    // 5. ANIMATION LOOP
    // =========================================================================
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth inertia
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.04;

      // Group 3D tilt & gentle scroll-driven rotation across all sections
      mainGroup.rotation.y = elapsed * 0.08 + targetX * 0.45 + scrollProgress * Math.PI * 2.5;
      mainGroup.rotation.x = Math.sin(elapsed * 0.08) * 0.05 - targetY * 0.45 + Math.sin(scrollProgress * Math.PI) * 0.25;
      mainGroup.rotation.z = Math.sin(scrollProgress * Math.PI * 2) * 0.15;

      // Core group gently moves between sections as you scroll down
      const baseX = width > 860 ? 55 : 0;
      coreGroup.position.x = baseX + Math.sin(scrollProgress * Math.PI * 3) * 45;
      coreGroup.position.y = Math.cos(scrollProgress * Math.PI * 2.5) * 25;

      // 1. Update Full-Background Floating Particles & Constellation Lines
      const posArray = particlesGeo.attributes.position.array;
      let lineIndex = 0;
      const linePosArray = linesGeo.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        // Drift particle
        posArray[i * 3] += particleVelocities[i].vx;
        posArray[i * 3 + 1] += particleVelocities[i].vy;
        posArray[i * 3 + 2] += particleVelocities[i].vz;

        // Bounce back into bounds
        if (Math.abs(posArray[i * 3]) > spreadX / 2) particleVelocities[i].vx *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > spreadY / 2) particleVelocities[i].vy *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > spreadZ / 2) particleVelocities[i].vz *= -1;

        // Connect nearby particles with glowing lines
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxLineConnections * 6) break;

          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          // Connect if distance < 58 units
          if (distSq < 3364) {
            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];

            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];
          }
        }
      }

      // Clear unused lines
      for (let k = lineIndex; k < maxLineConnections * 6; k++) {
        linePosArray[k] = 0;
      }

      particlesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.position.needsUpdate = true;

      // 2. Wave Morphing on Core Icosahedron Vertices
      const corePos = coreGeo.attributes.position;
      for (let i = 0; i < corePos.count; i++) {
        const u = coreVertexArray[i * 3];
        const v = coreVertexArray[i * 3 + 1];
        const w = coreVertexArray[i * 3 + 2];
        const distance = Math.sqrt(u * u + v * v + w * w);
        const wave = Math.sin(elapsed * 2.2 + u * 0.06 + v * 0.06) * 3.5;
        const scale = (distance + wave) / distance;
        corePos.setXYZ(i, u * scale, v * scale, w * scale);
      }
      corePos.needsUpdate = true;
      coreNodeGeo.attributes.position.needsUpdate = true;

      // 3. Orbital Rings Rotations
      ring1.rotation.z = elapsed * 0.2;
      ring2.rotation.z = -elapsed * 0.16;
      ring3.rotation.z = elapsed * 0.12;

      coreGroup.rotation.y = elapsed * 0.12;
      starPoints.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      particlesGeo.dispose();
      particlesMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreNodeGeo.dispose();
      coreNodeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      starGeo.dispose();
      starMat.dispose();
      glowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="three-canvas-3d" 
      aria-hidden="true" 
    />
  );
}
