<?php
/**
 * Code the Change Starter Theme Functions
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */

require get_template_directory() . '/inc/cleanup.php';
require get_template_directory() . '/inc/enqueue.php';
require get_template_directory() . '/inc/theme-support.php';

function move_admin_bar()
{
    echo '
	<style type="text/css">
		body { margin-top: -28px;padding-bottom: 28px; }
		body.admin-bar #wphead { padding-top: 0; }
		body.admin-bar #footer { padding-bottom: 28px; }
		#wpadminbar { top: auto !important;bottom: 0; }
		#wpadminbar .quicklinks .menupop ul { bottom: 28px; }
	</style>';
}
add_action('wp_head', 'move_admin_bar');