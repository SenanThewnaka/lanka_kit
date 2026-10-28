# 🇱🇰 LankaKit (`lanka-kit`)

> **The Ultimate Sri Lankan Developer Toolkit**  
> *Zero runtime dependencies. First-class support for TypeScript / Node.js, Flutter / Dart, Java (Swing & Maven), Python (FastAPI/Django), and PHP (Laravel).*

[![Tests](https://img.shields.io/badge/tests-33%20passed-10b981?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success?style=flat-square)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square)](#)
[![Flutter](https://img.shields.io/badge/Flutter-Dart%203.x-02569B?style=flat-square)](#)
[![Java](https://img.shields.io/badge/Java-8%20%7C%2011%20%7C%2017%20%7C%2021-f89820?style=flat-square)](#)
[![Python](https://img.shields.io/badge/Python-3.8%2B-3776ab?style=flat-square)](#)
[![PHP](https://img.shields.io/badge/PHP-7.4%20%7C%208.x-777bb4?style=flat-square)](#)

---

## 💡 Why LankaKit?

Building applications in Sri Lanka—whether it is an e-commerce checkout, fintech KYC, ride-hailing app, invoicing platform, or government registration system—requires handling unique local data structures and edge cases.

Prior to **LankaKit**, developers had to juggle multiple unmaintained, fragmented libraries or write error-prone regex from scratch. **LankaKit solves all of this in a single, zero-dependency suite**:

1. **Accurate NIC Engine**: Fixes the infamous "1-day off" leap-year bug caused by the Sri Lankan Department of Registration of Persons (DRP) 366-day calendar convention, with bidirectional Old (9-digit) $\leftrightarrow$ New (12-digit) conversions.
2. **Mobile Telco Normalization**: Formats Dialog, Mobitel, Hutch, and Airtel numbers into E.164 (`+94771234567`) for SMS gateways (Notify.lk, Ideamart, Twilio).
3. **CBSL Bank & Branch Directory**: Instant lookup of routing codes and branches for Commercial Bank (`7010`), BOC (`7083`), Sampath (`7278`), Peoples (`7135`), HNB (`7092`), and more.
4. **LKR Currency Words Generator**: Converts numeric amounts directly into formal words for invoices, receipts, and bank cheques (e.g. `1540.50` $\rightarrow$ *"One Thousand Five Hundred Forty Rupees and Fifty Cents Only"*, with Sinhala language support).
5. **Vehicle Number Plates**: Identifies modern provincial plates (`WP CAB-1234`), vintage series (`64-1234`), and Sri series (`14 ශ්‍රී 1234`), automatically classifying vehicle types (Cars, Bikes, Three-wheelers).
6. **Passports, TIN & Business Registrations**: Validates citizen Passports (`N` series), Inland Revenue Department TINs (9/10 digits), and Registrar of Companies PV numbers (`PV 12345`).
7. **Sinhala Unicode Normalizer**: Fixes the notorious Zero Width Joiner (`\u200D`) bugs that break database searches in MySQL/PostgreSQL.
8. **Postal Codes & LankaQR**: Complete database of 25 administrative districts and CBSL-compliant EMVCo QR code parsing.

---

## 📦 Installation Across Platforms

### 1. Node.js / TypeScript / React / Next.js
```bash
npm install lanka-kit
# or
pnpm add lanka-kit
# or
yarn add lanka-kit
```

### 2. Flutter / Dart
```bash
flutter pub add lanka_kit
# or use local path / git dependency in pubspec.yaml:
# lanka_kit:
#   path: ./ports/dart
```

### 3. Java / Maven / Java Swing / Spring Boot
Add the dependency to your `pom.xml`:
```xml
<dependency>
    <groupId>com.lankakit</groupId>
    <artifactId>lanka-kit</artifactId>
    <version>1.1.0</version>
</dependency>
```
*Or copy [`ports/java/src/main/java/com/lankakit/LankaKit.java`](ports/java/src/main/java/com/lankakit/LankaKit.java) directly into your Java project (zero dependencies, works on Java 8 through 21).*

### 4. Python / FastAPI / Django
```bash
pip install lanka-kit
# or install from ports directory:
# pip install ./ports/python
```

### 5. PHP / Laravel / Composer
```bash
composer require lanka-kit/lanka-kit
# or include ports/php/LankaKit.php
```

---

## 🚀 Quick Start Examples

### 🪪 1. Sri Lankan NIC Parsing & Form Auto-Fill
```typescript
import { validateNic } from 'lanka-kit';

const identity = validateNic('931451234V');

if (identity.isValid) {
  console.log(identity.gender);               // "Male"
  console.log(identity.dateOfBirthFormatted); // "1993-05-24" (Accurate DRP Leap-year calculation!)
  console.log(identity.age);                  // 33
  console.log(identity.isVoter);              // true (based on 'V' letter)
  console.log(identity.equivalentNic);        // "199314501234" (Auto-converted to New NIC)
}
```

### 📱 2. Phone Carrier Detection & E.164 Normalization
```typescript
import { validatePhone } from 'lanka-kit';

const phone = validatePhone('077 123 4567');
if (phone.isValid) {
  console.log(phone.carrier);  // "Dialog"
  console.log(phone.e164);     // "+94771234567" (Ready for SMS gateways!)
  console.log(phone.national); // "077 123 4567"
}
```

### 🏦 3. CBSL Bank & Branch Directory
```typescript
import { lookupBank, getBranches, getBanks } from 'lanka-kit';

// Lookup by code or name
const bank = lookupBank('7010');
console.log(bank?.name); // "Commercial Bank of Ceylon PLC"

// Get popular branch codes
const branches = getBranches('7010');
console.log(branches[0]); // { branchCode: "001", name: "City Office (Colombo Fort)" }
```

### 💵 4. LKR Currency Words (Cheques, Invoices & Receipts)
```typescript
import { formatLkr, amountToWords } from 'lanka-kit';

formatLkr(1540.5); 
// "Rs. 1,540.50"

amountToWords(1540.5); 
// "One Thousand Five Hundred Forty Rupees and Fifty Cents Only"

// Sinhala cheque format
amountToWords(1540.5, { language: 'si' });
// "රුපියල් එක්දහස් පන්සිය හතළිහයි ශත පනහයි පමණි"
```

### 🚗 5. Vehicle Registration Number Plate Validator
```typescript
import { validateVehiclePlate } from 'lanka-kit';

// Modern Provincial Car
const car = validateVehiclePlate('WP CAB-1234');
console.log(car.category); // "Motor Car"
console.log(car.province); // { code: "WP", name: "Western Province" }

// Modern Provincial Motor Cycle
const bike = validateVehiclePlate('CP BAA-5678');
console.log(bike.category); // "Motor Cycle"

// Vintage "Sri" (ශ්‍රී) Series
const vintage = validateVehiclePlate('14 Sri 1234');
console.log(vintage.clean); // "14 ශ්‍රී 1234"
```

### 🛂 6. Passports, TIN & Business Registration
```typescript
import { validatePassport, validateTin, validateBrn } from 'lanka-kit';

// Passport (Citizen N-series & Biometric PA-series)
validatePassport('N1234567').isValid; // true

// Taxpayer Identification Number (IRD 9/10 digits)
validateTin('1234567890').isValid; // true

// Registrar of Companies PV Number
validateBrn('PV 12345').isValid; // true
```

### 🔤 7. Sinhala Unicode & Database Search Normalizer
```typescript
import { normalizeSinhala, stripZwj, sanitizeSearchQuery } from 'lanka-kit';

// Fixes duplicate Zero Width Joiners (\u200D) and phantom zero-width spaces
const cleanText = normalizeSinhala('ප්‍ර\u200Dවෘත්ති');

// Strips ZWJ so database queries like 'LIKE %ප්ර%' match 'ප්‍ර' consistently:
const searchQuery = sanitizeSearchQuery('ප්‍රවෘත්ති');
```

### 🛡️ 8. Zod Schema Integration
```typescript
import { z } from 'zod';
import { nicRefinement, phoneRefinement, vehiclePlateRefinement } from 'lanka-kit';

const RegisterSchema = z.object({
  nic: z.string().refine(nicRefinement.validator, { message: nicRefinement.message }),
  phone: z.string().refine(phoneRefinement.validator, { message: phoneRefinement.message }),
  vehiclePlate: z.string().refine(vehiclePlateRefinement.validator, { message: vehiclePlateRefinement.message }).optional(),
});
```

---

## 🎯 Flutter / Dart Integration

In your Flutter widget forms:

```dart
import 'package:flutter/material.dart';
import 'package:lanka_kit/lanka_kit.dart';

class RegistrationScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          // Built-in TextFormField validator
          TextFormField(
            decoration: InputDecoration(labelText: 'Sri Lankan NIC'),
            validator: nicFormFieldValidator(),
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'Mobile Phone'),
            validator: phoneFormFieldValidator(),
          ),
        ],
      ),
    );
  }
}
```

---

## ☕ Java Swing & Spring Boot Integration

### In Java Swing Form Auto-Fill:
```java
import com.lankakit.LankaKit;
import javax.swing.JTextField;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

JTextField nicField = new JTextField();
JTextField dobField = new JTextField();
JTextField genderField = new JTextField();

// Automatically derives and fills Date of Birth & Gender as the user types their NIC
nicField.getDocument().addDocumentListener(new DocumentListener() {
    private void update() {
        LankaKit.NicResult res = LankaKit.validateNic(nicField.getText());
        if (res.isValid) {
            dobField.setText(res.dateOfBirth);     // e.g. "1993-05-24"
            genderField.setText(res.gender);        // e.g. "Male"
        }
    }
    public void insertUpdate(DocumentEvent e) { update(); }
    public void removeUpdate(DocumentEvent e) { update(); }
    public void changedUpdate(DocumentEvent e) { update(); }
});
```

---

## 🐍 Python / FastAPI Integration

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from lanka_kit import validate_nic, validate_phone, lookup_bank

app = FastAPI()

class UserRegister(BaseModel):
    nic: str
    phone: str

@app.post("/register")
def register(user: UserRegister):
    nic_data = validate_nic(user.nic)
    if not nic_data["isValid"]:
        raise HTTPException(status_code=400, detail=nic_data["error"])
        
    phone_data = validate_phone(user.phone)
    if not phone_data["isValid"]:
        raise HTTPException(status_code=400, detail=phone_data["error"])

    return {
        "gender": nic_data["gender"],
        "date_of_birth": nic_data["dateOfBirth"],
        "carrier": phone_data["carrier"],
        "e164": phone_data["e164"]
    }
```

---

## 🧪 Testing

Run the built-in test suite (33 unit tests):

```bash
npm test
```

Test coverage includes:
- Male & Female Old NIC validation & 500-day offset check
- New 12-digit NIC validation
- Department of Registration of Persons (DRP) Day 60 / Day 61 Leap Year handling
- Bidirectional Old $\leftrightarrow$ New NIC conversions
- Sri Lankan Mobile Operator prefixes (Dialog, Mobitel, Hutch, Airtel) & Fixed Lines (SLT)
- CBSL registered bank codes and branch directory lookups
- LKR Currency formatting and English & Sinhala numbers to words
- Vehicle plate modern provincial, transitional, vintage, and Sri series
- Passports, Tax Identification Numbers (TIN), and ROC Business Registrations (PV numbers)
- Sinhala Unicode Normalizer and ZWJ stripping for search indexing
- 25 Administrative Districts and Postal Code lookups
- LANKAQR EMVCo Tag-Length-Value (TLV) parsing & CRC-16 validation

---

## 💻 Local Interactive Playground

To launch the interactive demo and documentation web app:

```bash
npm run dev
```

Open `http://127.0.0.1:5173/` in your browser.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

### License
MIT License. Free to use in open-source and commercial products.
