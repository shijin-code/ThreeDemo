import { useState, useEffect } from 'react'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { selfAdption, createTag } from '../../utils';
import floor from '../../assets/lineFloor.png';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
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
    const geometry = new THREE.PlaneGeometry(70, 70);
    // const loader = new THREE.ObjectLoader();
    const loader = new OBJLoader();
    const materialLoader = new MTLLoader(); //材质文件加载器
    // loader.load(
    //     // resource URL
    //     'src/assets/model/zengcheng/a.obj',

    //     // onLoad callback
    //     // Here the loaded data is assumed to be an object
    //     function (object) {
    //         // Add the loaded object to the scene

    //         object.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });;
    //         object.position.set(-20, 0, 20)
    //         object.scale.multiplyScalar(1);
    //         object.rotateY(Math.PI / 4);
    //         scene.add(object);
    //     },

    //     // onProgress callback
    //     function (xhr) {
    //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    //     },

    //     // onError callback
    //     function (err) {
    //         console.error('An error happened');
    //     }
    // );

    materialLoader.load('src/assets/model/zengcheng/a.mtl', function (materials) {
        // 返回一个包含材质的对象MaterialCreator
        console.log(materials);
        //obj的模型会和MaterialCreator包含的材质对应起来
        loader.setMaterials(materials);
        loader.load('src/assets/model/zengcheng/a.obj', function (object) {
            object.position.set(-20, 0, 20)
            object.scale.multiplyScalar(1);
            object.rotateY(Math.PI / 4);
            scene.add(object);
        })
    })


    // Alternatively, to parse a previously loaded JSON structure
    // const object = loader.parse(a_json_object);
    // scene.add( object );

    const texLoader = new THREE.TextureLoader();
    const picture = texLoader.load(floor);
    picture.wrapS = THREE.RepeatWrapping;
    picture.wrapT = THREE.RepeatWrapping;
    picture.repeat.set(5, 5);
    //材质
    const material = new THREE.MeshLambertMaterial({ map: picture, side: THREE.DoubleSide });
    //网格
    const cube = new THREE.Mesh(geometry, material);

    cube.rotateX(Math.PI / 2);
    cube.receiveShadow = true;
    scene.add(cube);

    //平行光源
    const directionLight = new THREE.DirectionalLight(0xffffff, 5);
    // const directionLight = new THREE.PointLight(0xffffff, 30, 0);
    // directionLight.position.set(1, 2, 3)
    directionLight.position.set(- 0, 40, 50);
    // directionLight.shadow.camera.top = 50;
    // directionLight.shadow.camera.bottom = - 25;
    // directionLight.shadow.camera.left = - 25;
    // directionLight.shadow.camera.right = 25;
    directionLight.shadow.camera.near = 0.1;
    directionLight.shadow.camera.far = 200;
    directionLight.shadow.mapSize.set(1024, 1024);
    directionLight.castShadow = true;
    scene.add(directionLight);

    //半球光
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 100, 0);
    scene.add(hemiLight);

    //相机控件
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    //z轴对着自己 设置视角距离
    camera.position.z = 30;
    camera.position.x = 25;
    camera.position.y = 30;

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
