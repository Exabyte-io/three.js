import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
//NOTE: aren't importing `Linter` here b/c eslint-prebuilt package is 1.5MB in webapp bundle
import { lintGutter } from '@codemirror/lint';
import { indentWithTab } from '@codemirror/commands';

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
				lintGutter(),
				...extensions
			]
		} ),
		parent: container,
		...other
	} );

};
