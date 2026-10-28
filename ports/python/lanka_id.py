"""
LankaID: Universal Sri Lankan Identity & Verification Toolkit for Python.
Zero-dependency module for Django, FastAPI, Flask, and data pipelines.
"""

from datetime import date, datetime
import re
from typing import Optional, Dict, Any

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
        return {
            "isValid": False,
            "error": f"Invalid length ({length}). Expected 10 or 12 characters.",
            "code": "INVALID_LENGTH",
        }

    if length == 10:
        if not re.match(r"^[0-9]{9}[VX]$", clean):
            return {"isValid": False, "error": "Old NIC must have 9 digits followed by V or X", "code": "INVALID_CHARACTERS"}
        nic_format = "OLD"
        year = 1900 + int(clean[:2])
        day_raw = int(clean[2:5])
        serial = clean[5:8]
        check_digit = clean[8:9]
        is_voter = clean.endswith("V")
    else:
        if not re.match(r"^[0-9]{12}$", clean):
            return {"isValid": False, "error": "New NIC must have 12 numeric digits", "code": "INVALID_CHARACTERS"}
        nic_format = "NEW"
        year = int(clean[:4])
        day_raw = int(clean[4:7])
        serial = clean[7:11]
        check_digit = clean[11:12]
        is_voter = True

    if day_raw > 500:
        gender = "Female"
        day_of_year = day_raw - 500
    else:
        gender = "Male"
        day_of_year = day_raw

    if day_of_year < 1 or day_of_year > 366:
        return {
            "isValid": False,
            "error": f"Invalid day of year ({day_raw}). Must be 001-366 (Male) or 501-866 (Female).",
            "code": "INVALID_DAY_OF_YEAR",
        }

    rem = day_of_year
    month = 1
    day = 1
    for m in DRP_MONTH_DAYS:
        if rem <= m["days"]:
            month = m["month"]
            day = rem
            break
        rem -= m["days"]

    if month == 2 and day == 29 and not is_leap_year(year):
        day = 28

    dob = date(year, month, day)
    today = date.today()

    if dob > today:
        return {"isValid": False, "error": "Birth date is in the future", "code": "FUTURE_BIRTH_DATE"}

    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    if nic_format == "NEW":
        is_voter = age >= 18

    equivalent_nic = None
    if nic_format == "OLD":
        equivalent_nic = f"19{clean[:2]}{clean[2:5]}0{clean[5:8]}{clean[8:9]}"
    elif 1900 <= year < 2000 and clean[7] == "0":
        equivalent_nic = f"{clean[2:4]}{clean[4:7]}{clean[8:11]}{clean[11:12]}V"

    return {
        "isValid": True,
        "nic": clean,
        "format": nic_format,
        "year": year,
        "dayOfYear": day_of_year,
        "gender": gender,
        "dateOfBirth": dob.isoformat(),
        "age": age,
        "isVoter": is_voter,
        "serialNumber": serial,
        "checkDigit": check_digit,
        "equivalentNic": equivalent_nic,
    }

def is_valid_nic(input_nic: str) -> bool:
    return validate_nic(input_nic).get("isValid", False)

def validate_phone(input_phone: str) -> Dict[str, Any]:
    sanitized = re.sub(r"[\s\-\(\)\.]", "", str(input_phone).strip())
    if not sanitized:
        return {"isValid": False, "error": "Phone cannot be empty"}

    norm = sanitized
    if norm.startswith("+94"):
        norm = norm[3:]
    elif norm.startswith("0094"):
        norm = norm[4:]
    elif norm.startswith("94"):
        norm = norm[2:]

    if len(norm) == 9 and not norm.startswith("0"):
        norm = "0" + norm

    if not re.match(r"^[0-9]{10}$", norm) or not norm.startswith("0"):
        return {"isValid": False, "error": "Invalid Sri Lankan phone number format"}

    prefix = norm[:3]
    carrier = MOBILE_CARRIERS.get(prefix, "Unknown")

    return {
        "isValid": True,
        "clean": norm,
        "e164": "+94" + norm[1:],
        "national": f"{prefix} {norm[3:6]} {norm[6:]}",
        "carrier": carrier,
        "type": "Mobile" if carrier != "Unknown" else "Fixed/Other",
    }
