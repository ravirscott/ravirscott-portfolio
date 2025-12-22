const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 100
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("webgl"),
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const light = new THREE.PointLight(0x00ffff, 2);
light.position.set(2,3,4);
scene.add(light);

const geo = new THREE.TorusKnotGeometry(1,0.3,128,16);
const mat = new THREE.MeshStandardMaterial({
  color:0x00ffff, metalness:.7, roughness:.2
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

function animate(){
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.004;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();

document.getElementById("enterBtn").onclick = () => {
  gsap.to("#overlay",{opacity:0,duration:1,onComplete(){
    document.getElementById("overlay").style.display="none";
  }});
  gsap.to(camera.position,{z:3,duration:2,ease:"power3.out"});
};

window.onresize = () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
};

