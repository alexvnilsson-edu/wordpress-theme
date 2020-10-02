<?php
namespace AlexVNilsson\WordPressTheme;

spl_autoload_register(__NAMESPACE__ . '\\autoload');
function autoload($cls)
{
    $cls = ltrim($cls, '\\');
    if (strpos($cls, __NAMESPACE__) !== 0) {
        return;
    }

    $cls = str_replace(__NAMESPACE__, '', $cls);

    $path = PLUGIN_PATH . '/inc/classes' .
        str_replace('\\', DIRECTORY_SEPARATOR, $cls) . '.php';

    require_once($path);
}