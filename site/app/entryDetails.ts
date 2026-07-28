export type EntryFact = {
  label: string;
  value: string;
  detail: string;
};

export type EntrySection = {
  id: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type EntrySource = {
  title: string;
  organization: string;
  url: string;
  note: string;
};

export type EntryDetail = {
  slug: string;
  scientificName?: string;
  risk: string;
  practicalMeaning: string;
  overviewHeading: string;
  overviewLead: string;
  overviewBody: string;
  safety: {
    label: string;
    title: string;
    body: string;
    link: string;
    linkLabel: string;
  };
  facts: EntryFact[];
  sections: EntrySection[];
  methodTitle: string;
  steps: Array<{ title: string; body: string }>;
  mistakes: Array<{ title: string; body: string; correction: string }>;
  checklist: string[];
  sources: EntrySource[];
  nextReview: string;
  related: string[];
  model: {
    study: string;
    description: string;
    hotspots: [string, string, string];
  };
};

export const entryDetails: Record<string, EntryDetail> = {
  "building-a-basic-campfire": {
    slug: "building-a-basic-campfire",
    risk: "Caution",
    practicalMeaning: "Use a fire only when it is permitted, necessary, controllable, and fully extinguishable.",
    overviewHeading: "A fire is a managed relationship.",
    overviewLead: "A dependable campfire balances heat, fuel, and oxygen. Site choice, preparation, weather, and attention matter more than flame size.",
    overviewBody: "This entry explains a small recreational fire. It never overrides closures, restrictions, land-manager rules, or professional instruction.",
    safety: {
      label: "Safety before method",
      title: "Build a fire only when you should.",
      body: "Check current restrictions with the responsible land agency. Avoid fire in high wind, drought, poor clearance, or whenever complete extinguishment is uncertain.",
      link: "https://www.nifc.gov/fire-information/fire-prevention-education-mitigation/wildfire-prevention",
      linkLabel: "Check official wildfire-prevention guidance",
    },
    facts: [
      { label: "Heat", value: "Ignition", detail: "Enough energy to sustain combustion." },
      { label: "Fuel", value: "Sequence", detail: "Dry material increasing gradually in size." },
      { label: "Oxygen", value: "Airflow", detail: "Open paths through the fire lay." },
    ],
    sections: [
      { id: "materials", kicker: "Preparation", title: "Build the whole material sequence first.", paragraphs: ["Gather tinder, pencil-thin kindling, finger-thick pieces, and larger fuel before ignition. Use only dead and down material where collection is permitted."], bullets: ["Fine, dry tinder accepts the first flame.", "Kindling bridges the flame to larger pieces.", "Fuel wood extends heat only after the structure is stable."] },
      { id: "conditions", kicker: "Place and weather", title: "The site is part of the fire.", paragraphs: ["Prefer an established fire ring when required. Clear nearby combustibles, look above for branches, keep water and a tool ready, and maintain continuous supervision."], bullets: ["Wind can carry heat and embers beyond the ring.", "Organic soil and roots can hold hidden heat.", "Local rules may prohibit gathering or transporting firewood."] },
      { id: "extinguishing", kicker: "Cold means out", title: "Drown, stir, and physically verify.", paragraphs: ["Use water to soak every coal and ash pocket, stir thoroughly, and repeat. Do not leave until the entire area is cold to the touch."], bullets: ["Quiet ash can hide live coals.", "Burying a fire can preserve heat.", "If it is too hot to touch, it is too hot to leave."] },
    ],
    methodTitle: "Five deliberate stages",
    steps: [
      { title: "Check the place", body: "Confirm fires are permitted, choose the smallest suitable site, clear the area, and inspect overhead hazards." },
      { title: "Prepare the sequence", body: "Place dry tinder and stage progressively larger fuel within reach before lighting." },
      { title: "Start small", body: "Ignite from a sheltered side and add fine kindling gradually while preserving air gaps." },
      { title: "Grow with restraint", body: "Add only the fuel the established flame can support and keep the fire smaller than the task requires." },
      { title: "Extinguish completely", body: "Drown, stir, and repeat until every material and the ground beneath it are cold." },
    ],
    mistakes: [
      { title: "Large fuel too early", body: "Heavy pieces absorb heat and smother weak flame.", correction: "Return to smaller, drier material." },
      { title: "Packed too tightly", body: "Combustion weakens when air cannot move.", correction: "Rebuild with visible air gaps." },
      { title: "Trusting quiet ash", body: "Buried coals may remain hot enough to escape.", correction: "Water, stir, and confirm coldness." },
    ],
    checklist: ["Current restrictions checked", "Site and overhead area are clear", "Water and a tool are ready", "Material sequence is prepared", "A responsible adult will supervise continuously", "The fire can be drowned and stirred cold"],
    sources: [
      { title: "Campfire and firewood guidance", organization: "National Park Service", url: "https://www.nps.gov/articles/000/idkt_firewood.htm", note: "Official land-management guidance" },
      { title: "Fire safety", organization: "U.S. Forest Service", url: "https://www.fs.usda.gov/visit/know-before-you-go/fire", note: "Official safety guidance" },
      { title: "Minimize campfire impacts", organization: "Leave No Trace", url: "https://lnt.org/why/7-principles/minimize-campfire-impacts/", note: "Authoritative recreation guidance" },
    ],
    nextReview: "July 2029, or immediately after authoritative change",
    related: ["water-purification", "food-storage", "lightning-safety"],
    model: { study: "Firecraft study 01", description: "A controlled campfire with a stone ring, crossed fuel, ventilated kindling, embers, and layered flame.", hotspots: ["Heat core", "Fuel sequence", "Oxygen path"] },
  },
  "black-bear": {
    slug: "black-bear",
    scientificName: "Ursus americanus",
    risk: "Caution",
    practicalMeaning: "Identify the species, prevent food conditioning, and follow local encounter guidance before entering bear country.",
    overviewHeading: "Color does not identify a black bear.",
    overviewLead: "American black bears may be black, brown, cinnamon, or blond. Body shape, face profile, ears, claws, range, and behavior are more useful than coat color alone.",
    overviewBody: "Black bears occupy much of forested North America and eat a varied diet dominated in many places by plant foods. Wild behavior changes when bears gain access to human food.",
    safety: {
      label: "Wildlife safety",
      title: "Distance and food control prevent most conflict.",
      body: "Never approach or feed a bear. Stay calm, do not run, back away slowly, and follow park-specific guidance. If a black bear attacks and escape is impossible, National Park Service guidance says to fight back rather than play dead.",
      link: "https://home.nps.gov/subjects/bears/safety.htm",
      linkLabel: "Read current National Park Service bear guidance",
    },
    facts: [
      { label: "Scientific name", value: "Ursus americanus", detail: "The American black bear." },
      { label: "Color", value: "Highly variable", detail: "Black, brown, cinnamon, blond, and intermediate coats occur." },
      { label: "Diet", value: "Omnivore", detail: "Plants, insects, carrion, fish, and other foods vary by place and season." },
    ],
    sections: [
      { id: "identification", kicker: "Identification", title: "Read the whole animal.", paragraphs: ["Look for a relatively straight facial profile, tall ears, short curved claws, and no pronounced shoulder hump. Never rely on color by itself."], bullets: ["Adults vary greatly in size.", "Tracks usually show five toes, though not every toe registers.", "A black bear may stand to investigate; standing alone is not a charge."] },
      { id: "ecology", kicker: "Range and behavior", title: "A flexible forest generalist.", paragraphs: ["Black bears use forests, wetlands, mountains, and edges across much of North America. Seasonal food availability strongly shapes movement and activity."], bullets: ["Winter denning varies with climate and food.", "Females with cubs need especially generous space.", "Feeding wildlife changes behavior and can shorten a bear's life."] },
      { id: "conflict", kicker: "Conflict prevention", title: "Keep human food from becoming bear food.", paragraphs: ["Secure food, trash, cookware, and scented items according to local rules. A fed or food-conditioned bear may become persistent and dangerous."], bullets: ["Never store food in a tent.", "Report bold or aggressive behavior to land managers.", "Bear spray rules and recommendations vary by location."] },
    ],
    methodTitle: "A field identification sequence",
    steps: [
      { title: "Create distance", body: "Observe without approaching and keep an escape route open for the bear." },
      { title: "Check structure", body: "Compare face profile, ears, shoulders, rump, and claw length instead of coat color." },
      { title: "Read behavior", body: "Notice whether the bear is feeding, surprised, defensive, curious, or approaching human food." },
      { title: "Apply local guidance", body: "Identify which bear species occur locally and follow current land-manager instructions." },
    ],
    mistakes: [
      { title: "Using color alone", body: "Black bears are not always black.", correction: "Use multiple structural features." },
      { title: "Running", body: "Running can escalate an encounter.", correction: "Stay calm and back away slowly." },
      { title: "Leaving scented items out", body: "A single food reward can condition behavior.", correction: "Secure every scented item immediately." },
    ],
    checklist: ["Local bear species and rules checked", "Food-storage method meets the jurisdiction's rules", "Everyone knows never to run or feed", "Viewing distance will not change the bear's behavior"],
    sources: [
      { title: "Black bears", organization: "National Park Service", url: "https://www.nps.gov/subjects/bears/black-bears.htm", note: "Official biology overview" },
      { title: "Staying safe around bears", organization: "National Park Service", url: "https://home.nps.gov/subjects/bears/safety.htm", note: "Official encounter guidance" },
      { title: "Bear safety: storing food", organization: "National Park Service", url: "https://www.nps.gov/articles/bearsafetyfood.htm", note: "Official food-storage guidance, updated May 2025" },
    ],
    nextReview: "July 2027, or immediately after guidance changes",
    related: ["food-storage", "white-tailed-deer-track", "poison-ivy"],
    model: { study: "Wildlife study 02", description: "A low-poly American black bear showing the straight face profile, tall ears, rounded body, five-toed paws, and lack of a shoulder hump.", hotspots: ["Face profile", "Shoulder line", "Short claws"] },
  },
  "baseplate-compass": {
    slug: "baseplate-compass",
    risk: "Normal",
    practicalMeaning: "A compass turns direction into a repeatable measurement, but only when its anatomy, magnetic limits, and declination are understood.",
    overviewHeading: "The needle finds magnetic north, not your destination.",
    overviewLead: "A baseplate compass combines a magnetized needle, rotating housing, orienting lines, direction-of-travel arrow, index line, and straightedge.",
    overviewBody: "It works without batteries, but metal, magnets, electrical devices, local magnetic anomalies, and uncorrected declination can produce bad bearings.",
    safety: {
      label: "Navigation limit",
      title: "Never depend on one instrument.",
      body: "Carry a suitable map, confirm direction with terrain, and know the current declination. Turn around before uncertainty becomes an emergency.",
      link: "https://www.ncei.noaa.gov/products/world-magnetic-model",
      linkLabel: "Check NOAA's current magnetic model",
    },
    facts: [
      { label: "Needle", value: "Magnetic north", detail: "The marked end aligns with the local magnetic field." },
      { label: "Housing", value: "0–360°", detail: "A rotating scale turns direction into a bearing." },
      { label: "Declination", value: "Place + time", detail: "The angle between magnetic and true north changes." },
    ],
    sections: [
      { id: "anatomy", kicker: "Interactive anatomy", title: "Every line has a job.", paragraphs: ["The direction-of-travel arrow points toward the objective. The index line records the bearing. The orienting arrow and parallel lines align with the needle or map grid."], bullets: ["Use the baseplate edge for map work.", "Read at the index line, not beside the needle.", "Keep the compass level and away from interference."] },
      { id: "declination", kicker: "Magnetic reality", title: "Correct the norths.", paragraphs: ["Magnetic declination is the angle between magnetic north and true north. It varies by location and slowly changes, so old map collars may not be current."], bullets: ["Use a current authoritative calculator.", "Know whether your compass has adjustable declination.", "State whether a bearing is magnetic or true."] },
      { id: "inspection", kicker: "Before the trip", title: "Inspect, compare, and practice.", paragraphs: ["Check the capsule, needle movement, bezel, markings, and baseplate. Compare the compass with a known direction away from metal and electronics."], bullets: ["A large bubble may impede the needle.", "A sticky needle is not field-ready.", "Practice bearings in a controlled area before remote use."] },
    ],
    methodTitle: "Take and follow a simple field bearing",
    steps: [
      { title: "Point", body: "Hold the compass level and aim the direction-of-travel arrow at the objective." },
      { title: "Rotate", body: "Turn the bezel until the orienting arrow sits beneath the north end of the needle." },
      { title: "Read", body: "Read the bearing at the index line and note whether it is magnetic or declination-adjusted." },
      { title: "Travel", body: "Choose a visible landmark on the bearing, walk to it, and repeat while checking terrain." },
    ],
    mistakes: [
      { title: "Reading beside metal", body: "Nearby objects can deflect the needle.", correction: "Move away and compare again." },
      { title: "Ignoring declination", body: "The error compounds with distance.", correction: "Use a current local value." },
      { title: "Following the dial blindly", body: "A precise bearing can still be the wrong bearing.", correction: "Cross-check terrain and map." },
    ],
    checklist: ["Needle moves freely", "Capsule and baseplate are intact", "Current declination is known", "Map and backup navigation method are present", "A practice bearing matches known terrain"],
    sources: [
      { title: "What is declination?", organization: "U.S. Geological Survey", url: "https://www.usgs.gov/faqs/what-declination?page=1", note: "Official geomagnetism explanation" },
      { title: "World Magnetic Model", organization: "NOAA National Centers for Environmental Information", url: "https://www.ncei.noaa.gov/products/world-magnetic-model", note: "Current 2025–2030 model and calculator" },
      { title: "Topographic Map Symbols", organization: "U.S. Geological Survey", url: "https://pubs.usgs.gov/gip/TopographicMapSymbols/topomapsymbols.pdf", note: "Official map reference" },
    ],
    nextReview: "July 2028, or when the magnetic model changes",
    related: ["contour-lines", "lightning-safety", "water-purification"],
    model: { study: "Navigation study 03", description: "A dimensional baseplate compass with transparent plate, rotating bezel, cardinal marks, orienting arrow, and red magnetic needle.", hotspots: ["Magnetic needle", "Rotating bezel", "Travel arrow"] },
  },
  "hypothermia": {
    slug: "hypothermia",
    risk: "Medical",
    practicalMeaning: "Cold, wet, wind, exhaustion, and immersion can outpace heat production—even above freezing.",
    overviewHeading: "Confusion can hide the emergency.",
    overviewLead: "Hypothermia is abnormally low body temperature. Shivering, exhaustion, fumbling, poor coordination, confusion, memory loss, slurred speech, and drowsiness are warning signs.",
    overviewBody: "This page supports recognition and immediate response. It does not replace emergency services, professional care, or certified first-aid training.",
    safety: {
      label: "Medical emergency",
      title: "Act early and get medical help.",
      body: "Move the person to shelter, remove wet clothing, warm the center of the body, and handle severe cases gently. Call emergency services for suspected hypothermia; do not give a drink to an unconscious person.",
      link: "https://www.cdc.gov/winter-weather/prevention/index.html",
      linkLabel: "Read current CDC hypothermia guidance",
    },
    facts: [
      { label: "Early cues", value: "Shiver + stumble", detail: "Fatigue, fumbling, confusion, and poor coordination matter." },
      { label: "Conditions", value: "Cold or wet", detail: "Rain, sweat, and cold water can cause dangerous heat loss." },
      { label: "Priority", value: "Core first", detail: "Shelter, dry layers, gentle handling, and central warming." },
    ],
    sections: [
      { id: "recognition", kicker: "Recognition", title: "Watch behavior, speech, and hands.", paragraphs: ["A person may not recognize their own decline. Treat new confusion, clumsiness, unusual fatigue, or slurred speech in cold conditions as serious."], bullets: ["Shivering may stop in severe hypothermia.", "A severely cold person may appear unresponsive.", "Do not assume an apparently lifeless person cannot be resuscitated."] },
      { id: "prevention", kicker: "Prevention", title: "Stay dry before you try to stay warm.", paragraphs: ["Plan insulation, rain protection, food, pacing, and shelter around the coldest plausible conditions. Change wet layers and reduce wind exposure early."], bullets: ["Cotton loses insulation when wet.", "Exhaustion and inadequate food increase vulnerability.", "Cold-water immersion accelerates heat loss."] },
      { id: "response", kicker: "Immediate response", title: "Shelter, dry, warm the center, evacuate.", paragraphs: ["Replace wet clothing with dry insulation and warm the chest, neck, head, and groin. Use warm nonalcoholic drinks only when the person is fully conscious and can swallow."], bullets: ["Avoid alcohol.", "Handle severe cases gently.", "Follow dispatcher guidance for CPR and continued care."] },
    ],
    methodTitle: "A calm response sequence",
    steps: [
      { title: "Recognize", body: "Connect cold exposure with shivering, fumbling, confusion, slurred speech, drowsiness, or loss of coordination." },
      { title: "Call", body: "Activate emergency services or evacuation support early; suspected hypothermia is a medical emergency." },
      { title: "Shelter and dry", body: "Stop further heat loss, remove wet clothing, insulate from wind and ground, and cover the head and neck." },
      { title: "Warm centrally", body: "Warm the center of the body and monitor breathing and responsiveness while help is coming." },
    ],
    mistakes: [
      { title: "Waiting for severe shivering", body: "Shivering can stop as the condition worsens.", correction: "Act on behavior and coordination changes." },
      { title: "Giving alcohol", body: "Alcohol does not safely correct hypothermia.", correction: "Use warm nonalcoholic fluids only if fully conscious." },
      { title: "Rough handling", body: "Severe hypothermia requires gentle movement.", correction: "Move deliberately and prioritize medical help." },
    ],
    checklist: ["Cold exposure has been stopped", "Emergency help or evacuation is active", "Wet clothing is removed or isolated", "Core, head, and neck are insulated", "Responsiveness and breathing are monitored"],
    sources: [
      { title: "Preventing hypothermia", organization: "Centers for Disease Control and Prevention", url: "https://www.cdc.gov/winter-weather/prevention/index.html", note: "Current public-health guidance" },
      { title: "Cold-related illnesses", organization: "CDC / NIOSH", url: "https://www.cdc.gov/niosh/cold-stress/about/related-illness.html", note: "Recognition and first-aid guidance, updated 2024" },
    ],
    nextReview: "July 2027, or immediately after medical guidance changes",
    related: ["lightning-safety", "water-purification", "building-a-basic-campfire"],
    model: { study: "Safety study 04", description: "A layered human figure showing heat loss from the core to the skin and a wind-exposed outer shell.", hotspots: ["Warm the core", "Protect the head", "Block wind + wet"] },
  },
  "white-tailed-deer-track": {
    slug: "white-tailed-deer-track",
    scientificName: "Odocoileus virginianus",
    risk: "Normal",
    practicalMeaning: "A pointed, two-part hoof print can suggest deer, but substrate, gait, scale, and local lookalikes decide confidence.",
    overviewHeading: "One print is evidence, not certainty.",
    overviewLead: "A typical deer track has two narrow, pointed hoof impressions forming a heart-like shape. Soft ground, speed, age, and overlap can distort that pattern.",
    overviewBody: "White-tailed deer and mule deer tracks can be difficult to separate reliably. Where ranges overlap, track shape alone may support only a broader deer identification.",
    safety: {
      label: "Interpretation limit",
      title: "Use a confidence level, not a forced answer.",
      body: "Photograph the track with scale, note direction and habitat, and follow the trail for repeated evidence. Never handle wildlife, carcasses, or unknown biological material.",
      link: "https://www.nps.gov/places/wildlife-tracks.htm",
      linkLabel: "Compare official National Park Service track examples",
    },
    facts: [
      { label: "Shape", value: "Split + pointed", detail: "Two cloven hoof halves often form a heart-like outline." },
      { label: "Typical length", value: "About 3 in", detail: "Size varies with animal, gait, and substrate." },
      { label: "Lookalike", value: "Feral swine", detail: "Often broader, rounder, and more square-ended." },
    ],
    sections: [
      { id: "anatomy", kicker: "Track anatomy", title: "Read toes, tips, and negative space.", paragraphs: ["The two main hoof halves usually taper forward. The inner gap, print symmetry, and heel edge may be clearer than the overall outline."], bullets: ["Dewclaws may register in deep mud or fast travel.", "A sliding hoof can lengthen the print.", "Snow melt makes tracks appear larger."] },
      { id: "trail", kicker: "Gait pattern", title: "The trail is more reliable than the print.", paragraphs: ["Follow several steps and compare stride, straddle, direction, and repeated shape. A direct-register walk may place a hind hoof near or over a front track."], bullets: ["Walking trails are usually orderly.", "Running spreads and distorts toes.", "Repeated evidence raises confidence."] },
      { id: "context", kicker: "Habitat and sign", title: "Connect tracks to the landscape.", paragraphs: ["Browse, pellets, beds, rubs, scrapes, and travel corridors add context, but each sign has lookalikes and a different lifespan."], bullets: ["Do not age a track from crispness alone.", "Weather and substrate can erase or sharpen edges.", "Avoid disturbing bedding or feeding animals."] },
    ],
    methodTitle: "Document before deciding",
    steps: [
      { title: "Photograph", body: "Take an overhead image with a ruler or known-size object in the same plane." },
      { title: "Measure", body: "Record length, width, direction, substrate, and whether dewclaws registered." },
      { title: "Follow", body: "Look for a sequence of prints and other sign instead of relying on one impression." },
      { title: "Compare locally", body: "Check deer, feral swine, domestic livestock, and other cloven-hoofed animals present in the region." },
    ],
    mistakes: [
      { title: "Certainty from one print", body: "Substrate can invent or erase features.", correction: "Require a trail or supporting sign." },
      { title: "Using size alone", body: "Age, sex, gait, and ground change dimensions.", correction: "Combine size with shape and pattern." },
      { title: "Calling every heart a whitetail", body: "Other deer and swine can overlap in appearance.", correction: "State the narrowest defensible identification." },
    ],
    checklist: ["Scale photo captured", "Length and width recorded", "Direction and substrate noted", "Multiple prints compared", "Local lookalikes considered", "Confidence level stated"],
    sources: [
      { title: "Wildlife tracks", organization: "National Park Service", url: "https://www.nps.gov/places/wildlife-tracks.htm", note: "Official track comparison, updated 2025" },
      { title: "Identifying feral swine", organization: "USDA APHIS", url: "https://direct.aphis.usda.gov/operational-wildlife-activities/feral-swine/identification", note: "Official deer-versus-swine comparison" },
      { title: "White-tailed deer species review", organization: "U.S. Forest Service", url: "https://research.fs.usda.gov/feis/species-reviews/odvi", note: "Taxonomy, range, and habitat reference" },
    ],
    nextReview: "July 2029",
    related: ["black-bear", "brook-trout", "poison-ivy"],
    model: { study: "Tracking study 05", description: "A dimensional pair of split hoof impressions with pointed toes, heel edges, optional dewclaws, and a second step showing travel direction.", hotspots: ["Pointed toes", "Heel edge", "Dewclaws"] },
  },
  "water-purification": {
    slug: "water-purification",
    risk: "Caution",
    practicalMeaning: "Clear-looking water can carry disease-causing organisms; treatment method must match the hazard.",
    overviewHeading: "Treatment is a barrier system.",
    overviewLead: "Boiling is the most reliable way to kill germs. When boiling is not practical, CDC guidance favors filtering and then disinfecting.",
    overviewBody: "Portable filters vary: many remove parasites but not viruses, and some do not remove all bacteria. Boiling or disinfecting cannot make chemical, toxin, salt, or radioactive contamination safe.",
    safety: {
      label: "Water safety",
      title: "Choose another source when chemicals are possible.",
      body: "Do not rely on taste, clarity, boiling, or disinfectant for harmful chemicals, toxins, or radioactive material. Follow every filter and disinfectant label exactly.",
      link: "https://www.cdc.gov/drinking-water/prevention/water-treatment-hiking-camping-traveling.html",
      linkLabel: "Read current CDC backcountry water guidance",
    },
    facts: [
      { label: "Best germ control", value: "Boil", detail: "A rolling boil kills viruses, bacteria, and parasites." },
      { label: "Next best", value: "Filter + disinfect", detail: "Two barriers cover more organisms than either alone." },
      { label: "Not removed", value: "Chemicals", detail: "Use a different source when chemical contamination is suspected." },
    ],
    sections: [
      { id: "hazards", kicker: "Know the hazard", title: "Microbes and chemicals are different problems.", paragraphs: ["Human or animal waste can introduce viruses, bacteria, and parasites. Mining, agriculture, wildfire runoff, algal toxins, and industrial contamination demand different decisions."], bullets: ["Clear water is not proof of safety.", "Upstream activity matters.", "A safer source can be better than more treatment."] },
      { id: "methods", kicker: "Treatment methods", title: "Match the barrier to the organism.", paragraphs: ["Bring clear water to a rolling boil for one minute, or three minutes above 6,500 feet according to CDC guidance. If using products, verify their removal claims and contact time."], bullets: ["Many portable filters remove parasites but not viruses.", "Chemical disinfectants may not kill all parasites.", "Filter-plus-disinfect combines strengths."] },
      { id: "handling", kicker: "Clean handling", title: "Do not recontaminate treated water.", paragraphs: ["Keep dirty-water equipment separate from clean bottle threads, caps, hands, and outlets. Label containers and protect treatment equipment from freezing."], bullets: ["Backflush or maintain filters as directed.", "Freezing can damage some wet filters invisibly.", "Turbid water may need settling or prefiltering."] },
    ],
    methodTitle: "Build a treatment decision",
    steps: [
      { title: "Assess the source", body: "Look upstream, avoid obvious pollution, and prefer moving water from the cleanest available source." },
      { title: "Clarify if needed", body: "Let sediment settle or prefilter cloudy water so treatment can work as intended." },
      { title: "Treat correctly", body: "Boil, or filter then disinfect, using current product instructions and full contact time." },
      { title: "Protect clean water", body: "Avoid dirty-side contact with treated water, bottle threads, and caps." },
    ],
    mistakes: [
      { title: "Trusting clear water", body: "Disease-causing organisms may be invisible.", correction: "Treat uncertain water." },
      { title: "Assuming every filter is a purifier", body: "Removal capability varies by pore size and design.", correction: "Read certified performance claims." },
      { title: "Ignoring chemicals", body: "Germ treatment may concentrate or leave chemicals.", correction: "Choose another source." },
    ],
    checklist: ["Source hazards assessed", "Treatment matches the likely organisms", "Product instructions and contact time are known", "Dirty and clean parts stay separated", "A backup treatment method is carried"],
    sources: [
      { title: "Water treatment when hiking, camping, or traveling", organization: "Centers for Disease Control and Prevention", url: "https://www.cdc.gov/drinking-water/prevention/water-treatment-hiking-camping-traveling.html", note: "Current official guidance, updated January 2025" },
      { title: "Emergency disinfection of drinking water", organization: "U.S. Environmental Protection Agency", url: "https://www.epa.gov/ground-water-and-drinking-water/emergency-disinfection-drinking-water", note: "Official emergency treatment reference" },
    ],
    nextReview: "July 2027, or immediately after health guidance changes",
    related: ["building-a-basic-campfire", "hypothermia", "food-storage"],
    model: { study: "Water study 06", description: "A cutaway treatment system showing dirty water, a filter barrier, disinfection stage, and protected clean container.", hotspots: ["Source water", "Filter barrier", "Clean side"] },
  },
  "lightning-safety": {
    slug: "lightning-safety",
    risk: "Lethal risk",
    practicalMeaning: "If you can hear thunder, move immediately toward a substantial building or hard-topped enclosed vehicle.",
    overviewHeading: "There is no safe place outside in a thunderstorm.",
    overviewLead: "The safest decision happens before the storm arrives: check the forecast, identify real shelter, set turnaround triggers, and leave exposed terrain early.",
    overviewBody: "Small shelters, tents, isolated trees, rocky overhangs, and open-sided structures are not safe lightning shelters.",
    safety: {
      label: "Immediate action",
      title: "When thunder roars, go indoors.",
      body: "Leave ridges, summits, open water, and exposed areas. Seek a substantial building or a hard-topped enclosed vehicle. Wait at least 30 minutes after the last thunder before resuming activity.",
      link: "https://www.weather.gov/safety/lightning-outdoors",
      linkLabel: "Read current National Weather Service outdoor guidance",
    },
    facts: [
      { label: "Trigger", value: "Hear thunder", detail: "You are close enough to be struck." },
      { label: "Safe place", value: "Building or vehicle", detail: "Substantial enclosed shelter or hard-topped enclosed vehicle." },
      { label: "Resume", value: "30 minutes", detail: "Wait after the last thunder." },
    ],
    sections: [
      { id: "planning", kicker: "Before activity", title: "Choose the shelter before you need it.", paragraphs: ["Check the forecast and current radar, identify evacuation time, and establish who will call the stop. Remote terrain may require turning around before the first thunder."], bullets: ["A plan needs a trigger, destination, and decision-maker.", "Weather can build behind terrain.", "A phone forecast does not replace observation."] },
      { id: "shelter", kicker: "Safe shelter", title: "A roof alone is not protection.", paragraphs: ["A substantial building with wiring and plumbing provides strong protection. A hard-topped enclosed metal vehicle with windows closed is the standard alternative."], bullets: ["Tents and picnic shelters are not safe.", "Do not shelter under an isolated tree.", "Stay away from windows, wiring, and plumbing indoors."] },
      { id: "victim", kicker: "After a strike", title: "A lightning victim does not carry a charge.", paragraphs: ["Call emergency services immediately. It is safe to touch the person; follow dispatcher guidance, begin CPR or use an AED if needed and trained, and move to safer shelter if possible."], bullets: ["Multiple victims are possible.", "Breathing or cardiac arrest needs immediate care.", "Monitor until help arrives."] },
    ],
    methodTitle: "A lightning decision sequence",
    steps: [
      { title: "Plan", body: "Check weather and name the substantial building or enclosed vehicle before starting." },
      { title: "Leave early", body: "Turn around when skies threaten; do not wait for rain or a nearby strike." },
      { title: "Shelter", body: "Get inside, close windows, and avoid conductive systems until the storm has passed." },
      { title: "Wait", body: "Remain sheltered for at least 30 minutes after the last thunder." },
    ],
    mistakes: [
      { title: "Waiting under a tree", body: "An isolated tree is not safe shelter.", correction: "Move to a building or enclosed vehicle." },
      { title: "Trusting a tent", body: "Fabric and poles do not create safe shelter.", correction: "Plan an evacuation destination." },
      { title: "Leaving after the rain", body: "Lightning can persist after precipitation ends.", correction: "Wait 30 minutes after last thunder." },
    ],
    checklist: ["Forecast and alerts checked", "Safe shelter identified", "Evacuation time understood", "Group stop trigger agreed", "Everyone knows the 30-minute wait rule"],
    sources: [
      { title: "Lightning outdoors", organization: "National Weather Service", url: "https://www.weather.gov/safety/lightning-outdoors", note: "Official outdoor lightning guidance" },
      { title: "Lightning safety and outdoor activities", organization: "National Weather Service", url: "https://www.weather.gov/safety/lightning-sports", note: "Planning, shelter, response, and 30-minute guidance" },
    ],
    nextReview: "July 2027, or immediately after official guidance changes",
    related: ["hypothermia", "contour-lines", "baseplate-compass"],
    model: { study: "Weather study 07", description: "A storm cloud, exposed ridge, branching lightning channel, safe shelter zone, and thirty-minute timing ring.", hotspots: ["Storm base", "Exposed ridge", "Safe shelter"] },
  },
  "fixed-blade-knife": {
    slug: "fixed-blade-knife",
    risk: "Caution",
    practicalMeaning: "A fixed blade is a cutting tool, not a pry bar, screwdriver, throwing implement, or substitute for skill.",
    overviewHeading: "Control the edge, the work, and everything beyond it.",
    overviewLead: "The safest cut uses the right tool, an inspected knife, stable footing, secured material, a clear path, and deliberate force.",
    overviewBody: "Blade shape, edge geometry, tang, handle, guard, sheath, steel, and heat treatment affect use and maintenance. No design removes the need for safe handling.",
    safety: {
      label: "Sharp-tool safety",
      title: "Keep body parts out of the cutting path.",
      body: "Use the proper tool, inspect it before use, secure the work, maintain balance, cut away from yourself when possible, and sheath the knife before moving.",
      link: "https://www.osha.gov/hand-power-tools",
      linkLabel: "Review OSHA hand-tool safety principles",
    },
    facts: [
      { label: "Blade", value: "Cutting geometry", detail: "Profile, grind, bevel, edge, spine, and point." },
      { label: "Tang", value: "Load path", detail: "The portion of blade steel extending into the handle." },
      { label: "Sheath", value: "Edge control", detail: "Retention and protection when the knife is not in use." },
    ],
    sections: [
      { id: "anatomy", kicker: "Interactive anatomy", title: "Form follows the cut.", paragraphs: ["The edge performs the cut; the bevel supports it; the spine provides thickness; the tang transfers force; the handle controls orientation; the sheath controls storage."], bullets: ["A guard can reduce forward slip but cannot replace grip.", "A fine edge cuts efficiently but may be less durable.", "Pointed tips demand extra path control."] },
      { id: "selection", kicker: "Neutral selection", title: "Choose around the actual task.", paragraphs: ["Prioritize fit, secure grip, appropriate blade length, serviceable steel, visible condition, and a sheath with dependable retention."], bullets: ["Bigger is not automatically safer or more capable.", "Local carry laws vary.", "Specialized chopping, prying, and food tasks may need other tools."] },
      { id: "maintenance", kicker: "Maintenance", title: "A clean, controlled edge is easier to use.", paragraphs: ["Keep the blade clean and dry, sharpen with a repeatable angle, remove burrs, inspect the handle and sheath, and protect steel according to its corrosion resistance."], bullets: ["Dull edges can require dangerous force.", "Sharpen away from uncontrolled contact.", "Retire damaged handles, loose guards, or unsafe sheaths."] },
    ],
    methodTitle: "Prepare for a controlled cut",
    steps: [
      { title: "Inspect", body: "Check the edge, tip, handle, tang area, and sheath for damage or contamination." },
      { title: "Set the work", body: "Use stable footing and a firm surface; keep people outside the full cutting arc." },
      { title: "Plan the path", body: "Know where the edge will travel if it slips or exits the material." },
      { title: "Cut and secure", body: "Use deliberate force, stop if control changes, then clean and sheath the knife before moving." },
    ],
    mistakes: [
      { title: "Holding work in the hand", body: "A slip sends the edge into the supporting hand.", correction: "Use a stable cutting surface." },
      { title: "Using it as a pry bar", body: "Side load can break blade or tip.", correction: "Use the proper lever or tool." },
      { title: "Leaving it exposed", body: "An unattended edge becomes a hidden hazard.", correction: "Sheath immediately after use." },
    ],
    checklist: ["Knife and sheath are undamaged", "Task suits the tool", "Work is stable", "Cutting path is clear", "Bystanders are outside the arc", "Knife is cleaned and sheathed after use"],
    sources: [
      { title: "Hand and power tools", organization: "Occupational Safety and Health Administration", url: "https://www.osha.gov/hand-power-tools", note: "Official general tool-safety principles" },
      { title: "Cuts and lacerations", organization: "Occupational Safety and Health Administration", url: "https://www.osha.gov/etools/poultry-processing/plant-wide-hazards/cuts-lacerations", note: "Official cutting-tool hazard controls" },
      { title: "Handtools for trail work", organization: "U.S. Forest Service", url: "https://www.fs.usda.gov/t-d/pubs/pdfpubs/pdf05232810/pdf05232810dpi300.pdf", note: "Official hand-tool use and maintenance manual" },
    ],
    nextReview: "July 2028, or when standards change",
    related: ["building-a-basic-campfire", "food-storage", "water-purification"],
    model: { study: "Tools study 08", description: "A fixed-blade knife exploded into blade, bevel, spine, tang, handle scales, fasteners, guard, and sheath.", hotspots: ["Edge + bevel", "Full tang", "Sheath retention"] },
  },
  "brook-trout": {
    slug: "brook-trout",
    scientificName: "Salvelinus fontinalis",
    risk: "Normal",
    practicalMeaning: "Brook trout are native North American char associated with cold, clean, oxygen-rich water.",
    overviewHeading: "A trout by name, a char by lineage.",
    overviewLead: "Look for pale spots on a darker body, worm-like vermiculations across the back, and lower fins edged in bright white with a darker line behind.",
    overviewBody: "Color changes with water, season, sex, age, and stress. Use a group of traits rather than one vivid marking.",
    safety: {
      label: "Fishing and handling",
      title: "Regulations and best handling practices are local.",
      body: "Confirm license, season, size, possession, bait, tackle, and water-specific rules with the responsible agency. Wet hands, minimize air exposure, and release fish promptly where required.",
      link: "https://www.fws.gov/species/brook-trout-salvelinus-fontinalis",
      linkLabel: "Open the U.S. Fish & Wildlife Service species profile",
    },
    facts: [
      { label: "Scientific name", value: "Salvelinus fontinalis", detail: "A member of the char genus." },
      { label: "Water", value: "Cold + clean", detail: "Streams, ponds, and lakes with suitable oxygen and spawning gravel." },
      { label: "Fin cue", value: "White edge", detail: "Lower fins often have a white leading edge and dark band." },
    ],
    sections: [
      { id: "identification", kicker: "Identification", title: "Light marks on a dark body.", paragraphs: ["Brook trout usually show olive to dark backs with pale vermiculations, pale or reddish side spots often surrounded by blue halos, and white-edged lower fins."], bullets: ["The tail is usually square or only slightly forked.", "Lake trout have a more deeply forked tail.", "Brown trout usually show dark spots on a lighter background."] },
      { id: "habitat", kicker: "Habitat and range", title: "Cold water sets the boundary.", paragraphs: ["Native populations occur in eastern North America, with introduced populations elsewhere. Groundwater-fed streams, cold lakes, cover, and clean spawning gravel support populations."], bullets: ["Warm water can limit survival.", "Barriers can isolate populations.", "Introductions may affect native fish communities."] },
      { id: "ecology", kicker: "Life history", title: "Small water, complex life.", paragraphs: ["Young brook trout feed on plankton and aquatic invertebrates; larger fish may eat insects, fish, and other prey. Spawning typically occurs over gravel where groundwater or flow supplies oxygen."], bullets: ["Timing varies with latitude and water temperature.", "Sea-run and lake-run forms occur in some regions.", "Conservation status varies by watershed."] },
    ],
    methodTitle: "Identify before handling decisions",
    steps: [
      { title: "Check pattern direction", body: "Confirm pale markings on a darker body rather than dark spots on a pale body." },
      { title: "Inspect lower fins", body: "Look for the white leading edge and contrasting darker band." },
      { title: "Compare tail and spots", body: "Use tail fork, vermiculation, spot color, and halos together." },
      { title: "Verify local species", body: "Consult the current regional fish key and regulations before keeping any fish." },
    ],
    mistakes: [
      { title: "Using color alone", body: "Stress and spawning condition change intensity.", correction: "Use pattern, fins, and tail together." },
      { title: "Calling every char a brook trout", body: "Other Salvelinus species can overlap.", correction: "Compare local char species." },
      { title: "Assuming rules are statewide", body: "Special water rules are common.", correction: "Check the exact water body." },
    ],
    checklist: ["Pale-on-dark pattern confirmed", "Lower fin edges checked", "Tail shape compared", "Local species list consulted", "Current water-specific regulations checked"],
    sources: [
      { title: "Brook trout species profile", organization: "U.S. Fish & Wildlife Service", url: "https://www.fws.gov/species/brook-trout-salvelinus-fontinalis", note: "Official taxonomy and biology" },
      { title: "Brook trout", organization: "New York State Department of Environmental Conservation", url: "https://dec.ny.gov/nature/animals-fish-plants/brook-trout", note: "Official regional identification and ecology" },
    ],
    nextReview: "July 2029, sooner for conservation changes",
    related: ["water-purification", "white-tailed-deer-track", "poison-ivy"],
    model: { study: "Fishing study 09", description: "A low-poly brook trout with pale vermiculation, haloed red spots, white-edged lower fins, and a lightly forked tail.", hotspots: ["Vermiculation", "Haloed spots", "White fin edge"] },
  },
  "contour-lines": {
    slug: "contour-lines",
    risk: "Normal",
    practicalMeaning: "Contour lines turn three-dimensional terrain into a measurable two-dimensional pattern.",
    overviewHeading: "Every contour connects equal elevation.",
    overviewLead: "Spacing shows steepness, shape shows landform, index labels provide elevation, and the contour interval tells how much vertical change separates adjacent lines.",
    overviewBody: "Contours describe terrain, not surface difficulty. Vegetation, cliffs, snow, water, private land, and map age can make a mathematically gentle route impractical.",
    safety: {
      label: "Navigation limit",
      title: "A map is a model, not the ground.",
      body: "Confirm the map edition, scale, contour interval, datum, current closures, and real terrain. Turn back when the route no longer matches the evidence.",
      link: "https://www.usgs.gov/faqs/what-a-topographic-map",
      linkLabel: "Read the USGS topographic map explanation",
    },
    facts: [
      { label: "One line", value: "Equal elevation", detail: "Every point on a contour shares an elevation." },
      { label: "Close spacing", value: "Steeper", detail: "More vertical change across less horizontal distance." },
      { label: "Wide spacing", value: "Gentler", detail: "Less vertical change across more horizontal distance." },
    ],
    sections: [
      { id: "interval", kicker: "Map frame", title: "Read the interval before the terrain.", paragraphs: ["The contour interval states vertical difference between adjacent lines. Index contours are heavier and labeled; intermediate contours divide the elevation between them."], bullets: ["Never assume every map uses the same interval.", "Scale changes the ground distance represented.", "Supplementary contours may use a different pattern."] },
      { id: "forms", kicker: "Landforms", title: "Recognize the pattern family.", paragraphs: ["Closed loops usually indicate hills or depressions. Contours crossing a valley often form a V pointing uphill. Ridges produce the opposing pattern extending downhill."], bullets: ["A saddle is a low point between higher ground.", "Even spacing suggests a consistent slope.", "Very tight spacing may indicate cliffs or severe terrain."] },
      { id: "route", kicker: "Route reading", title: "Translate lines into effort and exposure.", paragraphs: ["Count intervals for elevation gain, inspect the steepest segment, identify handrails and catching features, and compare the map with visible terrain throughout travel."], bullets: ["A short line on the map may hide major gain.", "Descending the wrong ridge can compound error.", "Water crossings and vegetation need separate evaluation."] },
    ],
    methodTitle: "Turn a route into terrain",
    steps: [
      { title: "Read the frame", body: "Identify scale, contour interval, north, datum, map date, and legend." },
      { title: "Trace the route", body: "Mark start, finish, decision points, water crossings, and steep segments." },
      { title: "Count elevation", body: "Use index labels and intervals to estimate total ascent and descent." },
      { title: "Name the forms", body: "Identify valleys, ridges, saddles, summits, and catching features before moving." },
    ],
    mistakes: [
      { title: "Reading V shapes backward", body: "Valley contours typically point uphill.", correction: "Confirm with drainage direction." },
      { title: "Ignoring interval", body: "The same visual spacing can represent different relief.", correction: "Read the map frame first." },
      { title: "Equating gentle with easy", body: "Vegetation and water may dominate travel.", correction: "Evaluate every terrain layer." },
    ],
    checklist: ["Scale and contour interval read", "Map date and datum checked", "Elevation gain estimated", "Major landforms named", "Catching features identified", "Route compared with current conditions"],
    sources: [
      { title: "What is a topographic map?", organization: "U.S. Geological Survey", url: "https://www.usgs.gov/faqs/what-a-topographic-map", note: "Official contour definition and map overview" },
      { title: "Topographic Map Symbols", organization: "U.S. Geological Survey", url: "https://pubs.usgs.gov/gip/TopographicMapSymbols/topomapsymbols.pdf", note: "Official map-reading reference" },
    ],
    nextReview: "July 2031",
    related: ["baseplate-compass", "lightning-safety", "water-purification"],
    model: { study: "Navigation study 10", description: "A three-dimensional valley and ridge with stacked contour slices projected onto a flat topographic plane.", hotspots: ["Index contour", "Valley V", "Steep slope"] },
  },
  "food-storage": {
    slug: "food-storage",
    risk: "Caution",
    practicalMeaning: "Every scented item is part of the food system, and the correct storage method is set by the local land manager.",
    overviewHeading: "Protect people by denying the first reward.",
    overviewLead: "Bears learn quickly. Food, trash, cookware, toiletries, sunscreen, pet food, fuel, and other scented items can all attract wildlife.",
    overviewBody: "Storage rules differ by park and ecosystem. Some places require lockers or certified canisters; others permit specific hangs. A method that is legal in one location may fail or be prohibited in another.",
    safety: {
      label: "Bear-country rule",
      title: "Check the exact jurisdiction before packing.",
      body: "Use the required locker, certified container, pole, or approved hang. Never store food or scented items in a tent, and never try to recover food from a bear.",
      link: "https://www.nps.gov/articles/bearsafetyfood.htm",
      linkLabel: "Read National Park Service food-storage guidance",
    },
    facts: [
      { label: "Store", value: "All scented items", detail: "Food, trash, toiletries, cookware, and more." },
      { label: "Best method", value: "Locally required", detail: "Rules vary with animals, habitat, and management." },
      { label: "Container", value: "Locked", detail: "Bear-resistant products work only when closed and used correctly." },
    ],
    sections: [
      { id: "inventory", kicker: "Scent inventory", title: "If it smells, manage it.", paragraphs: ["Food is only the beginning. Include wrappers, dishes, toothpaste, cosmetics, sunscreen, insect repellent, pet items, garbage, and anything carrying grease or crumbs."], bullets: ["Clean vehicle crumbs and child seats.", "Keep day-hike food attended.", "Pack out all food waste."] },
      { id: "systems", kicker: "Storage systems", title: "Follow the place, then the product.", paragraphs: ["Use provided lockers first where required. Pack certified bear-resistant containers according to their instructions and keep them locked whenever food is not actively in use."], bullets: ["Do not attach a carrying rope to a canister in storage.", "Place canisters on level ground away from cliffs and water.", "Hangs require suitable trees and local permission."] },
      { id: "camp", kicker: "Camp discipline", title: "Storage is a continuous behavior.", paragraphs: ["Secure scented items immediately on arrival, cook and clean deliberately, and never leave storage open while the group is distracted."], bullets: ["Do not burn scraps or grease.", "Do not leave coolers outside overnight.", "Report wildlife that obtains human food."] },
    ],
    methodTitle: "Build a complete storage system",
    steps: [
      { title: "Check rules", body: "Read the current land-manager requirements for the exact campground, trail, and season." },
      { title: "Inventory scent", body: "List food, waste, cookware, toiletries, pet items, and other attractants." },
      { title: "Pack the required system", body: "Verify capacity, certification where required, closure, and group compliance." },
      { title: "Use it continuously", body: "Secure items whenever they are not in direct use and clean the area before leaving." },
    ],
    mistakes: [
      { title: "Food only", body: "Toiletries and trash can be equally attractive.", correction: "Store every scented item." },
      { title: "Open canister nearby", body: "A bear-resistant product is not resistant while open.", correction: "Lock it between uses." },
      { title: "Assuming a hang is universal", body: "Rules and tree conditions vary.", correction: "Use the locally approved method." },
    ],
    checklist: ["Exact local rules checked", "Every scented item inventoried", "Required container or locker available", "Capacity is sufficient", "Everyone knows the routine", "Waste will be packed out"],
    sources: [
      { title: "Bear safety: storing food", organization: "National Park Service", url: "https://www.nps.gov/articles/bearsafetyfood.htm", note: "Official food-storage guidance, updated May 2025" },
      { title: "Bear-resistant products", organization: "Interagency Grizzly Bear Committee", url: "https://igbconline.org/programs/bear-resistant-products/", note: "Testing program and certified-product list" },
      { title: "Staying safe around bears", organization: "National Park Service", url: "https://home.nps.gov/subjects/bears/safety.htm", note: "Official bear-conflict guidance" },
    ],
    nextReview: "July 2027, or immediately after local-rule changes",
    related: ["black-bear", "building-a-basic-campfire", "water-purification"],
    model: { study: "Camping study 11", description: "An exploded bear-resistant canister with lid locks, scent inventory, closed storage state, and safe placement zone.", hotspots: ["Locking lid", "Scent inventory", "Level placement"] },
  },
  "poison-ivy": {
    slug: "poison-ivy",
    scientificName: "Toxicodendron radicans complex",
    risk: "Caution",
    practicalMeaning: "Learn the variable three-leaflet pattern, avoid contact, and remember that urushiol can transfer from tools, clothing, pets, and smoke.",
    overviewHeading: "Three leaflets are a warning, not a complete identification.",
    overviewLead: "Poison ivy grows as a vine, trailing plant, or shrub. Leaf color, gloss, tooth pattern, and size vary by season, habitat, and individual plant.",
    overviewBody: "The rash is an allergic response to urushiol oil. Blister fluid does not spread the rash, but oil remaining on skin or objects can cause new exposure.",
    safety: {
      label: "Exposure and smoke",
      title: "Never burn suspected poison ivy.",
      body: "Smoke can carry irritating plant material and cause severe respiratory problems. After possible contact, promptly wash skin, nails, tools, and clothing. Seek urgent help for trouble breathing or severe facial or throat swelling.",
      link: "https://www.cdc.gov/niosh/docs/2010-118/default.html",
      linkLabel: "Read CDC/NIOSH poisonous-plant guidance",
    },
    facts: [
      { label: "Leaf pattern", value: "Three leaflets", detail: "The center leaflet often has a longer stalk." },
      { label: "Growth form", value: "Vine or shrub", detail: "Form varies by region and habitat." },
      { label: "Irritant", value: "Urushiol", detail: "Oil transfers by direct or indirect contact." },
    ],
    sections: [
      { id: "identification", kicker: "Identification", title: "Compare the whole cluster.", paragraphs: ["A poison ivy leaf is compound, usually with three leaflets. The center leaflet often projects on a longer stalk, while side leaflets attach more closely and may have asymmetric bases."], bullets: ["Margins may be smooth, toothed, or lobed.", "Leaves may be dull or glossy.", "Color can shift from red to green to yellow or orange."] },
      { id: "lookalikes", kicker: "Lookalikes", title: "Do not identify from leaflet count alone.", paragraphs: ["Boxelder seedlings, Virginia creeper, fragrant sumac, and other plants can overlap in one or more traits. Compare attachment, stalk length, vine habit, buds, berries, and local range."], bullets: ["Virginia creeper usually has five leaflets.", "Boxelder leaves are opposite on the stem.", "A partial plant may not support a confident identification."] },
      { id: "exposure", kicker: "Exposure response", title: "Remove oil before treating irritation.", paragraphs: ["After possible contact, promptly rinse and wash using appropriate cleanser and plenty of water, including beneath nails. Clean clothing and tools separately while avoiding new skin contact."], bullets: ["Do not burn the plant.", "Blister fluid is not contagious.", "Severe rash, face or genital involvement, or breathing symptoms need medical care."] },
    ],
    methodTitle: "A safer identification sequence",
    steps: [
      { title: "Stop before touch", body: "Observe without handling and keep tools, clothing, children, and pets away." },
      { title: "Count and compare", body: "Confirm the three-leaflet compound leaf, center stalk, side-leaflet bases, and attachment." },
      { title: "Check growth form", body: "Look for trailing stems, a shrub, or a climbing vine with aerial rootlets." },
      { title: "Use local references", body: "Compare regional lookalikes and state the identification as probable when features are incomplete." },
    ],
    mistakes: [
      { title: "Touching to check texture", body: "Direct contact can transfer urushiol.", correction: "Use sight and a local field key." },
      { title: "Trusting one slogan", body: "Many harmless plants have three leaflets.", correction: "Compare multiple features." },
      { title: "Burning the vine", body: "Smoke can create serious respiratory exposure.", correction: "Use trained, locally approved removal methods." },
    ],
    checklist: ["Plant observed without contact", "Leaflet attachment and stalks compared", "Growth form recorded", "Regional lookalikes checked", "Possible exposures washed promptly", "Suspected plants will not be burned"],
    sources: [
      { title: "Protecting yourself from poisonous plants", organization: "CDC / NIOSH", url: "https://www.cdc.gov/niosh/docs/2010-118/default.html", note: "Official exposure, first-aid, and prevention guidance" },
      { title: "Outdoor workers and poisonous plant exposures", organization: "CDC / NIOSH", url: "https://www.cdc.gov/niosh/blogs/2022/poisonous-plants.html", note: "Identification limits and exposure prevention" },
    ],
    nextReview: "July 2028, or immediately after health guidance changes",
    related: ["black-bear", "white-tailed-deer-track", "brook-trout"],
    model: { study: "Botany study 12", description: "A poison ivy vine with two separate three-leaflet clusters, longer center stalks, asymmetrical side leaflets, and aerial rootlets.", hotspots: ["Center stalk", "Three leaflets", "Aerial rootlets"] },
  },
};
