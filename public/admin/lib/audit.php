<?php
/**
 * Forex Drilling CMS — journal d'audit minimal (OWASP A09). Trace les
 * événements sensibles (login ok/ko, rate-limit, create/update/delete, upload)
 * dans cms-data/audit.log (hors web). Append-only, une ligne par événement.
 */
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function audit(string $action, string $detail = ''): void {
    cms_ensure_dir(CMS_DATA_DIR);
    $ip   = $_SERVER['REMOTE_ADDR'] ?? '-';
    $when = gmdate('c');
    $line = sprintf("%s\t%s\t%s\t%s\n", $when, $ip, $action, str_replace(["\n", "\t"], ' ', $detail));
    @file_put_contents(CMS_AUDIT_FILE, $line, FILE_APPEND | LOCK_EX);
}
