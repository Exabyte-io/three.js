import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { javascript, esLint } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { lintGutter, linter } from '@codemirror/lint';
import { indentWithTab } from '@codemirror/commands';
import * as eslint from "eslint-linter-browserify";

const doc = '';
export const Codemirror = ( { container, extensions = [], ...other } ) => {
	return new EditorView( {
		state: EditorState.create( {
			doc,
			extensions: [
				basicSetup,
				javascript(),
				oneDark,
				keymap.of( [ indentWithTab ] ),
				linter( esLint( new eslint.Linter() ) ),
				lintGutter(),
				...extensions
			]
		} ),
		parent: container,
		...other
	} );
};
