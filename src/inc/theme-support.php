<?php
/**
 * Code the Change Starter theme support options
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

// Activate User Selected Post Formats
$options = get_option('post_formats');
$formats = array('aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat');
$output = array();
foreach ($formats as $format) {
    $output[] = (@$options[$format] == 1 ? $format : '');
}
if (!empty($options)) {
    add_theme_support('post-formats', $output);
}

// Activate Featured Images
add_theme_support('post-thumbnails');

// Activate Custom Header Image
add_theme_support('custom-header');

// Activate Custom Logo
function alexvnilsson_register_custom_logo()
{
    $defaults = array(
        'height'      => 44,
        'width'       => 44,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
        'unlink-homepage-logo' => true,
    );

    add_theme_support('custom-logo', $defaults);
}
add_action('after_setup_theme', 'alexvnilsson_register_custom_logo');

// Activate Nav Menu Option
function alexvnilsson_register_nav_menus()
{
    register_nav_menus(
        array(
            'primary' => __('Header Navigation Menu'),
            'footer' => __('Footer Menu')
        )
    );
}
add_action('after_setup_theme', 'alexvnilsson_register_nav_menus');


// Activate HTML5 Features
add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));
