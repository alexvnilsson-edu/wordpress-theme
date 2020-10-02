<?php
/**
 * Fil som innehåller funktioner för sidhuvudet.
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme\Module;

class Menu_Item
{
    public $ID;
    public $title;
    public $url;
    public $children;

    public function __construct($ID, $title, $url, $children = array())
    {
        $this->ID = $ID;
        $this->title = $title;
        $this->url = $url;
        $this->children = $children;

        return $this;
    }
}

class Header
{
    public static function get_custom_logo_url()
    {
        $custom_logo_id = get_theme_mod('custom_logo');
        $logo = wp_get_attachment_image_src($custom_logo_id, 'full');

        return $logo;
    }

    public static function get_nav_menu_items(string $menu, array $args = array())
    {
        $menu = array();
        $subMenu = array();
        $menuItems = wp_get_nav_menu_items($menu, $args);

        if (!empty($menuItems)) {
            foreach ($menuItems as $item) {
                if (empty($item->menu_item_parent)) {
                    $menu[intval($item->ID)] = new Menu_Item($item->ID, $item->title, $item->url, array());
                }
            }

            foreach ($menuItems as $item) {
                if ($item->menu_item_parent) {
                    $menu[intval($item->menu_item_parent)]->children[intval($item->ID)] = new Menu_Item($item->ID, $item->title, $item->url);
                }
            }
        }

        return $menu;
    }
}