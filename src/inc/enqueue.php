<?php
/**
 * Code the Change Foundation enqueue functions
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

function alexvnilsson_load_scripts()
{
    // Google Font enqueues
    wp_enqueue_style('googlefont-robotoslab', 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&display=swap', false);
    wp_enqueue_style('googlefont-materialicon', 'https://fonts.googleapis.com/icon?family=Material+Icons', false);


    // Deregistration of unneeded scripts.
    wp_deregister_script('jquery');

    // Theme-specific script-enqueues
    wp_enqueue_style('alexvnilsson-style', get_template_directory_uri() . '/style.min.css', array(), '{{ template.version }}', 'all');

    // Theme-specific style-enqueues
    wp_enqueue_script('alexvnilsson-vendor', get_template_directory_uri() . "/assets/js/vendor.min.js", array(), '{{ template.version }}', true);
    wp_enqueue_script('alexvnilsson-main', get_template_directory_uri() . "/assets/js/main.min.js", array(), '{{ template.version }}', true);
}
add_action('wp_enqueue_scripts', 'alexvnilsson_load_scripts');