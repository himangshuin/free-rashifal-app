# Rashifal (ৰাশিফল)
Static app, no build step. Deploy the folder on GitHub Pages (or run `python3 -m http.server`).
- index.html, css/style.css
- js/gochar-data.js : Gochar rules from Jyotish Darpan ch.13 (results per house, vedha pairs, weights, theme texts in Assamese/English)
- js/engine.js : ephemeris interpolation, ingress detection, Gochar scoring, lagna, natal contacts
- js/chart.js : East/North/South Indian chart drawer (from astrotest-main)
- js/app.js : tabs and UI
- data/eph.bin : Sun..Ketu daily sidereal longitudes + ayanamsha, 1930-01-01..2061-01-09 (from astrotest-main data/ephemeris.csv, int32 little-endian, 10 values/row)
- data/places.csv : birth places (from astrotest-main)
