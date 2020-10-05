<?php
/**
 * Fil som innehåller funktioner för sidhuvudet.
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme\Module;

class Post_Author
{
    public string $name;
    public ?string $url;

    public function __construct(string $name, ?string $url)
    {
        $this->name = $name;
        $this->url = $url;
    }
}

class Posts
{
    public static function render_post()
    {
        $post = get_post();
        $post_date = date('Y-m-d', strtotime($post->post_date));

        $author = new Post_Author(get_the_author_meta('display_name', $post->post_author), get_the_author_meta('user_url', $post->post_author)); ?>
<div class="post">
    <h2><?php echo $post->post_title ?></h2>
    <div class="content">
        <?php echo $post->post_content ?>
    </div>

    <div class="footer">
        <div class="field">
            <i class="material-icons">person</i>
            <a href="<?php echo $author->url ?>"><?php echo $author->name ?></a>
        </div>

        <div class="field">
            <i class="material-icons">calendar_today</i>
            <span><?php echo $post_date ?></span>
        </div>
    </div>
</div>
<?php
    }
}