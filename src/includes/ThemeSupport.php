<?php
/**
 * @TODO
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme;

ThemeSupport::initialize();

class ThemeSupport
{
    public static function initialize()
    {
        add_action('after_setup_theme', array(__CLASS__, 'after_setup_theme'));
        // add_action('wp_head', array(__CLASS__, 'admin_toolbar_relocate'));
        self::register_theme_support();
    }

    public static function register_theme_support()
    {
        $options = get_option('post_formats');
        $formats = array('aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat');
        $output = array();
        foreach ($formats as $format) {
            $output[] = (@$options[$format] == 1 ? $format : '');
        }
        if (!empty($options)) {
            add_theme_support('post-formats', $output);
        }

        add_theme_support('post-thumbnails');
        add_theme_support('custom-header');
        add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));
    }

    public static function after_setup_theme()
    {
        self::register_custom_logo();
        self::register_navigation_menus();
    }

    public static function register_custom_logo()
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

    public static function register_navigation_menus()
    {
        register_nav_menus(
            array(
                'header' => __('Header Menu'),
                'footer' => __('Footer Menu')
            )
        );
    }

    public static function admin_toolbar_relocate()
    {
        echo '
		<style type="text/css">
			body { margin-top: -28px;padding-bottom: 28px; }
			body.admin-bar #wphead { padding-top: 0; }
			body.admin-bar #footer { padding-bottom: 28px; }
			#wpadminbar { top: auto !important;bottom: 0; }
			#wpadminbar .quicklinks .menupop ul { bottom: 28px; }
		</style>';
    }
}