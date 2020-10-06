<?php
/**
 * Code the Change Starter Theme Functions
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
define('PLUGIN_PATH', get_template_directory());
define('THEME_PATH', PLUGIN_PATH);

// require_once(THEME_PATH . "/includes/Core/Log.php");
require_once(THEME_PATH . "/includes/Enqueue.php");
require_once(THEME_PATH . "/includes/ThemeSupport.php");
require_once(THEME_PATH . "/includes/Module/ShortcodeSubpages.php");

use AlexVNilsson\WordPressTheme\Enqueue;
use AlexVNilsson\WordPressTheme\Module\ShortcutSubpages;
use AlexVNilsson\WordPressTheme\ThemeSupport;

Enqueue::initialize();
ThemeSupport::initialize();

ShortcutSubpages::initialize();

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/autoload.php';