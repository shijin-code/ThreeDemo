import { useState, useEffect } from 'react'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { selfAdption, createTag } from '../../utils';
import floor from '../../assets/lineFloor.png';
import * as THREE from 'three';

function App() {
    //创建场景loaderCylinderGeometryCylinderGeometry
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //创建立方体
    const geometry = new THREE.PlaneGeometry(5, 5);
    const pdGeometry = new THREE.CylinderGeometry(1, 1, 2, 8);

    const texLoader = new THREE.TextureLoader();
    const picture = texLoader.load(floor);
    picture.wrapS = THREE.RepeatWrapping;
    picture.wrapT = THREE.RepeatWrapping;
    picture.repeat.set(2, 2);
    //材质
    const material = new THREE.MeshLambertMaterial({ map: picture, side: THREE.DoubleSide });
    const pdMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    //网格
    const cube = new THREE.Mesh(geometry, material);
    const pdCube = new THREE.Mesh(pdGeometry, pdMaterial);
    cube.rotateX(Math.PI / 2);
    cube.receiveShadow=true;
    pdCube.position.set(0, 1, 0)
    pdCube.castShadow = true;
    scene.add(cube, pdCube);

    //平行光源
    const directionLight = new THREE.DirectionalLight(0xffffff, 4);
    directionLight.position.set(3, 3, 3)
    directionLight.castShadow = true;
    scene.add(directionLight);

    //相机控件
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    //z轴对着自己 设置视角距离
    camera.position.z = 3;
    camera.position.x = 3;
    camera.position.y = 5;

    //添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

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
