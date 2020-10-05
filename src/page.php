<?php
/**
 * The main template file
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

?>

<?php get_header(); ?>

<div class="container">
    <h1><?php echo the_title(); ?></h1>
    <p><?php echo the_content(); ?></p>
</div>

<?php get_footer(); ?>