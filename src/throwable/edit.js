/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props - Block props.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { gravity, restitution } = attributes;

	const ALLOWED_BLOCKS = [
		"core/paragraph",
		"core/heading",
		"core/button",
		"core/image",
	];

	const blockProps = useBlockProps({
		className: "wp-block-blocklayouts-throwable",
		"data-tp-throwable-scene": true,
		"data-gravity": gravity,
		"data-restitution": restitution,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Physics Settings", "throwable")}
					initialOpen={true}
				>
					<RangeControl
						label={__("Gravity", "throwable")}
						value={gravity}
						onChange={(value) => setAttributes({ gravity: value })}
						min={0.1}
						max={2}
						step={0.1}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					<RangeControl
						label={__("Bounce (Restitution)", "throwable")}
						value={restitution}
						onChange={(value) => setAttributes({ restitution: value })}
						min={0}
						max={1}
						step={0.1}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="throwable-container">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={[
							[
								"core/paragraph",
								{
									content: __("Play around, it's fun", "throwable"),
									style: {
										color: {
											background: "#A3DC9A",
										},
										border: {
											radius: "99px",
										},
										spacing: {
											padding: {
												top: "16px",
												bottom: "16px",
												left: "24px",
												right: "24px",
											},
										},
									},
								},
							],
							[
								"core/paragraph",
								{
									content: __("Built for Everyone", "throwable"),
									style: {
										color: {
											background: "#FADA7A",
										},
										border: {
											radius: "99px",
										},
										spacing: {
											padding: {
												top: "16px",
												bottom: "16px",
												left: "24px",
												right: "24px",
											},
										},
									},
								},
							],
							[
								"core/paragraph",
								{
									content: __("It's Super Cool", "throwable"),
									style: {
										color: {
											background: "#CB9DF0",
										},
										border: {
											radius: "99px",
										},
										spacing: {
											padding: {
												top: "16px",
												bottom: "16px",
												left: "24px",
												right: "24px",
											},
										},
									},
								},
							],
							[
								"core/paragraph",
								{
									content: __("Just drag it in", "throwable"),
									style: {
										color: {
											background: "#B8E0FF",
										},
										border: {
											radius: "99px",
										},
										spacing: {
											padding: {
												top: "16px",
												bottom: "16px",
												left: "24px",
												right: "24px",
											},
										},
									},
								},
							],
						]}
						templateLock={false}
						orientation="horizontal"
					/>
				</div>
			</div>
		</>
	);
}
