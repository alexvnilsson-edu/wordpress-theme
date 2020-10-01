<?php
/**
 * Fil som innehåller funktioner för sidhuvudet.
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */


function get_custom_logo_url()
{
    $custom_logo_id = get_theme_mod('custom_logo');
    $logo = wp_get_attachment_image_src($custom_logo_id, 'full');

    return $logo;
}

function get_nav_menu_items(string $menu, array $args = array())
{
    $argsDefault = array();

    $menu = array();
    $subMenu = array();
    $items = wp_get_nav_menu_items($menu, array_merge($argsDefault, $args));

    foreach ($items as $item) {
        if (empty($item->menu_item_parent)) {
            $menu[$item->ID] = array();
            $menu[$item->ID]['ID']			=   $item->ID;
            $menu[$item->ID]['title']		=   $item->title;
            $menu[$item->ID]['url']			=   $item->url;
            $menu[$item->ID]['children']	=   array();
        }
    }

    foreach ($items as $item) {
        if ($item->menu_item_parent) {
            $subMenu[$item->ID] = array();
            $subMenu[$item->ID]['ID']			=   $item->ID;
            $subMenu[$item->ID]['title']		=   $item->title;
            $subMenu[$item->ID]['url']			=   $item->url;
            $menu[$item->menu_item_parent]['children'][$item->ID] = $subMenu[$item->ID];
        }
    }

    return $menu;
}