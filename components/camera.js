import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const box = document.getElementById("viewer");
const divBox = document.getElementById("welcome");

// Force une taille 300x300
box.style.width = "370px";
box.style.height = "370px";

// Renderer
const R = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true  // permet la transparence
});
R.setClearColor(0x000000, 0);
box.appendChild(R.domElement);

// Scene + cam
const S = new THREE.Scene();
const C = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);

// Lumières
S.add(new THREE.AmbientLight(0xffffff, 17));
const L = new THREE.DirectionalLight(0xFF5500, 1);
L.position.set(0, 0, 2);
S.add(L);

// Groupe racine
const G = new THREE.Group();
S.add(G);

let M;

// Loader
new GLTFLoader().load("./img/logo3D.glb", g => {
    M = g.scene;
    G.add(M);

    // Orientation de base
    M.rotation.x = Math.PI * 2.01;

    // --- Calcul de boîte APRES rotation ---
    const boxRot = new THREE.Box3().setFromObject(M);
    const size = new THREE.Vector3();
    boxRot.getSize(size);
    const center = new THREE.Vector3();
    boxRot.getCenter(center);

    // Recentrage parfait
    M.position.sub(center);

    // --- Zoom automatique CAMERA ---
    const maxDim = Math.max(size.x, size.y, size.z)/1.7;
    const distance = maxDim * 1.4; // marge légère
    C.position.set(0, 0, distance);
    console.log(distance);
    C.lookAt(0, 0, 0);
});

// Variables rotation
let mx = 0, my = 0, tx = 0, ty = 0;
const maxY = 0.6, maxX = 0.5;

// Mouse move
divBox.onmousemove = e => {
    mx = (e.pageX / divBox.clientWidth - 0) * 2;
    my = (e.pageY / divBox.clientHeight - 0) * 2;
};

// Retour de face
divBox.onmouseleave = () => {
    mx = 0;
    my = 0;
};

// Resize
function resizeRenderer() {
    R.setSize(box.clientWidth, box.clientHeight);
    C.aspect = box.clientWidth / box.clientHeight;
    C.updateProjectionMatrix();
}
resizeRenderer();

// Loop
function animate() {
    requestAnimationFrame(animate);

    tx += (mx - tx) * 0.1;
    ty += (my - ty) * 0.1;

    G.rotation.y = Math.max(-maxY, Math.min(maxY, tx * 0.4));
    G.rotation.x = Math.max(-maxX, Math.min(maxX, -ty * 0.2));

    R.render(S, C);
}
animate();
