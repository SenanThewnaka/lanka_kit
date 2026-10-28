<?php

namespace LankaKit;

use DateTime;
use DateTimeZone;

/**
 * LankaKit
 * Sri Lankan utility toolkit for PHP.
 */
class LankaKit
{
    private const DRP_MONTH_DAYS = [
        ['month' => 1, 'name' => 'January', 'days' => 31],
        ['month' => 2, 'name' => 'February', 'days' => 29],
        ['month' => 3, 'name' => 'March', 'days' => 31],
        ['month' => 4, 'name' => 'April', 'days' => 30],
        ['month' => 5, 'name' => 'May', 'days' => 31],
        ['month' => 6, 'name' => 'June', 'days' => 30],
        ['month' => 7, 'name' => 'July', 'days' => 31],
        ['month' => 8, 'name' => 'August', 'days' => 31],
        ['month' => 9, 'name' => 'September', 'days' => 30],
        ['month' => 10, 'name' => 'October', 'days' => 31],
        ['month' => 11, 'name' => 'November', 'days' => 30],
        ['month' => 12, 'name' => 'December', 'days' => 31],
    ];

    private const MOBILE_CARRIERS = [
        '070' => 'Mobitel',
        '071' => 'Mobitel',
        '072' => 'Hutch',
        '074' => 'Dialog',
        '075' => 'Airtel',
        '076' => 'Dialog',
        '077' => 'Dialog',
        '078' => 'Hutch',
    ];

    private const BANKS = [
        ['code' => '7010', 'name' => 'Commercial Bank of Ceylon PLC', 'shortName' => 'Commercial Bank', 'popular' => true],
        ['code' => '7083', 'name' => 'Bank of Ceylon', 'shortName' => 'BOC', 'popular' => true],
        ['code' => '7135', 'name' => "People's Bank", 'shortName' => "People's Bank", 'popular' => true],
        ['code' => '7092', 'name' => 'Hatton National Bank PLC', 'shortName' => 'HNB', 'popular' => true],
        ['code' => '7278', 'name' => 'Sampath Bank PLC', 'shortName' => 'Sampath Bank', 'popular' => true],
        ['code' => '7169', 'name' => 'National Development Bank PLC', 'shortName' => 'NDB Bank', 'popular' => true],
        ['code' => '7214', 'name' => 'Nations Trust Bank PLC', 'shortName' => 'NTB', 'popular' => true],
        ['code' => '7205', 'name' => 'Seylan Bank PLC', 'shortName' => 'Seylan Bank', 'popular' => true],
        ['code' => '7311', 'name' => 'DFCC Bank PLC', 'shortName' => 'DFCC Bank', 'popular' => true],
        ['code' => '7719', 'name' => 'National Savings Bank', 'shortName' => 'NSB', 'popular' => true],
        ['code' => '7463', 'name' => 'Cargills Bank Limited', 'shortName' => 'Cargills Bank', 'popular' => true],
        ['code' => '7074', 'name' => 'The Hongkong and Shanghai Banking Corporation Ltd', 'shortName' => 'HSBC', 'popular' => true],
        ['code' => '7056', 'name' => 'Standard Chartered Bank', 'shortName' => 'Standard Chartered', 'popular' => false],
    ];

    public static function sanitizeNic(string $nic): string
    {
        return strtoupper(preg_replace('/[\s-]/', '', trim($nic)));
    }

    public static function isLeapYear(int $year): bool
    {
        return ($year % 4 === 0 && $year % 100 !== 0) || ($year % 400 === 0);
    }

    public static function validateNic(string $input): array
    {
        $clean = self::sanitizeNic($input);
        if (empty($clean)) {
            return ['isValid' => false, 'error' => 'NIC cannot be empty'];
        }

        $length = strlen($clean);
        if ($length !== 10 && $length !== 12) {
            return ['isValid' => false, 'error' => "Invalid NIC length ($length). Must be 10 or 12 characters."];
        }

        $format = $length === 10 ? 'OLD' : 'NEW';
        $year = 0;
        $daysData = 0;
        $serial = '';
        $checkDigit = 0;
        $isVoter = null;

        if ($format === 'OLD') {
            if (!preg_match('/^\d{9}[VX]$/', $clean)) {
                return ['isValid' => false, 'error' => "Old NIC must contain 9 digits followed by 'V' or 'X'."];
            }
            $year = 1900 + (int)substr($clean, 0, 2);
            $daysData = (int)substr($clean, 2, 3);
            $serial = substr($clean, 5, 3);
            $checkDigit = (int)substr($clean, 8, 1);
            $isVoter = strtoupper(substr($clean, 9, 1)) === 'V';
        } else {
            if (!preg_match('/^\d{12}$/', $clean)) {
                return ['isValid' => false, 'error' => 'New NIC must contain exactly 12 numeric digits.'];
            }
            $year = (int)substr($clean, 0, 4);
            $daysData = (int)substr($clean, 4, 3);
            $serial = substr($clean, 7, 4);
            $checkDigit = (int)substr($clean, 11, 1);
        }

        $gender = 'Male';
        $dayOfYear = $daysData;
        if ($dayOfYear > 500) {
            $gender = 'Female';
            $dayOfYear -= 500;
        }

        if ($dayOfYear < 1 || $dayOfYear > 366) {
            return ['isValid' => false, 'error' => "Day of year ($dayOfYear) is out of valid range (1–366)."];
        }

        $month = 0;
        $day = 0;
        $accumulated = 0;
        foreach (self::DRP_MONTH_DAYS as $m) {
            if ($dayOfYear <= $accumulated + $m['days']) {
                $month = $m['month'];
                $day = $dayOfYear - $accumulated;
                break;
            }
            $accumulated += $m['days'];
        }

        if ($month === 2 && $day === 29 && !self::isLeapYear($year)) {
            $month = 2;
            $day = 28;
        }

        $dob = sprintf('%04d-%02d-%02d', $year, $month, $day);
        $birthDate = new DateTime($dob, new DateTimeZone('Asia/Colombo'));
        $today = new DateTime('now', new DateTimeZone('Asia/Colombo'));
        $age = $today->diff($birthDate)->y;

        $equivalent = null;
        if ($format === 'OLD') {
            $equivalent = sprintf('%04d%03d0%s%d', $year, $daysData, $serial, $checkDigit);
        } elseif ($year >= 1900 && $year < 2000 && substr($serial, 0, 1) === '0') {
            $equivalent = sprintf('%02d%03d%s%dV', $year % 100, $daysData, substr($serial, 1), $checkDigit);
        }

        return [
            'isValid' => true,
            'clean' => $clean,
            'format' => $format,
            'gender' => $gender,
            'year' => $year,
            'dayOfYear' => $dayOfYear,
            'dateOfBirth' => $dob,
            'age' => $age,
            'isVoter' => $isVoter,
            'equivalentNic' => $equivalent,
        ];
    }

    public static function isValidNic(string $input): bool
    {
        return self::validateNic($input)['isValid'];
    }

    public static function validatePhone(string $input): array
    {
        $clean = preg_replace('/[\s\-\(\)\.]/', '', trim($input));
        if (strpos($clean, '+94') === 0) {
            $clean = '0' . substr($clean, 3);
        } elseif (strpos($clean, '0094') === 0) {
            $clean = '0' . substr($clean, 4);
        } elseif (strpos($clean, '94') === 0 && strlen($clean) === 11) {
            $clean = '0' . substr($clean, 2);
        } elseif (strlen($clean) === 9 && strpos($clean, '7') === 0) {
            $clean = '0' . $clean;
        }

        if (!preg_match('/^0\d{9}$/', $clean)) {
            return ['isValid' => false, 'error' => 'Invalid 10-digit Sri Lankan phone number.'];
        }

        $prefix = substr($clean, 0, 3);
        $carrier = self::MOBILE_CARRIERS[$prefix] ?? null;

        return [
            'isValid' => true,
            'clean' => $clean,
            'e164' => '+94' . substr($clean, 1),
            'carrier' => $carrier ?? 'Sri Lanka Telecom / Fixed',
            'type' => $carrier !== null ? 'Mobile' : 'Fixed Line',
            'national' => sprintf('%s %s %s', substr($clean, 0, 3), substr($clean, 3, 3), substr($clean, 6)),
        ];
    }

    public static function getBanks(): array
    {
        return self::BANKS;
    }

    public static function lookupBank(string $query): ?array
    {
        $q = strtolower(trim($query));
        foreach (self::BANKS as $b) {
            if ($b['code'] === $q || strtolower($b['shortName']) === $q || strtolower($b['name']) === $q) {
                return $b;
            }
        }
        return null;
    }

    public static function formatLkr(float $amount, string $prefix = 'Rs. '): string
    {
        $sign = $amount < 0 ? '-' : '';
        return $sign . $prefix . number_format(abs($amount), 2);
    }
}

// Backwards compatibility alias
class_alias('LankaKit\LankaKit', 'LankaKit\LankaId');
