<?php
/**
 * @TODO
 *
 * @package {{ template.name }}
 * @version {{ templateVersion }}
 */



function is_debug()
{
    return defined('WP_DEBUG') && WP_DEBUG == true;
}

function log_debug($message)
{
    if (is_debug()) {
        print($message);
    }
}
