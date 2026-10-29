# Notice

LankaKit's code is licensed under MIT (see `LICENSE`).

## Postal and location data

The postal data in `src/postal/data.ts` (compiled to `lib/postal/`) comes from
[sri-lanka-postal-locations](https://github.com/hareeshkar/sri-lanka-postal-locations)
by Hareeshkar Ravi (MIT). That project reconciled its postcodes, post-office
names, and district assignments against the following government source:

- Sri Lanka Post, *Postal Code Directory* (2022 edition), including its
  scanned legend and Colombo zone table.
- Sri Lanka Post postcode search (`slpost.gov.lk`), used as a second government source.

Rows that no government source confirmed were excluded. The directory is from
2022, so later postcode changes are not reflected. This package is not
affiliated with or endorsed by Sri Lanka Post.

That dataset is itself derived from two MIT-licensed projects:

- [madurapa/sri-lanka-provinces-districts-cities](https://github.com/madurapa/sri-lanka-provinces-districts-cities), Copyright (c) 2016 Maduka Jayalath.
- [SKIDDOW/SriLankaCitiesDatabase](https://github.com/SKIDDOW/SriLankaCitiesDatabase), Copyright (c) 2024 SKIDDOW.

Their full license texts are reproduced verbatim in
[`THIRD-PARTY-LICENSES.md`](./THIRD-PARTY-LICENSES.md).
