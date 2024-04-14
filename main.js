const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('loadingScreen').appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3); 
const colors = [];
const color1 = new THREE.Color('purple');
const color2 = new THREE.Color('cyan');

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5; 
}

for (let i = 0; i < particlesCount; i++) {
    const color = (i < particlesCount / 2) ? color1 : color2;
    colors.push(color.r, color.g, color.b);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    vertexColors: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

let showGlitchEffects = false; 

setTimeout(() => {
    showGlitchEffects = true;
}, 2000); 


function generateBinaryCode() {
    if (!showGlitchEffects) return;

    for (let i = 0; i < 5; i++) { 
        const binaryCode = document.createElement('div');
        binaryCode.textContent = Math.random() < 0.5 ? '0' : '1';
        binaryCode.className = 'binaryCode';
        binaryCode.style.left = `${Math.random() * 100}%`; 
        binaryCode.style.top = `${Math.random() * 100}%`; 
        binaryCode.style.color = ['purple', 'cyan'][Math.floor(Math.random() * 2)];
        binaryCode.style.fontSize = `${Math.random() * 20 + 10}px`;
        binaryCode.style.position = 'fixed'; 
        binaryCode.style.zIndex = '999'; 

        document.body.appendChild(binaryCode);

        setTimeout(() => {
            document.body.removeChild(binaryCode);
        }, Math.random() * 1000 + 500); 
    }
}


let binaryCodeInterval = setInterval(generateBinaryCode, 50); 


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);


const transitionTime = 20000;
let timeUntilTransition = transitionTime;

function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.004;

    renderer.render(scene, camera);

    timeUntilTransition -= 1000 / 60; 
}

animate();

setTimeout(() => {
    window.location.href = 'error.html'; 
}, transitionTime);
