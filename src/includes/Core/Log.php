<?php
namespace AlexVNilsson\WordPressTheme\Core;

use AlexVNilsson\WordPressTheme\Core\Singleton;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\LineFormatter;

class Log extends Singleton
{
    protected Logger $log;

    public static function getLogger() : Logger
    {
        if (!self::getInstance()) {
            return self::configure();
        }

        return self::getInstance();
    }

    protected static function configure()
    {
        $log = new Logger('wp-theme-alexvnilsson');
        $streamHandler = new StreamHandler('/var/log/wordpress/debug.log', Logger::DEBUG);
        $streamHandler->setFormatter(new LineFormatter("[%datetime%] %channel%.%level_name%: %message% %context% %extra%\n", "Y-m-d H:i:s", false, true));
        $log->pushHandler($streamHandler);

        self::setInstance($log);
        return self::getLogger();
    }

    /**
     * Lägg till nytt logginlägg med valfri allvarlighetsgrad (loggnivå).
     *
     * Metoden bör endast användas i bakåt-kompatibilitetssyfte.
     *
     * @param mixed		$level		Loggnivån.
     * @param string 	$message	Loggmeddelande.
     */
    public static function log($level, $message, array $context = [])
    {
        self::getLogger()->log($level, $message, $context);
    }

    /**
     *
     */
    public static function error($message, array $context = [])
    {
        self::getLogger()->error($message, $context);
    }

    public static function warning($message, array $context = [])
    {
        self::getLogger()->warning($message, $context);
    }

    public static function info($message, array $context = [])
    {
        self::getLogger()->info($message, $context);
    }

    public static function notice($message, array $context = [])
    {
        self::getLogger()->notice($message, $context);
    }

    public static function debug($message, array $context = [])
    {
        self::getLogger()->debug($message, $context);
    }
}