import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { javascript, esLint } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { lintGutter, linter } from '@codemirror/lint';
import { indentWithTab } from '@codemirror/commands';
import Linter from 'eslint4b-prebuilt';

const doc = '';
export const Codemirror = ( { container, extensions = [] } ) => {

	return new EditorView( {
		state: EditorState.create( {
			doc,
			extensions: [
				basicSetup,
				javascript(),
				oneDark,
				keymap.of( [ indentWithTab ] ),
				linter( esLint( new Linter() ) ),
				lintGutter(),
				...extensions
			]
		} ),
		parent: container,
	} );

};
