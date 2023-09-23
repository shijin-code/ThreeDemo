import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

//屏幕大小自适应
export const selfAdption = () => {
    window.addEventListener('resize', () => {
        //重置渲染器宽高比
        renderer.setSize(window.innerWidth, window.innerHeight);
        //重置相机宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        //更新相机投影矩阵
        camera.updateProjectionMatrix();
    })
}

//标注命名
export const createTag = (obj) => {
     if (obj.isMesh) console.log('obj', obj.name);
    const element = document.createElement('div');
    element.className = 'tag';
    element.innerHTML = `<p>名称:${obj.name}</p>`;
    const object = new CSS3DObject(element);
    object.visible = true;
    //缩放比例
    object.scale.set(1, 1, 1);
    //指定摆放位置
    object.position.copy(obj.position);
    return object;
}

// export function tag(name) {
//     // 创建div元素(作为标签)
//     var div = document.createElement('div');
//     div.innerHTML = name;
//     div.classList.add('tag');
//     //div元素包装为CSS2模型对象CSS2DObject
//     var label = new CSS2DObject(div);
//     div.style.pointerEvents = 'none';//避免HTML标签遮挡三维场景的鼠标事件
//     // 设置HTML元素标签在three.js世界坐标中位置
//     // label.position.set(x, y, z);
//     return label;//返回CSS2模型标签
//   }
//   // 创建一个CSS2渲染器CSS2DRenderer
//   var labelRenderer = new CSS2DRenderer();
//   labelRenderer.setSize(window.innerWidth, window.innerHeight);
//   labelRenderer.domElement.style.position = 'absolute';
//   // 相对标签原位置位置偏移大小
//   labelRenderer.domElement.style.top = '0px';
//   labelRenderer.domElement.style.left = '0px';
//   // //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
//   labelRenderer.domElement.style.pointerEvents = 'none';
//   document.body.appendChild(labelRenderer.domElement);

//全屏事件
export const wholeScreen = () => {
    renderer.domElement.requestFullscreen();
    // document.body.requestFullscreen();
}

//全屏事件
export const exitWholeScreen = () => {
    renderer.domElement.exitWholeScreen();
    // document.body.exitWholeScreen();
}