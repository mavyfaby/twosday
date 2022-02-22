import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";

export function createScene() {
    // Create the scene
    const scene = new Scene();
    // Create the camera
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Create the renderer
    const renderer = new WebGLRenderer();

    // Set the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Set the background color of the renderer
    renderer.setClearColor(new Color(0x121212), 1);
    // Set the pixel ratio of the renderer
    renderer.setPixelRatio(window.devicePixelRatio);

    // On window resize, update the camera and renderer size
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    return { scene, camera, renderer };
}