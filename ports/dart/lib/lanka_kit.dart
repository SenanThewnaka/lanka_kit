/// LankaKit
/// Sri Lankan utility toolkit for Dart and Flutter.
library lanka_kit;

/// Result structure for Sri Lankan National Identity Card (NIC) analysis.
class NicResult {
  final bool isValid;
  final String? clean;
  final String? format; // "OLD" or "NEW"
  final String? gender; // "Male" or "Female"
  final int? year;
  final int? dayOfYear;
  final String? dateOfBirth; // YYYY-MM-DD
  final int? age;
  final bool? isVoter;
  final String? equivalentNic;
  final String? error;

  const NicResult({
    required this.isValid,
    this.clean,
    this.format,
    this.gender,
    this.year,
    this.dayOfYear,
    this.dateOfBirth,
    this.age,
    this.isVoter,
    this.equivalentNic,
    this.error,
  });

  factory NicResult.invalid(String error) {
    return NicResult(isValid: false, error: error);
  }

  @override
  String toString() {
    return 'NicResult(isValid: $isValid, format: $format, gender: $gender, dob: $dateOfBirth, age: $age, equivalent: $equivalentNic)';
  }
}

/// Result structure for Sri Lankan phone number validation and normalization.
class PhoneResult {
  final bool isValid;
  final String? clean;
  final String? e164;
  final String? carrier;
  final String? type;
  final String? national;
  final String? error;

  const PhoneResult({
    required this.isValid,
    this.clean,
    this.e164,
    this.carrier,
    this.type,
    this.national,
    this.error,
  });

  factory PhoneResult.invalid(String error) {
    return PhoneResult(isValid: false, error: error);
  }
}

/// Bank details registered with Central Bank of Sri Lanka (CBSL).
class BankInfo {
  final String code;
  final String name;
  final String shortName;
  final bool popular;

  const BankInfo({
    required this.code,
    required this.name,
    required this.shortName,
    required this.popular,
  });
}

/// Vehicle plate analysis result.
class VehicleResult {
  final bool isValid;
  final String? clean;
  final String? format;
  final String? province;
  final String? category;
  final String? plateNumber;
  final String? error;

  const VehicleResult({
    required this.isValid,
    this.clean,
    this.format,
    this.province,
    this.category,
    this.plateNumber,
    this.error,
  });

  factory VehicleResult.invalid(String error) {
    return VehicleResult(isValid: false, error: error);
  }
}

const List<int> _drpDaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Map<String, String> _mobileCarriers = {
  '070': 'Mobitel',
  '071': 'Mobitel',
  '072': 'Hutch',
  '074': 'Dialog',
  '075': 'Airtel',
  '076': 'Dialog',
  '077': 'Dialog',
  '078': 'Hutch',
};

const Map<String, String> _provinces = {
  'WP': 'Western Province',
  'CP': 'Central Province',
  'SP': 'Southern Province',
  'NP': 'Northern Province',
  'EP': 'Eastern Province',
  'NW': 'North Western Province',
  'NC': 'North Central Province',
  'UP': 'Uva Province',
  'UVA': 'Uva Province',
  'SG': 'Sabaragamuwa Province',
};

const List<BankInfo> _banks = [
  BankInfo(code: '7010', name: 'Commercial Bank of Ceylon PLC', shortName: 'Commercial Bank', popular: true),
  BankInfo(code: '7083', name: 'Bank of Ceylon', shortName: 'BOC', popular: true),
  BankInfo(code: '7135', name: "People's Bank", shortName: "People's Bank", popular: true),
  BankInfo(code: '7092', name: 'Hatton National Bank PLC', shortName: 'HNB', popular: true),
  BankInfo(code: '7278', name: 'Sampath Bank PLC', shortName: 'Sampath Bank', popular: true),
  BankInfo(code: '7169', name: 'National Development Bank PLC', shortName: 'NDB Bank', popular: true),
  BankInfo(code: '7214', name: 'Nations Trust Bank PLC', shortName: 'NTB', popular: true),
  BankInfo(code: '7205', name: 'Seylan Bank PLC', shortName: 'Seylan Bank', popular: true),
  BankInfo(code: '7311', name: 'DFCC Bank PLC', shortName: 'DFCC Bank', popular: true),
  BankInfo(code: '7719', name: 'National Savings Bank', shortName: 'NSB', popular: true),
  BankInfo(code: '7463', name: 'Cargills Bank Limited', shortName: 'Cargills Bank', popular: true),
  BankInfo(code: '7074', name: 'The Hongkong and Shanghai Banking Corporation Ltd', shortName: 'HSBC', popular: true),
  BankInfo(code: '7056', name: 'Standard Chartered Bank', shortName: 'Standard Chartered', popular: false),
];

bool _isLeapYear(int year) {
  return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

/// Validates and parses a Sri Lankan NIC (both Old 10-char and New 12-digit format).
NicResult validateNic(String? nicInput) {
  if (nicInput == null) return NicResult.invalid('NIC cannot be null');
  final clean = nicInput.trim().toUpperCase().replaceAll(RegExp(r'[\s-]'), '');
  if (clean.isEmpty) return NicResult.invalid('NIC cannot be empty');

  final len = clean.length;
  if (len != 10 && len != 12) {
    return NicResult.invalid('Invalid NIC length ($len). Must be 10 or 12 characters');
  }

  final format = len == 10 ? 'OLD' : 'NEW';
  int year;
  int daysData;
  String serial;
  int checkDigit;
  bool? isVoter;

  if (format == 'OLD') {
    if (!RegExp(r'^\d{9}[VX]$').hasMatch(clean)) {
      return NicResult.invalid("Old NIC must have 9 digits followed by 'V' or 'X'");
    }
    year = 1900 + int.parse(clean.substring(0, 2));
    daysData = int.parse(clean.substring(2, 5));
    serial = clean.substring(5, 8);
    checkDigit = int.parse(clean.substring(8, 9));
    isVoter = clean.endsWith('V');
  } else {
    if (!RegExp(r'^\d{12}$').hasMatch(clean)) {
      return NicResult.invalid('New NIC must contain exactly 12 numeric digits');
    }
    year = int.parse(clean.substring(0, 4));
    daysData = int.parse(clean.substring(4, 7));
    serial = clean.substring(7, 11);
    checkDigit = int.parse(clean.substring(11, 12));
  }

  String gender = 'Male';
  int dayOfYear = daysData;
  if (dayOfYear > 500) {
    gender = 'Female';
    dayOfYear -= 500;
  }

  if (dayOfYear < 1 || dayOfYear > 366) {
    return NicResult.invalid('Day of year ($dayOfYear) out of range (1-366)');
  }

  int month = 0;
  int day = 0;
  int accumulated = 0;

  for (int m = 0; m < _drpDaysInMonth.length; m++) {
    final mDays = _drpDaysInMonth[m];
    if (dayOfYear <= accumulated + mDays) {
      month = m + 1;
      day = dayOfYear - accumulated;
      break;
    }
    accumulated += mDays;
  }

  // DRP Leap Year Adjustment (Standard Sri Lankan Government logic)
  if (month == 2 && day == 29 && !_isLeapYear(year)) {
    month = 2;
    day = 28;
  }

  final mm = month.toString().padLeft(2, '0');
  final dd = day.toString().padLeft(2, '0');
  final dob = '$year-$mm-$dd';

  final now = DateTime.now();
  int age = now.year - year;
  if (now.month < month || (now.month == month && now.day < day)) {
    age--;
  }

  String? equiv;
  if (format == 'OLD') {
    equiv = '$year${daysData.toString().padLeft(3, '0')}0$serial$checkDigit';
  } else if (year >= 1900 && year < 2000 && serial.startsWith('0')) {
    final shortYear = (year % 100).toString().padLeft(2, '0');
    equiv = '$shortYear${daysData.toString().padLeft(3, '0')}${serial.substring(1)}${checkDigit}V';
  }

  return NicResult(
    isValid: true,
    clean: clean,
    format: format,
    gender: gender,
    year: year,
    dayOfYear: dayOfYear,
    dateOfBirth: dob,
    age: age,
    isVoter: isVoter,
    equivalentNic: equiv,
  );
}

/// Helper function returning true if NIC is valid.
bool isValidNic(String? nic) => validateNic(nic).isValid;

/// Validates and normalizes Sri Lankan mobile and fixed line numbers.
PhoneResult validatePhone(String? phoneInput) {
  if (phoneInput == null) return PhoneResult.invalid('Input cannot be null');
  var clean = phoneInput.trim().replaceAll(RegExp(r'[\s\-\(\)\.]'), '');

  if (clean.startsWith('+94')) {
    clean = '0${clean.substring(3)}';
  } else if (clean.startsWith('0094')) {
    clean = '0${clean.substring(4)}';
  } else if (clean.startsWith('94') && clean.length == 11) {
    clean = '0${clean.substring(2)}';
  } else if (clean.length == 9 && clean.startsWith('7')) {
    clean = '0$clean';
  }

  if (!RegExp(r'^0\d{9}$').hasMatch(clean)) {
    return PhoneResult.invalid('Invalid 10-digit Sri Lankan phone number format');
  }

  final prefix = clean.substring(0, 3);
  final carrier = _mobileCarriers[prefix];
  final type = carrier != null ? 'Mobile' : 'Fixed Line';
  final e164 = '+94${clean.substring(1)}';
  final national = '${clean.substring(0, 3)} ${clean.substring(3, 6)} ${clean.substring(6)}';

  return PhoneResult(
    isValid: true,
    clean: clean,
    e164: e164,
    carrier: carrier ?? 'Sri Lanka Telecom / Fixed',
    type: type,
    national: national,
  );
}

/// Return all CBSL registered banks.
List<BankInfo> getBanks() => List.unmodifiable(_banks);

/// Lookup bank by 4-digit routing code, short name, or full name.
BankInfo? lookupBank(String? query) {
  if (query == null) return null;
  final q = query.trim().toLowerCase();
  for (final b in _banks) {
    if (b.code == q || b.shortName.toLowerCase() == q || b.name.toLowerCase() == q) {
      return b;
    }
  }
  return null;
}

/// Format numeric amount to LKR currency standard.
String formatLkr(num amount, {String prefix = 'Rs. '}) {
  final isNeg = amount < 0;
  final absVal = amount.abs().toStringAsFixed(2);
  final parts = absVal.split('.');
  final withCommas = parts[0].replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]},');
  return '${isNeg ? '-' : ''}$prefix$withCommas.${parts[1]}';
}

/// Validates Sri Lankan vehicle registration plates.
VehicleResult validateVehiclePlate(String? input) {
  if (input == null) return VehicleResult.invalid('Input cannot be null');
  final clean = input.trim().replaceAll(RegExp(r'\s+'), ' ').toUpperCase();

  final modernMatch = RegExp(r'^(?:([A-Z]{2,3})\s+)?([A-Z]{2,3})[\s-]?(\d{4})$').firstMatch(clean);
  if (modernMatch != null) {
    final prov = modernMatch.group(1);
    final prefix = modernMatch.group(2)!;
    final num = modernMatch.group(3)!;
    final cat = prefix.startsWith('C')
        ? 'Motor Car'
        : (prefix.startsWith('B')
            ? 'Motor Cycle'
            : (prefix.startsWith('A') ? 'Three Wheeler' : 'General'));
    final cleanPlate = prov != null ? '$prov $prefix-$num' : '$prefix-$num';
    return VehicleResult(
      isValid: true,
      clean: cleanPlate,
      format: 'MODERN',
      province: _provinces[prov],
      category: cat,
      plateNumber: '$prefix-$num',
    );
  }

  // Vintage Sri series
  final sriMatch = RegExp(r'^(\d{1,3})\s*(?:ශ්‍රී|Sri|SRI|-sri-)\s*(\d{4})$', caseSensitive: false).firstMatch(input.trim());
  if (sriMatch != null) {
    final cleanSri = '${sriMatch.group(1)} ශ්‍රී ${sriMatch.group(2)}';
    return VehicleResult(
      isValid: true,
      clean: cleanSri,
      format: 'SRI',
      category: 'General',
      plateNumber: cleanSri,
    );
  }

  return VehicleResult.invalid('Invalid Sri Lankan vehicle plate format');
}

/// Validates Sri Lankan citizen passport numbers.
bool validatePassport(String? passport) {
  if (passport == null) return false;
  final clean = passport.trim().toUpperCase().replaceAll(RegExp(r'[\s-]'), '');
  return RegExp(r'^N\d{7}$').hasMatch(clean) || RegExp(r'^PA\d{7}$').hasMatch(clean);
}

/// Validates IRD Taxpayer Identification Number (TIN).
bool validateTin(String? tin) {
  if (tin == null) return false;
  final clean = tin.trim().replaceAll(RegExp(r'[\s-]'), '');
  return RegExp(r'^\d{9,10}$').hasMatch(clean);
}

/// Strips Zero Width Joiners (\u200D) and invisibles for database search indexing.
String stripZwj(String? text) {
  if (text == null) return '';
  return text.replaceAll(RegExp(r'[\u200B\u200C\u200D\uFEFF]'), '');
}

// -------------------------------------------------------------
// Flutter TextFormField Form Validators
// -------------------------------------------------------------

/// Ready-to-use validator for Flutter `TextFormField(validator: ...)`
String? Function(String?) nicFormFieldValidator({String? customErrorMessage}) {
  return (value) {
    if (value == null || value.trim().isEmpty) {
      return 'NIC is required';
    }
    final res = validateNic(value);
    return res.isValid ? null : (customErrorMessage ?? res.error ?? 'Invalid Sri Lankan NIC');
  };
}

/// Ready-to-use validator for Flutter phone field `TextFormField(validator: ...)`
String? Function(String?) phoneFormFieldValidator({String? customErrorMessage}) {
  return (value) {
    if (value == null || value.trim().isEmpty) {
      return 'Phone number is required';
    }
    final res = validatePhone(value);
    return res.isValid ? null : (customErrorMessage ?? res.error ?? 'Invalid Sri Lankan phone number');
  };
}
