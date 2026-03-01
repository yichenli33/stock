import { KnowledgeCard } from '../types/knowledge';

export const MOCK_KNOWLEDGE_CARDS: KnowledgeCard[] = [
  // ── Technology ──────────────────────────────────────────────────────────────
  {
    id: 'moores-law',
    title: "Moore's Law",
    category: 'technology',
    teaser:
      "Transistor counts on a chip double roughly every two years — a self-fulfilling prophecy that has shaped 60 years of computing.",
    explanation:
      "In 1965, Intel co-founder Gordon Moore observed that the number of transistors on an integrated circuit doubles approximately every two years while costs halve. This empirical observation became a guiding target for the semiconductor industry rather than merely a prediction.\n\nFor decades engineers built roadmaps around it, investing billions to keep the pace. The law has slowed since around 2015 as transistors approach atomic scales, but its spirit lives on in advances like 3D chip stacking and new materials like gallium nitride.\n\nMoore's Law has been the engine behind every smartphone, laptop, and cloud server you use today. Without it, a modern GPU would cost millions of dollars and fill a warehouse.",
    example:
      "The iPhone 15's A17 chip holds 19 billion transistors on a die smaller than your fingernail. In 1971, Intel's first commercial microprocessor (the 4004) had just 2,300 transistors.",
    funFact:
      "Moore originally predicted doubling every year; he revised it to every two years in 1975. The version most people quote (18 months) was actually popularized by Intel's David House.",
    relatedConcepts: ['Dennard Scaling', 'Quantum Computing', 'RISC-V Architecture'],
    tags: ['semiconductors', 'chip design', 'computing history'],
    difficulty: 'beginner',
    accentColor: '#3B82F6',
  },
  {
    id: 'zero-day',
    title: 'Zero-Day Vulnerability',
    category: 'technology',
    teaser:
      "A software flaw unknown to its vendor — attackers have 'zero days' to patch it because the patch doesn't exist yet.",
    explanation:
      "A zero-day vulnerability is a security hole in software that the vendor or developer is unaware of, giving them zero days to issue a fix before it can be exploited. Once discovered by a malicious actor, it can be weaponised into a 'zero-day exploit' — a cyberattack that leverages the flaw.\n\nZero-days are extremely valuable on the black market and to nation-state intelligence agencies. The NSA's EternalBlue exploit (leaked in 2017) leveraged a zero-day in Windows SMB that was subsequently used in the devastating WannaCry ransomware attack.\n\nResponsible disclosure — where researchers report flaws privately to vendors before going public — has become the ethical standard for handling zero-days, with companies like Google's Project Zero leading the charge.",
    example:
      "In 2020, attackers exploited a zero-day in SolarWinds' Orion software to infiltrate 18,000 organisations including US Treasury and Homeland Security. The breach went undetected for months.",
    funFact:
      "Zerodium, a firm that brokers zero-day exploits, publicly pays up to $2.5 million for a single full-chain remote iOS jailbreak exploit.",
    relatedConcepts: ['Responsible Disclosure', 'CVE Database', 'Supply Chain Attack'],
    tags: ['cybersecurity', 'exploits', 'threat intelligence'],
    difficulty: 'intermediate',
    accentColor: '#3B82F6',
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    category: 'technology',
    teaser:
      "Layers of interconnected mathematical nodes inspired by the brain — the foundation of modern AI from voice assistants to image recognition.",
    explanation:
      "An artificial neural network (ANN) consists of layers of nodes (neurons) connected by weighted edges. An input layer receives data, hidden layers transform it through non-linear activation functions, and an output layer produces predictions. Training adjusts the weights via backpropagation — a gradient-descent algorithm that minimises prediction error.\n\nDeep neural networks (many hidden layers) underpin modern AI breakthroughs: convolutional networks excel at vision tasks, recurrent networks handle sequences, and transformers (the architecture behind GPT) process language at scale.\n\nThe field was re-energised in 2012 when AlexNet crushed the ImageNet competition using GPUs to train a deep convolutional network, launching the current AI era.",
    example:
      "When your phone unlocks with Face ID, a convolutional neural network maps 30,000 infrared dots into a mathematical 'face print' and compares it against your enrolled template in milliseconds.",
    funFact:
      "The human brain has roughly 86 billion neurons with 100 trillion synaptic connections. The largest AI models (like GPT-4) have around 1 trillion parameters — still far fewer, but growing fast.",
    relatedConcepts: ['Backpropagation', 'Transformer Architecture', 'Gradient Descent'],
    tags: ['machine learning', 'deep learning', 'AI'],
    difficulty: 'intermediate',
    accentColor: '#3B82F6',
  },

  // ── Science ──────────────────────────────────────────────────────────────────
  {
    id: 'quantum-entanglement',
    title: 'Quantum Entanglement',
    category: 'science',
    teaser:
      "Two particles can share a quantum state so that measuring one instantly determines the state of the other — regardless of distance.",
    explanation:
      "Quantum entanglement occurs when two or more particles become correlated in such a way that the quantum state of each cannot be described independently. When you measure a property (like spin) of one particle, you instantly know the corresponding property of its partner — even if they're light-years apart.\n\nEinstein famously called this 'spooky action at a distance' and believed it indicated quantum mechanics was incomplete. Bell's theorem (1964) provided a way to test whether hidden variables were responsible; experiments have consistently confirmed the quantum predictions.\n\nEntanglement does not allow faster-than-light communication (the outcomes are random until measured), but it is the resource behind quantum cryptography and quantum computing's exponential speedup.",
    example:
      "In 2022, three physicists won the Nobel Prize in Physics for experiments demonstrating entanglement violates Bell inequalities, settling the Einstein–Bohr debate experimentally.",
    funFact:
      "Scientists have entangled particles over distances exceeding 1,200 km using the Chinese satellite Micius — the farthest confirmed entanglement ever demonstrated.",
    relatedConcepts: ["Bell's Theorem", 'Quantum Superposition', 'Quantum Cryptography'],
    tags: ['quantum physics', 'particle physics', 'Nobel Prize'],
    difficulty: 'advanced',
    accentColor: '#10B981',
  },
  {
    id: 'crispr',
    title: 'CRISPR Gene Editing',
    category: 'science',
    teaser:
      "A molecular 'find and replace' tool that lets scientists edit DNA with a precision previously unimaginable — and may cure inherited diseases.",
    explanation:
      "CRISPR-Cas9 (Clustered Regularly Interspaced Short Palindromic Repeats) is a genome editing technology derived from a bacterial immune system. A guide RNA directs the Cas9 protein to a specific DNA sequence, where it acts as molecular scissors, cutting both strands. The cell's repair machinery then either disables the gene or inserts new genetic material.\n\nFennifer Doudna and Emmanuelle Charpentier won the 2020 Nobel Prize in Chemistry for developing CRISPR-Cas9 as a gene-editing tool. Since then, the technology has advanced from curing genetic diseases in mice to the first approved human gene therapies.\n\nIn 2023, the FDA approved Casgevy — the first CRISPR-based medicine — to treat sickle cell disease and beta-thalassemia, marking a watershed moment for the technology.",
    example:
      "Casgevy treats sickle cell disease by editing a patient's stem cells to reactivate foetal haemoglobin production, eliminating painful crises. One treatment can last a lifetime.",
    funFact:
      "CRISPR was first discovered by a Spanish microbiologist studying salt-tolerant bacteria in 1993. Its function as an immune system wasn't understood until 2007.",
    relatedConcepts: ['Gene Therapy', 'Epigenetics', 'Synthetic Biology'],
    tags: ['biotechnology', 'genomics', 'medicine'],
    difficulty: 'intermediate',
    accentColor: '#10B981',
  },
  {
    id: 'doppler-effect',
    title: 'The Doppler Effect',
    category: 'science',
    teaser:
      "The apparent change in frequency of a wave when its source and observer are moving relative to each other — explaining everything from ambulance sirens to expanding galaxies.",
    explanation:
      "The Doppler effect describes how waves (sound, light, radio) appear to change frequency when source and observer are in relative motion. When a source approaches, wave crests arrive more frequently (higher pitch/blue-shift). When it recedes, they arrive less frequently (lower pitch/red-shift).\n\nThe effect was proposed by Austrian physicist Christian Doppler in 1842 and applies universally. In acoustics, it explains the falling pitch of a passing ambulance. In optics, it allows astronomers to measure stellar velocities via spectral line shifts.\n\nEdwin Hubble used the Doppler shift of galaxies in 1929 to discover that the universe is expanding — every galaxy is racing away from every other, and the further away it is, the faster it recedes.",
    example:
      "Police radar guns emit radio waves at a target vehicle. The reflected waves return at a shifted frequency proportional to the car's speed, allowing officers to calculate velocity to within ±1 mph.",
    funFact:
      "The cosmic microwave background — relic radiation from the Big Bang — is red-shifted all the way into the microwave spectrum because the universe has expanded by a factor of 1,100 since it was emitted.",
    relatedConcepts: ['Hubble Constant', 'Redshift', 'Wave Interference'],
    tags: ['acoustics', 'optics', 'cosmology'],
    difficulty: 'beginner',
    accentColor: '#10B981',
  },

  // ── History ──────────────────────────────────────────────────────────────────
  {
    id: 'silk-road',
    title: 'The Silk Road',
    category: 'history',
    teaser:
      "The ancient network of trade routes connecting China to the Mediterranean — spreading silk, spices, ideas, and plagues across continents for 1,500 years.",
    explanation:
      "The Silk Road was not a single road but a web of overland and maritime trade routes stretching roughly 6,400 km from China through Central Asia, Persia, Arabia, and onward to Rome. Active from around 130 BCE (when Han China opened official relations with Central Asia) to the 1450s, it moved silk westward and horses, glassware, and gold eastward.\n\nMore consequential than the goods was the exchange of ideas. Buddhism traveled east from India along its corridors; Islam spread into Central Asia; paper and printing technology reached the Islamic world centuries before Europe; and the Black Death may have tracked its paths westward in the 1340s.\n\nThe routes declined after the Ottoman Empire blockaded overland passage to Europe, prompting Portugal and Spain to seek sea routes to Asia — accidentally triggering the Age of Exploration.",
    example:
      "Venetian merchant Marco Polo traveled the Silk Road from 1271–1295, spending 17 years in the court of Kublai Khan. His account, 'The Travels of Marco Polo', introduced Europeans to Chinese gunpowder, paper money, and coal.",
    funFact:
      "Silk was so valuable in Rome that the Roman Senate repeatedly (and unsuccessfully) banned its import, citing the drain of gold to China and the fabric's perceived immodesty.",
    relatedConcepts: ['Pax Mongolica', 'Spice Trade', 'Black Death Spread'],
    tags: ['trade', 'ancient history', 'globalization'],
    difficulty: 'beginner',
    accentColor: '#F59E0B',
  },
  {
    id: 'black-death',
    title: 'The Black Death',
    category: 'history',
    teaser:
      "The 14th-century bubonic plague that killed one-third of Europe's population — reshaping society, religion, and the trajectory of Western civilization.",
    explanation:
      "The Black Death was a catastrophic pandemic caused by the bacterium Yersinia pestis, arriving in Europe in 1347 via Genoese trading ships from Crimea. It spread in three forms: bubonic (swollen lymph nodes, 30–60% fatality), septicaemic (blood infection), and pneumonic (lung infection, near 100% fatal). By 1351, it had killed an estimated 25–50 million people — 30–60% of Europe.\n\nThe social consequences were profound. Labour became scarce, empowering surviving peasants to demand better wages and conditions — accelerating the decline of feudalism. The Church suffered a crisis of authority as prayers failed to stop the dying. Flagellant movements and persecution of Jewish communities as scapegoats swept the continent.\n\nSome historians argue the plague was a brutal catalyst for European modernity: it accelerated social mobility, spurred medical inquiry, and contributed to the conditions that produced the Renaissance.",
    example:
      "In Florence, Giovanni Boccaccio watched the plague kill his father. His response was 'The Decameron' — 100 stories told by nobles fleeing the city — a literary masterpiece born from apocalypse.",
    funFact:
      "Genetic analysis of mass burial sites confirms the 1346–1353 outbreak originated in a Central Asian population near modern-day Kyrgyzstan, where plague-infected marmots remain endemic today.",
    relatedConcepts: ['Feudalism Collapse', 'Miasma Theory', 'Dance of Death'],
    tags: ['plague', 'medieval Europe', 'epidemiology'],
    difficulty: 'beginner',
    accentColor: '#F59E0B',
  },
  {
    id: 'space-race',
    title: 'The Space Race',
    category: 'history',
    teaser:
      "The Cold War competition between the US and USSR to conquer space — producing Sputnik, Yuri Gagarin, Apollo 11, and the technological foundation of the modern world.",
    explanation:
      "The Space Race was a 20th-century competition for supremacy in space exploration between the United States and the Soviet Union, running roughly from 1957 to 1969. It was both a scientific endeavour and a proxy Cold War battle — each satellite launch was a statement about ideological superiority.\n\nThe USSR drew first blood: Sputnik 1 (1957) was the first artificial satellite; Laika (1957) the first animal in orbit; Yuri Gagarin (1961) the first human in space. America responded with the Apollo programme. Neil Armstrong's moon landing on July 20, 1969 is widely considered the Space Race's defining moment.\n\nThe race's technological spillover transformed everyday life: integrated circuits, scratch-resistant lenses, memory foam, freeze-dried food, and modern weather forecasting all trace roots to space programme R&D.",
    example:
      "NASA's Apollo Guidance Computer had 4 KB of RAM and processed at 1 MHz — less powerful than a modern thermostat. Yet it safely navigated humans 384,400 km to the Moon and back.",
    funFact:
      "Yuri Gagarin's historic Vostok 1 flight lasted 108 minutes. He couldn't control the spacecraft manually — mission controllers on the ground held the override keys, fearing space might cause disorientation.",
    relatedConcepts: ['Cold War', 'ICBM Technology', 'International Space Station'],
    tags: ['Cold War', 'NASA', 'Soviet Union'],
    difficulty: 'beginner',
    accentColor: '#F59E0B',
  },

  // ── Philosophy ───────────────────────────────────────────────────────────────
  {
    id: 'occams-razor',
    title: "Occam's Razor",
    category: 'philosophy',
    teaser:
      "When two explanations fit the evidence equally well, prefer the simpler one — a 700-year-old principle that still guides science today.",
    explanation:
      "Occam's Razor is a problem-solving heuristic attributed to 14th-century English friar William of Ockham: 'Entities should not be multiplied beyond necessity.' In modern usage: the simplest explanation consistent with the facts is most likely correct.\n\nIt's not a logical law — the simpler explanation can be wrong. But as a prior in Bayesian reasoning, it reflects the statistical reality that complex hypotheses (requiring many independent things to be true) are less probable than simple ones. It guides scientists toward parsimonious theories and doctors toward common diagnoses.\n\nThe principle has influenced physics (prefer minimal axioms), medicine ('when you hear hoofbeats, think horses not zebras'), and AI (regularisation techniques that penalise model complexity all embody Occam's Razor mathematically).",
    example:
      "When a light bulb stops working, Occam's Razor suggests checking the bulb before assuming a wiring fault, a circuit breaker trip, a power outage, and a broken socket simultaneously.",
    funFact:
      "Despite the name, William of Ockham never wrote the phrase 'Occam's Razor'. The sharpest version — 'Do not multiply entities without necessity' — was penned by later philosophers summarising his work.",
    relatedConcepts: ['Bayesian Reasoning', 'Parsimony', 'Falsifiability'],
    tags: ['logic', 'epistemology', 'scientific method'],
    difficulty: 'beginner',
    accentColor: '#8B5CF6',
  },
  {
    id: 'ship-of-theseus',
    title: 'The Ship of Theseus',
    category: 'philosophy',
    teaser:
      "If every plank of a ship is replaced one by one, is it still the same ship? A 2,000-year-old paradox about identity that philosophy still hasn't solved.",
    explanation:
      "The Ship of Theseus is a thought experiment from ancient Greece: Athenians preserved Theseus's legendary ship in the harbour, replacing rotted planks as needed. If every component was eventually replaced, is it still 'the same ship'? The paradox probes what it means for an object to persist through change.\n\nThomas Hobbes added a twist: suppose someone collected all the original planks and rebuilt the original ship — which of the two is 'really' Theseus's ship? This exposes competing theories of identity: continuity of matter, continuity of form, or continuity of history/function.\n\nThe paradox has modern applications in law (Is a company 'the same company' after a hostile takeover?), medicine (cellular turnover means most of your atoms replace over 7–10 years — are you the same person?), and AI consciousness debates.",
    example:
      "Every cell in your body (except neurons and cardiac cells) is replaced over roughly a decade. The atoms in your hand right now were not there ten years ago. Are you the same person?",
    funFact:
      "The philosopher Derek Parfit extended the thought experiment to personal identity, arguing that personal continuity is a matter of degree, not binary — which has radical implications for ethics and punishment.",
    relatedConcepts: ['Personal Identity', 'Mereology', 'Four-Dimensionalism'],
    tags: ['identity', 'metaphysics', 'thought experiments'],
    difficulty: 'intermediate',
    accentColor: '#8B5CF6',
  },
  {
    id: 'stoicism',
    title: 'Stoicism',
    category: 'philosophy',
    teaser:
      "An ancient Greek philosophy of emotional resilience: focus only on what you control, accept what you can't, and find virtue sufficient for happiness.",
    explanation:
      "Founded in Athens around 300 BCE by Zeno of Citium, Stoicism holds that virtue (wisdom, justice, courage, temperance) is the only true good and is sufficient for happiness (eudaimonia). External goods — wealth, health, reputation — are 'preferred indifferents': nice to have, but not necessary for a good life.\n\nThe Stoics divide the world into what is 'up to us' (judgements, impulses, desires) and what is 'not up to us' (the body, wealth, reputation, outcomes). Emotional suffering arises from judging external events as good or evil, rather than as neutral. The Stoic practice is to continuously distinguish between these and focus energy only on the former.\n\nStoicism was the dominant philosophy of Rome's elite and influenced Christianity. Today it underpins Cognitive Behavioural Therapy (CBT) and has been revived by figures from Silicon Valley CEOs to elite athletes.",
    example:
      "Marcus Aurelius — one of the most powerful men in history as Roman Emperor — wrote 'Meditations' as a private Stoic journal reminding himself to focus on virtue rather than imperial power.",
    funFact:
      "The word 'Stoic' comes from the Stoa Poikile ('Painted Porch') in Athens where Zeno taught. He reportedly began philosophising after being shipwrecked and losing his fortune — the quintessential Stoic origin story.",
    relatedConcepts: ['Cognitive Behavioural Therapy', 'Epictetus', 'Virtue Ethics'],
    tags: ['ancient philosophy', 'ethics', 'resilience'],
    difficulty: 'beginner',
    accentColor: '#8B5CF6',
  },

  // ── Economics ─────────────────────────────────────────────────────────────────
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    category: 'economics',
    teaser:
      "Interest earned on interest — Einstein allegedly called it the eighth wonder of the world, and it explains why starting to save early matters enormously.",
    explanation:
      "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest, causing exponential rather than linear growth. The formula is A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounds per year, and t is time in years.\n\nThe key insight is time: because of compounding, a small amount invested early eventually overtakes a larger amount invested later. The 'Rule of 72' approximates how long it takes to double: divide 72 by the annual interest rate. At 8%, money doubles roughly every 9 years.\n\nCompounding works in reverse too: credit card debt at 20% APR compounds against you. A $5,000 balance unpaid for 10 years grows to over $30,000 — a powerful argument for understanding this concept.",
    example:
      "Warren Buffett made 99% of his net worth after age 50. His secret is time: he started investing at 10 and compounded returns over 80+ years. Had he started at 30, he'd be worth an estimated $11 million rather than $100+ billion.",
    funFact:
      "There is no verified quote of Einstein calling compound interest the eighth wonder of the world. But the concept is so powerful that people keep attributing it to the smartest person they can think of.",
    relatedConcepts: ['Rule of 72', 'Time Value of Money', 'Dollar-Cost Averaging'],
    tags: ['investing', 'personal finance', 'exponential growth'],
    difficulty: 'beginner',
    accentColor: '#06B6D4',
  },
  {
    id: 'tragedy-of-commons',
    title: 'Tragedy of the Commons',
    category: 'economics',
    teaser:
      "When a shared resource is open to all, individuals acting in self-interest will deplete it — even when it's against everyone's collective interest.",
    explanation:
      "First popularised by ecologist Garrett Hardin in 1968, the tragedy of the commons describes how rational individual actors can collectively destroy a shared resource. If a pasture is open to all herders, each herder's best move is to add one more cow — they gain the full benefit of that cow while the grazing cost is shared. Repeating this logic for every herder destroys the pasture.\n\nThe core issue is that private incentives diverge from collective welfare when property rights are absent or unenforceable. Solutions include privatisation (Hardin's controversial suggestion), government regulation, or — as Elinor Ostrom demonstrated in her Nobel-winning work — community-based management with clear rules, monitoring, and graduated sanctions.\n\nThe tragedy manifests everywhere: overfishing, traffic congestion, antibiotic resistance, and climate change are all commons problems on different scales.",
    example:
      "Atlantic cod was so abundant in the 1500s that John Cabot's crew reportedly scooped them up in baskets. By 1992, the Canadian cod fishery collapsed entirely from overfishing, destroying the livelihoods of 40,000 people.",
    funFact:
      "Elinor Ostrom won the 2009 Nobel Prize in Economics — the first woman to do so — by documenting hundreds of real-world communities that successfully managed commons without privatisation or top-down regulation.",
    relatedConcepts: ['Externalities', 'Public Goods', "Prisoner's Dilemma"],
    tags: ['game theory', 'environmental economics', 'collective action'],
    difficulty: 'intermediate',
    accentColor: '#06B6D4',
  },
  {
    id: 'nash-equilibrium',
    title: 'Nash Equilibrium',
    category: 'economics',
    teaser:
      "A state in a game where no player can improve their outcome by changing strategy alone — the mathematical foundation of game theory and competitive strategy.",
    explanation:
      "Named after mathematician John Nash (portrayed in 'A Beautiful Mind'), a Nash Equilibrium is a set of strategies where no player benefits from unilaterally changing their choice, given what everyone else is doing. Every player's strategy is a best response to others' strategies.\n\nNash proved that every finite game has at least one equilibrium (possibly in mixed strategies). This transformed economics, enabling rigorous analysis of oligopolies, auctions, arms races, and evolutionary biology.\n\nCrucially, a Nash Equilibrium need not be socially optimal. The Prisoner's Dilemma has a Nash Equilibrium where both prisoners defect — but mutual cooperation would leave both better off. This gap between individual rationality and collective welfare is the central tension of social science.",
    example:
      "OPEC nations face a Nash Equilibrium problem: each member benefits from secretly producing above quota (while others comply), but if all defect the oil price collapses. Maintaining discipline requires enforcement — hence OPEC's perpetual internal tensions.",
    funFact:
      "John Nash developed the concept in his 1950 PhD thesis — just 27 pages long. He was 22 years old. He received the Nobel Prize in Economics 44 years later.",
    relatedConcepts: ["Prisoner's Dilemma", 'Dominant Strategy', 'Pareto Efficiency'],
    tags: ['game theory', 'strategy', 'economics'],
    difficulty: 'advanced',
    accentColor: '#06B6D4',
  },

  // ── Psychology ────────────────────────────────────────────────────────────────
  {
    id: 'cognitive-dissonance',
    title: 'Cognitive Dissonance',
    category: 'psychology',
    teaser:
      "The discomfort we feel when we hold contradictory beliefs or act against our values — and the mental gymnastics we perform to resolve it.",
    explanation:
      "Cognitive dissonance theory, proposed by Leon Festinger in 1957, describes the psychological discomfort that arises when a person holds conflicting cognitions (beliefs, attitudes, behaviours). People are motivated to reduce this discomfort, either by changing a belief, adding new beliefs that reconcile the conflict, or reducing the importance of the dissonance.\n\nFestinger's famous study had participants perform a boring task, then paid some $1 and others $20 to tell waiting participants the task was interesting. Those paid $1 had to convince themselves the task was actually interesting to reduce the dissonance of lying cheaply — they reported enjoying the task more than those paid $20.\n\nCognitive dissonance explains why smokers downplay cancer risks, why people justify expensive purchases they later regret, and why cult members double down after a failed prophecy.",
    example:
      "Someone who considers themselves environmentally conscious but drives a large SUV may reduce the dissonance by focusing on recycling, donating to environmental causes, or convincing themselves their car isn't 'that bad'.",
    funFact:
      "After a doomsday cult predicted the world would end on December 21, 1954, members who had given away their possessions became more committed and began proselytising more intensely when the world didn't end — a textbook dissonance response.",
    relatedConcepts: ['Confirmation Bias', 'Self-Justification', 'Rationalisation'],
    tags: ['social psychology', 'belief', 'decision making'],
    difficulty: 'beginner',
    accentColor: '#EC4899',
  },
  {
    id: 'dunning-kruger',
    title: 'The Dunning-Kruger Effect',
    category: 'psychology',
    teaser:
      "Beginners overestimate their competence; experts underestimate it. The less you know about a field, the less you know how much you don't know.",
    explanation:
      "Described by psychologists David Dunning and Justin Kruger in 1999, the effect arises because the skills needed to evaluate competence in a domain are the same skills the task requires. Novices lack the metacognitive ability to accurately assess their own performance — they don't know what they don't know.\n\nThe effect follows a curve: confidence peaks early, then collapses as learners discover the full complexity of the field ('the valley of despair'), before rising again as genuine expertise is built. Experts, meanwhile, tend to underestimate their competence because they assume tasks that are easy for them are easy for everyone.\n\nIt's worth noting that the original finding has been partly revised by subsequent research. Some studies attribute the effect partly to statistical regression to the mean, suggesting the phenomenon may be somewhat overstated in popular accounts.",
    example:
      "Studies show that people who score in the bottom quartile of a logic or grammar test typically estimate they scored around the 60th percentile, while top scorers estimate only around the 75th — despite scoring at the 90th.",
    funFact:
      "Dunning and Kruger won the 2000 Ig Nobel Prize in Psychology — the prize for research that 'makes you laugh and then think'. Ig Nobels are awarded by genuine Nobel laureates at Harvard.",
    relatedConcepts: ['Metacognition', 'Impostor Syndrome', 'Overconfidence Bias'],
    tags: ['bias', 'learning', 'self-awareness'],
    difficulty: 'beginner',
    accentColor: '#EC4899',
  },
  {
    id: 'flow-state',
    title: 'Flow State',
    category: 'psychology',
    teaser:
      "The mental state of total immersion in a challenging task — where time disappears, self-consciousness dissolves, and performance peaks.",
    explanation:
      "Psychologist Mihaly Csikszentmihalyi coined 'flow' in the 1970s after studying artists, athletes, and surgeons who described entering an almost meditative state of focused absorption during peak performance. He identified nine characteristics: clear goals, immediate feedback, balance between challenge and skill, action and awareness merging, loss of self-consciousness, distorted time perception, autotelic experience, concentration, and sense of control.\n\nFlow occurs when challenge level matches skill level precisely. Tasks that are too easy produce boredom; too hard, anxiety. In the sweet spot, the self-critical brain quiets and automatic execution takes over.\n\nNeuroscience research shows flow correlates with reduced activity in the default mode network (the brain's self-referential 'chatter') and elevated dopamine and norepinephrine — a neurological basis for the experience's addictive quality.",
    example:
      "Elite rock climbers, jazz musicians, and esports players all describe the same phenomenon: at peak performance, they stop thinking about technique and simply respond. Tommy Caldwell described free-soloing El Capitan as 'the most flow state I've ever been in'.",
    funFact:
      "Csikszentmihalyi's (pronounced 'cheeks-sent-me-high') surname is so notoriously difficult that he reportedly suggested people just call him 'Professor C'.",
    relatedConcepts: ['Intrinsic Motivation', 'Peak Performance', 'Mindfulness'],
    tags: ['positive psychology', 'performance', 'creativity'],
    difficulty: 'beginner',
    accentColor: '#EC4899',
  },

  // ── Mathematics ───────────────────────────────────────────────────────────────
  {
    id: 'fibonacci',
    title: 'The Fibonacci Sequence',
    category: 'mathematics',
    teaser:
      "0, 1, 1, 2, 3, 5, 8, 13, 21… a deceptively simple sequence that appears throughout nature, art, and finance.",
    explanation:
      "The Fibonacci sequence is defined recursively: each number is the sum of the two preceding ones (F(n) = F(n-1) + F(n-2)), starting with 0 and 1. Introduced to Western mathematics by Leonardo of Pisa ('Fibonacci') in 1202 through his 'Liber Abaci', it had actually been known to Indian mathematicians centuries earlier.\n\nThe sequence's remarkable property is that the ratio of consecutive terms converges to the golden ratio φ ≈ 1.618. This number is associated with proportions considered aesthetically pleasing and appears in the spirals of sunflower seeds, pinecone scales, nautilus shells, and galaxy spirals.\n\nIn computer science, Fibonacci numbers appear in algorithm analysis, data structures (Fibonacci heaps), and nature-inspired search algorithms. In financial markets, 'Fibonacci retracement levels' (23.6%, 38.2%, 61.8%) are widely used by technical traders — though their effectiveness is disputed.",
    example:
      "Count the clockwise and counter-clockwise spirals in a sunflower. They are almost always consecutive Fibonacci numbers — typically 34 and 55, or 55 and 89 in larger flowers. This emerges from optimal packing geometry.",
    funFact:
      "Any three consecutive Fibonacci numbers satisfy the identity F(n)² = F(n-1)·F(n+1) ± 1. Visualising this algebraically produces a near-perfect square from four Fibonacci rectangles — a geometric 'illusion' that appears to conjure area from nothing.",
    relatedConcepts: ['Golden Ratio', "Pascal's Triangle", 'Fractal Geometry'],
    tags: ['number theory', 'patterns', 'nature'],
    difficulty: 'beginner',
    accentColor: '#F97316',
  },
  {
    id: 'bayes-theorem',
    title: "Bayes' Theorem",
    category: 'mathematics',
    teaser:
      "A formula for updating beliefs as new evidence arrives — the mathematical foundation of rational inference, spam filters, and medical diagnosis.",
    explanation:
      "Bayes' Theorem, developed by Reverend Thomas Bayes in the 18th century, describes how to update the probability of a hypothesis (prior belief) given new evidence. The formula: P(A|B) = P(B|A) × P(A) / P(B), where P(A|B) is the probability of A given B has occurred.\n\nThe key insight is that prior beliefs matter. Two people with different priors, given the same evidence, will rationally reach different conclusions — this is not irrationality, it reflects different starting information.\n\nBayesian reasoning shows why medical tests can mislead: a test with 99% accuracy for a disease affecting 1 in 10,000 people will, for every 10,000 people tested, generate ~100 false positives and ~1 true positive. A positive result is thus far more likely to be a false alarm than a real case. This counterintuitive result explains why mass screening programs require careful design.",
    example:
      "Gmail's spam filter is Bayesian: it calculates the probability an email is spam given the words it contains, combining that with a prior probability based on the sender's history. Each new email updates the model.",
    funFact:
      "Thomas Bayes never published the theorem himself. His friend Richard Price found the manuscript after Bayes' death in 1761 and submitted it to the Royal Society. Bayes may not have considered it significant.",
    relatedConcepts: ['Prior Probability', 'Conditional Probability', 'Maximum Likelihood'],
    tags: ['probability', 'statistics', 'inference'],
    difficulty: 'intermediate',
    accentColor: '#F97316',
  },

  // ── Art & Culture ─────────────────────────────────────────────────────────────
  {
    id: 'golden-ratio',
    title: 'The Golden Ratio',
    category: 'art',
    teaser:
      "A number approximately equal to 1.618 that appears in nature, art, and architecture — and has been called the universe's most beautiful proportion.",
    explanation:
      "The golden ratio φ (phi) ≈ 1.618 is defined as the ratio a/b such that (a+b)/a = a/b. It is the positive root of x² − x − 1 = 0 and is deeply connected to the Fibonacci sequence: as Fibonacci numbers get larger, their ratio converges on φ.\n\nClaims about the golden ratio's ubiquity in art and architecture are widespread but often exaggerated. The Parthenon and Mona Lisa are frequently cited — but measurements vary depending on exactly which dimensions are chosen. Many alleged examples are retrofits. Genuine applications exist in Le Corbusier's modulor system and some typographic proportions.\n\nIn nature, the connection is more solid: φ emerges from optimal packing in phyllotaxis (leaf arrangement) and the branching of trees and blood vessels — not because nature 'chose beauty' but because the angle that minimises overlap between successive elements is the golden angle (≈137.5°, derived from φ).",
    example:
      "Credit cards, A4 paper, and standard monitor aspect ratios all approximate 'pleasant' proportions — though none is exactly the golden ratio. The human preference for these proportions may be partly cultural rather than innate.",
    funFact:
      "φ is the 'most irrational' number — it is the hardest to approximate by fractions. Any rational approximation converges slower for φ than for any other irrational number. This property is precisely why it appears in optimal packing problems.",
    relatedConcepts: ['Fibonacci Sequence', 'Sacred Geometry', 'Phyllotaxis'],
    tags: ['mathematics', 'aesthetics', 'nature'],
    difficulty: 'beginner',
    accentColor: '#A78BFA',
  },
];
