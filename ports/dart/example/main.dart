import 'package:lanka_kit/lanka_kit.dart';

void main() {
  // 1. NIC Parsing
  final nic = validateNic('931451234V');
  if (nic.isValid) {
    print('NIC: ${nic.clean}');
    print('Gender: ${nic.gender}');
    print('Date of Birth: ${nic.dateOfBirth}');
    print('Age: ${nic.age}');
    print('Equivalent New NIC: ${nic.equivalentNic}');
  }

  // 2. Mobile Phone Carrier Detection
  final phone = validatePhone('0771234567');
  if (phone.isValid) {
    print('Carrier: ${phone.carrier}');
    print('E.164: ${phone.e164}');
  }

  // 3. Bank Lookup
  final bank = lookupBank('7010');
  if (bank != null) {
    print('Bank: ${bank.name} (${bank.code})');
  }

  // 4. Currency Formatting
  print('LKR: ${formatLkr(1540.50)}');

  // 5. Vehicle Plate
  final vehicle = validateVehiclePlate('WP CAB-1234');
  if (vehicle.isValid) {
    print('Vehicle: ${vehicle.clean} (${vehicle.category})');
  }
}
