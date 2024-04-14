const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("errorScene").appendChild(renderer.domElement);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 100;

function generateBinaryCode() {
  const binaryCode = document.createElement("div");
  binaryCode.textContent = Math.random() < 0.5 ? "0" : "1";
  binaryCode.className = "binaryCode";
  binaryCode.style.left = `${Math.random() * 100}%`;
  binaryCode.style.top = `${Math.random() * 100}%`;
  binaryCode.style.color = Math.random() < 0.5 ? "purple" : "cyan";
  binaryCode.style.fontSize = `${Math.random() * 20 + 10}px`;
  binaryCode.style.position = "fixed";
  binaryCode.style.zIndex = "999";

  document.body.appendChild(binaryCode);

  setTimeout(() => {
    document.body.removeChild(binaryCode);
  }, Math.random() * 500 + 500);
}

setInterval(generateBinaryCode, 700);

function createShootingStar() {
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 5);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  star.position.set(
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000)
  );

  star.velocity = new THREE.Vector3(
    -1 - Math.random() * 2,
    -1 - Math.random(),
    0
  );

  scene.add(star);
  return star;
}

const shootingStars = [];
for (let i = 0; i < 20; i++) {
  shootingStars.push(createShootingStar());
}

function animate() {
  requestAnimationFrame(animate);

  shootingStars.forEach((star) => {
    star.position.add(star.velocity);

    if (star.position.x < -1000 || star.position.y < -1000) {
      star.position.set(
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000)
      );
      star.velocity.set(-1 - Math.random() * 2, -1 - Math.random(), 0);
    }
  });

  stars.rotation.x += 0.0005;
  stars.rotation.y += 0.0005;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
