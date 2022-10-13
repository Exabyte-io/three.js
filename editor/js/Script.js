import { UIElement, UIPanel, UIText } from './libs/ui.js';
import * as esprima from 'esprima';
import { SetScriptValueCommand } from './commands/SetScriptValueCommand.js';
import { SetMaterialValueCommand } from './commands/SetMaterialValueCommand.js';
import { Codemirror } from './Codemirror.js';
import { EditorView } from '@codemirror/view';

function Script( editor ) {

	const signals = editor.signals;

	const container = new UIPanel();
	container.setId( 'script' );
	container.setPosition( 'absolute' );
	container.setBackgroundColor( '#272822' );
	container.setDisplay( 'none' );

	const header = new UIPanel();
	header.setPadding( '10px' );
	container.add( header );

	const title = new UIText().setColor( '#fff' );
	header.add( title );

	const buttonSVG = ( function () {

		const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		svg.setAttribute( 'width', 32 );
		svg.setAttribute( 'height', 32 );
		const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
		path.setAttribute( 'd', 'M 12,12 L 22,22 M 22,12 12,22' );
		path.setAttribute( 'stroke', '#fff' );
		svg.appendChild( path );
		return svg;

	} )();

	const close = new UIElement( buttonSVG );
	close.setPosition( 'absolute' );
	close.setTop( '3px' );
	close.setRight( '1px' );
	close.setCursor( 'pointer' );
	close.onClick( function () {

		container.setDisplay( 'none' );

	} );
	header.add( close );


	let renderer;

	signals.rendererCreated.add( function ( newRenderer ) {

		renderer = newRenderer;

	} );


	let delay;
	let currentMode;
	let currentScript;
	let currentObject;
	const codemirror = Codemirror( { container: container.dom, extensions: [
		EditorView.updateListener.of( function ( e ) {

			clearTimeout( delay );
			delay = setTimeout( function () {

				const value = e.state.doc.toString();

				if ( typeof ( currentScript ) === 'object' ) {

					if ( value !== currentScript.source ) {

						editor.execute( new SetScriptValueCommand( editor, currentObject, currentScript, 'source', value ) );

					}

					return;

				}

				if ( currentScript !== 'programInfo' ) return;

				const json = JSON.parse( value );

				if ( JSON.stringify( currentObject.material.defines ) !== JSON.stringify( json.defines ) ) {

					const cmd = new SetMaterialValueCommand( editor, currentObject, 'defines', json.defines );
					cmd.updatable = false;
					editor.execute( cmd );

				}

				if ( JSON.stringify( currentObject.material.uniforms ) !== JSON.stringify( json.uniforms ) ) {

					const cmd = new SetMaterialValueCommand( editor, currentObject, 'uniforms', json.uniforms );
					cmd.updatable = false;
					editor.execute( cmd );

				}

				if ( JSON.stringify( currentObject.material.attributes ) !== JSON.stringify( json.attributes ) ) {

					const cmd = new SetMaterialValueCommand( editor, currentObject, 'attributes', json.attributes );
					cmd.updatable = false;
					editor.execute( cmd );

				}

			}, 300 );

		} )
	] } );

	//this will prevent any updates on the main page on each keydown
	codemirror.contentDOM.addEventListener( 'keydown', function ( event ) {

		event.stopPropagation();

	} );

	// validate
	signals.editorCleared.add( function () {

		container.setDisplay( 'none' );

	} );

	signals.editScript.add( function ( object, script ) {

		let mode, name, source;
		if ( typeof ( script ) === 'object' ) {

			mode = 'javascript';
			name = script.name;
			source = script.source;
			title.setValue( object.name + ' / ' + name );

		} else {

			switch ( script ) {

				case 'vertexShader':

					mode = 'glsl';
					name = 'Vertex Shader';
					source = object.material.vertexShader || '';

					break;

				case 'fragmentShader':

					mode = 'glsl';
					name = 'Fragment Shader';
					source = object.material.fragmentShader || '';

					break;

				case 'programInfo':

					mode = 'json';
					name = 'Program Properties';
					const json = {
						defines: object.material.defines,
						uniforms: object.material.uniforms,
						attributes: object.material.attributes
					};
					source = JSON.stringify( json, null, '\t' );

			}

			title.setValue( object.material.name + ' / ' + name );

		}

		currentMode = mode;
		currentScript = script;
		currentObject = object;

		container.setDisplay( '' );
		const { state } = codemirror;
		const update = state.update( { changes: { from: 0, to: state.doc.length, insert: source } } );
		codemirror.update( [ update ] );

		if ( mode === 'json' ) mode = { name: 'javascript', json: true };

	} );

	signals.scriptRemoved.add( function ( script ) {

		if ( currentScript === script ) {

			container.setDisplay( 'none' );

		}

	} );

	return container;

}

export { Script };
