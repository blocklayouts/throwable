/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import {
	Engine,
	Runner,
	Bodies,
	Composite,
	Mouse,
	MouseConstraint,
	Events,
	Body,
} from "matter-js";

(function () {
	"use strict";

	// Debounce utility function
	const debounce = function (func, wait, immediate) {
		let timeout;
		return function executedFunction() {
			const context = this;
			const args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	// Throwable class
	class ThrowablePhysics {
		constructor(element) {
			this.element = element;
			this.options = {
				gravity: parseFloat(element.dataset.gravity) || 0.8,
				restitution: parseFloat(element.dataset.restitution) || 0.3,
			};

			this.DOM = {
				element: element,
				throwables: element.querySelectorAll(
					".wp-block-blocklayouts-throwable .throwable-container > *",
				),
			};

			this.bodies = [];
			this.engine = null;
			this.runner = null;
			this.mouse = null;
			this.mouseConstraint = null;
			this.boundaries = {};

			this.onWindowResize = debounce(this.onWindowResize.bind(this), 250);

			this.init();
		}

		init() {
			this.createWorld();
			this.createBoundaries();
			this.createBodies();
			this.enableRunner();
			this.makeItRain();
			this.bindResize();
		}

		createWorld() {
			this.height = this.DOM.element.offsetHeight;
			this.width = this.DOM.element.offsetWidth;

			this.engine = Engine.create();
			this.runner = Runner.create();
			this.mouse = Mouse.create(this.DOM.element);

			// Remove default mouse wheel behavior
			this.DOM.element.removeEventListener("mousewheel", this.mouse.mousewheel);
			this.DOM.element.addEventListener("mouseleave", this.mouse.mouseup);

			this.mouseConstraint = MouseConstraint.create(this.engine, {
				mouse: this.mouse,
				constraint: {
					render: {
						visible: false,
					},
				},
			});

			this.engine.gravity.y = this.options.gravity;
			Composite.add(this.engine.world, [this.mouseConstraint]);
			Runner.start(this.runner, this.engine);

			Events.on(this.mouseConstraint, "mousedown", () => {
				this.DOM.element.style.pointerEvents = "auto";
			});

			Events.on(this.mouseConstraint, "mouseup", () => {
				this.DOM.element.style.pointerEvents = "";
			});

			this.runner.enabled = false;
		}

		createBoundaries() {
			this.boundaries.start = Bodies.rectangle(
				-250,
				this.height / 2,
				500,
				4 * this.height,
				{ isStatic: true },
			);

			this.boundaries.end = Bodies.rectangle(
				this.width + 250,
				this.height / 2,
				500,
				4 * this.height,
				{ isStatic: true },
			);

			this.boundaries.bottom = Bodies.rectangle(
				0,
				this.height + 250,
				2 * this.width,
				500,
				{ isStatic: true },
			);

			Composite.add(this.engine.world, [
				this.boundaries.bottom,
				this.boundaries.start,
				this.boundaries.end,
			]);
		}

		createBodies() {
			this.DOM.throwables.forEach((element, index) => {
				const rect = element.getBoundingClientRect();
				const angle = Math.random() * 0.4 * Math.PI - 0.2 * Math.PI;
				const x = Math.random() * (this.width - rect.width) + rect.width / 2;
				const y = -rect.height - (index * rect.height + 10);
				const chamferRadius = 0;

				const body = Bodies.rectangle(x, y, rect.width, rect.height, {
					chamfer: { radius: chamferRadius },
					angle: angle,
					isStatic: true,
					restitution: this.options.restitution,
				});

				this.bodies.push(body);
				Composite.add(this.engine.world, [body]);

				// Set initial opacity to 0 for animation
				element.style.opacity = "0";
				element.style.position = "absolute";
				element.style.transformOrigin = "center";

				// Update position on each tick
				Events.on(this.runner, "tick", () => {
					if (this.runner.enabled) {
						element.style.transform = `translate(${
							body.position.x - rect.width / 2
						}px, ${body.position.y - rect.height / 2}px) rotate(${
							body.angle
						}rad)`;
					}
				});
			});
		}

		createTopBoundary() {
			this.boundaries.top = Bodies.rectangle(0, -250, 2 * this.width, 500, {
				isStatic: true,
			});
			Composite.add(this.engine.world, [this.boundaries.top]);
		}

		enableRunner() {
			this.runnerObserver = new IntersectionObserver(([entry]) => {
				this.runner.enabled = entry.isIntersecting;
			});
			this.runnerObserver.observe(this.DOM.element);
		}

		makeItRain() {
			this.rainObserver = new IntersectionObserver(([entry], observer) => {
				if (entry.isIntersecting) {
					// Animate elements in
					this.DOM.throwables.forEach((element, index) => {
						setTimeout(() => {
							element.style.transition = "opacity 0.35s ease";
							element.style.opacity = "1";
						}, index * 50);
					});

					this.startRain();
					observer.disconnect();
				}
			});
			this.rainObserver.observe(this.DOM.element);
		}

		startRain() {
			// Release bodies one by one
			this.bodies.forEach((body, index) => {
				setTimeout(() => {
					Body.setStatic(body, false);
				}, 80 * index);
			});

			let topBoundaryCreated = false;
			Events.on(this.runner, "tick", () => {
				if (
					!topBoundaryCreated &&
					this.bodies[this.bodies.length - 1] &&
					this.bodies[this.bodies.length - 1].position.y >
						this.DOM.element.offsetHeight / 2
				) {
					this.createTopBoundary();
					topBoundaryCreated = true;
				}
			});
		}

		bindResize() {
			window.addEventListener("resize", this.onWindowResize);
		}

		onWindowResize() {
			if (
				this.height === this.DOM.element.offsetHeight &&
				this.width === this.DOM.element.offsetWidth
			) {
				return;
			}

			this.height = this.DOM.element.offsetHeight;
			this.width = this.DOM.element.offsetWidth;

			setTimeout(() => {
				this.updateBoundaries();
				this.updateBodies();
			}, 100);
		}

		updateBoundaries() {
			if (this.boundaries.top) {
				Body.setVertices(
					this.boundaries.top,
					Bodies.rectangle(0, -250, 2 * this.width, 500, {
						isStatic: true,
					}).vertices,
				);
			}

			if (this.boundaries.start) {
				Body.setPosition(this.boundaries.start, {
					x: -250,
					y: this.height / 2,
				});
				Body.setVertices(
					this.boundaries.start,
					Bodies.rectangle(-250, this.height / 2, 500, 4 * this.height, {
						isStatic: true,
					}).vertices,
				);
			}

			if (this.boundaries.end) {
				Body.setPosition(this.boundaries.end, {
					x: this.width + 250,
					y: this.height / 2,
				});
				Body.setVertices(
					this.boundaries.end,
					Bodies.rectangle(
						this.width + 250,
						this.height / 2,
						500,
						4 * this.height,
						{ isStatic: true },
					).vertices,
				);
			}

			if (this.boundaries.bottom) {
				Body.setPosition(this.boundaries.bottom, {
					x: 0,
					y: this.height + 250,
				});
				Body.setVertices(
					this.boundaries.bottom,
					Bodies.rectangle(0, this.height + 250, 2 * this.width, 500, {
						isStatic: true,
					}).vertices,
				);
			}
		}

		updateBodies() {
			this.DOM.throwables.forEach((element, index) => {
				const body = this.bodies[index];
				const rect = element.getBoundingClientRect();
				const chamferRadius = 0;

				const newBody = Bodies.rectangle(
					body.position.x,
					body.position.y,
					rect.width,
					rect.height,
					{
						chamfer: { radius: chamferRadius },
						angle: body.angle,
					},
				);

				Body.setVertices(body, newBody.vertices);

				// Reset position if body falls out of bounds
				if (body.position.y > this.height) {
					Body.setPosition(body, {
						y: this.height / 2,
						x: body.position.x,
					});
				}

				if (body.position.x > this.width) {
					const newX =
						Math.random() * (this.width - rect.width) + rect.width / 2;
					Body.setPosition(body, { y: body.position.y, x: newX });
				}
			});
		}

		destroy() {
			if (this.runner) {
				this.runner.enabled = false;
				Runner.stop(this.runner);
			}
			if (this.runnerObserver) {
				this.runnerObserver.disconnect();
			}
			if (this.rainObserver) {
				this.rainObserver.disconnect();
			}
			window.removeEventListener("resize", this.onWindowResize);
		}
	}

	// Initialize throwable blocks when DOM is ready
	document.addEventListener("DOMContentLoaded", function () {
		const throwableElements = document.querySelectorAll(
			"[data-tp-throwable-scene]",
		);
		const instances = [];

		throwableElements.forEach((element) => {
			instances.push(new ThrowablePhysics(element));
		});

		// Cleanup on page unload
		window.addEventListener("beforeunload", function () {
			instances.forEach((instance) => instance.destroy());
		});
	});
})();
