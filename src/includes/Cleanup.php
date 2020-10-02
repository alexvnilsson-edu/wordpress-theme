<?php
/**
 * @TODO
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme;

class Cleanup
{
    public function __construct()
    {
        add_filter('script_loader_src', array( $this, 'strip_wp_version_strings'));
        add_filter('style_loader_src', array( $this, 'strip_wp_version_strings'));
        add_filter('the_generator', array( $this, 'strip_meta_version'));
    }

    // Remove version string from js and css
    public function strip_wp_version_strings($src)
    {
        global $wp_version;
        parse_str(parse_url($src, PHP_URL_QUERY), $query);
        if (!empty($query['ver']) && $query['ver'] === $wp_version) {
            $src = remove_query_arg('ver', $src);
        }
        return $src;
    }

    // Remove metatag generator from header
    public function strip_meta_version()
    {
        return '';
    }
}

$cleanup = new Cleanup();