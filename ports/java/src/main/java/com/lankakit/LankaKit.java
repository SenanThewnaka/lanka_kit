package com.lankakit;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * LankaKit
 * Sri Lankan utility toolkit for Java.
 */
public final class LankaKit {

    private LankaKit() {}

    // -------------------------------------------------------------
    // Data Models
    // -------------------------------------------------------------

    public static class NicResult {
        public final boolean isValid;
        public final String clean;
        public final String format; // "OLD" or "NEW"
        public final String gender; // "Male" or "Female"
        public final int year;
        public final int dayOfYear;
        public final String dateOfBirth; // YYYY-MM-DD
        public final int age;
        public final Boolean isVoter;
        public final String equivalentNic;
        public final String error;

        public NicResult(boolean isValid, String clean, String format, String gender, int year,
                         int dayOfYear, String dateOfBirth, int age, Boolean isVoter,
                         String equivalentNic, String error) {
            this.isValid = isValid;
            this.clean = clean;
            this.format = format;
            this.gender = gender;
            this.year = year;
            this.dayOfYear = dayOfYear;
            this.dateOfBirth = dateOfBirth;
            this.age = age;
            this.isVoter = isVoter;
            this.equivalentNic = equivalentNic;
            this.error = error;
        }

        public static NicResult invalid(String error) {
            return new NicResult(false, null, null, null, 0, 0, null, 0, null, null, error);
        }

        @Override
        public String toString() {
            return "NicResult{isValid=" + isValid + ", format=" + format + ", gender=" + gender +
                   ", dob=" + dateOfBirth + ", age=" + age + ", equiv=" + equivalentNic + "}";
        }
    }

    public static class PhoneResult {
        public final boolean isValid;
        public final String clean;
        public final String e164;
        public final String carrier;
        public final String type;
        public final String national;
        public final String error;

        public PhoneResult(boolean isValid, String clean, String e164, String carrier,
                           String type, String national, String error) {
            this.isValid = isValid;
            this.clean = clean;
            this.e164 = e164;
            this.carrier = carrier;
            this.type = type;
            this.national = national;
            this.error = error;
        }

        public static PhoneResult invalid(String error) {
            return new PhoneResult(false, null, null, null, null, null, error);
        }
    }

    public static class BankInfo {
        public final String code;
        public final String name;
        public final String shortName;
        public final boolean popular;

        public BankInfo(String code, String name, String shortName, boolean popular) {
            this.code = code;
            this.name = name;
            this.shortName = shortName;
            this.popular = popular;
        }
    }

    public static class VehicleResult {
        public final boolean isValid;
        public final String clean;
        public final String format;
        public final String province;
        public final String category;
        public final String plateNumber;
        public final String error;

        public VehicleResult(boolean isValid, String clean, String format, String province,
                             String category, String plateNumber, String error) {
            this.isValid = isValid;
            this.clean = clean;
            this.format = format;
            this.province = province;
            this.category = category;
            this.plateNumber = plateNumber;
            this.error = error;
        }

        public static VehicleResult invalid(String error) {
            return new VehicleResult(false, null, null, null, null, null, error);
        }
    }

    // -------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------

    private static final int[] DRP_DAYS_IN_MONTH = {31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    private static final Map<String, String> MOBILE_CARRIERS = new HashMap<>();
    static {
        MOBILE_CARRIERS.put("070", "Mobitel");
        MOBILE_CARRIERS.put("071", "Mobitel");
        MOBILE_CARRIERS.put("072", "Hutch");
        MOBILE_CARRIERS.put("074", "Dialog");
        MOBILE_CARRIERS.put("075", "Airtel");
        MOBILE_CARRIERS.put("076", "Dialog");
        MOBILE_CARRIERS.put("077", "Dialog");
        MOBILE_CARRIERS.put("078", "Hutch");
    }

    private static final Map<String, String> PROVINCES = new HashMap<>();
    static {
        PROVINCES.put("WP", "Western Province");
        PROVINCES.put("CP", "Central Province");
        PROVINCES.put("SP", "Southern Province");
        PROVINCES.put("NP", "Northern Province");
        PROVINCES.put("EP", "Eastern Province");
        PROVINCES.put("NW", "North Western Province");
        PROVINCES.put("NC", "North Central Province");
        PROVINCES.put("UP", "Uva Province");
        PROVINCES.put("UVA", "Uva Province");
        PROVINCES.put("SG", "Sabaragamuwa Province");
    }

    private static final List<BankInfo> BANKS = Arrays.asList(
        new BankInfo("7010", "Commercial Bank of Ceylon PLC", "Commercial Bank", true),
        new BankInfo("7083", "Bank of Ceylon", "BOC", true),
        new BankInfo("7135", "People's Bank", "People's Bank", true),
        new BankInfo("7092", "Hatton National Bank PLC", "HNB", true),
        new BankInfo("7278", "Sampath Bank PLC", "Sampath Bank", true),
        new BankInfo("7169", "National Development Bank PLC", "NDB Bank", true),
        new BankInfo("7214", "Nations Trust Bank PLC", "NTB", true),
        new BankInfo("7205", "Seylan Bank PLC", "Seylan Bank", true),
        new BankInfo("7311", "DFCC Bank PLC", "DFCC Bank", true),
        new BankInfo("7719", "National Savings Bank", "NSB", true),
        new BankInfo("7463", "Cargills Bank Limited", "Cargills Bank", true),
        new BankInfo("7074", "The Hongkong and Shanghai Banking Corporation Ltd", "HSBC", true),
        new BankInfo("7056", "Standard Chartered Bank", "Standard Chartered", false)
    );

    // -------------------------------------------------------------
    // Core Logic: NIC Validation & Leap Year
    // -------------------------------------------------------------

    private static boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    public static NicResult validateNic(String nicInput) {
        if (nicInput == null) return NicResult.invalid("Input cannot be null");
        String clean = nicInput.trim().toUpperCase().replaceAll("[\\s-]", "");
        if (clean.isEmpty()) return NicResult.invalid("NIC cannot be empty");

        int len = clean.length();
        if (len != 10 && len != 12) {
            return NicResult.invalid("Invalid NIC length (" + len + "). Expected 10 or 12 characters");
        }

        String format = len == 10 ? "OLD" : "NEW";
        int year;
        int daysData;
        String serial;
        int checkDigit;
        Boolean isVoter = null;

        if ("OLD".equals(format)) {
            if (!clean.matches("^\\d{9}[VX]$")) {
                return NicResult.invalid("Old NIC must contain 9 digits followed by 'V' or 'X'");
            }
            year = 1900 + Integer.parseInt(clean.substring(0, 2));
            daysData = Integer.parseInt(clean.substring(2, 5));
            serial = clean.substring(5, 8);
            checkDigit = Character.getNumericValue(clean.charAt(8));
            isVoter = clean.charAt(9) == 'V';
        } else {
            if (!clean.matches("^\\d{12}$")) {
                return NicResult.invalid("New NIC must contain exactly 12 numeric digits");
            }
            year = Integer.parseInt(clean.substring(0, 4));
            daysData = Integer.parseInt(clean.substring(4, 7));
            serial = clean.substring(7, 11);
            checkDigit = Character.getNumericValue(clean.charAt(11));
        }

        String gender = "Male";
        int dayOfYear = daysData;
        if (dayOfYear > 500) {
            gender = "Female";
            dayOfYear -= 500;
        }

        if (dayOfYear < 1 || dayOfYear > 366) {
            return NicResult.invalid("Day of year (" + dayOfYear + ") out of range (1-366)");
        }

        int month = 0;
        int day = 0;
        int accumulated = 0;

        for (int m = 0; m < DRP_DAYS_IN_MONTH.length; m++) {
            int mDays = DRP_DAYS_IN_MONTH[m];
            if (dayOfYear <= accumulated + mDays) {
                month = m + 1;
                day = dayOfYear - accumulated;
                break;
            }
            accumulated += mDays;
        }

        // DRP Leap Year Adjustment
        if (month == 2 && day == 29 && !isLeapYear(year)) {
            month = 2;
            day = 28;
        }

        String dob = String.format("%04d-%02d-%02d", year, month, day);
        LocalDate birthDate = LocalDate.of(year, month, day);
        int age = Period.between(birthDate, LocalDate.now()).getYears();

        String equivalent = null;
        if ("OLD".equals(format)) {
            equivalent = String.format("%04d%03d0%s%d", year, daysData, serial, checkDigit);
        } else if (year >= 1900 && year < 2000 && serial.startsWith("0")) {
            equivalent = String.format("%02d%03d%s%dV", year % 100, daysData, serial.substring(1), checkDigit);
        }

        return new NicResult(true, clean, format, gender, year, dayOfYear, dob, age, isVoter, equivalent, null);
    }

    public static boolean isValidNic(String nic) {
        return validateNic(nic).isValid;
    }

    // -------------------------------------------------------------
    // Phone Validation
    // -------------------------------------------------------------

    public static PhoneResult validatePhone(String phoneInput) {
        if (phoneInput == null) return PhoneResult.invalid("Input cannot be null");
        String clean = phoneInput.trim().replaceAll("[\\s\\-\\(\\)\\.]", "");

        if (clean.startsWith("+94")) {
            clean = "0" + clean.substring(3);
        } else if (clean.startsWith("0094")) {
            clean = "0" + clean.substring(4);
        } else if (clean.startsWith("94") && clean.length() == 11) {
            clean = "0" + clean.substring(2);
        } else if (clean.length() == 9 && clean.startsWith("7")) {
            clean = "0" + clean;
        }

        if (!clean.matches("^0\\d{9}$")) {
            return PhoneResult.invalid("Invalid 10-digit Sri Lankan phone number format");
        }

        String prefix = clean.substring(0, 3);
        String carrier = MOBILE_CARRIERS.get(prefix);
        String type = carrier != null ? "Mobile" : "Fixed Line";
        String e164 = "+94" + clean.substring(1);
        String national = clean.substring(0, 3) + " " + clean.substring(3, 6) + " " + clean.substring(6);

        return new PhoneResult(true, clean, e164, carrier != null ? carrier : "Sri Lanka Telecom / Fixed",
                               type, national, null);
    }

    // -------------------------------------------------------------
    // Banks & Directory
    // -------------------------------------------------------------

    public static List<BankInfo> getBanks() {
        return Collections.unmodifiableList(BANKS);
    }

    public static BankInfo lookupBank(String codeOrName) {
        if (codeOrName == null) return null;
        String q = codeOrName.trim().toLowerCase();
        for (BankInfo b : BANKS) {
            if (b.code.equals(q) || b.shortName.toLowerCase().equals(q) || b.name.toLowerCase().equals(q)) {
                return b;
            }
        }
        return null;
    }

    // -------------------------------------------------------------
    // Currency & Amount to Words
    // -------------------------------------------------------------

    public static String formatLkr(double amount) {
        DecimalFormat df = new DecimalFormat("#,##0.00");
        return (amount < 0 ? "-" : "") + "Rs. " + df.format(Math.abs(amount));
    }

    // -------------------------------------------------------------
    // Vehicle Plates & Supplementary Identity
    // -------------------------------------------------------------

    public static VehicleResult validateVehiclePlate(String input) {
        if (input == null) return VehicleResult.invalid("Input cannot be null");
        String clean = input.trim().replaceAll("\\s+", " ").toUpperCase();

        Matcher m = Pattern.compile("^(?:([A-Z]{2,3})\\s+)?([A-Z]{2,3})[\\s-]?(\\d{4})$").matcher(clean);
        if (m.matches()) {
            String prov = m.group(1);
            String prefix = m.group(2);
            String num = m.group(3);
            String cat = prefix.startsWith("C") ? "Motor Car" :
                         (prefix.startsWith("B") ? "Motor Cycle" :
                         (prefix.startsWith("A") ? "Three Wheeler" : "General"));
            String cleanPlate = prov != null ? prov + " " + prefix + "-" + num : prefix + "-" + num;
            return new VehicleResult(true, cleanPlate, "MODERN", PROVINCES.get(prov), cat, prefix + "-" + num, null);
        }

        // Vintage Sri
        Matcher sri = Pattern.compile("^(\\d{1,3})\\s*(?:ශ්‍රී|Sri|SRI|-sri-)\\s*(\\d{4})$", Pattern.CASE_INSENSITIVE).matcher(input.trim());
        if (sri.matches()) {
            String cleanSri = sri.group(1) + " ශ්‍රී " + sri.group(2);
            return new VehicleResult(true, cleanSri, "SRI", null, "General", cleanSri, null);
        }

        return VehicleResult.invalid("Invalid Sri Lankan vehicle plate format (e.g. WP CAB-1234, 64-1234)");
    }

    public static boolean validatePassport(String passport) {
        if (passport == null) return false;
        String clean = passport.trim().toUpperCase().replaceAll("[\\s-]", "");
        return clean.matches("^N\\d{7}$") || clean.matches("^PA\\d{7}$");
    }

    public static boolean validateTin(String tin) {
        if (tin == null) return false;
        String clean = tin.trim().replaceAll("[\\s-]", "");
        return clean.matches("^\\d{9,10}$");
    }

    // -------------------------------------------------------------
    // Unicode Normalization (ZWJ Handling)
    // -------------------------------------------------------------

    public static String stripZwj(String text) {
        if (text == null) return "";
        return text.replaceAll("[\u200B\u200C\u200D\uFEFF]", "");
    }
}
