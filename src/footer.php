<?php
/**
 * Code the Change template for the footer
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */


require_once(THEME_PATH . "/includes/Module/Footer.php");

use AlexVNilsson\WordPressTheme\Module\Footer;

?>

</div>

<div class="container footer">
    <div class="field copyright">
        &copy; <?php echo date("Y") ?> Alex V. Nilsson
    </div>

    <div class="field separate"></div>

    <div class="field menu">
        <?php Footer::render_nav_menu('footer') ?>
    </div>
</div>
<?php wp_footer() ?>
</body>

</html>