<?php
/**
 * Code the Change template for the footer
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
 ?>

</div>

<div class="container-fluid footer">
    <div class="container grid">
        <div class="cell first">
            &copy; <?php echo date("Y") ?> Alex V. Nilsson


        </div>
        <div class="cell second">
            <?php wp_nav_menu(); ?>
        </div>
    </div>
</div>
<?php wp_footer() ?>
</body>

</html>