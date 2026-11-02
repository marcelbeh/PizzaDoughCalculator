# Ciao! — Modern Italian Premium / Classico

The shared theme is `classico.css`. Its five brand tokens are Basilico (#1B5E20), Pomodoro (#D32F2F), Crema (#F9F5EA), Oro (#D4A038), and Carbone (#1F1F1F). Oro is decorative; smaller gold text uses a darker companion for readability. The existing page styles reference semantic aliases so navigation, forms, recipes, planning, monitor, baking, Academy, and dialogs share the palette.

`logo.svg` is the path-based green/red lockup for light surfaces; `logo-dark.svg` is the cream/red lockup for dark surfaces. Neither depends on installed fonts. `icon.svg` is the master for the 180px Apple icon and 192/512px PWA icons. The 512px artwork stays inside the central maskable safe region.

Inter (400–800) and Playfair Display (500–700) are self-hosted as Latin/Latin Extended WOFF subsets. Their OFL licenses are included in `assets/fonts`. Font subsetting and asset generation are development operations; the app has no new runtime dependencies. System fonts remain as fallbacks.

The service worker retains its existing strategy and uses a new cache version plus the branding/font assets for offline use. Application scripts, calculations, local-storage keys, and data structures are unchanged. The historical preview pages use the same theme. Existing external recipe photos still require a network connection on first use.

Before release, check the PR visually on a physical iPhone, including Home Screen installation and Safari date/time controls. Automated Chromium checks complement this but do not replace native Safari testing. Merge and production publication require explicit owner approval.
