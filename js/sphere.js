var scene;
var camera;
var renderer;
var controls;
var clock = new THREE.Clock();
function makeSphere(node) {
    var geometry = new THREE.SphereGeometry(1);
    var material = new THREE.MeshBasicMaterial({ color : 0xfefefe, wireframe : true });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(node.x, node.y, node.z);
    return scene.add(sphere);
};
function node(x, y, z) {
    function coord(x, y, z) {
        this.x = x;
        this.y = y;
        return this.z = z;
    };
    return this.coord = new coord(x, y, z);
};
function init() {
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ antialias : true });
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.01, 1000);
    camera.position.set(0, 0, 10);
    window.addEventListener('resize', function () {
        var WIDTH = window.innerWidth;
        var HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        return camera.updateProjectionMatrix();
    });
    var a = new node(0, 0, 0);
    makeSphere(new node(2, 0, 0));
    makeSphere(new node(-2, 0, 0));
    makeSphere(new node(1, 2, 0));
    makeSphere(new node(-1, 2, 0));
    makeSphere(new node(-1, -2, 0));
    makeSphere(new node(1, -2, 0));
    controls = new THREE.TyControls(camera, renderer.domElement);
    return scene.add(controls.getObject());
};
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    var delta = clock.getDelta();
    return controls.update(delta);
};
init();
animate();