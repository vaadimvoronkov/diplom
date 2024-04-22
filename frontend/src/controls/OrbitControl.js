import * as THREE from 'three';

export class OrbitControls {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.rotateStart = new THREE.Vector2();
    this.rotateEnd = new THREE.Vector2();
    this.rotateDelta = new THREE.Vector2();

    this.rotateSpeed = 1.0;

    this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  onMouseDown(event) {
    event.preventDefault();
    this.rotateStart.set(event.clientX, event.clientY);
  }

  onMouseMove(event) {
    event.preventDefault();
    this.rotateEnd.set(event.clientX, event.clientY);
    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);

    const theta = (2 * Math.PI * this.rotateDelta.x) / this.domElement.clientHeight;
    const phi = (2 * Math.PI * this.rotateDelta.y) / this.domElement.clientHeight;

    this.camera.position.x += Math.sin(theta) * 100;
    this.camera.position.y += Math.sin(phi) * 100;
    this.camera.position.z += Math.cos(theta) * 100;

    this.camera.lookAt(0, 0, 0);

    this.rotateStart.copy(this.rotateEnd);
  }

  onMouseUp(event) {
    event.preventDefault();
  }
}
