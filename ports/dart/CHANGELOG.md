## 1.2.0

* Added Sri Lanka Post verified directory with 2,121 postcodes and 2,137 post offices.
* Added `lookupPostalCode()` with automatic district-range fallback estimation.
* Added `searchLocations()` for keyword search across cities, districts, and provinces.
* Added support for common search aliases (e.g., Malabe -> Malambe).

## 1.1.0

* Initial release of `lanka_kit` for Dart and Flutter.
* Sri Lankan National Identity Card (NIC) parsing and validation (supporting both old 10-char and new 12-digit formats).
* Official DRP 366-day leap-year calculation and bidirectional conversion.
* Sri Lankan mobile telco carrier identification (Dialog, Mobitel, Hutch, Airtel) and E.164 normalization.
* Central Bank of Sri Lanka (CBSL) bank directory and routing code lookup.
* LKR currency display formatting.
* Vehicle registration plate validation (modern provincial, vintage, and Sri series).
* Citizen passport and Taxpayer Identification Number (TIN) validation.
* Sinhala Unicode Zero Width Joiner (ZWJ) normalization.
* Ready-to-use Flutter `TextFormField` validator helpers (`nicFormFieldValidator`, `phoneFormFieldValidator`).
