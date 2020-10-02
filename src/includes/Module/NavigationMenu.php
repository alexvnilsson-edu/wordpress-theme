<?php
/**
 * Fil med logik och funktioner för rendering av navigationsmenyer.
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme\Module;

use AlexVNilsson\WordPressTheme\Module\Header;
use AlexVNilsson\WordPressTheme\Core\Log;

class NavigationMenu
{
    public static function render_nav_menu($menu_name)
    {
        // $locations = get_nav_menu_locations();
        // if (!array_key_exists($menu_name, $locations)) {
        //     Log::getLogger()->error("Hittar ingen meny med namnet \"{$menu_name}\".");
        //     return false;
        // }
        $menu = wp_get_nav_menu_object($menu_name);
        // Log::getLogger()->info(var_dump(get_registered_nav_menus()));
        $menuItems = Header::get_nav_menu_items($menu->term_id); ?>
<div class="nav-wrapper">
    <?php if ($menuItems && !empty($menuItems)): ?>
    <ul class="nav">
        <?php foreach ($menuItems as $item): ?>
        <?php $hasDescendants = (count($item->children) > 0); ?>

        <li class="item">
            <a href="<?php echo $item->url; ?>" class="link">
                <span><?php echo $item->title; ?></span>
                <?php if ($hasDescendants): ?>
                <i class="material-icons">expand_more</i>
                <?php endif ?>
            </a>

            <?php if (!empty($item->children)): ?>
            <ul class="nav-descendants">
                <?php foreach ($item->children as $child): ?>
                <li class="item">
                    <a href="<?php echo $child->url; ?>" class="link">
                        <span><?php echo $child->title; ?></span>
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