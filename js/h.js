var container, stats;
var camera, scene, blockRenderer, renderer;
var projector, plane, cube, controls;
var mouse2D, mouse3D, ray,
rollOveredFace, isShiftDown = false, isMouseDown = false,
epsilon = 45, isCtrlDown = false, heylookatme, camera_ed = true, quickness = 10,
radious = 1600, theta = 45, onMouseDownTheta = 45, phi = 60, onMouseDownPhi = 60, onMouseDownPosition, previewed = false, separated = false,
trow, tnumber, strow, stnumber, rowsless = 0, rowsmore = 0, previewedOrigCoordx, previewedOrigCoordy, returnCoordx, returnCoordy, returnCoordz,
$name;

var rollOverMesh, rollOverMaterial, voxelPosition = new THREE.Vector3(), tmpVec = new THREE.Vector3();
var cubeGeo, cubeMaterial;
var i, intersector;
var zoomfactor = 3;
var counter = 1;
var origpos= {};
var slide = new slider();

var namelist = [];

var testpos = {
	x: 3,
	y: 3,
	z: 3
};

var cubedescend = {
	these:{
		0:{y: 1, z: 1},
		1:{y: 2, z: 2}
	},
	are:{
		0:{y: 0, z: 1},
		1:{y: 1, z: 2},
		2:{y: 2, z: 1},
		3:{y: 3, z: 1}
	},
	simply:{
		0:{y: 1, z: 1},
		1:{y: 1, z: 2},
		2:{y: 2, z: 1}
	},
	names:{
		0:{y: 2, z: 2},
		1:{y: 1, z: 2},
		2:{y: 1, z: 1}
	},
	nothing:{
		0:{y: 0, z: 1},
		1:{y: 1, z: 2},
		2:{y: 2, z: 1},
		3:{y: 3, z: 1}
	},
	more:{
		0:{y: 1, z: 1},
		1:{y: 1, z: 2},
		2:{y: 2, z: 1}
	},
	orless:{
		0:{y: 2, z: 2},
		1:{y: 1, z: 2}
	}
//REMEMBER TO STORE THIS LOCALLY!
}

$windowpane = $(window);