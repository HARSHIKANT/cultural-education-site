import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    console.log('ThreeScene: Initializing...');
    
    // Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xBBBBBB);

    // Get container dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    console.log('ThreeScene: Container dimensions:', { width, height });

    // Create Camera
    const camera = new THREE.PerspectiveCamera(
      75,           // Field of view
      width / height, // Aspect ratio
      0.1,          // Near clipping plane
      1000          // Far clipping plane
    );
    camera.position.set(0, 0, 5); // Position camera

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Add Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add hemisphere light for better illumination
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    scene.add(hemisphereLight);

    // Load GLTF Model
    const loader = new GLTFLoader();
    let modelRef = null;

    loader.load(
      '/models/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        
        // Calculate bounding box and center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Center the model
        model.position.sub(center);
        
        // Apply fixed scale
        model.scale.setScalar(0.000135);
        console.log('Applied fixed scale: 0.00125');
        
        // Keep model centered
        model.position.set(0, 0, 0);
        scene.add(model);
        modelRef = model; // Set reference for mouse tilting
        console.log('Model loaded successfully!', { size, center });
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Mouse tracking for tilting
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      // Get mouse position relative to the container
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1
      mouseY = -(event.clientY - rect.top - rect.height / 2) / (rect.height / 2); // -1 to 1
      
      // Apply subtle tilting based on mouse position
      if (modelRef) {
        const tiltX = mouseY * 0.5; // Tilt around X axis based on mouse Y
        const tiltY = mouseX * 0.5; // Tilt around Y axis based on mouse X
        
        modelRef.rotation.x = tiltX;
        modelRef.rotation.y = tiltY;
      }
    };

    // Attach mouse event to the container div
    if (mountRef.current) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '15px',
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeScene;
