document.addEventListener('DOMContentLoaded', () => {
  tippy('[data-tippy-content]', {
    animation: 'scale-subtle', // Animation type
    duration: [50, 50],
    arrow: false,
    arrowType: 'round',
    placement: 'bottom',
    delay: [250, 50],
    theme: 'custom',
  });
});

tippy('#close-sidebar', {
  content: 'Close Sidebar',
  duration: [50, 50],
  arrow: false,
  arrowType: 'round',
  placement: 'right',
  delay: [250, 50],
  animation: 'scale',
  theme: 'custom',
});
tippy('.send-button', {
  content: 'Send',
  duration: [50, 50],
  arrow: false,
  arrowType: 'round',
  placement: 'bottom',
  delay: [50, 50],
  animation: 'scale-subtle',
  theme: 'custom',
});
function addTooltip(selector, content, options = {}) {
  tippy(selector, {
    content: content,
    duration: [50, 50],
    delay: [50, 50],
    arrow: true,
    arrowType: 'round',
    placement: 'bottom',
    animation: 'scale-subtle',
    theme: 'custom',
    ...options  // Spread any additional options provided
  });
}
function editTooltip(selector) {
  tippy(selector, {
    content: 'More Options',
    duration: [50, 50],
    delay: [250, 50],
    arrow: true,
    arrowType: 'round',
    placement: 'right',
    animation: 'scale-subtle',
    theme: 'custom',
  });
}
