var getScript = jQuery.getScript;
jQuery.getScript = function( resources, callback ) {

    var // reference declaration &amp; localization
    length = resources.length,
    handler = function() { counter++; },
    deferreds = [],
    counter = 0,
    idx = 0;

    for ( ; idx < length; idx++ ) {
        deferreds.push(
            getScript( resources[ idx ], handler )
        );
    }

    jQuery.when.apply( null, deferreds ).then(function() {
        callback && callback();
    });
};

//LAUNCH.JS
var $windowpane = $(window);
var wpheight, wpwidth, 
	titlemargin, whomargin, 
	action = 'click', 
	hash, hashhistory = [];

//CUBECONTROL.JS
var container, stats;
var camera, scene, blockRenderer, renderer;
var projector, plane, cube, controls,
isMouseDown = false, heylookatme,
radious = 1600, theta = -90, onMouseDownTheta = -90, phi = 60, onMouseDownPhi = 60, onMouseDownPosition, previewed = false, separated = false,
tcallme, trow, tref, tnumber, tcube, strow, stnumber, previewedOrigCoordx, previewedOrigCoordy, returnCoordx, returnCoordy, returnCoordz,
$name, backendhasexisted = false;
var where = 'front';

var rollOverMesh, rollOverMaterial, voxelPosition = new THREE.Vector3(), tmpVec = new THREE.Vector3();
var cubeGeo, cubeMaterial;
var i, intersector;
var sentFromClick = false;
var zoomfactor = 3;
var counter = 1, cubecounter = 1;
var origheight = [];
var slide;
var $cubic;
var namelist = [];

//SHAPESHIFTER.JS
var clicker, tracker = 1, prone, layerrefere, layernumber, individualnumber;

//LOADR.JS
var $l1 = $('#loadr')

var count = 0;
var loaderinterval;
var presentlyloading = false;

//PROJECT.JS
var mass, fertig, first = false;
var imagemarker = [];
var $stats = $('.stats');
var $floater = $('.floater');
var drg_h, drg_w;

//ME.JS
var where;

//HOLY FUCK
