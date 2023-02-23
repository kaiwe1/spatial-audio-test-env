import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

// 创建Debug Panel
const gui = new dat.GUI();

// 定义sizes参数
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

// 获取canvas元素
const canvas = document.querySelector(".webgl")

// 创建场景
const scene = new THREE.Scene()

// 创建测试网格
const boxMaterial = new THREE.MeshStandardMaterial()
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.position.set(0, 0.5, 0)
boxMesh.castShadow = true
scene.add(boxMesh)

// 创建平面
const planeMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, color: "#cccccc"})
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.rotation.x = Math.PI / 2
planeMesh.receiveShadow = true
scene.add(planeMesh)

// 创建相机
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.01, 100)
camera.position.set(10, 10, 10)
scene.add(camera)

// 创建平行光
const directionalLight = new THREE.DirectionalLight()
directionalLight.position.set(5, 5, -5)
directionalLight.castShadow = true
scene.add(directionalLight)

// 创建平行光Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

// 创建环境光
const ambientLight = new THREE.AmbientLight("#ffffff", 0.3)
scene.add(ambientLight)

// 创建controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// 创建AxesHelper
const axesHelper = new THREE.AxesHelper(10)
scene.add(axesHelper)

// 创建GridHelper
const gridHelper = new THREE.GridHelper(10)
gridHelper.position.y += 0.01
scene.add(gridHelper)

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.render(scene, camera)

// 处理resize事件
window.addEventListener("resize", () => {
  sizes.height = window.innerHeight
  sizes.width = window.innerWidth
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const tick = () => {
  requestAnimationFrame(tick)
  renderer.render(scene, camera)
}

tick()
