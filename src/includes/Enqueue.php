<?php
/**
 * Code the Change Foundation enqueue functions
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme;

Enqueue::initialize();

class Enqueue
{
    public static function initialize()
    {
        add_action('wp_enqueue_scripts', array(__CLASS__, 'load_assets'));
    }

    public static function load_assets()
    {
        // Google Font enqueues
        wp_enqueue_style('googlefont-robotoslab', 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&display=swap', false);
        wp_enqueue_style('googlefont-materialicon', 'https://fonts.googleapis.com/icon?family=Material+Icons', false);

        wp_enqueue_style('alexvnilsson-style', get_template_directory_uri() . '/assets/css/root.min.css', array(), '{{ template.version }}', 'all');

        wp_enqueue_script('alexvnilsson-vendor', get_template_directory_uri() . "/assets/js/vendor.min.js", array(), '{{ template.version }}', true);
        wp_enqueue_script('alexvnilsson-main', get_template_directory_uri() . "/assets/js/main.min.js", array(), '{{ template.version }}', true);
    }
}