import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Vertex from "./shaders/vertex.glsl?raw";
import Fragment from "./shaders/fragment.glsl?raw";

export default class Sketch {
  #scene: THREE.Scene;
  #renderer: THREE.WebGLRenderer;
  #width: number;
  #height: number;
  #camera: THREE.PerspectiveCamera;
  #controls: OrbitControls;
  #dom: HTMLCanvasElement;
  #clock = new THREE.Clock();
  #material: THREE.ShaderMaterial;

  constructor() {
    this.#dom = document.createElement("canvas");
    document.body.appendChild(this.#dom);
    this.#renderer = new THREE.WebGLRenderer({ canvas: this.#dom, alpha: true });
    this.#scene = new THREE.Scene();
    this.#width = window.innerWidth;
    this.#height = window.innerHeight;
    this.#camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
    this.#material = new THREE.ShaderMaterial({
      vertexShader: Vertex,
      fragmentShader: Fragment,
      uniforms: {
        uTime: { value: 0.0 },
      },
    });

    this.init();
  }

  private init() {
    this.#renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.#renderer.setSize(this.#width, this.#height);
    this.#renderer.setClearColor(0x000000, 0);
    this.#renderer.physicallyCorrectLights = true;
    this.#renderer.outputEncoding = THREE.sRGBEncoding;

    this.#camera.position.set(0, 0, 10);

    window.addEventListener("resize", this.resize.bind(this));

    this.update();
  }

  private resize() {
    this.#width = window.innerWidth;
    this.#height = window.innerHeight;
    this.#renderer.setSize(this.#width, this.#height);
    this.#camera.aspect = this.#width / this.#height;
  }

  private update() {
    const elapsedTime = this.#clock.getElapsedTime();

    this.#material.uniforms.uTime.value = elapsedTime;
    this.#renderer.render(this.#scene, this.#camera);
    this.#controls.update();

    requestAnimationFrame(this.update.bind(this));
  }
}

// @ts-ignore
window.debug = new Sketch();
