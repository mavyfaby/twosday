<template>
  <kbd>Developed by Maverick Fabroa</kbd>
</template>

<script setup>
import { Vector3, Clock } from "three";
import { createScene, render } from './utils';
import { useStore } from "vuex";

// Deconstruct the scene
const { scene, camera, renderer } = createScene();

// Set camera position
camera.position.set(0, 20, 40);

// Get the store
const store = useStore();

// Render the graphics
const { light1, light2, light3, composer } = render(scene, camera, renderer);

// Look at the center of the scene
camera.lookAt(0, 0, 0);

// Create a clock
const clock = new Clock();
const forwardDir = new Vector3();
const backwardDir = new Vector3();

// Set the forward and backward speed
const speed = 0.1;

const animate = () => {
  // If forward is pressed
  if (store.state.moveForward) {
    camera.getWorldDirection(forwardDir);
    camera.position.add(forwardDir.multiplyScalar(speed));
  }

  // If backward is pressed
  if (store.state.moveBackward) {
    camera.getWorldDirection(backwardDir);
    camera.position.add(backwardDir.multiplyScalar(-speed));
  }

  // If left is pressed
  if (store.state.moveLeft) {
    camera.translateX(-speed);
  }

  // If right is pressed
  if (store.state.moveRight) {
    camera.translateX(speed);
  }

  // If up is pressed
  if (store.state.moveUp) {
    camera.position.y += speed;
  }

  // If down is pressed
  if (store.state.moveDown) {
    camera.position.y -= speed;
  }

  // Rotating spheres
  const time = Date.now() * 0.0005;
  const delta = clock.getDelta();

  light1.position.x = Math.sin(time * 0.7) * 10;
  light1.position.y = Math.cos(time * 0.5) * 20;
  light1.position.z = Math.sin(time * 0.3) * 10;

  light2.position.x = Math.cos(time * 0.3) * 10;
  light2.position.y = Math.sin(time * 0.5) * 20;
  light2.position.z = Math.sin(time * 0.7) * 10; 

  light3.position.x = Math.cos(time * 0.7) * 10;
  light3.position.y = Math.sin(time * 0.3) * 20;
  light3.position.z = Math.sin(time * 0.5) * 10; 

  requestAnimationFrame(animate);
  composer.render();
};

// Run the main loop
animate();

// Get the main app element
const app = document.getElementById("app");
// Append the scene to the app
app.appendChild(renderer.domElement);
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

kbd {
  position: fixed;
  top: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.75);
  z-index: 99;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
