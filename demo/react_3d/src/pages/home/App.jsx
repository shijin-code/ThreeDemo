import { useState, useEffect } from 'react'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { selfAdption, createTag } from '../../utils';
import * as THREE from 'three';
import './App.css'

function App() {
  //创建场景
  const scene = new THREE.Scene();

  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75, //视角大小
    window.innerWidth / window.innerHeight,//宽高比
    0.1, //近平面
    1000//远平面
  );

  //创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //创建立方体
  const geometry = new THREE.BoxGeometry(1, 1.5, 1);
  const highGeometry = new THREE.BoxGeometry(1, 3, 1);
  //材质
  const Parentmaterial = new THREE.MeshLambertMaterial({ color: 'pink' });
  // const Parentmaterial = new THREE.MeshBasicMaterial({ color: 'pink' });
  const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
  //网格
  const ParentCube = new THREE.Mesh(geometry, Parentmaterial);
  const cube = new THREE.Mesh(geometry, material);
  ParentCube.name = '大大大'
  cube.name = '嘻嘻嘻'
  ParentCube.add(cube);

  //把网格添加到视角中
  // scene.add(ParentCube);
  // scene.add(cube);

  //位置
  ParentCube.position.set(0, 0, 0)
  cube.position.set(2, 0, 0)

  for (let i = 0; i < 5; i++) {
    //网格
    const mesh = new THREE.Mesh(highGeometry, Parentmaterial);
    mesh.position.set(i * 2, 1.5, 0);
    scene.add(mesh);
  }

  for (let j = 0; j < 5; j++) {
    //网格
    const mesh = new THREE.Mesh(geometry, Parentmaterial);
    mesh.position.set(j * 2, 0.5, 2);
    scene.add(mesh);
  }

  //缩放
  // ParentCube.scale.set(2, 2, 2)

  //旋转
  cube.rotation.x = Math.PI / 3;
  // cube.rotation.y = Math.PI / 4;

  //相机控件
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();

  //z轴对着自己 设置视角距离
  camera.position.z = 10;
  camera.position.x = 10;
  camera.position.y = 5;
  //自动旋转
  // controls.autoRotate=true;
  //是否阻尼
  controls.enableDamping = true;
  //阻尼系数
  controls.dampingFactor = 0.01;

  //添加世界坐标辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //光源
  const lightPoint = new THREE.PointLight(0xffffff, 1.0);
  lightPoint.position.set(-5, 2, 1);
  scene.add(lightPoint);

  //可视化光源
  const pointLightHelper = new THREE.PointLightHelper(lightPoint, 0.5);
  scene.add(pointLightHelper);

  //环境光 点光源
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  //平行光源
  const directionLight = new THREE.DirectionalLight(0xffffff, 2);
  directionLight.position.set(3, 3, 3)
  scene.add(directionLight);

  //平行可视化光源
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionLight, 0.5, 'red');
  // scene.add(directionalLightHelper);

  const animate = () => {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();

    renderer.render(scene, camera);
  }

  // const model = new THREE.Group();
  // model.name = 'box';
  // model.add(ParentCube, cube);
  // model.position.set(-50, 0, -25);
  scene.traverse((obj) => {
    scene.add(createTag(obj));
  })

  useEffect(() => {
    animate();
    selfAdption();
  }, [])

  return (
    <>

    </>
  )
}

export default App
