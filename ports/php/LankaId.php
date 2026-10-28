<?php

namespace LankaKit;

use DateTime;
use DateTimeZone;
use InvalidArgumentException;

/**
 * LankaID: Universal Sri Lankan Identity & Verification Toolkit for PHP / Laravel / WordPress.
 *
 * Zero dependencies. Fully supports Old (9 digits + V/X) and New (12 digits) NICs,
 * DRP leap-year day calculations, bidirectional conversion, and Sri Lankan phone numbers.
 *
 * @author Sri Lankan Developer Community
 * @license MIT
 */
class LankaId
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

    /**
     * Sanitize NIC string.
     */
    public static function sanitizeNic(string $nic): string
    {
        return strtoupper(preg_replace('/[\s-]/', '', trim($nic)));
    }

    /**
     * Check if a year is a leap year.
     */
    public static function isLeapYear(int $year): bool
    {
        return ($year % 4 === 0 && $year % 100 !== 0) || ($year % 400 === 0);
    }

    /**
     * Validate and extract details from a Sri Lankan NIC.
     */
    public static function validateNic(string $input): array
    {
        $clean = self::sanitizeNic($input);

        if (empty($clean)) {
            return ['isValid' => false, 'error' => 'NIC input cannot be empty', 'code' => 'EMPTY_INPUT'];
        }

        $length = strlen($clean);
        if ($length !== 10 && $length !== 12) {
            return [
                'isValid' => false,
                'error' => "Invalid NIC length ($length). Old NICs must be 10 characters, New NICs 12 digits.",
                'code' => 'INVALID_LENGTH',
            ];
        }

        if ($length === 10) {
            $format = 'OLD';
            if (!preg_match('/^[0-9]{9}[VX]$/', $clean)) {
                return [
                    'isValid' => false,
                    'error' => 'Old NIC must contain 9 digits followed by V or X.',
                    'code' => 'INVALID_CHARACTERS',
                ];
            }
            $year = 1900 + (int) substr($clean, 0, 2);
            $dayOfYearRaw = (int) substr($clean, 2, 3);
            $serialNumber = substr($clean, 5, 3);
            $checkDigit = substr($clean, 8, 1);
            $isVoter = str_ends_with($clean, 'V');
        } else {
            $format = 'NEW';
            if (!preg_match('/^[0-9]{12}$/', $clean)) {
                return [
                    'isValid' => false,
                    'error' => 'New NIC must contain exactly 12 numeric digits.',
                    'code' => 'INVALID_CHARACTERS',
                ];
            }
            $year = (int) substr($clean, 0, 4);
            $dayOfYearRaw = (int) substr($clean, 4, 3);
            $serialNumber = substr($clean, 7, 4);
            $checkDigit = substr($clean, 11, 1);
            $isVoter = true;
        }

        if ($dayOfYearRaw > 500) {
            $gender = 'Female';
            $dayOfYear = $dayOfYearRaw - 500;
        } else {
            $gender = 'Male';
            $dayOfYear = $dayOfYearRaw;
        }

        if ($dayOfYear < 1 || $dayOfYear > 366) {
            return [
                'isValid' => false,
                'error' => "Invalid birth day of year ($dayOfYearRaw). Must be 001-366 (Male) or 501-866 (Female).",
                'code' => 'INVALID_DAY_OF_YEAR',
            ];
        }

        // Calculate DRP Date
        $remainingDays = $dayOfYear;
        $month = 1;
        $day = 1;
        foreach (self::DRP_MONTH_DAYS as $m) {
            if ($remainingDays <= $m['days']) {
                $month = $m['month'];
                $day = $remainingDays;
                break;
            }
            $remainingDays -= $m['days'];
        }

        if ($month === 2 && $day === 29 && !self::isLeapYear($year)) {
            $day = 28;
        }

        $dobFormatted = sprintf('%04d-%02d-%02d', $year, $month, $day);
        $dob = new DateTime($dobFormatted, new DateTimeZone('UTC'));
        $now = new DateTime('now', new DateTimeZone('UTC'));

        if ($dob > $now) {
            return [
                'isValid' => false,
                'error' => "Calculated date of birth ($dobFormatted) is in the future.",
                'code' => 'FUTURE_BIRTH_DATE',
            ];
        }

        $age = $now->diff($dob)->y;
        if ($format === 'NEW') {
            $isVoter = $age >= 18;
        }

        $equivalentNic = null;
        if ($format === 'OLD') {
            $equivalentNic = '19' . substr($clean, 0, 2) . substr($clean, 2, 3) . '0' . substr($clean, 5, 3) . substr($clean, 8, 1);
        } elseif ($year >= 1900 && $year < 2000 && $clean[7] === '0') {
            $equivalentNic = substr($clean, 2, 2) . substr($clean, 4, 3) . substr($clean, 8, 3) . substr($clean, 11, 1) . 'V';
        }

        return [
            'isValid' => true,
            'nic' => $clean,
            'format' => $format,
            'year' => $year,
            'dayOfYear' => $dayOfYear,
            'gender' => $gender,
            'dateOfBirth' => $dobFormatted,
            'age' => $age,
            'isVoter' => $isVoter,
            'serialNumber' => $serialNumber,
            'checkDigit' => $checkDigit,
            'equivalentNic' => $equivalentNic,
        ];
    }

    /**
     * Check if NIC is valid.
     */
    public static function isValidNic(string $input): bool
    {
        return self::validateNic($input)['isValid'] ?? false;
    }

    /**
     * Validate and format Sri Lankan Phone number.
     */
    public static function validatePhone(string $input): array
    {
        $sanitized = preg_replace('/[\s\-\(\)\.]/', '', trim($input));
        if (empty($sanitized)) {
            return ['isValid' => false, 'error' => 'Phone number cannot be empty'];
        }

        $norm = $sanitized;
        if (str_starts_with($norm, '+94')) {
            $norm = substr($norm, 3);
        } elseif (str_starts_with($norm, '0094')) {
            $norm = substr($norm, 4);
        } elseif (str_starts_with($norm, '94')) {
            $norm = substr($norm, 2);
        }

        if (strlen($norm) === 9 && !str_starts_with($norm, '0')) {
            $norm = '0' . $norm;
        }

        if (!preg_match('/^[0-9]{10}$/', $norm) || !str_starts_with($norm, '0')) {
            return ['isValid' => false, 'error' => 'Invalid phone number format'];
        }

        $prefix = substr($norm, 0, 3);
        $carrier = self::MOBILE_CARRIERS[$prefix] ?? 'Unknown';

        return [
            'isValid' => true,
            'clean' => $norm,
            'e164' => '+94' . substr($norm, 1),
            'national' => sprintf('%s %s %s', $prefix, substr($norm, 3, 3), substr($norm, 6)),
            'carrier' => $carrier,
            'type' => $carrier !== 'Unknown' ? 'Mobile' : 'Fixed/Other',
        ];
    }
}
