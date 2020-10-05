<?php
/**
 * The main template file
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

use AlexVNilsson\WordPressTheme\Module\Posts;

?>

<?php get_header(); ?>

<?php
        if (have_posts()): ?>
<div class="blog-container">
    <div class="container">
        <div class="blog"> <?php
        while (have_posts()): the_post(); Posts::render_post(); endwhile; ?>
        </div>
    </div>
</div><?php
  endif;
?>

<div class="container">

</div>

<?php get_footer(); ?>