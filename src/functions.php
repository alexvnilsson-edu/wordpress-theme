<?php
/**
 * Code the Change Starter Theme Functions
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme;

define('PLUGIN_PATH', get_template_directory());

require PLUGIN_PATH . '/vendor/autoload.php';
require PLUGIN_PATH . '/autoload.php';
require PLUGIN_PATH . '/inc/cleanup.php';
require PLUGIN_PATH . '/inc/enqueue.php';