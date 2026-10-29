import 'package:lanka_kit/lanka_kit.dart';

void main() {
  // 1. NIC Parsing
  final nic = validateNic('931451234V');
  if (nic.isValid) {
    print('NIC: ${nic.clean} (${nic.gender}, ${nic.dateOfBirth})');
  }

  // 2. Mobile Phone Carrier Detection
  final phone = validatePhone('0771234567');
  if (phone.isValid) {
    print('Phone: ${phone.clean} (${phone.carrier})');
  }

  // 3. Bank Lookup
  final bank = lookupBank('7010');
  if (bank != null) {
    print('Bank: ${bank.name} (${bank.code})');
  }

  // 4. Postal Code Lookup (Sri Lanka Post Verified)
  final postal = lookupPostalCode('10150');
  if (postal != null) {
    print('Postal: ${postal.city}, ${postal.district} (${postal.postalCode})');
  }

  // 5. Postal Search
  final search = searchLocations('Malabe');
  print('Search Malabe: ${search.length} match -> ${search.first.city} (${search.first.postalCode})');
}
