<?php
namespace AlexVNilsson\WordPressTheme\Core;

interface SingletonInterface
{
    public static function configure();
}

class Singleton
{
    protected static $instance;

    public static function getInstance()
    {
        if (!self::$instance) {
            return false;
        }

        return self::$instance;
    }

    protected static function setInstance($instance)
    {
        self::$instance = $instance;

        return self::$instance;
    }
}