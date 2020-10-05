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
        add_action('init', array(__CLASS__, 'register_blocks'));
    }

    public static function register_blocks()
    {
        wp_enqueue_style('alexvnilsson-editor-style', get_template_directory_uri() . '/assets/css/editor/style.css', array(), '{{ template.version }}', 'all');

        wp_register_script('alexvnilsson-block-contact', get_template_directory_uri() . '/assets/js/blocks/contact.js', array('wp-blocks', 'wp-element'), '{{ template.version }}');
        register_block_type('alexvnilsson/contact', array(
            'editor_script' => 'alexvnilsson-block-contact'
        ));
    }

    public static function load_assets()
    {
        // Google Font enqueues
        wp_enqueue_style('vendor-googlefont-robotoslab', 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&display=swap', false);
        wp_enqueue_style('vendor-googlefont-materialicon', 'https://fonts.googleapis.com/icon?family=Material+Icons', false);

        // Project
        wp_enqueue_style('alexvnilsson-main-style', get_template_directory_uri() . '/assets/css/main/style.css', array(), '{{ template.version }}', 'all');

        // wp_enqueue_script('alexvnilsson-vendor', get_template_directory_uri() . "/assets/js/vendor.min.js", array(), '{{ template.version }}', true);
        wp_enqueue_script('alexvnilsson-main', get_template_directory_uri() . "/assets/js/main.js", array(), '{{ template.version }}', true);
    }
}