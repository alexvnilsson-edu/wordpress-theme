<?php
/**
 * Code the Change template for the header
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

require_once(THEME_PATH . "/includes/Module/Header.php");
require_once(THEME_PATH ."/includes/Module/NavigationMenu.php");

use AlexVNilsson\WordPressTheme\Module\Header;
use AlexVNilsson\WordPressTheme\Module\NavigationMenu;

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo('name'); wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo('description') ?>">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php if (is_singular() && pings_open(get_queried_object())): ?>
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php endif ?>
    <?php wp_head() ?>
</head>

<?php
    // wp_nav_menu(array( 'menu' => 'primary', 'container' => null, 'items_wrap' => '<ul class="nav primary">%3$s</ul>', 'menu_class' => 'navbar', 'theme_location' => 'header-menu', 'link_after' => '<i class="material-icons icon">expand_more</i>' ));
?>

<?php
    $logo = Header::get_custom_logo_url();
    //$logo = null; //Header::get_custom_logo_url();
?>

<body <?php body_class() ?>>
    <nav class="navbar primary">
        <a class="brand" href="<?php get_site_url(); ?>">
            <?php if (has_custom_logo()): ?>
            <img src="<?php echo $logo[0] ?>" width="<?php echo $logo[1] ?>" height="<?php echo $logo[2] ?>"
                alt="Logotyp" />
            <?php endif ?>

            <span class="name"><?php bloginfo('name'); ?></span>
        </a>

        <a href="#" class="menu-expander">
            <i class="material-icons">menu</i>
        </a>

        <?php NavigationMenu::render_nav_menu('header'); ?>
        <?php NavigationMenu::render_nav_menu('header', 'mobile'); ?>
    </nav>

    <div id="content" class="container">