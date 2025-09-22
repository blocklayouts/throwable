/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

const blockIcon = (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M5.30775 20.5C4.80258 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.30775C3.5 4.80258 3.675 4.375 4.025 4.025C4.375 3.675 4.80258 3.5 5.30775 3.5H18.6923C19.1974 3.5 19.625 3.675 19.975 4.025C20.325 4.375 20.5 4.80258 20.5 5.30775V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H5.30775ZM5.30775 19H18.6923C18.7693 19 18.8398 18.9679 18.9038 18.9038C18.9679 18.8398 19 18.7693 19 18.6923V5.30775C19 5.23075 18.9679 5.16025 18.9038 5.09625C18.8398 5.03208 18.7693 5 18.6923 5H5.30775C5.23075 5 5.16025 5.03208 5.09625 5.09625C5.03208 5.16025 5 5.23075 5 5.30775V18.6923C5 18.7693 5.03208 18.8398 5.09625 18.9038C5.16025 18.9679 5.23075 19 5.30775 19Z"
			fill="currentColor"
		/>
		<path
			d="M13.1152 16.6088L8.5448 17.671C8.29366 17.7294 8.06463 17.6941 7.85772 17.5651C7.65069 17.4363 7.51798 17.2463 7.45961 16.9951L6.39735 12.4247C6.33901 12.1737 6.37435 11.9448 6.50336 11.7379C6.63217 11.5309 6.82214 11.3981 7.07328 11.3398L11.6437 10.2775C11.8947 10.2192 12.1236 10.2545 12.3305 10.3835C12.5376 10.5123 12.6703 10.7022 12.7286 10.9532L13.7909 15.5236C13.8492 15.7748 13.8139 16.0038 13.6849 16.2107C13.5561 16.4177 13.3662 16.5504 13.1152 16.6088Z"
			fill="currentColor"
		/>
	</svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	icon: blockIcon,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
