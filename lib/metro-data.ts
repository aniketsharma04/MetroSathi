// =============================================================================
// Delhi Metro Station Data
// =============================================================================

export enum MetroLine {
  Red = "Red",
  Yellow = "Yellow",
  Blue = "Blue",
  BlueBranch = "BlueBranch",
  Green = "Green",
  GreenBranch = "GreenBranch",
  Violet = "Violet",
  Pink = "Pink",
  Magenta = "Magenta",
  Grey = "Grey",
  Orange = "Orange",
  RapidMetro = "RapidMetro",
}

export const MetroLineColor: Record<MetroLine, string> = {
  [MetroLine.Red]: "#EE1C25",
  [MetroLine.Yellow]: "#FFCC00",
  [MetroLine.Blue]: "#0066B3",
  [MetroLine.BlueBranch]: "#0066B3",
  [MetroLine.Green]: "#00A651",
  [MetroLine.GreenBranch]: "#00A651",
  [MetroLine.Violet]: "#800080",
  [MetroLine.Pink]: "#E91E63",
  [MetroLine.Magenta]: "#BB2299",
  [MetroLine.Grey]: "#9E9E9E",
  [MetroLine.Orange]: "#F47B20",
  [MetroLine.RapidMetro]: "#FFD700",
};

export const MetroLineDisplayName: Record<MetroLine, string> = {
  [MetroLine.Red]: "Red Line (Line 1)",
  [MetroLine.Yellow]: "Yellow Line (Line 2)",
  [MetroLine.Blue]: "Blue Line (Line 3)",
  [MetroLine.BlueBranch]: "Blue Line Branch (Line 3A)",
  [MetroLine.Green]: "Green Line (Line 5)",
  [MetroLine.GreenBranch]: "Green Line Branch (Line 5A)",
  [MetroLine.Violet]: "Violet Line (Line 6)",
  [MetroLine.Pink]: "Pink Line (Line 7)",
  [MetroLine.Magenta]: "Magenta Line (Line 8)",
  [MetroLine.Grey]: "Grey Line (Line 9)",
  [MetroLine.Orange]: "Airport Express (Orange Line)",
  [MetroLine.RapidMetro]: "Rapid Metro (Gurugram)",
};

export interface MetroStation {
  id: string;
  name: string;
  line: MetroLine;
  lineColor: string;
  sequenceIndex: number;
  isInterchange: boolean;
  interchangeLines?: MetroLine[];
}

// ---------------------------------------------------------------------------
// Helper to generate station objects
// ---------------------------------------------------------------------------
function createStations(
  line: MetroLine,
  names: string[],
  interchangeMap: Record<string, MetroLine[]> = {}
): MetroStation[] {
  const color = MetroLineColor[line];
  return names.map((name, index) => {
    const interchangeLines = interchangeMap[name];
    return {
      id: `${line}-${index}`,
      name,
      line,
      lineColor: color,
      sequenceIndex: index,
      isInterchange: !!interchangeLines,
      ...(interchangeLines ? { interchangeLines } : {}),
    };
  });
}

// =============================================================================
// RED LINE (Line 1) -- Rithala to Shaheed Sthal (New Bus Adda)
// =============================================================================
const redLineStations = createStations(
  MetroLine.Red,
  [
    "Rithala",
    "Rohini West",
    "Rohini East",
    "Pitampura",
    "Kohat Enclave",
    "Netaji Subhash Place",
    "Keshav Puram",
    "Kanhaiya Nagar",
    "Inderlok",
    "Shastri Nagar",
    "Pratap Nagar",
    "Pulbangash",
    "Tis Hazari",
    "Kashmere Gate",
    "Shastri Park",
    "Seelampur",
    "Welcome",
    "Shahdara",
    "Mansarovar Park",
    "Jhilmil",
    "Dilshad Garden",
    "Shaheed Nagar",
    "Raj Bagh",
    "Rajdhani Park",
    "Shaheed Sthal (New Bus Adda)",
  ],
  {
    "Netaji Subhash Place": [MetroLine.Pink],
    "Inderlok": [MetroLine.Green],
    "Kashmere Gate": [MetroLine.Yellow, MetroLine.Violet, MetroLine.Pink],
    "Welcome": [MetroLine.Pink],
    "Shahdara": [MetroLine.Pink],
    "Mansarovar Park": [MetroLine.Pink],
  }
);

// =============================================================================
// YELLOW LINE (Line 2) -- Samaypur Badli to HUDA City Centre
// =============================================================================
const yellowLineStations = createStations(
  MetroLine.Yellow,
  [
    "Samaypur Badli",
    "Rohini Sector 18-19",
    "Haiderpur Badli Mor",
    "Jahangirpuri",
    "Adarsh Nagar",
    "Azadpur",
    "Model Town",
    "Guru Teg Bahadur Nagar (GTB Nagar)",
    "Vishwavidyalaya",
    "Vidhan Sabha",
    "Civil Lines",
    "Kashmere Gate",
    "Chandni Chowk",
    "Chawri Bazar",
    "New Delhi",
    "Rajiv Chowk",
    "Patel Chowk",
    "Central Secretariat",
    "Udyog Bhawan",
    "Lok Kalyan Marg (Race Course)",
    "Jor Bagh",
    "INA",
    "AIIMS",
    "Green Park",
    "Hauz Khas",
    "Malviya Nagar",
    "Saket",
    "Qutab Minar",
    "Chhattarpur",
    "Sultanpur",
    "Ghitorni",
    "Arjan Garh",
    "Guru Dronacharya",
    "Sikanderpur",
    "MG Road",
    "IFFCO Chowk",
    "HUDA City Centre",
  ],
  {
    "Azadpur": [MetroLine.Pink],
    "Kashmere Gate": [MetroLine.Red, MetroLine.Violet, MetroLine.Pink],
    "New Delhi": [MetroLine.Orange],
    "Rajiv Chowk": [MetroLine.Blue],
    "Central Secretariat": [MetroLine.Violet],
    "INA": [MetroLine.Pink],
    "Hauz Khas": [MetroLine.Magenta],
    "Sikanderpur": [MetroLine.RapidMetro],
  }
);

// =============================================================================
// BLUE LINE (Line 3) -- Dwarka Sector 21 to Noida Electronic City
// =============================================================================
const blueLineStations = createStations(
  MetroLine.Blue,
  [
    "Dwarka Sector 21",
    "Dwarka Sector 8",
    "Dwarka Sector 9",
    "Dwarka Sector 10",
    "Dwarka Sector 11",
    "Dwarka Sector 12",
    "Dwarka Sector 13",
    "Dwarka Sector 14",
    "Dwarka",
    "Dwarka Mor",
    "Nawada",
    "Uttam Nagar West",
    "Uttam Nagar East",
    "Janakpuri West",
    "Janakpuri East",
    "Tilak Nagar",
    "Subhash Nagar",
    "Tagore Garden",
    "Rajouri Garden",
    "Ramesh Nagar",
    "Moti Nagar",
    "Kirti Nagar",
    "Shadipur",
    "Patel Nagar",
    "Rajender Place",
    "Karol Bagh",
    "Jhandewalan",
    "Ramakrishna Ashram Marg",
    "Rajiv Chowk",
    "Barakhamba Road",
    "Mandi House",
    "Pragati Maidan (Supreme Court)",
    "Indraprastha",
    "Yamuna Bank",
    "Akshardham",
    "Mayur Vihar Phase 1",
    "Mayur Vihar Extension",
    "New Ashok Nagar",
    "Noida Sector 15",
    "Noida Sector 16",
    "Noida Sector 18",
    "Botanical Garden",
    "Golf Course",
    "Noida City Centre",
    "Noida Sector 34",
    "Noida Sector 52",
    "Noida Sector 61",
    "Noida Sector 59",
    "Noida Sector 62",
    "Noida Electronic City",
  ],
  {
    "Dwarka Sector 21": [MetroLine.Orange],
    "Dwarka": [MetroLine.Grey],
    "Janakpuri West": [MetroLine.Magenta],
    "Kirti Nagar": [MetroLine.GreenBranch],
    "Rajouri Garden": [MetroLine.Pink],
    "Moti Nagar": [MetroLine.Pink],
    "Rajiv Chowk": [MetroLine.Yellow],
    "Mandi House": [MetroLine.Violet],
    "Yamuna Bank": [MetroLine.BlueBranch],
    "Botanical Garden": [MetroLine.Magenta],
    "Mayur Vihar Phase 1": [MetroLine.Pink],
  }
);

// =============================================================================
// BLUE LINE BRANCH (Line 3A) -- Yamuna Bank to Vaishali
// =============================================================================
const blueBranchStations = createStations(
  MetroLine.BlueBranch,
  [
    "Yamuna Bank",
    "Laxmi Nagar",
    "Nirman Vihar",
    "Preet Vihar",
    "Karkarduma",
    "Anand Vihar ISBT",
    "Kaushambi",
    "Vaishali",
  ],
  {
    "Yamuna Bank": [MetroLine.Blue],
    "Karkarduma": [MetroLine.Pink],
    "Anand Vihar ISBT": [MetroLine.Pink],
  }
);

// =============================================================================
// GREEN LINE (Line 5) -- Brigadier Hoshiyar Singh (Bahadurgarh) to Inderlok
// =============================================================================
const greenLineStations = createStations(
  MetroLine.Green,
  [
    "Brigadier Hoshiyar Singh (Bahadurgarh City)",
    "Bahadurgarh Sector 1",
    "Brig. Hoshiyar Singh (Pandit Shree Ram Sharma)",
    "Tikri Kalan",
    "Tikri Border",
    "Ghevra",
    "Mundka Industrial Area",
    "Mundka",
    "Rajdhani Park",
    "Nangloi Railway Station",
    "Nangloi",
    "Surajmal Stadium",
    "Udyog Nagar",
    "Peera Garhi",
    "Maharaja Surajmal Stadium (Paschim Vihar)",
    "Madipur",
    "Shivaji Park",
    "Punjabi Bagh West",
    "ESI Hospital (Basai Darapur)",
    "Rajouri Garden",
    "Mayapuri",
    "Naraina Vihar",
    "Delhi Cantt",
    "Durgabai Deshmukh South Campus",
    "Sir M. Vishveshwaraya Moti Bagh",
    "Bhikaji Cama Place",
    "Sarojini Nagar",
    "INA",
    "South Extension",
    "Lajpat Nagar",
    "Vinobapuri",
    "Ashram",
    "Hazrat Nizamuddin",
    "Okhla NSIC",
    "Sukhdev Vihar",
    "Jamia Millia Islamia",
    "Okhla Vihar",
    "Jasola Apollo",
    "Sarita Vihar",
    "Mohan Estate",
    "Tughlakabad",
    "Badarpur Border",
    "NHPC Chowk",
    "Mewala Maharajpur",
    "Sector 28 (Faridabad)",
    "Badkal Mor",
    "Old Faridabad",
    "Neelam Chowk Ajronda",
    "Bata Chowk",
    "Escorts Mujesar",
    "Raja Nahar Singh (Ballabhgarh)",
  ],
  {
    "Inderlok": [MetroLine.Red],
    "Ashok Park Main": [MetroLine.GreenBranch],
    "Rajouri Garden": [MetroLine.Blue, MetroLine.Pink],
    "INA": [MetroLine.Yellow, MetroLine.Pink],
    "Lajpat Nagar": [MetroLine.Pink],
  }
);

// =============================================================================
// GREEN LINE BRANCH (Line 5A) -- Mundka to Kirti Nagar (via Inderlok)
// =============================================================================
const greenBranchStations = createStations(
  MetroLine.GreenBranch,
  [
    "Inderlok",
    "Ashok Park Main",
    "Punjabi Bagh",
    "Shivaji Park",
    "Madipur",
    "Paschim Vihar East",
    "Paschim Vihar West",
    "Peera Garhi",
    "Udyog Nagar",
    "Surajmal Stadium",
    "Nangloi",
    "Nangloi Railway Station",
    "Rajdhani Park",
    "Mundka",
    "Mundka Industrial Area",
    "Ghevra",
    "Tikri Border",
    "Tikri Kalan",
    "Brigadier Hoshiyar Singh (Bahadurgarh City)",
  ],
  {
    "Inderlok": [MetroLine.Red],
    "Kirti Nagar": [MetroLine.Blue],
  }
);

// =============================================================================
// VIOLET LINE (Line 6) -- Kashmere Gate to Raja Nahar Singh (Ballabhgarh)
// =============================================================================
const violetLineStations = createStations(
  MetroLine.Violet,
  [
    "Kashmere Gate",
    "Lal Quila (Red Fort)",
    "Jama Masjid",
    "Delhi Gate",
    "ITO",
    "Mandi House",
    "Janpath",
    "Central Secretariat",
    "Khan Market",
    "Jawaharlal Nehru Stadium (JLN Stadium)",
    "Jangpura",
    "Lajpat Nagar",
    "Moolchand",
    "Kailash Colony",
    "Nehru Place",
    "Greater Kailash",
    "Chirag Delhi",
    "Panchsheel Park",
    "Hauz Khas",
    "Masjid Moth",
    "R.K. Puram",
    "Munirka",
    "Vasant Vihar",
    "Shankar Vihar",
    "Terminal 1 IGI Airport",
    "Sadar Bazaar Cantonment",
    "Palam",
    "Dashrath Puri",
    "Dabri Mor - Janakpuri South",
    "Janakpuri West",
  ],
  {
    "Kashmere Gate": [MetroLine.Red, MetroLine.Yellow, MetroLine.Pink],
    "Mandi House": [MetroLine.Blue],
    "Central Secretariat": [MetroLine.Yellow],
    "Lajpat Nagar": [MetroLine.Pink],
    "Hauz Khas": [MetroLine.Magenta],
    "Janakpuri West": [MetroLine.Blue, MetroLine.Magenta],
  }
);

// =============================================================================
// PINK LINE (Line 7) -- Majlis Park to Shiv Vihar
// =============================================================================
const pinkLineStations = createStations(
  MetroLine.Pink,
  [
    "Majlis Park",
    "Azadpur",
    "Shalimar Bagh",
    "Netaji Subhash Place",
    "Shakurpur",
    "Punjabi Bagh West",
    "ESI Hospital (Basai Darapur)",
    "Rajouri Garden",
    "Maya Puri",
    "Naraina Vihar",
    "Delhi Cantt",
    "Durgabai Deshmukh South Campus",
    "Sir M. Vishveshwaraya Moti Bagh",
    "Bhikaji Cama Place",
    "Sarojini Nagar",
    "INA",
    "South Extension",
    "Lajpat Nagar",
    "Vinobapuri",
    "Ashram",
    "Hazrat Nizamuddin",
    "Mayur Vihar Phase 1",
    "Mayur Vihar Pocket 1",
    "Trilokpuri Sanjay Lake",
    "East Vinod Nagar - Mayur Vihar II",
    "Mandawali - West Vinod Nagar",
    "IP Extension",
    "Anand Vihar ISBT",
    "Karkarduma",
    "Karkarduma Court",
    "Krishna Nagar",
    "East Azad Nagar",
    "Welcome",
    "Jaffrabad",
    "Maujpur - Babarpur",
    "Gokulpuri",
    "Johri Enclave",
    "Shiv Vihar",
  ],
  {
    "Azadpur": [MetroLine.Yellow],
    "Netaji Subhash Place": [MetroLine.Red],
    "Rajouri Garden": [MetroLine.Blue, MetroLine.Green],
    "INA": [MetroLine.Yellow, MetroLine.Green],
    "Lajpat Nagar": [MetroLine.Violet, MetroLine.Green],
    "Mayur Vihar Phase 1": [MetroLine.Blue],
    "Anand Vihar ISBT": [MetroLine.BlueBranch],
    "Karkarduma": [MetroLine.BlueBranch],
    "Welcome": [MetroLine.Red],
    "Mansarovar Park": [MetroLine.Red],
  }
);

// =============================================================================
// MAGENTA LINE (Line 8) -- Botanical Garden to Janakpuri West
// =============================================================================
const magentaLineStations = createStations(
  MetroLine.Magenta,
  [
    "Botanical Garden",
    "Okhla Bird Sanctuary",
    "Kalindi Kunj",
    "Jasola Vihar - Shaheen Bagh",
    "Okhla Vihar",
    "Jamia Millia Islamia",
    "Sukhdev Vihar",
    "Okhla NSIC",
    "Govind Puri",
    "Harkesh Nagar Okhla",
    "Nehru Enclave",
    "Greater Kailash",
    "Chirag Delhi",
    "Panchsheel Park",
    "Hauz Khas",
    "IIT Delhi",
    "R.K. Puram",
    "Munirka",
    "Vasant Vihar",
    "Shankar Vihar",
    "Terminal 1 IGI Airport",
    "Sadar Bazaar Cantonment",
    "Palam",
    "Dashrath Puri",
    "Dabri Mor - Janakpuri South",
    "Janakpuri West",
  ],
  {
    "Botanical Garden": [MetroLine.Blue],
    "Hauz Khas": [MetroLine.Yellow],
    "Janakpuri West": [MetroLine.Blue, MetroLine.Violet],
  }
);

// =============================================================================
// GREY LINE (Line 9) -- Dwarka to Dhansa Bus Stand
// =============================================================================
const greyLineStations = createStations(
  MetroLine.Grey,
  [
    "Dwarka",
    "Nangli",
    "Najafgarh",
    "Dhansa Bus Stand",
  ],
  {
    "Dwarka": [MetroLine.Blue],
  }
);

// =============================================================================
// ORANGE LINE (Airport Express) -- New Delhi to Dwarka Sector 21
// =============================================================================
const orangeLineStations = createStations(
  MetroLine.Orange,
  [
    "New Delhi",
    "Shivaji Stadium",
    "Dhaula Kuan",
    "Delhi Aerocity",
    "IGI Airport (T3)",
    "Dwarka Sector 21",
  ],
  {
    "New Delhi": [MetroLine.Yellow],
    "Dwarka Sector 21": [MetroLine.Blue],
  }
);

// =============================================================================
// RAPID METRO (Gurugram) -- Sector 55-56 to Sector 53-54
// =============================================================================
const rapidMetroStations = createStations(
  MetroLine.RapidMetro,
  [
    "Sector 55-56",
    "Sector 54 Chowk",
    "Sector 53-54",
    "Sikanderpur",
    "Phase 1",
    "Phase 2",
    "Phase 3",
    "Moulsari Avenue",
    "Cyber City (DLF)",
    "Belvedere Towers",
    "Micromax (Sector 25A Gurugram)",
    "IndusInd Bank Cyber City",
  ],
  {
    "Sikanderpur": [MetroLine.Yellow],
  }
);

// =============================================================================
// COMBINED DATA
// =============================================================================

/** All stations across all lines, including duplicates for interchange stations */
export const allStations: MetroStation[] = [
  ...redLineStations,
  ...yellowLineStations,
  ...blueLineStations,
  ...blueBranchStations,
  ...greenLineStations,
  ...greenBranchStations,
  ...violetLineStations,
  ...pinkLineStations,
  ...magentaLineStations,
  ...greyLineStations,
  ...orangeLineStations,
  ...rapidMetroStations,
];

/** Stations grouped by line for fast lookup */
const stationsByLine: Record<MetroLine, MetroStation[]> = {
  [MetroLine.Red]: redLineStations,
  [MetroLine.Yellow]: yellowLineStations,
  [MetroLine.Blue]: blueLineStations,
  [MetroLine.BlueBranch]: blueBranchStations,
  [MetroLine.Green]: greenLineStations,
  [MetroLine.GreenBranch]: greenBranchStations,
  [MetroLine.Violet]: violetLineStations,
  [MetroLine.Pink]: pinkLineStations,
  [MetroLine.Magenta]: magentaLineStations,
  [MetroLine.Grey]: greyLineStations,
  [MetroLine.Orange]: orangeLineStations,
  [MetroLine.RapidMetro]: rapidMetroStations,
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all stations on a specific metro line, ordered by sequence index.
 */
export function getStationsOnLine(line: MetroLine): MetroStation[] {
  return stationsByLine[line] ?? [];
}

/**
 * Find station(s) by name. Returns all matching entries (an interchange
 * station will appear once per line it belongs to). The search is
 * case-insensitive and supports partial matching.
 */
export function findStationByName(name: string): MetroStation[] {
  const lower = name.toLowerCase().trim();
  return allStations.filter((s) => s.name.toLowerCase().includes(lower));
}

/**
 * Find a single station with an exact (case-insensitive) name match on a
 * specific line. Useful when you already know the line.
 */
export function findStationExact(
  name: string,
  line?: MetroLine
): MetroStation | undefined {
  const lower = name.toLowerCase().trim();
  return allStations.find(
    (s) =>
      s.name.toLowerCase() === lower && (line === undefined || s.line === line)
  );
}

/**
 * Get the number of stations between two stations on the same line.
 * Returns -1 if the stations are on different lines or not found.
 */
export function getStationDistance(
  station1Name: string,
  station2Name: string
): number {
  const lower1 = station1Name.toLowerCase().trim();
  const lower2 = station2Name.toLowerCase().trim();

  // Try every line to find a line that contains both stations
  for (const line of Object.values(MetroLine)) {
    const lineStations = stationsByLine[line];
    const s1 = lineStations.find((s) => s.name.toLowerCase() === lower1);
    const s2 = lineStations.find((s) => s.name.toLowerCase() === lower2);
    if (s1 && s2) {
      return Math.abs(s1.sequenceIndex - s2.sequenceIndex);
    }
  }

  return -1;
}

/**
 * Get all interchange stations (stations that connect two or more lines).
 */
export function getInterchangeStations(): MetroStation[] {
  return allStations.filter((s) => s.isInterchange);
}

/**
 * Get unique interchange station names.
 */
export function getInterchangeStationNames(): string[] {
  const names = new Set<string>();
  for (const s of allStations) {
    if (s.isInterchange) {
      names.add(s.name);
    }
  }
  return Array.from(names);
}

// =============================================================================
// FLAT STATION NAME LIST (for autocomplete / search)
// =============================================================================

/** Deduplicated, sorted list of all station names for autocomplete. */
export const allStationNames: string[] = Array.from(
  new Set(allStations.map((s) => s.name))
).sort((a, b) => a.localeCompare(b));
