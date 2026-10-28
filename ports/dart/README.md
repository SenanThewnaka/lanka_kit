# LankaKit (`lanka_kit`)

Sri Lankan identity, telco, banking, and formatting utilities for **Dart and Flutter**.

Zero runtime dependencies. Compatible with Flutter (Android, iOS, Web, macOS, Windows, Linux) and server-side Dart.

---

## Features

- **National Identity Card (NIC)**: Validates Old (9 digits + V/X) and New (12 digits) formats, extracts Date of Birth and Gender using the official Department of Registration of Persons (DRP) 366-day calendar, and performs bidirectional conversion.
- **Mobile Telco**: Identifies operators (Dialog, Mobitel, Hutch, Airtel) and formats numbers into standard E.164 (`+94771234567`).
- **Central Bank Directory**: Look up Sri Lankan commercial bank codes (e.g. Commercial Bank `7010`, Bank of Ceylon `7083`, Sampath `7278`).
- **LKR Currency**: Format numbers into Sri Lankan Rupee display strings (`Rs. 1,540.50`).
- **Vehicle Plates**: Validates modern provincial (`WP CAB-1234`), vintage, and Sri series plates with vehicle category classification.
- **Passports & TIN**: Validates Sri Lankan citizen passports (`N` series) and Inland Revenue Department TIN numbers.
- **Flutter Form Helpers**: Pre-built validator functions for `TextFormField`.

---

## Installation

Add `lanka_kit` to your `pubspec.yaml`:

```bash
flutter pub add lanka_kit
```

Or for pure Dart projects:

```bash
dart pub add lanka_kit
```

---

## Usage Examples

### 1. Flutter `TextFormField` Integration

```dart
import 'package:flutter/material.dart';
import 'package:lanka_kit/lanka_kit.dart';

class RegistrationForm extends StatelessWidget {
  const RegistrationForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          // NIC Validator
          TextFormField(
            decoration: const InputDecoration(labelText: 'National Identity Card (NIC)'),
            validator: nicFormFieldValidator(),
          ),

          // Mobile Phone Validator
          TextFormField(
            decoration: const InputDecoration(labelText: 'Mobile Phone'),
            validator: phoneFormFieldValidator(),
          ),
        ],
      ),
    );
  }
}
```

### 2. Parse and Extract NIC Details

```dart
import 'package:lanka_kit/lanka_kit.dart';

void main() {
  final result = validateNic('931451234V');

  if (result.isValid) {
    print(result.format);         // "OLD"
    print(result.gender);         // "Male"
    print(result.dateOfBirth);    // "1993-05-24"
    print(result.age);            // 33
    print(result.isVoter);        // true
    print(result.equivalentNic);  // "199314501234" (Automatic conversion to New format)
  }
}
```

### 3. Phone Number and Carrier Detection

```dart
import 'package:lanka_kit/lanka_kit.dart';

void main() {
  final phone = validatePhone('077 123 4567');

  if (phone.isValid) {
    print(phone.carrier);   // "Dialog"
    print(phone.e164);      // "+94771234567"
    print(phone.national);  // "077 123 4567"
  }
}
```

### 4. CBSL Bank Directory Lookup

```dart
import 'package:lanka_kit/lanka_kit.dart';

void main() {
  final bank = lookupBank('7010');
  print(bank?.name);      // "Commercial Bank of Ceylon PLC"
  print(bank?.shortName); // "Commercial Bank"

  // Get all registered commercial banks
  final allBanks = getBanks();
}
```

### 5. LKR Currency Formatting

```dart
import 'package:lanka_kit/lanka_kit.dart';

void main() {
  print(formatLkr(1540.50)); // "Rs. 1,540.50"
}
```

### 6. Vehicle Plate & Category Detection

```dart
import 'package:lanka_kit/lanka_kit.dart';

void main() {
  final car = validateVehiclePlate('WP CAB-1234');
  print(car.category); // "Motor Car"
  print(car.province); // "Western Province"

  final bike = validateVehiclePlate('CP BAA-5678');
  print(bike.category); // "Motor Cycle"
}
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.
