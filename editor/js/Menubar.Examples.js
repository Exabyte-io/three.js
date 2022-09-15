import { UIPanel, UIRow } from './libs/ui.js';
import rotation from '../examples/rotation.app.json';

function MenubarExamples( editor ) {

	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass( 'menu' );

	const title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/examples' ) );
	container.add( title );

	const options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

	// Examples

	const items = [
		{ title: 'menubar/examples/Rotation', file: rotation },
	];

	for ( let i = 0; i < items.length; i ++ ) {

		( function ( i ) {

			const item = items[ i ];

			const option = new UIRow();
			option.setClass( 'option' );
			option.setTextContent( strings.getKey( item.title ) );
			option.onClick( function () {

				if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

					editor.clear();
					editor.fromJSON( item.file );

				}

			} );
			options.add( option );

		} )( i );

	}

	return container;

}

export { MenubarExamples };
