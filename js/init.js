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
	hash, hashhistory = [],
	$master = $('#master');

//CUBECONTROL.JS
var container, stats;
var camera, scene, blockRenderer, renderer;
var projector, plane, cube, controls,
isMouseDown = false, heylookatme,
radious = 1600, theta = -90, onMouseDownTheta = -90, phi = 60, onMouseDownPhi = 60, onMouseDownPosition, previewed = false, separated = false,
tcallme, trow, tref, tnumber, tcube, strow, stnumber, previewedOrigCoordx, previewedOrigCoordy, returnCoordx, returnCoordy, returnCoordz,
$name, backendhasexisted = false;
var where = 'front';
var $front = $('.front')

var introPos = {
	x: 146.4025898614438,
	y: 0,
	z: 1593.2878841194588	
},

normalPos = {
	x: radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 ),
	y: radious * Math.sin( phi * Math.PI / 360 ),
	z: radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 ),
};


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

var $x2_y1 = $('.me_x2.me_y1'),
    $x3_y1 = $('.me_x3.me_y1'),
    $x4_y1 = $('.me_x4.me_y1'),
    $x1_y2 = $('.me_x1.me_y2'),
    $x2_y2 = $('.me_x2.me_y2'),
    $x3_y2 = $('.me_x3.me_y2'),
    $x4_y2 = $('.me_x4.me_y2'),
    $x1_y3 = $('.me_x1.me_y3'),
    $x2_y3 = $('.me_x2.me_y3'),
    $x3_y3 = $('.me_x3.me_y3'),
    $x4_y3 = $('.me_x4.me_y3'),
    $x1_y4 = $('.me_x1.me_y4'),
    $x2_y4 = $('.me_x2.me_y4'),
    $x3_y4 = $('.me_x3.me_y4');

var shimmer_row = 100;
var shimmer_el = 500;

var helloPattern = [
    [
        $x2_y1,
        $x1_y2,
    ],
    [
        $x3_y1,
        $x2_y2,
        $x1_y3,
    ],
    [
        $x4_y1,
        $x3_y2,
        $x2_y3,
        $x1_y4,
    ],
    [
        $x4_y2,
        $x3_y3,
        $x2_y4,
    ],
    [
        $x4_y3,
        $x3_y4,
    ]
];

//HOLY FUCK
