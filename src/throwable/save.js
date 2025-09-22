/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props - Block props.
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { roundness, scrollGravity, gravity, restitution } = attributes;

	const blockProps = useBlockProps.save({
		className: "wp-block-blocklayouts-throwable",
		"data-tp-throwable-scene": true,
		"data-roundness": roundness,
		"data-scroll-gravity": scrollGravity,
		"data-gravity": gravity,
		"data-restitution": restitution,
	});

	return (
		<div {...blockProps}>
			<div className="throwable-container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
