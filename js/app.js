// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

const mixers = [];
const clock = new THREE.Clock();

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xEBE8D9 );

  createCamera();
  createControls();
  createLights();
  loadModels();
  createRenderer();

    renderer.setAnimationLoop(() => {
      


    update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 1, 100 );
  camera.position.set( -1.5, 1.5, 6.5 );

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}

function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 1 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 2 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy(position);

    scene.add( model );

  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
    var i = 0
    var arr = []
    var arr2 = []
    var arr3 = []
        var arr4 = []
    var arr5 = []
    var arr6 = []
    var arr7 = []
    var arr8 = []


    for (i = 0; i < 3; i++) {
        arr[i] = new THREE.Vector3(0, 0 + i, 0);
        arr2[i] = new THREE.Vector3(0 + i, 0 , 0);
        arr3[i] = new THREE.Vector3(0 + i, 0 + i, 0);
        arr4[i] = new THREE.Vector3(0 - i, 0 - i, 0);
        arr5[i] = new THREE.Vector3(0 - i, 0 , 0);
        arr6[i] = new THREE.Vector3(0, 0 - i, 0);
        arr7[i] = new THREE.Vector3(0 + i, 0 - i, 0);
        arr8[i] = new THREE.Vector3(0 - i, 0 + i, 0);
        arr.push(arr[i], arr2[i], arr3[i], arr4[i], arr5[i], arr6[i],arr7[i], arr8[i])
    }

    arr.forEach((el) => {
        loader.load('models/Parrot.glb', gltf => onLoad(gltf, el), onProgress, onError);
    })


}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild( renderer.domElement );

}

function update() {

  const delta = clock.getDelta();

  for ( const mixer of mixers ) {

    mixer.update( delta );

  }

}




function render() {

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();
