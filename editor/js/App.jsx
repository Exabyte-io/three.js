import * as THREE from 'three';

import { Editor } from './Editor.js';
import { Viewport } from './Viewport.js';
import { Toolbar } from './Toolbar.js';
import { Script } from './Script.js';
import { Player } from './Player.js';
import { Sidebar } from './Sidebar.js';
import { Menubar } from './Menubar.js';
import { Resizer } from './Resizer.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

import useScript from "./hooks";

const urls = [
//    "../js/libs/codemirror/codemirror.js",
//    "../js/libs/codemirror/mode/javascript.js",
//    "../js/libs/codemirror/mode/glsl.js",
//    "../js/libs/esprima.js",
//    "../js/libs/jsonlint.js",
//    "../js/libs/codemirror/addon/dialog.js",
//    "../js/libs/codemirror/addon/show-hint.js",
//    "../js/libs/codemirror/addon/tern.js",
//    "../js/libs/acorn/acorn.js",
//    "../js/libs/acorn/acorn_loose.js",
//    "../js/libs/acorn/walk.js",
//    "../js/libs/ternjs/polyfill.js",
//    "../js/libs/ternjs/signal.js",
//    "../js/libs/ternjs/tern.js",
//    "../js/libs/ternjs/def.js",
//    "../js/libs/ternjs/comment.js",
//    "../js/libs/ternjs/infer.js",
//    "../js/libs/ternjs/doc_comment.js",
//    "../js/libs/tern-threejs/threejs.js",
//    "../js/libs/signals.min.js",
	// '../',

	// '../manifest.json',
	'../images/icon.png',

	'../../files/favicon.ico',

	'../../build/three.module.js',

	'../../examples/jsm/controls/TransformControls.js',

	'../../examples/jsm/libs/chevrotain.module.min.js',
	'../../examples/jsm/libs/fflate.module.js',

	'../../examples/js/libs/draco/draco_decoder.js',
	'../../examples/js/libs/draco/draco_decoder.wasm',
	'../../examples/js/libs/draco/draco_encoder.js',
	'../../examples/js/libs/draco/draco_wasm_wrapper.js',

	'../../examples/js/libs/draco/gltf/draco_decoder.js',
	'../../examples/js/libs/draco/gltf/draco_decoder.wasm',
	'../../examples/js/libs/draco/gltf/draco_wasm_wrapper.js',

	'../../examples/jsm/libs/motion-controllers.module.js',

	'../../examples/jsm/libs/rhino3dm/rhino3dm.wasm',
	'../../examples/jsm/libs/rhino3dm/rhino3dm.js',

	'../../examples/jsm/loaders/3DMLoader.js',
	'../../examples/jsm/loaders/3MFLoader.js',
	'../../examples/jsm/loaders/AMFLoader.js',
	'../../examples/jsm/loaders/ColladaLoader.js',
	'../../examples/jsm/loaders/DRACOLoader.js',
	'../../examples/jsm/loaders/FBXLoader.js',
	'../../examples/jsm/loaders/GLTFLoader.js',
	'../../examples/jsm/loaders/KMZLoader.js',
	'../../examples/jsm/loaders/IFCLoader.js',
	'../../examples/jsm/loaders/ifc/web-ifc-api.js',
	'../../examples/jsm/loaders/ifc/web-ifc.wasm',
	'../../examples/jsm/loaders/MD2Loader.js',
	'../../examples/jsm/loaders/OBJLoader.js',
	'../../examples/jsm/loaders/MTLLoader.js',
	'../../examples/jsm/loaders/PLYLoader.js',
	'../../examples/jsm/loaders/RGBELoader.js',
	'../../examples/jsm/loaders/STLLoader.js',
	'../../examples/jsm/loaders/SVGLoader.js',
	'../../examples/jsm/loaders/TGALoader.js',
	'../../examples/jsm/loaders/TDSLoader.js',
	'../../examples/jsm/loaders/VOXLoader.js',
	'../../examples/jsm/loaders/VRMLLoader.js',
	'../../examples/jsm/loaders/VTKLoader.js',
	'../../examples/jsm/loaders/XYZLoader.js',

	'../../examples/jsm/curves/NURBSCurve.js',
	'../../examples/jsm/curves/NURBSUtils.js',

	'../../examples/jsm/interactive/HTMLMesh.js',
	'../../examples/jsm/interactive/InteractiveGroup.js',

	'../../examples/jsm/environments/RoomEnvironment.js',

	'../../examples/jsm/exporters/ColladaExporter.js',
	'../../examples/jsm/exporters/DRACOExporter.js',
	'../../examples/jsm/exporters/GLTFExporter.js',
	'../../examples/jsm/exporters/OBJExporter.js',
	'../../examples/jsm/exporters/PLYExporter.js',
	'../../examples/jsm/exporters/STLExporter.js',
	'../../examples/jsm/exporters/USDZExporter.js',

	'../../examples/jsm/helpers/VertexNormalsHelper.js',

	'../../examples/jsm/geometries/TeapotGeometry.js',

	'../../examples/jsm/webxr/VRButton.js',
	'../../examples/jsm/webxr/XRControllerModelFactory.js',

	'../images/rotate.svg',
	'../images/scale.svg',
	'../images/translate.svg',

	'../js/libs/codemirror/codemirror.css',
	'../js/libs/codemirror/theme/monokai.css',

	'../js/libs/codemirror/codemirror.js',
	'../js/libs/codemirror/mode/javascript.js',
	'../js/libs/codemirror/mode/glsl.js',

	'../js/libs/esprima.js',
	'../js/libs/jsonlint.js',

	'../js/libs/codemirror/addon/dialog.css',
	'../js/libs/codemirror/addon/show-hint.css',
	'../js/libs/codemirror/addon/tern.css',

	'../js/libs/codemirror/addon/dialog.js',
	'../js/libs/codemirror/addon/show-hint.js',
	'../js/libs/codemirror/addon/tern.js',
	'../js/libs/acorn/acorn.js',
	'../js/libs/acorn/acorn_loose.js',
	'../js/libs/acorn/walk.js',
	'../js/libs/ternjs/polyfill.js',
	'../js/libs/ternjs/signal.js',
	'../js/libs/ternjs/tern.js',
	'../js/libs/ternjs/def.js',
	'../js/libs/ternjs/comment.js',
	'../js/libs/ternjs/infer.js',
	'../js/libs/ternjs/doc_comment.js',
	'../js/libs/tern-threejs/threejs.js',

	'../js/libs/signals.min.js',
	'../js/libs/ui.js',
	'../js/libs/ui.three.js',

	'../js/libs/app.js',
	'../js/Player.js',
	'../js/Script.js',

	//

	'../css/main.css',

	'../js/EditorControls.js',
	'../js/Storage.js',

	'../js/Editor.js',
	'../js/Config.js',
	'../js/History.js',
	'../js/Loader.js',
	'../js/LoaderUtils.js',
	'../js/Menubar.js',
	'../js/Menubar.File.js',
	'../js/Menubar.Edit.js',
	'../js/Menubar.Add.js',
	'../js/Menubar.Play.js',
	'../js/Menubar.Examples.js',
	'../js/Menubar.Help.js',
	'../js/Menubar.View.js',
	'../js/Menubar.Status.js',
	'../js/Resizer.js',
	'../js/Sidebar.js',
	'../js/Sidebar.Scene.js',
	'../js/Sidebar.Project.js',
	'../js/Sidebar.Project.Materials.js',
	'../js/Sidebar.Project.Renderer.js',
	'../js/Sidebar.Project.Video.js',
	'../js/Sidebar.Settings.js',
	'../js/Sidebar.Settings.History.js',
	'../js/Sidebar.Settings.Shortcuts.js',
	'../js/Sidebar.Settings.Viewport.js',
	'../js/Sidebar.Properties.js',
	'../js/Sidebar.Object.js',
	'../js/Sidebar.Geometry.js',
	'../js/Sidebar.Geometry.BufferGeometry.js',
	'../js/Sidebar.Geometry.Modifiers.js',
	'../js/Sidebar.Geometry.BoxGeometry.js',
	'../js/Sidebar.Geometry.CapsuleGeometry.js',
	'../js/Sidebar.Geometry.CircleGeometry.js',
	'../js/Sidebar.Geometry.CylinderGeometry.js',
	'../js/Sidebar.Geometry.DodecahedronGeometry.js',
	'../js/Sidebar.Geometry.ExtrudeGeometry.js',
	'../js/Sidebar.Geometry.IcosahedronGeometry.js',
	'../js/Sidebar.Geometry.LatheGeometry.js',
	'../js/Sidebar.Geometry.OctahedronGeometry.js',
	'../js/Sidebar.Geometry.PlaneGeometry.js',
	'../js/Sidebar.Geometry.RingGeometry.js',
	'../js/Sidebar.Geometry.SphereGeometry.js',
	'../js/Sidebar.Geometry.ShapeGeometry.js',
	'../js/Sidebar.Geometry.TetrahedronGeometry.js',
	'../js/Sidebar.Geometry.TorusGeometry.js',
	'../js/Sidebar.Geometry.TorusKnotGeometry.js',
	'../js/Sidebar.Geometry.TubeGeometry.js',
	'../js/Sidebar.Geometry.TeapotGeometry.js',
	'../js/Sidebar.Material.js',
	'../js/Sidebar.Material.BooleanProperty.js',
	'../js/Sidebar.Material.ColorProperty.js',
	'../js/Sidebar.Material.ConstantProperty.js',
	'../js/Sidebar.Material.MapProperty.js',
	'../js/Sidebar.Material.NumberProperty.js',
	'../js/Sidebar.Material.Program.js',
	'../js/Sidebar.Animation.js',
	'../js/Sidebar.Script.js',
	'../js/Strings.js',
	'../js/Toolbar.js',
	'../js/Viewport.js',
	'../js/Viewport.Camera.js',
	'../js/Viewport.Info.js',
	'../js/Viewport.ViewHelper.js',
	'../js/Viewport.VR.js',

	'../js/Command.js',
	'../js/commands/AddObjectCommand.js',
	'../js/commands/RemoveObjectCommand.js',
	'../js/commands/MoveObjectCommand.js',
	'../js/commands/SetPositionCommand.js',
	'../js/commands/SetRotationCommand.js',
	'../js/commands/SetScaleCommand.js',
	'../js/commands/SetValueCommand.js',
	'../js/commands/SetUuidCommand.js',
	'../js/commands/SetColorCommand.js',
	'../js/commands/SetGeometryCommand.js',
	'../js/commands/SetGeometryValueCommand.js',
	'../js/commands/MultiCmdsCommand.js',
	'../js/commands/AddScriptCommand.js',
	'../js/commands/RemoveScriptCommand.js',
	'../js/commands/SetScriptValueCommand.js',
	'../js/commands/SetMaterialCommand.js',
	'../js/commands/SetMaterialColorCommand.js',
	'../js/commands/SetMaterialMapCommand.js',
	'../js/commands/SetMaterialValueCommand.js',
	'../js/commands/SetMaterialVectorCommand.js',
	'../js/commands/SetSceneCommand.js',
	'../js/commands/Commands.js',

	//

	'../examples/arkanoid.app.json',
	'../examples/camera.app.json',
	'../examples/particles.app.json',
	'../examples/pong.app.json',
	'../examples/shaders.app.json'
];


function App() {

    urls.map(useScript);

    window.URL = window.URL || window.webkitURL;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    
    Number.prototype.format = function () {
    
    	return this.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' );
    
    };
    
    //
    
    const editor = new Editor();
    
    window.editor = editor; // Expose editor to Console
    window.THREE = THREE; // Expose THREE to APP Scripts and Console
    window.VRButton = VRButton; // Expose VRButton to APP Scripts
    
    const viewport = new Viewport( editor );
    document.body.appendChild( viewport.dom );
    
    const toolbar = new Toolbar( editor );
    document.body.appendChild( toolbar.dom );
    
    // const script = new Script( editor );
    // document.body.appendChild( script.dom );
    
    const player = new Player( editor );
    document.body.appendChild( player.dom );
    
    const sidebar = new Sidebar( editor );
    document.body.appendChild( sidebar.dom );
    
    const menubar = new Menubar( editor );
    document.body.appendChild( menubar.dom );
    
    const resizer = new Resizer( editor );
    document.body.appendChild( resizer.dom );
    
    //
    
    editor.storage.init( function () {
    
    	editor.storage.get( function ( state ) {
    
    		if ( isLoadingFromHash ) return;
    
    		if ( state !== undefined ) {
    
    			editor.fromJSON( state );
    
    		}
    
    		const selected = editor.config.getKey( 'selected' );
    
    		if ( selected !== undefined ) {
    
    			editor.selectByUuid( selected );
    
    		}
    
    	} );
    
    	//
    
    	let timeout;
    
    	function saveState() {
    
    		if ( editor.config.getKey( 'autosave' ) === false ) {
    
    			return;
    
    		}
    
    		clearTimeout( timeout );
    
    		timeout = setTimeout( function () {
    
    			editor.signals.savingStarted.dispatch();
    
    			timeout = setTimeout( function () {
    
    				editor.storage.set( editor.toJSON() );
    
    				editor.signals.savingFinished.dispatch();
    
    			}, 100 );
    
    		}, 1000 );
    
    	}
    
    	const signals = editor.signals;
    
    	signals.geometryChanged.add( saveState );
    	signals.objectAdded.add( saveState );
    	signals.objectChanged.add( saveState );
    	signals.objectRemoved.add( saveState );
    	signals.materialChanged.add( saveState );
    	signals.sceneBackgroundChanged.add( saveState );
    	signals.sceneEnvironmentChanged.add( saveState );
    	signals.sceneFogChanged.add( saveState );
    	signals.sceneGraphChanged.add( saveState );
    	signals.scriptChanged.add( saveState );
    	signals.historyChanged.add( saveState );
    
    } );
    
    //
    
    document.addEventListener( 'dragover', function ( event ) {
    
    	event.preventDefault();
    	event.dataTransfer.dropEffect = 'copy';
    
    } );
    
    document.addEventListener( 'drop', function ( event ) {
    
    	event.preventDefault();
    
    	if ( event.dataTransfer.types[ 0 ] === 'text/plain' ) return; // Outliner drop
    
    	if ( event.dataTransfer.items ) {
    
    		// DataTransferItemList supports folders
    
    		editor.loader.loadItemList( event.dataTransfer.items );
    
    	} else {
    
    		editor.loader.loadFiles( event.dataTransfer.files );
    
    	}
    
    } );
    
    function onWindowResize() {
    
    	editor.signals.windowResize.dispatch();
    
    }
    
    window.addEventListener( 'resize', onWindowResize );
    
    onWindowResize();
    
    //
    
    let isLoadingFromHash = false;
    const hash = window.location.hash;
    
    if ( hash.slice( 1, 6 ) === 'file=' ) {
    
    	const file = hash.slice( 6 );
    
    	if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {
    
    		const loader = new THREE.FileLoader();
    		loader.crossOrigin = '';
    		loader.load( file, function ( text ) {
    
    			editor.clear();
    			editor.fromJSON( JSON.parse( text ) );
    
    		} );
    
    		isLoadingFromHash = true;
    
    	}
    
    }
    
    // ServiceWorker
    
    if ( 'serviceWorker' in navigator ) {
    
    	try {
    
    		navigator.serviceWorker.register( 'sw.js' );
    
    	} catch ( error ) {
    
    	}
    
    }
    return null;

}

export default App;
      
