package com.lankakit;

import javax.swing.JTextField;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

public class LankaKitTest {
    public static void main(String[] args) {
        System.out.println("Running Java Tests for LankaKit...");

        // 1. NIC Test
        LankaKit.NicResult oldMale = LankaKit.validateNic("931451234V");
        assert oldMale.isValid : "931451234V should be valid";
        assert "Male".equals(oldMale.gender) : "Gender should be Male";
        assert "1993-05-24".equals(oldMale.dateOfBirth) : "DOB should be 1993-05-24";
        assert "199314501234".equals(oldMale.equivalentNic) : "Equiv should match";
        System.out.println("✔ NIC Old Male: " + oldMale);

        // 2. Phone Test
        LankaKit.PhoneResult phone = LankaKit.validatePhone("0771234567");
        assert phone.isValid : "Phone should be valid";
        assert "Dialog".equals(phone.carrier) : "Carrier should be Dialog";
        assert "+94771234567".equals(phone.e164) : "E.164 should match";
        System.out.println("✔ Phone Dialog: " + phone.carrier + ", " + phone.e164);

        // 3. Bank Test
        LankaKit.BankInfo bank = LankaKit.lookupBank("7010");
        assert bank != null && "Commercial Bank".equals(bank.shortName) : "Bank lookup failed";
        System.out.println("✔ Bank: " + bank.name);

        // 4. Vehicle Plate Test
        LankaKit.VehicleResult car = LankaKit.validateVehiclePlate("WP CAB-1234");
        assert car.isValid && "Motor Car".equals(car.category) : "Vehicle plate test failed";
        System.out.println("✔ Vehicle Plate: " + car.clean + " (" + car.category + ")");

        // 5. Postal Code Lookup (Sri Lanka Post Verified)
        LankaKit.PostalLocation postal = LankaKit.lookupPostalCode("10150");
        assert postal != null && "Athurugiriya".equals(postal.city) : "Postal lookup 10150 failed";
        System.out.println("✔ Postal Lookup: " + postal.city + ", " + postal.district + " (" + postal.postalCode + ")");

        // 6. Postal Search (Malabe alias)
        java.util.List<LankaKit.PostalLocation> search = LankaKit.searchLocations("Malabe");
        assert !search.isEmpty() && "Malambe".equals(search.get(0).city) : "Postal search Malabe failed";
        System.out.println("✔ Postal Search Malabe: " + search.get(0).city + " (" + search.get(0).postalCode + ")");

        // 7. Java Swing Integration Example Test
        JTextField nicTextField = new JTextField();
        JTextField dobTextField = new JTextField();
        JTextField genderTextField = new JTextField();

        nicTextField.getDocument().addDocumentListener(new DocumentListener() {
            private void update() {
                LankaKit.NicResult res = LankaKit.validateNic(nicTextField.getText());
                if (res.isValid) {
                    dobTextField.setText(res.dateOfBirth);
                    genderTextField.setText(res.gender);
                } else {
                    dobTextField.setText("");
                    genderTextField.setText("");
                }
            }
            public void insertUpdate(DocumentEvent e) { update(); }
            public void removeUpdate(DocumentEvent e) { update(); }
            public void changedUpdate(DocumentEvent e) { update(); }
        });

        // Verify Swing document listener behavior
        nicTextField.setText("931451234V");
        assert "1993-05-24".equals(dobTextField.getText()) : "Swing auto-fill DOB failed";
        assert "Male".equals(genderTextField.getText()) : "Swing auto-fill Gender failed";
        System.out.println("✔ Java Swing Auto-Fill Integration Verified!");

        System.out.println("All Java Tests Passed Successfully!");
    }
}
