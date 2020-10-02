<?php
namespace AlexVNilsson\WordPressTheme;

define('DIRECTORY_SEPARATOR_BACKWARDS', '\\');

Autoload::initialize();

class Autoload
{
    public static function initialize()
    {
        spl_autoload_register(array(__CLASS__, 'register'));
    }

    public static function register($className)
    {
        $extensions = array(".php", ".class.php", ".inc");
        $paths = explode(PATH_SEPARATOR, "includes");
        $className = str_replace("_", DIRECTORY_SEPARATOR_BACKWARDS, $className);
        foreach ($paths as $path) {
            $filename = $path . DIRECTORY_SEPARATOR_BACKWARDS . $className;
            foreach ($extensions as $ext) {
                if (is_readable($filename . $ext)) {
                    require_once $filename . $ext;
                    break;
                }
            }
        }
    }
}