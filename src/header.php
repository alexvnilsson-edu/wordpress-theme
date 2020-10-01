<?php
/**
 * Code the Change template for the header
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

require_once(get_template_directory() . "/inc/partials/header.php");
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

<?php $logo = get_custom_logo_url(); ?>

<body <?php body_class() ?>>
    <div class="container-fluid">
        <nav class="navbar primary" data-barba="wrapper">
            <a class="brand" href="<?php get_site_url(); ?>">
                <?php if (has_custom_logo()): ?>
                <img src="<?php echo $logo[0] ?>" width="<?php echo $logo[1] ?>" height="<?php echo $logo[2] ?>"
                    alt="Logotyp" />
                <?php endif ?>
                <span class="name"><?php bloginfo('name'); ?></span>
            </a>

            <?php wp_nav_menu(array( 'menu' => 'primary', 'container' => null, 'menu_class' => 'nav justify-end', 'theme_location' => 'header-menu' )); ?>
        </nav>
    </div>


    <div id="content" class="container">