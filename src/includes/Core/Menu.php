<?php
/**
 * Klasser och typer för menyer.
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme\Core;

class MenuItem
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

class Menu
{
    public static function get_nav_menu_items($menu_id, array $args = array())
    {
        $menu = array();
        $menu_items = wp_get_nav_menu_items($menu_id, array_merge(array(), $args));

        if (!empty($menu_items)) {
            foreach ($menu_items as $item) {
                if (intval($item->menu_item_parent) == 0) {
                    $menu[$item->ID] = new MenuItem($item->ID, $item->title, $item->url, array());
                }
            }

            foreach ($menu_items as $item) {
                if ($item->menu_item_parent) {
                    $menu[$item->menu_item_parent]->children[$item->ID] = new MenuItem($item->ID, $item->title, $item->url);
                }
            }
        }

        return $menu;
    }
}