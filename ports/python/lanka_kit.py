"""
LankaKit
Sri Lankan utility toolkit for Python.
"""

from datetime import date, datetime
import re
from typing import Optional, Dict, Any, List

DRP_MONTH_DAYS = [
    {"month": 1, "days": 31},
    {"month": 2, "days": 29},
    {"month": 3, "days": 31},
    {"month": 4, "days": 30},
    {"month": 5, "days": 31},
    {"month": 6, "days": 30},
    {"month": 7, "days": 31},
    {"month": 8, "days": 31},
    {"month": 9, "days": 30},
    {"month": 10, "days": 31},
    {"month": 11, "days": 30},
    {"month": 12, "days": 31},
]

MOBILE_CARRIERS = {
    "070": "Mobitel",
    "071": "Mobitel",
    "072": "Hutch",
    "074": "Dialog",
    "075": "Airtel",
    "076": "Dialog",
    "077": "Dialog",
    "078": "Hutch",
}

BANKS = [
    {"code": "7010", "name": "Commercial Bank of Ceylon PLC", "short_name": "Commercial Bank", "popular": True},
    {"code": "7083", "name": "Bank of Ceylon", "short_name": "BOC", "popular": True},
    {"code": "7135", "name": "People's Bank", "short_name": "People's Bank", "popular": True},
    {"code": "7092", "name": "Hatton National Bank PLC", "short_name": "HNB", "popular": True},
    {"code": "7278", "name": "Sampath Bank PLC", "short_name": "Sampath Bank", "popular": True},
    {"code": "7169", "name": "National Development Bank PLC", "short_name": "NDB Bank", "popular": True},
    {"code": "7214", "name": "Nations Trust Bank PLC", "short_name": "NTB", "popular": True},
    {"code": "7205", "name": "Seylan Bank PLC", "short_name": "Seylan Bank", "popular": True},
    {"code": "7311", "name": "DFCC Bank PLC", "short_name": "DFCC Bank", "popular": True},
    {"code": "7719", "name": "National Savings Bank", "short_name": "NSB", "popular": True},
    {"code": "7463", "name": "Cargills Bank Limited", "short_name": "Cargills Bank", "popular": True},
    {"code": "7074", "name": "HSBC", "short_name": "HSBC", "popular": True},
    {"code": "7056", "name": "Standard Chartered Bank", "short_name": "Standard Chartered", "popular": False},
]

PROVINCES = {
    "WP": "Western Province",
    "CP": "Central Province",
    "SP": "Southern Province",
    "NP": "Northern Province",
    "EP": "Eastern Province",
    "NW": "North Western Province",
    "NC": "North Central Province",
    "UP": "Uva Province",
    "UVA": "Uva Province",
    "SG": "Sabaragamuwa Province",
}

def is_leap_year(year: int) -> bool:
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

def sanitize_nic(nic: str) -> str:
    if not isinstance(nic, str):
        return ""
    return re.sub(r"[\s-]", "", nic.strip().upper())

def validate_nic(input_nic: str) -> Dict[str, Any]:
    clean = sanitize_nic(input_nic)
    if not clean:
        return {"isValid": False, "error": "NIC cannot be empty", "code": "EMPTY_INPUT"}

    length = len(clean)
    if length not in (10, 12):
        return {"isValid": False, "error": f"Invalid length ({length}). Must be 10 or 12 characters", "code": "INVALID_LENGTH"}

    format_type = "OLD" if length == 10 else "NEW"
    year = 0
    days_data = 0
    serial = ""
    check_digit = 0
    is_voter = None

    if format_type == "OLD":
        if not re.match(r"^\d{9}[VX]$", clean):
            return {"isValid": False, "error": "Old NIC must have 9 digits followed by 'V' or 'X'", "code": "INVALID_OLD_FORMAT"}
        year = 1900 + int(clean[0:2])
        days_data = int(clean[2:5])
        serial = clean[5:8]
        check_digit = int(clean[8])
        is_voter = clean[9] == "V"
    else:
        if not re.match(r"^\d{12}$", clean):
            return {"isValid": False, "error": "New NIC must contain exactly 12 numeric digits", "code": "INVALID_NEW_FORMAT"}
        year = int(clean[0:4])
        days_data = int(clean[4:7])
        serial = clean[7:11]
        check_digit = int(clean[11])

    gender = "Male"
    day_of_year = days_data
    if day_of_year > 500:
        gender = "Female"
        day_of_year -= 500

    if day_of_year < 1 or day_of_year > 366:
        return {"isValid": False, "error": f"Day of year ({day_of_year}) out of range (1-366)", "code": "INVALID_DAY_OF_YEAR"}

    month = 0
    day = 0
    accum = 0
    for m in DRP_MONTH_DAYS:
        if day_of_year <= accum + m["days"]:
            month = m["month"]
            day = day_of_year - accum
            break
        accum += m["days"]

    if month == 2 and day == 29 and not is_leap_year(year):
        month = 2
        day = 28

    dob_formatted = f"{year:04d}-{month:02d}-{day:02d}"
    today = date.today()
    age = today.year - year - ((today.month, today.day) < (month, day))

    equiv = ""
    if format_type == "OLD":
        equiv = f"{year:04d}{days_data:03d}0{serial}{check_digit}"
    else:
        if 1900 <= year < 2000 and len(serial) == 4 and serial.startswith("0"):
            equiv = f"{str(year)[2:]}{days_data:03d}{serial[1:]}{check_digit}V"

    return {
        "isValid": True,
        "clean": clean,
        "format": format_type,
        "gender": gender,
        "year": year,
        "dayOfYear": day_of_year,
        "dateOfBirth": dob_formatted,
        "age": age,
        "isVoter": is_voter,
        "serial": serial,
        "checkDigit": check_digit,
        "equivalentNic": equiv or None,
    }

def validate_phone(phone_input: str) -> Dict[str, Any]:
    if not isinstance(phone_input, str):
        return {"isValid": False, "error": "Input must be a string"}
    clean = re.sub(r"[\s\-\(\)\.]", "", phone_input.strip())
    if clean.startswith("+94"):
        clean = "0" + clean[3:]
    elif clean.startswith("0094"):
        clean = "0" + clean[4:]
    elif clean.startswith("94") and len(clean) == 11:
        clean = "0" + clean[2:]
    elif len(clean) == 9 and clean.startswith("7"):
        clean = "0" + clean

    if not re.match(r"^0\d{9}$", clean):
        return {"isValid": False, "error": "Phone number must be a valid 10-digit Sri Lankan number"}

    prefix = clean[0:3]
    carrier = MOBILE_CARRIERS.get(prefix)
    phone_type = "Mobile" if carrier else ("Fixed Line" if prefix.startswith(("011", "081", "091", "031", "021")) else "Other")

    return {
        "isValid": True,
        "clean": clean,
        "e164": "+94" + clean[1:],
        "carrier": carrier or "Sri Lanka Telecom / Fixed",
        "type": phone_type,
        "national": f"{clean[0:3]} {clean[3:6]} {clean[6:]}",
    }

def get_banks() -> List[Dict[str, Any]]:
    return list(BANKS)

def lookup_bank(query: str) -> Optional[Dict[str, Any]]:
    if not query:
        return None
    q = query.strip().lower()
    for b in BANKS:
        if b["code"] == q or b["short_name"].lower() == q or b["name"].lower() == q:
            return b
    return None

def format_lkr(amount: float, prefix: str = "Rs. ") -> str:
    try:
        val = float(amount)
        sign = "-" if val < 0 else ""
        return f"{sign}{prefix}{abs(val):,.2f}"
    except (ValueError, TypeError):
        return "Rs. 0.00"

def validate_vehicle_plate(input_str: str) -> Dict[str, Any]:
    if not isinstance(input_str, str):
        return {"isValid": False, "error": "Input must be a string"}
    clean = re.sub(r"\s+", " ", input_str.strip().upper())
    m = re.match(r"^(?:([A-Z]{2,3})\s+)?([A-Z]{2,3})[\s-]?(\d{4})$", clean)
    if m:
        prov = m.group(1)
        prefix = m.group(2)
        num = m.group(3)
        cat = "Motor Car" if prefix.startswith("C") else ("Motor Cycle" if prefix.startswith("B") else ("Three Wheeler" if prefix.startswith("A") else "General"))
        clean_plate = f"{prov} {prefix}-{num}" if prov else f"{prefix}-{num}"
        return {
            "isValid": True,
            "clean": clean_plate,
            "category": cat,
            "province": PROVINCES.get(prov) if prov else None,
        }
    return {"isValid": False, "error": "Invalid Sri Lankan vehicle plate format"}

def validate_passport(input_str: str) -> Dict[str, Any]:
    if not isinstance(input_str, str):
        return {"isValid": False, "error": "Input must be a string"}
    clean = re.sub(r"[\s-]", "", input_str.strip().upper())
    if re.match(r"^N\d{7}$", clean):
        return {"isValid": True, "clean": clean, "type": "Regular (N-Series)"}
    if re.match(r"^PA\d{7}$", clean):
        return {"isValid": True, "clean": clean, "type": "Biometric (PA-Series)"}
    return {"isValid": False, "error": "Invalid Sri Lankan passport number format"}

def validate_tin(input_str: str) -> Dict[str, Any]:
    if not isinstance(input_str, str):
        return {"isValid": False, "error": "Input must be a string"}
    clean = re.sub(r"[\s-]", "", input_str.strip())
    if re.match(r"^\d{9,10}$", clean):
        return {"isValid": True, "clean": clean, "digits": len(clean)}
    return {"isValid": False, "error": "Invalid Sri Lankan TIN. Expected 9 or 10 digits"}
