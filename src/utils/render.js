import {
    GridHelper, Mesh, MeshPhongMaterial, PointLight,
    MeshBasicMaterial, Vector2, Color, SphereGeometry
} from "three";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { createControls } from "./controls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import font from "three/examples/fonts/helvetiker_bold.typeface.json";

/**
 * Render the scene
 * @param {Scene} scene 
 * @param {PerspectiveCamera} camera 
 * @param {WebGLRenderer} renderer 
 * @returns {Object}
 */
export function render(scene, camera, renderer) {
    // Add grid
    const grid = new GridHelper(50, 50, 0x131313, 0x131313);
    scene.add(grid);

    // Controls
    const controls = createControls(camera, renderer);

    // Add scene only if using PointerLockControls
    if (controls.constructor.name === "PointerLockControls") {
        scene.add(controls.getObject());
    }

    const lightSphere = new SphereGeometry(1);

    // Add RGB light source
    const light1 = new PointLight(0xff1212, 0.5);
    const light2 = new PointLight(0x12ff12, 0.5);
    const light3 = new PointLight(0x1212ff, 0.5);

    // Wrap it with a sphere geometry
    light1.add(new Mesh(lightSphere, new MeshBasicMaterial({ color: 0xff1212 })));
    light2.add(new Mesh(lightSphere, new MeshBasicMaterial({ color: 0x12ff12 })));
    light3.add(new Mesh(lightSphere, new MeshBasicMaterial({ color: 0x1212ff })));

    // Add the lights to the scene
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    // Create a render pass for post processing
    const renderScene = new RenderPass(scene, camera);
    // Set clear color to darkish grey
    renderScene.clearColor = new Color(0x121212);

    // Create a bloom pass with the specified parameters
    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 0.75;
    bloomPass.radius = 0.4;
    bloomPass.exposure = 0.7;

    // Create a composer for the post processing
    const composer = new EffectComposer(renderer);
    // Add the render pass to the composer
    composer.addPass(renderScene);
    // Add the bloom pass to the composer
    composer.addPass(bloomPass);

    // Resize composer on window resize
    window.addEventListener("resize", () => {
        composer.setSize(window.innerWidth, window.innerHeight);
    });

    // The text we want to render
    const TEXT = "2/22/22";
    // Initialize the font loader
    const fontLoader = new FontLoader();
    // Load the font
    const textFont = fontLoader.parse(font);

    // Create the text geometry
    const textGeometry = new TextGeometry(TEXT, {
        font: textFont,
        size: 5,
        height: 2,
        curveSegments: 12,
        bevelEnabled: false
    });

    // Compute the bounding box of the text
    textGeometry.computeBoundingBox();

    // Get the center of the bounding box
    const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
    // Create a mesh for the text
    const textMesh = new Mesh(textGeometry, new MeshPhongMaterial({ color: 0xffffff }));

    // Set the position of the text mesh to the center of the bounding box
    textMesh.position.x = centerOffset;
    textMesh.position.y = 0;
    textMesh.position.z = 0;

    // Addd the text mesh to the scene
    scene.add(textMesh);

    return { composer, light1, light2, light3 };
}