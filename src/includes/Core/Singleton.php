<?php
namespace AlexVNilsson\WordPressTheme\Core;

class Singleton
{
    protected static $instance = null;

    public static function getInstance()
    {
        if (!self::$instance) {
            return false;
        }

        return self::$instance;
    }

    public static function setInstance($instance)
    {
        if (!self::$instance) {
            self::$instance = $instance;
        }
    }
}