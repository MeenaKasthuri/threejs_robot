// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// Camera setup
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 3, 8);
camera.lookAt(0, 2, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x4a90e2, 1, 50);
pointLight.position.set(-3, 3, 3);
scene.add(pointLight);

// Materials
const bodyMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x4a90e2,
    shininess: 100 
});
const headMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x5dade2,
    shininess: 100 
});
const eyeMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffffff,
    emissive: 0x00ff00,
    emissiveIntensity: 0.5
});
const antennaMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xff6b6b,
    emissive: 0xff0000,
    emissiveIntensity: 0.3
});
const limbMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x3498db,
    shininess: 80 
});

// Create Robot using Groups
const robot = new THREE.Group();

// HEAD GROUP
const headGroup = new THREE.Group();

// Head sphere
const headGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const head = new THREE.Mesh(headGeometry, headMaterial);
headGroup.add(head);

// Left eye
const eyeGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.1);
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.25, 0.1, 0.5);
headGroup.add(leftEye);

// Right eye
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.25, 0.1, 0.5);
headGroup.add(rightEye);

// Antenna
const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16);
const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
antenna.position.set(0, 0.6, 0);
headGroup.add(antenna);

// Antenna ball
const antennaBallGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const antennaBall = new THREE.Mesh(antennaBallGeometry, antennaMaterial);
antennaBall.position.set(0, 0.85, 0);
headGroup.add(antennaBall);

// Position head group
headGroup.position.set(0, 2.5, 0);
robot.add(headGroup);

// BODY GROUP
const bodyGroup = new THREE.Group();

// Torso
const torsoGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.8);
const torso = new THREE.Mesh(torsoGeometry, bodyMaterial);
bodyGroup.add(torso);

// Body detail - chest panel
const panelGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.05);
const panel = new THREE.Mesh(panelGeometry, new THREE.MeshPhongMaterial({ 
    color: 0x2c3e50 
}));
panel.position.set(0, 0.2, 0.4);
bodyGroup.add(panel);

// Position body group
bodyGroup.position.set(0, 1.2, 0);
robot.add(bodyGroup);

// LEFT ARM GROUP
const leftArmGroup = new THREE.Group();

const upperArmGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
const leftUpperArm = new THREE.Mesh(upperArmGeometry, limbMaterial);
leftUpperArm.position.set(0, -0.4, 0);
leftArmGroup.add(leftUpperArm);

const lowerArmGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.7, 16);
const leftLowerArm = new THREE.Mesh(lowerArmGeometry, limbMaterial);
leftLowerArm.position.set(0, -1.15, 0);
leftArmGroup.add(leftLowerArm);

// Hand
const handGeometry = new THREE.SphereGeometry(0.15, 16, 16);
const leftHand = new THREE.Mesh(handGeometry, bodyMaterial);
leftHand.position.set(0, -1.5, 0);
leftArmGroup.add(leftHand);

leftArmGroup.position.set(-0.75, 1.5, 0);
robot.add(leftArmGroup);

// RIGHT ARM GROUP
const rightArmGroup = new THREE.Group();

const rightUpperArm = new THREE.Mesh(upperArmGeometry, limbMaterial);
rightUpperArm.position.set(0, -0.4, 0);
rightArmGroup.add(rightUpperArm);

const rightLowerArm = new THREE.Mesh(lowerArmGeometry, limbMaterial);
rightLowerArm.position.set(0, -1.15, 0);
rightArmGroup.add(rightLowerArm);

const rightHand = new THREE.Mesh(handGeometry, bodyMaterial);
rightHand.position.set(0, -1.5, 0);
rightArmGroup.add(rightHand);

rightArmGroup.position.set(0.75, 1.5, 0);
robot.add(rightArmGroup);

// LEFT LEG GROUP
const leftLegGroup = new THREE.Group();

const thighGeometry = new THREE.CylinderGeometry(0.18, 0.15, 0.9, 16);
const leftThigh = new THREE.Mesh(thighGeometry, limbMaterial);
leftThigh.position.set(0, -0.45, 0);
leftLegGroup.add(leftThigh);

const shinGeometry = new THREE.CylinderGeometry(0.15, 0.14, 0.8, 16);
const leftShin = new THREE.Mesh(shinGeometry, limbMaterial);
leftShin.position.set(0, -1.3, 0);
leftLegGroup.add(leftShin);

// Foot
const footGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.4);
const leftFoot = new THREE.Mesh(footGeometry, bodyMaterial);
leftFoot.position.set(0, -1.75, 0.1);
leftLegGroup.add(leftFoot);

leftLegGroup.position.set(-0.3, 0.45, 0);
robot.add(leftLegGroup);

// RIGHT LEG GROUP
const rightLegGroup = new THREE.Group();

const rightThigh = new THREE.Mesh(thighGeometry, limbMaterial);
rightThigh.position.set(0, -0.45, 0);
rightLegGroup.add(rightThigh);

const rightShin = new THREE.Mesh(shinGeometry, limbMaterial);
rightShin.position.set(0, -1.3, 0);
rightLegGroup.add(rightShin);

const rightFoot = new THREE.Mesh(footGeometry, bodyMaterial);
rightFoot.position.set(0, -1.75, 0.1);
rightLegGroup.add(rightFoot);

rightLegGroup.position.set(0.3, 0.45, 0);
robot.add(rightLegGroup);

// Add robot to scene
scene.add(robot);

// Ground plane
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x16213e,
    side: THREE.DoubleSide 
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.position.y = -1.3;
ground.receiveShadow = true;
scene.add(ground);

// Animation variables
let time = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    time += 0.01;
    
    // Transform the entire robot group - rotation
    robot.rotation.y = Math.sin(time * 0.5) * 0.3;
    
    // Transform the entire robot group - floating motion
    robot.position.y = Math.sin(time) * 0.2;
    
    // Animate head group - nodding
    headGroup.rotation.x = Math.sin(time * 2) * 0.1;
    
    // Animate arms - waving
    leftArmGroup.rotation.z = Math.sin(time * 2) * 0.3 + 0.3;
    rightArmGroup.rotation.z = Math.sin(time * 2) * -0.3 - 0.3;
    
    // Animate antenna ball - pulsing
    const scale = 1 + Math.sin(time * 4) * 0.2;
    antennaBall.scale.set(scale, scale, scale);
    
    // Rotate entire robot slowly
    robot.rotation.y += 0.005;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();