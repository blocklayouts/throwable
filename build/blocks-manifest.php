<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// This file is generated. Do not modify it manually.
return array(
	'throwable' => array(
		'$schema'      => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion'   => 3,
		'name'         => 'blocklayouts/throwable',
		'version'      => '0.1.0',
		'title'        => 'Throwable',
		'category'     => 'widgets',
		'icon'         => 'smiley',
		'description'  => 'A physics-based throwable block container with innerBlocks support.',
		'example'      => array(),
		'supports'     => array(
			'html'                 => false,
			'align'                => array(
				'wide',
				'full',
			),
			'color'                => array(
				'enableContrastChecker'         => false,
				'background'                    => true,
				'gradients'                     => true,
				'text'                          => true,
				'__experimentalDefaultControls' => array(
					'text'       => true,
					'background' => true,
				),
			),
			'spacing'              => array(
				'margin'                        => true,
				'units'                         => array(
					'px',
					'em',
					'rem',
					'vh',
					'vw',
				),
				'__experimentalDefaultControls' => array(
					'margin' => true,
				),
			),
			'dimensions'           => array(
				'minHeight' => true,
			),
			'__experimentalBorder' => array(
				'radius'                        => true,
				'color'                         => true,
				'width'                         => true,
				'style'                         => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'color'  => true,
					'width'  => true,
					'style'  => true,
				),
			),
			'innerBlocks'          => true,
		),
		'attributes'   => array(
			'gravity'     => array(
				'type'    => 'number',
				'default' => 0.8,
			),
			'restitution' => array(
				'type'    => 'number',
				'default' => 0.3,
			),
		),
		'textdomain'   => 'throwable',
		'editorScript' => 'file:./index.js',
		'editorStyle'  => 'file:./index.css',
		'style'        => 'file:./style-index.css',
		'viewScript'   => 'file:./view.js',
	),
);