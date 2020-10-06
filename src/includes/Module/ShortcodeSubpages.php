<?php
/**
 * Fil som innehåller funktioner för sidhuvudet.
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme\Module;

class ShortcutSubpages
{
    public static function initialize()
    {
        add_shortcode('wp_subpages', array(__CLASS__, 'register'));
    }

    public static function register()
    {
        global $post;

        if (is_page() && $post->post_parent) {
            $childpages = wp_list_pages('sort_column=menu_order&title_li=&child_of=' . $post->post_parent . '&echo=0');
        } else {
            $childpages = wp_list_pages('sort_column=menu_order&title_li=&child_of=' . $post->ID . '&echo=0');
        }

        if ($childpages) {
            $string = '<ul>' . $childpages . '</ul>';
        }

        return $string;
    }
}