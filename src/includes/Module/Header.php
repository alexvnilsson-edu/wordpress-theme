<?php
/**
 * Fil som innehåller funktioner för sidhuvudet.
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme\Module;

use AlexVNilsson\WordPressTheme\Core\Menu;
use AlexVNilsson\WordPressTheme\Core\MenuItem;

class Header
{
    public static function get_custom_logo_url()
    {
        $custom_logo_id = get_theme_mod('custom_logo');
        $logo = wp_get_attachment_image_src($custom_logo_id, 'full');

        return $logo;
    }

    public static function render_nav_menu($menu_location_name = null, $container_name = null)
    {
        $locations = get_nav_menu_locations();
        if (!array_key_exists($menu_location_name, $locations)) {
            return false;
        }
        $menu_items = Menu::get_nav_menu_items($locations[$menu_location_name]); ?>
<div class="<?php echo join(' ', array('nav-wrapper', $container_name)) ?>">
    <?php if ($menu_items && !empty($menu_items)): ?>
    <ul class="nav">
        <?php foreach ($menu_items as $item): ?>
        <?php $hasDescendants = ($item->children && count($item->children) > 0); ?>

        <li class="<?php echo join(' ', array('item', $hasDescendants ? 'parent' : '')) ?>">
            <a href="<?php echo $item->url; ?>" class="link">
                <?php echo $item->title; ?>
                <?php if ($hasDescendants): ?>
                <i class="icon material-icons">expand_more</i>
                <?php endif ?>
            </a>

            <?php if (!empty($item->children)): ?>
            <ul class="nav-descendants">
                <?php foreach ($item->children as $child): ?>
                <li class="item">
                    <a href="<?php echo $child->url; ?>" class="link">
                        <?php echo $child->title; ?>
                    </a>
                </li>
                <?php endforeach ?>
            </ul>
            <?php endif ?>
        </li>
        <?php endforeach ?>
    </ul>
    <?php endif ?>
</div>
<?php
    }
}