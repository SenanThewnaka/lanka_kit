import { DistrictInfo, PostalLocation } from './types';

/**
 * 25 Administrative Districts of Sri Lanka mapped to their 9 Provinces.
 */
export const SRI_LANKA_DISTRICTS: DistrictInfo[] = [
  // Western Province
  { name: 'Colombo', code: 'COL', province: 'Western', postalCodeRange: [0, 10999] },
  { name: 'Gampaha', code: 'GAM', province: 'Western', postalCodeRange: [11000, 11999] },
  { name: 'Kalutara', code: 'KAL', province: 'Western', postalCodeRange: [12000, 12999] },

  // Central Province
  { name: 'Kandy', code: 'KAN', province: 'Central', postalCodeRange: [20000, 20999] },
  { name: 'Matale', code: 'MTL', province: 'Central', postalCodeRange: [21000, 21999] },
  { name: 'Nuwara Eliya', code: 'NEL', province: 'Central', postalCodeRange: [22000, 22999] },

  // Southern Province
  { name: 'Galle', code: 'GAL', province: 'Southern', postalCodeRange: [80000, 80999] },
  { name: 'Matara', code: 'MAT', province: 'Southern', postalCodeRange: [81000, 81999] },
  { name: 'Hambantota', code: 'HAM', province: 'Southern', postalCodeRange: [82000, 82999] },

  // Northern Province
  { name: 'Jaffna', code: 'JAF', province: 'Northern', postalCodeRange: [40000, 40999] },
  { name: 'Kilinochchi', code: 'KIL', province: 'Northern', postalCodeRange: [44000, 44999] },
  { name: 'Mannar', code: 'MAN', province: 'Northern', postalCodeRange: [41000, 41999] },
  { name: 'Vavuniya', code: 'VAV', province: 'Northern', postalCodeRange: [43000, 43999] },
  { name: 'Mullaitivu', code: 'MUL', province: 'Northern', postalCodeRange: [42000, 42999] },

  // Eastern Province
  { name: 'Batticaloa', code: 'BAT', province: 'Eastern', postalCodeRange: [30000, 30999] },
  { name: 'Ampara', code: 'AMP', province: 'Eastern', postalCodeRange: [32000, 32999] },
  { name: 'Trincomalee', code: 'TRI', province: 'Eastern', postalCodeRange: [31000, 31999] },

  // North Western Province
  { name: 'Kurunegala', code: 'KUR', province: 'North Western', postalCodeRange: [60000, 60999] },
  { name: 'Puttalam', code: 'PUT', province: 'North Western', postalCodeRange: [61000, 61999] },

  // North Central Province
  { name: 'Anuradhapura', code: 'ANU', province: 'North Central', postalCodeRange: [50000, 50999] },
  { name: 'Polonnaruwa', code: 'POL', province: 'North Central', postalCodeRange: [51000, 51999] },

  // Uva Province
  { name: 'Badulla', code: 'BAD', province: 'Uva', postalCodeRange: [90000, 90999] },
  { name: 'Monaragala', code: 'MON', province: 'Uva', postalCodeRange: [91000, 91999] },

  // Sabaragamuwa Province
  { name: 'Ratnapura', code: 'RAT', province: 'Sabaragamuwa', postalCodeRange: [70000, 70999] },
  { name: 'Kegalle', code: 'KEG', province: 'Sabaragamuwa', postalCodeRange: [71000, 71999] },
];

export const SRI_LANKA_PROVINCES = [
  'Western',
  'Central',
  'Southern',
  'Northern',
  'Eastern',
  'North Western',
  'North Central',
  'Uva',
  'Sabaragamuwa',
] as const;

/**
 * Comprehensive Sri Lankan Postal Codes Registry (Over 180+ prominent cities, suburbs, and administrative hubs).
 */
const POSTAL_CODES: Record<string, { city: string; district: string; province: string }> = {
  // Colombo postal zones (00100 - 01500)
  '00100': { city: 'Colombo 01 (Fort)', district: 'Colombo', province: 'Western' },
  '00200': { city: 'Colombo 02 (Slave Island)', district: 'Colombo', province: 'Western' },
  '00300': { city: 'Colombo 03 (Kollupitiya)', district: 'Colombo', province: 'Western' },
  '00400': { city: 'Colombo 04 (Bambalapitiya)', district: 'Colombo', province: 'Western' },
  '00500': { city: 'Colombo 05 (Havelock Town / Kirulapone)', district: 'Colombo', province: 'Western' },
  '00600': { city: 'Colombo 06 (Wellawatte / Pamankada)', district: 'Colombo', province: 'Western' },
  '00700': { city: 'Colombo 07 (Cinnamon Gardens)', district: 'Colombo', province: 'Western' },
  '00800': { city: 'Colombo 08 (Borella)', district: 'Colombo', province: 'Western' },
  '00900': { city: 'Colombo 09 (Dematagoda)', district: 'Colombo', province: 'Western' },
  '01000': { city: 'Colombo 10 (Maradana / Panchikawatte)', district: 'Colombo', province: 'Western' },
  '01100': { city: 'Colombo 11 (Pettah)', district: 'Colombo', province: 'Western' },
  '01200': { city: 'Colombo 12 (Hultsdorf)', district: 'Colombo', province: 'Western' },
  '01300': { city: 'Colombo 13 (Kotahena / Bloemendhal)', district: 'Colombo', province: 'Western' },
  '01400': { city: 'Colombo 14 (Grandpass)', district: 'Colombo', province: 'Western' },
  '01500': { city: 'Colombo 15 (Mutwal / Modara / Mattakkuliya)', district: 'Colombo', province: 'Western' },

  // Colombo Suburbs & Greater Colombo
  '10100': { city: 'Battaramulla', district: 'Colombo', province: 'Western' },
  '10107': { city: 'Nawala', district: 'Colombo', province: 'Western' },
  '10111': { city: 'Sri Jayawardenepura', district: 'Colombo', province: 'Western' },
  '10115': { city: 'Rajagiriya', district: 'Colombo', province: 'Western' },
  '10116': { city: 'Kalapaluwawa', district: 'Colombo', province: 'Western' },
  '10117': { city: 'Thalahena', district: 'Colombo', province: 'Western' },
  '10118': { city: 'Koswatta', district: 'Colombo', province: 'Western' },
  '10120': { city: 'Kotte', district: 'Colombo', province: 'Western' },
  '10150': { city: 'Athurugiriya', district: 'Colombo', province: 'Western' },
  '10200': { city: 'Malabe', district: 'Colombo', province: 'Western' },
  '10206': { city: 'Habarakada', district: 'Colombo', province: 'Western' },
  '10220': { city: 'Hokandara', district: 'Colombo', province: 'Western' },
  '10230': { city: 'Kottawa / Pannipitiya', district: 'Colombo', province: 'Western' },
  '10240': { city: 'Mirihana', district: 'Colombo', province: 'Western' },
  '10250': { city: 'Nugegoda', district: 'Colombo', province: 'Western' },
  '10280': { city: 'Maharagama', district: 'Colombo', province: 'Western' },
  '10290': { city: 'Boralesgamuwa', district: 'Colombo', province: 'Western' },
  '10300': { city: 'Piliyandala', district: 'Colombo', province: 'Western' },
  '10305': { city: 'Kesbewa', district: 'Colombo', province: 'Western' },
  '10306': { city: 'Madapatha', district: 'Colombo', province: 'Western' },
  '10350': { city: 'Dehiwala', district: 'Colombo', province: 'Western' },
  '10370': { city: 'Mount Lavinia', district: 'Colombo', province: 'Western' },
  '10380': { city: 'Attidiya', district: 'Colombo', province: 'Western' },
  '10390': { city: 'Ratmalana', district: 'Colombo', province: 'Western' },
  '10400': { city: 'Moratuwa', district: 'Colombo', province: 'Western' },
  '10430': { city: 'Rawathawatta', district: 'Colombo', province: 'Western' },
  '10440': { city: 'Katubedda', district: 'Colombo', province: 'Western' },
  '10500': { city: 'Homagama', district: 'Colombo', province: 'Western' },
  '10520': { city: 'Godagama', district: 'Colombo', province: 'Western' },
  '10522': { city: 'Padukka', district: 'Colombo', province: 'Western' },
  '10524': { city: 'Meegoda', district: 'Colombo', province: 'Western' },
  '10640': { city: 'Avissawella', district: 'Colombo', province: 'Western' },
  '10650': { city: 'Hanwella', district: 'Colombo', province: 'Western' },
  '10680': { city: 'Ranala', district: 'Colombo', province: 'Western' },
  '10730': { city: 'Kosgama', district: 'Colombo', province: 'Western' },

  // Gampaha District
  '11000': { city: 'Gampaha', district: 'Gampaha', province: 'Western' },
  '11010': { city: 'Ragama', district: 'Gampaha', province: 'Western' },
  '11020': { city: 'Ganemulla', district: 'Gampaha', province: 'Western' },
  '11030': { city: 'Yakkala', district: 'Gampaha', province: 'Western' },
  '11100': { city: 'Veyangoda', district: 'Gampaha', province: 'Western' },
  '11200': { city: 'Mirigama', district: 'Gampaha', province: 'Western' },
  '11300': { city: 'Kelaniya', district: 'Gampaha', province: 'Western' },
  '11320': { city: 'Kandana', district: 'Gampaha', province: 'Western' },
  '11350': { city: 'Mahabage', district: 'Gampaha', province: 'Western' },
  '11370': { city: 'Peliyagoda', district: 'Gampaha', province: 'Western' },
  '11380': { city: 'Kiribathgoda', district: 'Gampaha', province: 'Western' },
  '11400': { city: 'Wattala', district: 'Gampaha', province: 'Western' },
  '11410': { city: 'Mabola', district: 'Gampaha', province: 'Western' },
  '11420': { city: 'Hendala', district: 'Gampaha', province: 'Western' },
  '11450': { city: 'Ja-Ela', district: 'Gampaha', province: 'Western' },
  '11500': { city: 'Negombo', district: 'Gampaha', province: 'Western' },
  '11538': { city: 'Kochchikade', district: 'Gampaha', province: 'Western' },
  '11540': { city: 'Katunayake (Airport / FTZ)', district: 'Gampaha', province: 'Western' },
  '11550': { city: 'Minuwangoda', district: 'Gampaha', province: 'Western' },
  '11600': { city: 'Seeduwa', district: 'Gampaha', province: 'Western' },
  '11640': { city: 'Ekala', district: 'Gampaha', province: 'Western' },
  '11650': { city: 'Biyagama', district: 'Gampaha', province: 'Western' },
  '11670': { city: 'Delgoda', district: 'Gampaha', province: 'Western' },
  '11700': { city: 'Kadawatha', district: 'Gampaha', province: 'Western' },
  '11710': { city: 'Kirillawala', district: 'Gampaha', province: 'Western' },
  '11850': { city: 'Nittambuwa', district: 'Gampaha', province: 'Western' },
  '11870': { city: 'Wathupitiwala', district: 'Gampaha', province: 'Western' },
  '11880': { city: 'Pasyala', district: 'Gampaha', province: 'Western' },
  '11890': { city: 'Radawana', district: 'Gampaha', province: 'Western' },

  // Kalutara District
  '12000': { city: 'Kalutara', district: 'Kalutara', province: 'Western' },
  '12015': { city: 'Katukurunda', district: 'Kalutara', province: 'Western' },
  '12020': { city: 'Nagoda', district: 'Kalutara', province: 'Western' },
  '12030': { city: 'Payagala', district: 'Kalutara', province: 'Western' },
  '12040': { city: 'Maggona', district: 'Kalutara', province: 'Western' },
  '12070': { city: 'Beruwala', district: 'Kalutara', province: 'Western' },
  '12090': { city: 'Aluthgama', district: 'Kalutara', province: 'Western' },
  '12100': { city: 'Matugama', district: 'Kalutara', province: 'Western' },
  '12130': { city: 'Neboda', district: 'Kalutara', province: 'Western' },
  '12200': { city: 'Agalawatta', district: 'Kalutara', province: 'Western' },
  '12400': { city: 'Bulathsinhala', district: 'Kalutara', province: 'Western' },
  '12440': { city: 'Ingiriya', district: 'Kalutara', province: 'Western' },
  '12500': { city: 'Panadura', district: 'Kalutara', province: 'Western' },
  '12530': { city: 'Bandaragama', district: 'Kalutara', province: 'Western' },
  '12560': { city: 'Wadduwa', district: 'Kalutara', province: 'Western' },
  '12580': { city: 'Horana', district: 'Kalutara', province: 'Western' },
  '12590': { city: 'Pokunuwita', district: 'Kalutara', province: 'Western' },

  // Kandy District
  '20000': { city: 'Kandy', district: 'Kandy', province: 'Central' },
  '20100': { city: 'Katugastota', district: 'Kandy', province: 'Central' },
  '20168': { city: 'Kundasale', district: 'Kandy', province: 'Central' },
  '20180': { city: 'Digana', district: 'Kandy', province: 'Central' },
  '20200': { city: 'Wattegama', district: 'Kandy', province: 'Central' },
  '20400': { city: 'Peradeniya', district: 'Kandy', province: 'Central' },
  '20430': { city: 'Kadugannawa', district: 'Kandy', province: 'Central' },
  '20450': { city: 'Pilimathalawa', district: 'Kandy', province: 'Central' },
  '20500': { city: 'Gampola', district: 'Kandy', province: 'Central' },
  '20650': { city: 'Nawalapitiya', district: 'Kandy', province: 'Central' },
  '20850': { city: 'Akurana', district: 'Kandy', province: 'Central' },
  '20900': { city: 'Teldeniya', district: 'Kandy', province: 'Central' },
  '20914': { city: 'Menikhinna', district: 'Kandy', province: 'Central' },

  // Matale District
  '21000': { city: 'Matale', district: 'Matale', province: 'Central' },
  '21100': { city: 'Dambulla', district: 'Matale', province: 'Central' },
  '21120': { city: 'Sigiriya', district: 'Matale', province: 'Central' },
  '21200': { city: 'Galewela', district: 'Matale', province: 'Central' },
  '21300': { city: 'Ukuwela', district: 'Matale', province: 'Central' },
  '21400': { city: 'Rattota', district: 'Matale', province: 'Central' },

  // Nuwara Eliya District
  '22000': { city: 'Hatton', district: 'Nuwara Eliya', province: 'Central' },
  '22070': { city: 'Maskeliya', district: 'Nuwara Eliya', province: 'Central' },
  '22080': { city: 'Kotagala', district: 'Nuwara Eliya', province: 'Central' },
  '22100': { city: 'Talawakele', district: 'Nuwara Eliya', province: 'Central' },
  '22200': { city: 'Nuwara Eliya', district: 'Nuwara Eliya', province: 'Central' },
  '22220': { city: 'Nanu Oya', district: 'Nuwara Eliya', province: 'Central' },
  '22280': { city: 'Ragala', district: 'Nuwara Eliya', province: 'Central' },
  '22300': { city: 'Ginigathena', district: 'Nuwara Eliya', province: 'Central' },
  '22310': { city: 'Norton Bridge', district: 'Nuwara Eliya', province: 'Central' },

  // Galle District
  '80000': { city: 'Galle', district: 'Galle', province: 'Southern' },
  '80010': { city: 'Galle Fort', district: 'Galle', province: 'Southern' },
  '80100': { city: 'Karapitiya', district: 'Galle', province: 'Southern' },
  '80200': { city: 'Baddegama', district: 'Galle', province: 'Southern' },
  '80240': { city: 'Hikkaduwa', district: 'Galle', province: 'Southern' },
  '80300': { city: 'Ambalangoda', district: 'Galle', province: 'Southern' },
  '80400': { city: 'Elpitiya', district: 'Galle', province: 'Southern' },
  '80500': { city: 'Bentota', district: 'Galle', province: 'Southern' },
  '80510': { city: 'Induruwa', district: 'Galle', province: 'Southern' },
  '80540': { city: 'Balapitiya', district: 'Galle', province: 'Southern' },
  '80600': { city: 'Unawatuna', district: 'Galle', province: 'Southern' },
  '80650': { city: 'Koggala / Ahangama', district: 'Galle', province: 'Southern' },

  // Matara District
  '81000': { city: 'Matara', district: 'Matara', province: 'Southern' },
  '81100': { city: 'Kamburupitiya', district: 'Matara', province: 'Southern' },
  '81200': { city: 'Dikwella', district: 'Matara', province: 'Southern' },
  '81300': { city: 'Gandara', district: 'Matara', province: 'Southern' },
  '81400': { city: 'Akuressa', district: 'Matara', province: 'Southern' },
  '81500': { city: 'Deniyaya', district: 'Matara', province: 'Southern' },
  '81700': { city: 'Weligama', district: 'Matara', province: 'Southern' },
  '81740': { city: 'Mirissa', district: 'Matara', province: 'Southern' },

  // Hambantota District
  '82000': { city: 'Hambantota', district: 'Hambantota', province: 'Southern' },
  '82100': { city: 'Ambalantota', district: 'Hambantota', province: 'Southern' },
  '82200': { city: 'Tangalle', district: 'Hambantota', province: 'Southern' },
  '82400': { city: 'Beliatta', district: 'Hambantota', province: 'Southern' },
  '82600': { city: 'Tissamaharama', district: 'Hambantota', province: 'Southern' },
  '82615': { city: 'Kirinda', district: 'Hambantota', province: 'Southern' },

  // Jaffna District
  '40000': { city: 'Jaffna', district: 'Jaffna', province: 'Northern' },
  '40030': { city: 'Nallur', district: 'Jaffna', province: 'Northern' },
  '40040': { city: 'Karainagar', district: 'Jaffna', province: 'Northern' },
  '40080': { city: 'Vaddukoddai', district: 'Jaffna', province: 'Northern' },
  '40100': { city: 'Point Pedro', district: 'Jaffna', province: 'Northern' },
  '40200': { city: 'Chavakachcheri', district: 'Jaffna', province: 'Northern' },
  '40270': { city: 'Chunnakam', district: 'Jaffna', province: 'Northern' },
  '40350': { city: 'Velanai', district: 'Jaffna', province: 'Northern' },

  // Kilinochchi, Mannar, Vavuniya, Mullaitivu
  '44000': { city: 'Kilinochchi', district: 'Kilinochchi', province: 'Northern' },
  '41000': { city: 'Mannar', district: 'Mannar', province: 'Northern' },
  '41030': { city: 'Pesalai', district: 'Mannar', province: 'Northern' },
  '41050': { city: 'Talaimannar', district: 'Mannar', province: 'Northern' },
  '43000': { city: 'Vavuniya', district: 'Vavuniya', province: 'Northern' },
  '43050': { city: 'Nedunkeni', district: 'Vavuniya', province: 'Northern' },
  '42000': { city: 'Mullaitivu', district: 'Mullaitivu', province: 'Northern' },
  '42050': { city: 'Puthukkudiyiruppu', district: 'Mullaitivu', province: 'Northern' },

  // Eastern Province (Batticaloa, Ampara, Trincomalee)
  '30000': { city: 'Batticaloa', district: 'Batticaloa', province: 'Eastern' },
  '30100': { city: 'Kattankudy', district: 'Batticaloa', province: 'Eastern' },
  '30300': { city: 'Eravur', district: 'Batticaloa', province: 'Eastern' },
  '30400': { city: 'Valaichchenai', district: 'Batticaloa', province: 'Eastern' },
  '30420': { city: 'Pasikudah', district: 'Batticaloa', province: 'Eastern' },
  '32000': { city: 'Ampara', district: 'Ampara', province: 'Eastern' },
  '32200': { city: 'Sammanthurai', district: 'Ampara', province: 'Eastern' },
  '32300': { city: 'Kalmunai', district: 'Ampara', province: 'Eastern' },
  '32400': { city: 'Akkaraipattu', district: 'Ampara', province: 'Eastern' },
  '32500': { city: 'Pottuvil / Arugam Bay', district: 'Ampara', province: 'Eastern' },
  '31000': { city: 'Trincomalee', district: 'Trincomalee', province: 'Eastern' },
  '31100': { city: 'Kinniya', district: 'Trincomalee', province: 'Eastern' },
  '31200': { city: 'Muttur', district: 'Trincomalee', province: 'Eastern' },
  '31300': { city: 'Kantale', district: 'Trincomalee', province: 'Eastern' },
  '31320': { city: 'Nilaveli', district: 'Trincomalee', province: 'Eastern' },

  // Kurunegala District
  '60000': { city: 'Kurunegala', district: 'Kurunegala', province: 'North Western' },
  '60060': { city: 'Mawathagama', district: 'Kurunegala', province: 'North Western' },
  '60100': { city: 'Narammala', district: 'Kurunegala', province: 'North Western' },
  '60140': { city: 'Giriulla', district: 'Kurunegala', province: 'North Western' },
  '60160': { city: 'Pannala', district: 'Kurunegala', province: 'North Western' },
  '60200': { city: 'Kuliyapitiya', district: 'Kurunegala', province: 'North Western' },
  '60300': { city: 'Polgahawela', district: 'Kurunegala', province: 'North Western' },
  '60400': { city: 'Wariyapola', district: 'Kurunegala', province: 'North Western' },
  '60470': { city: 'Nikaweratiya', district: 'Kurunegala', province: 'North Western' },
  '60500': { city: 'Ibbagamuwa', district: 'Kurunegala', province: 'North Western' },
  '60570': { city: 'Melsiripura', district: 'Kurunegala', province: 'North Western' },
  '60600': { city: 'Galgamuwa', district: 'Kurunegala', province: 'North Western' },

  // Puttalam District
  '61000': { city: 'Chilaw', district: 'Puttalam', province: 'North Western' },
  '61130': { city: 'Dankotuwa', district: 'Puttalam', province: 'North Western' },
  '61140': { city: 'Nattandiya', district: 'Puttalam', province: 'North Western' },
  '61160': { city: 'Marawila', district: 'Puttalam', province: 'North Western' },
  '61170': { city: 'Wennappuwa', district: 'Puttalam', province: 'North Western' },
  '61300': { city: 'Puttalam', district: 'Puttalam', province: 'North Western' },
  '61360': { city: 'Kalpitiya', district: 'Puttalam', province: 'North Western' },
  '61500': { city: 'Anamaduwa', district: 'Puttalam', province: 'North Western' },

  // Anuradhapura District
  '50000': { city: 'Anuradhapura', district: 'Anuradhapura', province: 'North Central' },
  '50100': { city: 'Kekirawa', district: 'Anuradhapura', province: 'North Central' },
  '50150': { city: 'Eppawala', district: 'Anuradhapura', province: 'North Central' },
  '50160': { city: 'Galnewa', district: 'Anuradhapura', province: 'North Central' },
  '50170': { city: 'Tambuttegama', district: 'Anuradhapura', province: 'North Central' },
  '50300': { city: 'Mihintale', district: 'Anuradhapura', province: 'North Central' },
  '50320': { city: 'Medawachchiya', district: 'Anuradhapura', province: 'North Central' },
  '50400': { city: 'Habarana', district: 'Anuradhapura', province: 'North Central' },
  '50500': { city: 'Padaviya', district: 'Anuradhapura', province: 'North Central' },

  // Polonnaruwa District
  '51000': { city: 'Polonnaruwa / Kaduruwela', district: 'Polonnaruwa', province: 'North Central' },
  '51400': { city: 'Hingurakgoda', district: 'Polonnaruwa', province: 'North Central' },
  '51410': { city: 'Minneriya', district: 'Polonnaruwa', province: 'North Central' },
  '51500': { city: 'Medirigiriya', district: 'Polonnaruwa', province: 'North Central' },
  '51550': { city: 'Giritale', district: 'Polonnaruwa', province: 'North Central' },

  // Badulla District
  '90000': { city: 'Badulla', district: 'Badulla', province: 'Uva' },
  '90060': { city: 'Hali Ela', district: 'Badulla', province: 'Uva' },
  '90090': { city: 'Ella', district: 'Badulla', province: 'Uva' },
  '90100': { city: 'Bandarawela', district: 'Badulla', province: 'Uva' },
  '90160': { city: 'Haputale', district: 'Badulla', province: 'Uva' },
  '90200': { city: 'Welimada', district: 'Badulla', province: 'Uva' },
  '90422': { city: 'Diyatalawa', district: 'Badulla', province: 'Uva' },
  '90700': { city: 'Mahiyanganaya', district: 'Badulla', province: 'Uva' },
  '90720': { city: 'Passara', district: 'Badulla', province: 'Uva' },

  // Monaragala District
  '91000': { city: 'Monaragala', district: 'Monaragala', province: 'Uva' },
  '91100': { city: 'Buttala', district: 'Monaragala', province: 'Uva' },
  '91200': { city: 'Wellawaya', district: 'Monaragala', province: 'Uva' },
  '91400': { city: 'Kataragama', district: 'Monaragala', province: 'Uva' },
  '91500': { city: 'Bibile', district: 'Monaragala', province: 'Uva' },
  '91600': { city: 'Siyambalanduwa', district: 'Monaragala', province: 'Uva' },

  // Ratnapura District
  '70000': { city: 'Ratnapura', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70070': { city: 'Pelmadulla', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70100': { city: 'Balangoda', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70150': { city: 'Kaltota', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70200': { city: 'Embilipitiya', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70220': { city: 'Godakawela', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70300': { city: 'Kahawatta', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70400': { city: 'Rakwana', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70500': { city: 'Kuruwita', district: 'Ratnapura', province: 'Sabaragamuwa' },
  '70600': { city: 'Eheliyagoda', district: 'Ratnapura', province: 'Sabaragamuwa' },

  // Kegalle District
  '71000': { city: 'Kegalle', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71100': { city: 'Rambukkana', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71300': { city: 'Ruwanwella', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71400': { city: 'Dehiowita', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71500': { city: 'Mawanella', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71600': { city: 'Warakapola', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71700': { city: 'Kitulgala', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71720': { city: 'Yatiyantota', district: 'Kegalle', province: 'Sabaragamuwa' },
  '71800': { city: 'Deraniyagala', district: 'Kegalle', province: 'Sabaragamuwa' },
};

/**
 * Look up location information by Sri Lankan postal code.
 */
export function lookupPostalCode(postalCode: string | number): PostalLocation | null {
  const code = String(postalCode).trim().padStart(5, '0');
  const found = POSTAL_CODES[code];
  if (found) {
    return {
      postalCode: code,
      city: found.city,
      district: found.district,
      province: found.province,
    };
  }

  // Fallback: estimate district and province from postal code range
  const numCode = parseInt(code, 10);
  if (!isNaN(numCode)) {
    const matchedDistrict = SRI_LANKA_DISTRICTS.find(
      (d) =>
        d.postalCodeRange &&
        numCode >= d.postalCodeRange[0] &&
        numCode <= d.postalCodeRange[1]
    );
    if (matchedDistrict) {
      return {
        postalCode: code,
        city: `${matchedDistrict.name} Area`,
        district: matchedDistrict.name,
        province: matchedDistrict.province,
      };
    }
  }

  return null;
}

/**
 * Returns all districts in a given province.
 */
export function getDistrictsByProvince(provinceName: string): DistrictInfo[] {
  const norm = provinceName.trim().toLowerCase();
  return SRI_LANKA_DISTRICTS.filter(
    (d) => d.province.toLowerCase() === norm
  );
}

/**
 * Searches Sri Lankan cities and postal codes by keyword.
 */
export function searchLocations(query: string): PostalLocation[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: PostalLocation[] = [];
  for (const [code, info] of Object.entries(POSTAL_CODES)) {
    if (
      code.includes(q) ||
      info.city.toLowerCase().includes(q) ||
      info.district.toLowerCase().includes(q) ||
      info.province.toLowerCase().includes(q)
    ) {
      results.push({
        postalCode: code,
        city: info.city,
        district: info.district,
        province: info.province,
      });
    }
  }

  return results;
}
