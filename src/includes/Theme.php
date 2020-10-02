<?php
/**
 * @TODO
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */
namespace AlexVNilsson\WordPressTheme;

use AlexVNilsson\WordPressTheme\Core\Log;

class Theme
{
    public function __construct()
    {
    }

    public static function foobar()
    {
        Log::getLogger()->notice("foobar says hello!");
    }
}

$theme = new Theme();