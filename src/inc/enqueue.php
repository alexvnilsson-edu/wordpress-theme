<?php
/**
 * Code the Change Foundation enqueue functions
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

function alexvnilsson_load_scripts()
{
    wp_enqueue_style('googlefont-robotoslab', 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&display=swap', false);
    wp_enqueue_style('alexvnilsson-style', get_template_directory_uri() . '/style.min.css', array(), '{{ template.version }}', 'all');
    // wp_deregister_script('jquery');

    wp_enqueue_script('animejs', 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js', false);
    wp_enqueue_script('alexvnilsson-vendor', get_template_directory_uri() . "/assets/js/vendor.min.js", array(), '{{ template.version }}', true);
    wp_enqueue_script('alexvnilsson-main', get_template_directory_uri() . "/assets/js/main.min.js", array(), '{{ template.version }}', true);
    // wp_enqueue_script('alexvnilsson');
}
add_action('wp_enqueue_scripts', 'alexvnilsson_load_scripts');