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
    public static function render_nav_menu($menu_name, $container_name = null)
    {
        $log = Log::getLogger();

        $locations = get_nav_menu_locations();
        $log->notice(json_encode($locations));
        if (!array_key_exists($menu_name, $locations)) {
            return false;
        }
        $menu_items = Header::get_nav_menu_items($locations[$menu_name]); ?>
<div class="<?php echo join(' ', array('nav-wrapper', $container_name)) ?>">
    <?php if ($menu_items && !empty($menu_items)): ?>
    <ul class="nav">
        <?php foreach ($menu_items as $item): ?>
        <?php $hasDescendants = ($item->children && count($item->children) > 0); ?>

        <li class="<?php echo join(' ', array('item', $hasDescendants ? 'parent' : '')) ?>">
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