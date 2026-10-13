=== Throwable ===
Contributors:      blocklayouts, qarayahya
Tags:              block, physics, animation, interactive, gutenberg
Tested up to:      7.1
Stable tag:        0.1.3
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A simple block that lets you throw and bounce content around with physics.

== Description ==

The Throwable block creates an interactive physics simulation where inner blocks "fall" and bounce around the container.

**Features:**
- Physics simulation using Matter.js
- Support for innerBlocks (paragraphs, headings, buttons, etc.)
- Customizable physics settings (gravity, bounce)

**Physics Settings:**
- **Gravity**: Control the strength of gravity (0.1 - 2.0)
- **Bounce (Restitution)**: Control how much blocks bounce (0 - 1)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/throwable` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use the block editor to add the Throwable block
4. Add any content blocks inside the Throwable container
5. Customize physics settings in the block sidebar

== Usage ==

1. Add the "Throwable" block to your page/post
2. Add any supported blocks inside (paragraphs, headings, buttons, etc.)
3. Configure physics settings in the block sidebar:
   - Adjust gravity strength
   - Set bounce level
   - Enable scroll gravity for dynamic effects
4. Publish and view your page to see the physics simulation in action

== Frequently Asked Questions ==

= What blocks can I use inside the Throwable container? =

You can use most common blocks including paragraphs, headings, buttons, and images.

= Does the physics simulation work on mobile devices? =

Yes, the block is fully responsive and the physics simulation works on all devices. The block automatically adjusts its size and behavior for mobile screens.

== Resources ==

This plugin uses Matter.js for physics simulation, which is licensed under the MIT License.

- **Matter.js**: https://github.com/liabru/matter-js/blob/master/LICENSE
- **License**: MIT License

== Changelog ==

= 0.1.3 =

* Tested with WordPress 7.1.

= 0.1.2 =

* Fixed: Prevented direct file access.

= 0.1.0 =

* Initial release