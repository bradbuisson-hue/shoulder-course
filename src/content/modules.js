// ============================================================
//  COURSE CONTENT
// ------------------------------------------------------------
//  Edit this file to customise the course. Each module has:
//    - lessons:    teaching content + a video slot
//    - quiz:       multiple-choice questions
//    - caseStudy:  applied scenario with reflection prompts
//    - tasks:      practical work to complete with a client
//
//  Block types you can use inside lesson.blocks:
//    { type: 'p', text: '...' }              paragraph
//    { type: 'h', text: '...' }              sub-heading
//    { type: 'ul', items: [...] }            bullet list
//    { type: 'ol', items: [...] }            numbered list
//    { type: 'callout', tone: 'sage'|'rust', title?, text }
//    { type: 'quote', text, by? }
//    { type: 'definition', term, text }
// ============================================================

export const courseMeta = {
  title: 'The Shoulder & Rotator Cuff',
  subtitle: 'A clinical course for placement students',
  edition: 'Edition I',
  weekFocus: 'Week 1',
}

export const modules = [
  // ==========================================================
  //  01 — ANATOMY
  // ==========================================================
  {
    id: 'anatomy',
    number: '01',
    title: 'Anatomy of the shoulder complex',
    summary:
      'The shoulder is not a joint, it is a complex of four. Understand the bones, joints, muscles and neurovasculature before you assess or treat anything.',
    duration: '60–90 min',
    lessons: [
      {
        id: 'bones-joints',
        title: 'Bones & joints',
        videoPlaceholder: '', // ← paste your video URL here (YouTube, Vimeo, etc.)
        blocks: [
          {
            type: 'p',
            text: 'Functionally, the "shoulder" comprises four articulations working together. Movement at any one influences the others, so a full assessment looks at all four.',
          },
          { type: 'h', text: 'The four articulations' },
          {
            type: 'ul',
            items: [
              '**Glenohumeral (GH) joint** — ball-and-socket between humeral head and glenoid fossa. Sacrifices stability for mobility.',
              '**Acromioclavicular (AC) joint** — plane joint between acromion and lateral clavicle.',
              '**Sternoclavicular (SC) joint** — saddle joint, the *only* bony connection between the upper limb and axial skeleton.',
              '**Scapulothoracic articulation** — not a true joint; the scapula glides over the posterior thoracic wall.',
            ],
          },
          { type: 'h', text: 'Key bony landmarks to palpate' },
          {
            type: 'ul',
            items: [
              'Acromion process and the AC joint line',
              'Coracoid process — anteriorly, ~2 cm inferomedial to the AC joint',
              'Greater and lesser tuberosities of the humerus',
              'Bicipital groove between the tuberosities',
              'Spine of the scapula and the medial/inferior borders',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'Clinical pearl',
            text: 'The glenoid faces slightly anteriorly, superiorly and laterally. This orientation matters when you reason about humeral head translation and the direction of provocation tests.',
          },
        ],
      },
      {
        id: 'rotator-cuff',
        title: 'The rotator cuff (SITS)',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'The rotator cuff is a functional unit of four muscles that compress and centre the humeral head against the glenoid during arm movement. They are the dynamic stabilisers of the GH joint.',
          },
          {
            type: 'definition',
            term: 'SITS',
            text: 'A mnemonic for the rotator cuff: Supraspinatus, Infraspinatus, Teres minor, Subscapularis.',
          },
          { type: 'h', text: 'The four muscles' },
          {
            type: 'ul',
            items: [
              '**Supraspinatus** — supraspinous fossa → greater tuberosity. Initiates abduction (0–15°) and assists throughout. *Suprascapular n. (C5,C6)*.',
              '**Infraspinatus** — infraspinous fossa → greater tuberosity. Primary external rotator. *Suprascapular n. (C5,C6)*.',
              '**Teres minor** — lateral scapular border → greater tuberosity. External rotation, posterior stability. *Axillary n. (C5,C6)*.',
              '**Subscapularis** — subscapular fossa (anterior scapula) → lesser tuberosity. Primary internal rotator and anterior stabiliser. *Upper & lower subscapular n. (C5,C6)*.',
            ],
          },
          {
            type: 'callout',
            tone: 'rust',
            title: 'Why the cuff matters',
            text: 'Without active cuff compression, the much stronger deltoid would simply translate the humeral head superiorly into the acromion when the arm is raised. The cuff’s job is force-couple balance, not raw strength.',
          },
          { type: 'h', text: 'Force couples to remember' },
          {
            type: 'ul',
            items: [
              '**Coronal plane**: deltoid (elevation) ↔ inferior cuff (depression) — keeps the humeral head centred during abduction.',
              '**Transverse plane**: subscapularis (anterior) ↔ infraspinatus + teres minor (posterior) — anterior–posterior balance.',
              '**Scapular plane**: upper trapezius + serratus anterior ↔ lower trapezius — produces scapular upward rotation.',
            ],
          },
        ],
      },
      {
        id: 'movers-stabilisers',
        title: 'Other movers & scapular stabilisers',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'The cuff does not work alone. The deltoid, biceps, pec major and lats produce gross movement, while the scapular stabilisers provide the platform from which the GH joint moves.',
          },
          { type: 'h', text: 'Prime movers' },
          {
            type: 'ul',
            items: [
              '**Deltoid** (anterior, middle, posterior heads) — the dominant elevator.',
              '**Pectoralis major** — adduction, internal rotation, flexion (clavicular head).',
              '**Latissimus dorsi & teres major** — extension, adduction, internal rotation.',
              '**Biceps brachii (long head)** — runs through the bicipital groove and over the humeral head; assists GH stability.',
            ],
          },
          { type: 'h', text: 'Scapular stabilisers' },
          {
            type: 'ul',
            items: [
              '**Trapezius** (upper, middle, lower) — elevation, retraction, upward rotation.',
              '**Serratus anterior** — protraction and crucial upward rotation; weakness causes scapular winging.',
              '**Rhomboids major and minor** — retraction and downward rotation.',
              '**Levator scapulae** — elevation and downward rotation.',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'Scapulohumeral rhythm',
            text: 'During shoulder abduction, every 3° of motion is roughly 2° at the GH joint and 1° at the scapulothoracic — a 2:1 ratio above the first 30°. Disruption of this rhythm (dyskinesis) is a frequent finding in cuff pathology.',
          },
        ],
      },
      {
        id: 'neurovascular',
        title: 'Neurovasculature & bursae',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'A working knowledge of the brachial plexus and the subacromial space saves you from missing referred pain and bursal involvement.',
          },
          { type: 'h', text: 'Key nerves' },
          {
            type: 'ul',
            items: [
              '**Suprascapular nerve** (C5–C6) — supraspinatus and infraspinatus.',
              '**Axillary nerve** (C5–C6) — deltoid and teres minor; tests the regimental badge area for sensation.',
              '**Long thoracic nerve** (C5–C7) — serratus anterior; injury causes medial scapular winging.',
              '**Spinal accessory nerve** (CN XI) — trapezius; injury causes lateral winging and shoulder droop.',
            ],
          },
          { type: 'h', text: 'The subacromial space' },
          {
            type: 'p',
            text: 'A confined space between the inferior surface of the acromion and the humeral head. It contains the supraspinatus tendon, the subacromial bursa and the long head of biceps. Reduction of this space — through posture, weakness, or structural change — produces the symptoms historically called "impingement".',
          },
          {
            type: 'callout',
            tone: 'rust',
            title: 'Cervical referral',
            text: 'Always screen the cervical spine. Pain referred from C5/C6 can perfectly mimic shoulder pathology — and roughly 1 in 5 "shoulder" presentations have a meaningful cervical contribution.',
          },
        ],
      },
    ],
    quiz: [
      {
        q: 'Which of the following is NOT a true joint of the shoulder complex?',
        options: [
          'Glenohumeral joint',
          'Acromioclavicular joint',
          'Scapulothoracic articulation',
          'Sternoclavicular joint',
        ],
        answer: 2,
        explanation:
          'The scapulothoracic is a functional articulation — there is no synovial joint between the scapula and the thorax.',
      },
      {
        q: 'Which rotator cuff muscle is the primary internal rotator of the GH joint?',
        options: ['Supraspinatus', 'Infraspinatus', 'Teres minor', 'Subscapularis'],
        answer: 3,
        explanation:
          'Subscapularis attaches to the lesser tuberosity and is the cuff’s primary internal rotator. It also provides important anterior stability.',
      },
      {
        q: 'Medial winging of the scapula most commonly indicates weakness or palsy of which muscle?',
        options: ['Trapezius', 'Rhomboids', 'Serratus anterior', 'Levator scapulae'],
        answer: 2,
        explanation:
          'Serratus anterior holds the medial border of the scapula against the thorax. Long thoracic nerve injury causes medial winging.',
      },
      {
        q: 'Approximate scapulohumeral rhythm during shoulder abduction (after the first 30°) is:',
        options: ['1:1 GH to ST', '2:1 GH to ST', '3:1 GH to ST', '1:2 GH to ST'],
        answer: 1,
        explanation:
          'Every 3° of arm elevation is approximately 2° at the GH joint and 1° at the scapulothoracic — a 2:1 ratio.',
      },
      {
        q: 'The axillary nerve provides motor innervation to the deltoid and:',
        options: ['Supraspinatus', 'Subscapularis', 'Teres minor', 'Teres major'],
        answer: 2,
        explanation:
          'Teres minor shares innervation with the deltoid via the axillary nerve. The other cuff muscles are supplied by the suprascapular and subscapular nerves.',
      },
    ],
    caseStudy: null,
    tasks: [
      {
        title: 'Surface palpation pair-up',
        prompt:
          'With a willing partner or client, locate and palpate (in order): acromion, AC joint, coracoid, greater tuberosity, bicipital groove, spine of the scapula, inferior angle. Note any anatomical asymmetry between sides. Write 3 sentences on what you observed.',
      },
      {
        title: 'Sketch from memory',
        prompt:
          'Without notes, draw a posterior view of the right scapula and label all four rotator cuff origins and insertions, plus the spine of the scapula and the suprascapular notch. Compare with an atlas afterwards.',
      },
    ],
  },

  // ==========================================================
  //  02 — PATHOLOGIES
  // ==========================================================
  {
    id: 'pathologies',
    number: '02',
    title: 'Common shoulder pathologies',
    summary:
      'From tendinopathy to frozen shoulder — recognise the patterns, the people they happen to, and the red flags that need onward referral.',
    duration: '90 min',
    lessons: [
      {
        id: 'tendinopathy',
        title: 'Rotator cuff–related shoulder pain',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Modern terminology is moving away from "impingement" and "tendinitis" toward the umbrella term **rotator cuff–related shoulder pain (RCRSP)**. This better reflects what we now know: the structural diagnosis often does not predict the clinical course.',
          },
          { type: 'h', text: 'Typical presentation' },
          {
            type: 'ul',
            items: [
              'Lateral / anterolateral shoulder pain',
              'Painful arc roughly 60°–120° of abduction',
              'Pain with reaching overhead, behind the back, or onto the affected side at night',
              'Weakness on resisted external rotation or empty-can testing',
              'Often gradual onset, frequently in 4th–6th decade',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'A useful framing',
            text: 'Tendinopathy is a *load tolerance* problem, not a damage problem. The tendon’s capacity to handle load has been exceeded by demand. Treatment, therefore, is about progressively rebuilding that capacity.',
          },
        ],
      },
      {
        id: 'tears',
        title: 'Rotator cuff tears',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Cuff tears are common, often asymptomatic, and only sometimes the cause of the patient’s pain. Imaging findings must be correlated with the clinical picture.',
          },
          { type: 'h', text: 'Classification' },
          {
            type: 'ul',
            items: [
              '**Partial-thickness tears** — articular-sided, bursal-sided, or intrasubstance.',
              '**Full-thickness tears** — graded by size: small (<1 cm), medium (1–3 cm), large (3–5 cm), massive (>5 cm or ≥2 tendons).',
              '**Acute traumatic tears** — typically younger patients, fall onto outstretched hand, sudden weakness.',
              '**Chronic degenerative tears** — older patients, gradual onset, often bilateral imaging findings.',
            ],
          },
          {
            type: 'callout',
            tone: 'rust',
            title: 'Imaging humility',
            text: 'In asymptomatic adults over 60, the prevalence of full-thickness cuff tears on MRI exceeds 25%. Don’t treat the scan — treat the person in front of you.',
          },
        ],
      },
      {
        id: 'frozen-shoulder',
        title: 'Frozen shoulder (adhesive capsulitis)',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'A self-limiting but often deeply distressing condition characterised by a global loss of GH range of motion — particularly external rotation — with capsular fibrosis. Strongly associated with diabetes and thyroid disease.',
          },
          { type: 'h', text: 'The three classic phases' },
          {
            type: 'ol',
            items: [
              '**Freezing (painful) — 2–9 months.** Severe pain, especially at night. ROM begins to decline.',
              '**Frozen (stiff) — 4–12 months.** Pain settles but stiffness dominates. Marked loss of external rotation.',
              '**Thawing — 12–42 months.** Gradual return of range and function.',
            ],
          },
          {
            type: 'p',
            text: 'The hallmark on examination is loss of *passive* external rotation in adduction — distinguishing it from cuff pathology, where passive ROM is typically preserved.',
          },
        ],
      },
      {
        id: 'instability',
        title: 'Instability & other presentations',
        videoPlaceholder: '',
        blocks: [
          { type: 'h', text: 'Glenohumeral instability' },
          {
            type: 'ul',
            items: [
              '**TUBS** — Traumatic, Unilateral, Bankart lesion, Surgery often required. Younger contact-sport athletes.',
              '**AMBRII** — Atraumatic, Multidirectional, Bilateral, Rehabilitation first, Inferior capsular shift if surgery needed.',
              '**Apprehension** in late-cocking position is the cardinal sign of anterior instability.',
            ],
          },
          { type: 'h', text: 'AC joint pathology' },
          {
            type: 'p',
            text: 'Direct trauma (fall onto the point of the shoulder) → AC sprain or separation. Graded I–VI by Rockwood. Pain is well-localised over the joint and provoked by horizontal adduction (cross-body test).',
          },
          { type: 'h', text: 'SLAP and biceps lesions' },
          {
            type: 'p',
            text: 'Superior Labral Anterior to Posterior tears involve the biceps anchor. Often seen in throwing athletes or after a FOOSH. Provocation tests (O’Brien’s, Speed’s) have variable diagnostic value.',
          },
          {
            type: 'callout',
            tone: 'rust',
            title: 'Red flags — refer on',
            text: 'Unexplained mass; constitutional symptoms (fever, weight loss, night sweats); a history of cancer; severe trauma with deformity; sudden loss of strength after acute injury; neurological deficit beyond the shoulder.',
          },
        ],
      },
    ],
    quiz: [
      {
        q: 'Which clinical finding most strongly distinguishes adhesive capsulitis from rotator cuff pathology?',
        options: [
          'Painful arc on abduction',
          'Loss of passive external rotation in adduction',
          'Weakness on empty-can testing',
          'Night pain',
        ],
        answer: 1,
        explanation:
          'Loss of *passive* external rotation in adduction is the hallmark of frozen shoulder. In cuff pathology, passive ROM is typically preserved.',
      },
      {
        q: 'A 67-year-old presents with shoulder pain. MRI reports a 2 cm full-thickness supraspinatus tear. The most appropriate first action is:',
        options: [
          'Refer immediately for surgical opinion',
          'Correlate findings with clinical examination and trial conservative care',
          'Recommend complete rest of the shoulder',
          'Order a repeat MRI in 6 weeks',
        ],
        answer: 1,
        explanation:
          'Asymptomatic and incidental cuff tears are common in this age group. Treat the person, not the scan, and trial conservative management first.',
      },
      {
        q: 'The "TUBS" pattern of instability is associated with:',
        options: [
          'Atraumatic onset and bilateral symptoms',
          'Traumatic dislocation with a Bankart lesion',
          'Multidirectional laxity from generalised hypermobility',
          'Posterior dislocation in seizure disorders',
        ],
        answer: 1,
        explanation:
          'TUBS — Traumatic, Unilateral, Bankart lesion, Surgery often needed. Contrast with AMBRII for atraumatic multidirectional patterns.',
      },
      {
        q: 'The current preferred umbrella term for what was historically called "impingement syndrome" is:',
        options: [
          'Subacromial bursitis',
          'Rotator cuff–related shoulder pain (RCRSP)',
          'Cuff tendinitis',
          'Painful arc syndrome',
        ],
        answer: 1,
        explanation:
          'RCRSP captures the clinical reality without committing to a structural diagnosis that often cannot be confirmed and may not predict outcome.',
      },
    ],
    caseStudy: {
      title: 'Margaret, 58 — gradual lateral shoulder pain',
      scenario:
        'Margaret is 58, a retired teacher, recreational gardener and a keen swimmer (twice weekly, breaststroke). She presents with a 4-month history of right lateral shoulder pain. Onset was insidious, no specific trauma. Pain is worst when reaching into the kitchen cupboards and at night when she lies on the right side. She reports about 6/10 at worst, 2/10 at rest. She has no neck symptoms, no pins and needles. Past medical history: well-controlled type 2 diabetes (HbA1c 49 mmol/mol last reading). On examination: full pain-free passive ROM, painful arc 70°–110° on active abduction, weak and painful resisted external rotation in neutral. Hawkins–Kennedy positive. Negative cross-body adduction. Cervical screen unremarkable.',
      prompts: [
        'What are your top two differential diagnoses, and what features support each?',
        'Why does her diabetes matter for both diagnosis and prognosis?',
        'Outline a sensible first-week management plan, including what you would say to her about activity modification with swimming.',
        'What red or yellow flags, if any, are present? What further history would you want?',
      ],
    },
    tasks: [
      {
        title: 'Pathology pattern matching',
        prompt:
          'Take three of your supervisor’s current shoulder caseload (anonymised). For each, write the presenting features and your reasoning for the working diagnosis. Discuss with your supervisor afterwards — where did your reasoning agree, and where did it diverge?',
      },
    ],
  },

  // ==========================================================
  //  03 — REHABILITATION
  // ==========================================================
  {
    id: 'rehab',
    number: '03',
    title: 'Rehabilitation techniques',
    summary:
      'The toolkit. Pain modulation, manual therapy, the exercise progression continuum and how to reason about which lever to pull when.',
    duration: '75 min',
    lessons: [
      {
        id: 'pain-modulation',
        title: 'Pain modulation & education',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Pain is the most common reason a person walks through your door. Modulating pain enables movement, and movement is the active ingredient. Pain education and reassurance are early, high-leverage interventions.',
          },
          { type: 'h', text: 'Levers you can pull' },
          {
            type: 'ul',
            items: [
              '**Activity modification** — temporarily reduce the most provocative loads, not "rest" entirely.',
              '**Education** — what is and is not happening, the role of load, expected timeframes.',
              '**Sleep position advice** — pillows, side-lying support.',
              '**Heat / ice** — symptom relief; effects on tissue are minor compared to subjective comfort.',
              '**Pharmacology** — usually GP-led; understand what your client is taking and how it interacts with rehab.',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'Words are an intervention',
            text: 'Phrases like "wear and tear", "bone-on-bone", "torn", "out of place" can do real harm. Substitute neutral, accurate language. "The tendon is sensitive — we’ll rebuild its capacity" beats "your tendon is damaged" every time.',
          },
        ],
      },
      {
        id: 'manual-therapy',
        title: 'Manual therapy',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Manual therapy is a passive, short-window-of-effect intervention. Use it to *unlock movement* you can then load — not as a stand-alone treatment.',
          },
          { type: 'h', text: 'Common techniques' },
          {
            type: 'ul',
            items: [
              '**GH joint mobilisations** — Maitland grades I–V; posterior glides for ER restriction, inferior glides for elevation restriction.',
              '**Soft tissue release** — pec minor, infraspinatus, upper trapezius, levator scapulae.',
              '**Mobilisation with movement (MWM)** — Mulligan techniques for painful arc.',
              '**Scapular mobilisations** — particularly useful when ST mobility is restricted.',
              '**Neural mobilisation** — when there is a clear neural component (e.g. radial or median nerve sensitivity).',
            ],
          },
          {
            type: 'callout',
            tone: 'rust',
            title: 'Pair manual with movement',
            text: 'Whenever you mobilise or release, immediately reload that range with active movement. The window of changed sensitivity is short — don’t waste it.',
          },
        ],
      },
      {
        id: 'exercise-continuum',
        title: 'The exercise continuum',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Strength rehabilitation progresses along a continuum. Each stage prepares the tissue and the nervous system for the demands of the next.',
          },
          { type: 'h', text: 'Stages of progression' },
          {
            type: 'ol',
            items: [
              '**Isometric** — long-hold contractions at submaximal load. Useful for early pain modulation and re-establishing a contraction without provocative movement.',
              '**Isotonic — concentric/eccentric** — full ROM under control. Heavy slow resistance has good evidence for tendinopathy.',
              '**Eccentric emphasis** — historically the cornerstone for tendinopathy; effective but not uniquely so.',
              '**Energy storage / plyometric** — for those returning to throwing, contact, overhead sport.',
              '**Sport-specific** — task simulation, progressive return to play.',
            ],
          },
          {
            type: 'definition',
            term: 'Heavy slow resistance (HSR)',
            text: 'A protocol of slow tempo (e.g. 3s up, 3s down) at high relative load (~80% 1RM), 3 sets of 6–8 reps. Equivalent or superior outcomes to isolated eccentric protocols in tendinopathy, with better adherence.',
          },
        ],
      },
      {
        id: 'cuff-specific',
        title: 'Cuff-specific exercise selection',
        videoPlaceholder: '',
        blocks: [
          { type: 'h', text: 'Foundational exercises' },
          {
            type: 'ul',
            items: [
              '**External rotation in side-lying** — isolates infraspinatus and teres minor.',
              '**Standing external rotation with band** — easy to load progressively.',
              '**Full-can / scapular plane raise** — supraspinatus emphasis with lower impingement risk than empty-can.',
              '**Prone Y, T, W** — lower trapezius and scapular control.',
              '**Wall slides / scapular push-ups** — serratus anterior activation.',
              '**Internal rotation with band** — subscapularis loading; often under-prescribed.',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'Empty-can vs full-can',
            text: 'Both target supraspinatus, but full-can (thumbs up) reduces compression in the subacromial space and is generally better tolerated in symptomatic clients.',
          },
          { type: 'h', text: 'Dosing principles' },
          {
            type: 'ul',
            items: [
              'Use a pain-monitoring rule: pain during exercise ≤4/10, pain settling within 24 hours, no morning-after flare.',
              'Progress one variable at a time: load, range, tempo, complexity.',
              '2–3 sessions per week for the same exercise, with a rest day between heavy sessions.',
              'If progress stalls for 2–3 weeks, reassess — don’t just add load.',
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        q: 'A common pain-monitoring rule for tendinopathy rehabilitation states that pain during exercise should be:',
        options: [
          '0/10 — no pain at all',
          '≤4/10, settling within 24 hours, no morning-after flare',
          '≤7/10, with no time limit on settling',
          'Irrelevant — load only matters',
        ],
        answer: 1,
        explanation:
          'The widely used rule allows pain up to 4/10 during exercise as long as it settles within 24 hours and the next morning is no worse. Total avoidance of pain is unnecessary and often unhelpful.',
      },
      {
        q: 'Which of the following best describes the role of manual therapy in modern shoulder rehab?',
        options: [
          'A stand-alone treatment that produces lasting structural change',
          'A passive intervention that opens a short window for active loading',
          'Reserved only for end-stage cases',
          'Equally effective whether or not it is paired with exercise',
        ],
        answer: 1,
        explanation:
          'Manual therapy creates a short-lived window of changed sensitivity and movement. Pairing it immediately with active loading is what makes it clinically useful.',
      },
      {
        q: 'The "full-can" raise is generally preferred over the "empty-can" because:',
        options: [
          'It targets supraspinatus more selectively',
          'It reduces compression in the subacromial space and is better tolerated',
          'It is harder to perform',
          'It does not require the cuff to fire',
        ],
        answer: 1,
        explanation:
          'With thumbs up (full-can), the humerus is in slight external rotation, which clears the greater tuberosity from the acromion and reduces subacromial compression.',
      },
    ],
    caseStudy: null,
    tasks: [
      {
        title: 'Build a cuff exercise library',
        prompt:
          'Film yourself performing 6 cuff and scapular exercises with clear cueing. For each, write down: target muscle(s), starting dose (sets × reps × tempo), two regressions, two progressions. This library is your future practice toolkit — keep it.',
      },
      {
        title: 'Manual + active pairing',
        prompt:
          'With your supervisor, identify one manual technique you currently use and pair it deliberately with an active loading exercise. Document the rationale: why this technique opens which range, which exercise loads that range, and how you would dose it.',
      },
    ],
  },

  // ==========================================================
  //  04 — PROGRAMMING
  // ==========================================================
  {
    id: 'programming',
    number: '04',
    title: 'Programming the rehab',
    summary:
      'How to structure rehabilitation across the weeks. Phases, dosing, progression criteria, and avoiding the two cardinal errors: under-loading and rushing.',
    duration: '60 min',
    lessons: [
      {
        id: 'phases',
        title: 'Phases of rehabilitation',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Programming proceeds in overlapping phases. Movement between phases is governed by **criteria**, not by **time**.',
          },
          {
            type: 'ol',
            items: [
              '**Phase 1 — Settle & restore.** Reduce irritability, restore baseline ROM, re-establish pain-free contraction. Often isometrics, gentle ROM, education. ~1–3 weeks.',
              '**Phase 2 — Build capacity.** Heavy slow resistance through full ROM. Reintroduce daily activity. ~3–8 weeks.',
              '**Phase 3 — Build strength & control.** Higher loads, multi-planar work, scapulothoracic integration. ~6–12 weeks.',
              '**Phase 4 — Power, speed, sport-specific.** Plyometrics, energy storage, return-to-sport testing.',
              '**Phase 5 — Return & reinforcement.** Graded return, ongoing maintenance programme.',
            ],
          },
          {
            type: 'callout',
            tone: 'rust',
            title: 'Two cardinal errors',
            text: '1. **Under-loading.** Tendons need progressive load to remodel; "go gently" delivered for 12 weeks delivers 12 weeks of nothing. 2. **Rushing.** Skipping criteria-based progression is the most common cause of recurrence.',
          },
        ],
      },
      {
        id: 'dosing',
        title: 'Volume, intensity and frequency',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Dosing is the difference between rehabilitation and exercise theatre. Plan it, write it down, review it each session.',
          },
          { type: 'h', text: 'Useful starting numbers' },
          {
            type: 'ul',
            items: [
              '**Phase 1 isometrics**: 5 × 30–45 seconds at ~60–70% MVIC, 1–2 min rest, 5 days/week.',
              '**Phase 2 HSR**: 3–4 sets × 6–8 reps, 3s/3s tempo, 80% 1RM, 2–3 sessions/week.',
              '**Phase 3 strength**: 4–5 sets × 3–6 reps, heavier loads, 2 sessions/week.',
              '**Plyometrics**: low-volume, high-quality. 3 sets × 5–8 reps, full recovery between sets.',
            ],
          },
          {
            type: 'definition',
            term: 'MVIC',
            text: 'Maximum Voluntary Isometric Contraction — the maximum force a muscle can produce in an isometric hold. Used as a reference for dosing isometrics (e.g. "60% MVIC").',
          },
          {
            type: 'p',
            text: 'In practice, you will rarely measure MVIC directly. Use perceived effort (RPE) or a simple percentage of a tolerable load as a working proxy.',
          },
        ],
      },
      {
        id: 'progression-regression',
        title: 'Progression & regression criteria',
        videoPlaceholder: '',
        blocks: [
          { type: 'h', text: 'Progress when' },
          {
            type: 'ul',
            items: [
              'Current dose is tolerated comfortably (≤4/10 during, no flare next morning) for 2 consecutive sessions.',
              'Subjective function is improving (e.g. SPADI or PSFS scores trending positively).',
              'Movement quality is stable or improving — you are not buying load by losing control.',
            ],
          },
          { type: 'h', text: 'Regress when' },
          {
            type: 'ul',
            items: [
              'Pain pattern worsens persistently — irritability, night pain, function declining.',
              'Movement quality is breaking down to complete the dose.',
              'A real-life event has destabilised the picture (acute flare, illness, sleep disruption).',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'Progress one variable at a time',
            text: 'Increase load, OR range, OR speed, OR complexity. Changing two at once muddies the signal — when something flares, you won’t know which variable to walk back.',
          },
        ],
      },
    ],
    quiz: [
      {
        q: 'Movement between phases of rehabilitation should be governed primarily by:',
        options: [
          'Time elapsed since injury',
          'The patient’s preference',
          'Achievement of progression criteria',
          'Imaging findings',
        ],
        answer: 2,
        explanation:
          'Time-based progression ignores the individual response to load. Criteria-based progression (pain, function, movement quality) is the standard of modern rehab.',
      },
      {
        q: 'A reasonable starting dose for Phase 1 isometric loading of the rotator cuff is:',
        options: [
          '5 sets × 30–45 sec at ~60–70% MVIC, 5 days/week',
          '3 sets × 5 sec at maximal effort, daily',
          '10 sets × 2 minutes at full effort, twice daily',
          '1 set × 10 sec, once weekly',
        ],
        answer: 0,
        explanation:
          'Long-hold submaximal isometrics (around 5 × 30–45 seconds at 60–70% MVIC) are a well-established starting dose for early-phase tendinopathy.',
      },
      {
        q: 'When progressing a rehabilitation programme, the recommended approach is:',
        options: [
          'Change all variables together to maximise stimulus',
          'Increase one variable at a time and review the response',
          'Always increase load before considering ROM or complexity',
          'Only progress when the patient is completely pain-free',
        ],
        answer: 1,
        explanation:
          'Changing one variable at a time preserves your ability to interpret what has helped or what has caused a flare. It is the cleanest way to programme.',
      },
    ],
    caseStudy: null,
    tasks: [
      {
        title: 'Programme writing exercise',
        prompt:
          'For Margaret (the case from Module 02), write a 6-week programme spanning Phase 1 → Phase 2. Include exercise selection, sets/reps/tempo, frequency, progression criteria for moving to Phase 2, and what advice you will give her about her swimming during this period. Bring this to your supervisor for review.',
      },
    ],
  },

  // ==========================================================
  //  05 — SESSION PLANNING
  // ==========================================================
  {
    id: 'sessions',
    number: '05',
    title: 'Session planning & client communication',
    summary:
      'A great session is a useful session — for the client today, and for the clinician’s decision-making tomorrow. How to structure assessment, treatment and review.',
    duration: '60 min',
    lessons: [
      {
        id: 'subjective',
        title: 'The subjective examination',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'A well-conducted subjective gets you to the right two or three differentials before you ever lay hands on the client. It is also where the therapeutic relationship begins.',
          },
          { type: 'h', text: 'A useful structure' },
          {
            type: 'ul',
            items: [
              '**Presenting complaint** — in the client’s own words.',
              '**History of presenting complaint** — onset, mechanism, duration, behaviour, 24-hour pattern.',
              '**Aggravating and easing factors** — gives you provocation tests and treatment direction.',
              '**Past medical history & medications** — comorbidities, red flags, drugs that affect tissue (e.g. fluoroquinolones, statins, corticosteroids).',
              '**Social history** — work, sleep, sport, hobbies, support, stress.',
              '**Goals and expectations** — what does success look like for this person?',
              '**Yellow flags** — fear, avoidance, catastrophising, low self-efficacy.',
              '**Red flags screen** — explicit screening every time.',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'Listen first',
            text: 'In one classic study, clinicians interrupted patients within 11 seconds on average. Resist the urge. The first 60 seconds of unbroken speech often gives you 80% of the relevant information.',
          },
        ],
      },
      {
        id: 'objective',
        title: 'The objective examination',
        videoPlaceholder: '',
        blocks: [
          {
            type: 'p',
            text: 'Drive your objective from your subjective. Test the hypotheses you have already formed; do not run through a memorised checklist on every patient.',
          },
          { type: 'h', text: 'A workable shoulder objective' },
          {
            type: 'ol',
            items: [
              '**Observation** — posture, scapular position, muscle bulk, asymmetry.',
              '**Cervical screen** — quadrant, ROM, dermatomes, myotomes, reflexes if indicated.',
              '**Active ROM** — flexion, abduction, scapular plane elevation, hand-behind-back, hand-behind-neck.',
              '**Passive ROM** — particularly external rotation in adduction, comparing sides.',
              '**Resisted tests** — abduction, ER, IR; load tolerance and pain.',
              '**Special tests, sparingly** — e.g. Hawkins–Kennedy, empty/full-can, lift-off, belly press, O’Brien, apprehension. Cluster results; don’t hang a diagnosis on a single test.',
              '**Functional reassessment marker** — pick one painful or limited movement to retest after intervention.',
            ],
          },
          {
            type: 'callout',
            tone: 'rust',
            title: 'On special tests',
            text: 'Most shoulder special tests have only modest individual diagnostic accuracy. Cluster them, weight them against the rest of the picture, and treat them as confirming or refuting hypotheses — not as diagnostic verdicts.',
          },
        ],
      },
      {
        id: 'session-structure',
        title: 'Structuring the treatment session',
        videoPlaceholder: '',
        blocks: [
          { type: 'h', text: 'A repeatable session shape' },
          {
            type: 'ol',
            items: [
              '**Re-subjective (2–3 min).** What has changed since last session? Adherence to home programme? New events?',
              '**Reassess marker (2–3 min).** Retest the chosen functional marker.',
              '**Treatment block (15–20 min).** Manual where indicated, then loading. Always pair manual with active.',
              '**Re-reassess marker.** Has anything changed? Why or why not?',
              '**Programme update (5–10 min).** Review and progress home exercises. Demonstrate, get the client to demonstrate back.',
              '**Plan & document (5 min).** Goals for next session, timing, any onward referral discussion.',
            ],
          },
          {
            type: 'definition',
            term: 'PSFS',
            text: 'Patient-Specific Functional Scale — a brief outcome measure where the client identifies up to 5 activities they have difficulty with and rates each 0–10. Highly responsive to change and very practical.',
          },
        ],
      },
      {
        id: 'communication',
        title: 'Communication & documentation',
        videoPlaceholder: '',
        blocks: [
          { type: 'h', text: 'Therapeutic communication essentials' },
          {
            type: 'ul',
            items: [
              'Explain your reasoning — clients who understand "why" stick to a programme.',
              'Set realistic timeframes early. Expectations drive satisfaction more than outcomes.',
              'Use shared decision-making language: "Here are two options, this is my reasoning, what fits your week?"',
              'Check understanding by asking the client to summarise — not by asking "does that make sense?"',
              'Be honest about uncertainty. "I’m not 100% sure yet, here is what would change my view" builds trust, not erodes it.',
            ],
          },
          { type: 'h', text: 'Documentation that earns its keep' },
          {
            type: 'ul',
            items: [
              'SOAP, SOAPIER, or your service’s template — pick one and use it consistently.',
              'Document **clinical reasoning**, not just findings. "Negative empty can" is data; "negative empty can argues against supraspinatus loading defect" is reasoning.',
              'Outcome measures at intake, every 4–6 weeks, and at discharge.',
              'Always document consent — for treatment, for any imaging requested, for communication with other providers.',
            ],
          },
          {
            type: 'callout',
            tone: 'sage',
            title: 'Notes are for the next clinician',
            text: 'Write your notes as if you were going to be away for 6 weeks and someone else had to pick up this client cold. That is the standard.',
          },
        ],
      },
    ],
    quiz: [
      {
        q: 'Which is the most important reason for choosing a single functional reassessment marker each session?',
        options: [
          'It saves time on documentation',
          'It gives you, and the client, an objective signal of change within a session',
          'It removes the need for outcome measures',
          'It guarantees the treatment is working',
        ],
        answer: 1,
        explanation:
          'A reassessment marker is real-time feedback. It tells you whether what you just did made any difference, and it gives the client a tangible sense of progress within the session.',
      },
      {
        q: 'When delivering complex information to a client, the best way to check understanding is to:',
        options: [
          'Ask "does that make sense?"',
          'Ask the client to summarise the plan back in their own words',
          'Hand them a printed leaflet',
          'Repeat the explanation more slowly',
        ],
        answer: 1,
        explanation:
          'Asking the client to summarise (often called teach-back) is the only reliable way to confirm what has actually been understood, rather than what they think they should say "yes" to.',
      },
      {
        q: 'Which of the following is the most appropriate framing of clinical uncertainty to a client?',
        options: [
          'Avoid mentioning uncertainty so the client feels confident',
          '"I don’t really know what is going on, sorry"',
          '"I have two main thoughts about what is driving this. Here is how we’ll know which is right."',
          'Refer immediately for further imaging',
        ],
        answer: 2,
        explanation:
          'Honest, structured uncertainty — paired with a plan for resolving it — builds trust and demonstrates clinical reasoning. Pretending to certainty erodes both.',
      },
    ],
    caseStudy: null,
    tasks: [
      {
        title: 'Observed subjective',
        prompt:
          'Sit in on a supervisor’s subjective examination. Take notes on (1) the structure they use, (2) any open questions that yielded the most information, (3) anything you would have asked differently. Discuss your observations with them afterwards.',
      },
      {
        title: 'Run a session end-to-end',
        prompt:
          'With supervision, run a full session with a shoulder client: subjective, objective, treatment, programme update and documentation. Afterwards, write a 1-page reflection covering what went well, what you would change, and one specific thing you will do differently next time.',
      },
    ],
  },
]

// ============================================================
//  ASSESSMENT — END-OF-WEEK SUMMATIVE
// ============================================================
export const finalAssessment = {
  id: 'final',
  title: 'End-of-week assessment',
  description:
    'A short summative assessment covering material from all five modules. You will get instant feedback and an overall score. Aim for 80% or above before the supervisor sign-off conversation.',
  questions: [
    {
      q: 'A client presents with insidious lateral shoulder pain, painful arc 70°–110°, weak resisted ER, full passive ROM. The most likely working diagnosis is:',
      options: [
        'Adhesive capsulitis',
        'Rotator cuff–related shoulder pain',
        'AC joint sprain',
        'Posterior glenohumeral instability',
      ],
      answer: 1,
      explanation:
        'Insidious onset, painful arc, weak resisted ER and preserved passive ROM is a textbook RCRSP picture.',
    },
    {
      q: 'You see "2 cm full-thickness supraspinatus tear" on the imaging report of a 70-year-old with mild pain. The most appropriate next step is:',
      options: [
        'Refer for surgical opinion',
        'Tell the patient they have a torn shoulder and need to rest',
        'Correlate with examination and trial conservative management',
        'Repeat the scan',
      ],
      answer: 2,
      explanation:
        'Cuff tears are common and often asymptomatic in this age group. Correlate, don’t catastrophise.',
    },
    {
      q: 'Subscapularis is best assessed with which combination?',
      options: [
        'Empty-can + drop-arm',
        'Lift-off + belly press',
        'Hawkins–Kennedy + Neer',
        'Apprehension + relocation',
      ],
      answer: 1,
      explanation:
        'Lift-off and belly press both target subscapularis and are commonly clustered together.',
    },
    {
      q: 'Heavy slow resistance for tendinopathy typically uses:',
      options: [
        '3s up / 3s down tempo at ~80% 1RM, 6–8 reps',
        'Maximal speed, 15+ reps to failure',
        'Bodyweight only, daily',
        '1RM testing every session',
      ],
      answer: 0,
      explanation:
        'HSR is defined by slow tempo (typically 3s/3s), high relative load (~80% 1RM), moderate reps (6–8), 2–3 sessions/week.',
    },
    {
      q: 'Which is a yellow flag in shoulder rehab?',
      options: [
        'Reduced active ROM',
        'Catastrophic beliefs about the meaning of pain',
        'A 2 cm tear on MRI',
        'Painful arc on Hawkins–Kennedy',
      ],
      answer: 1,
      explanation:
        'Yellow flags are psychosocial — fear, catastrophising, low self-efficacy. They strongly influence outcome and must be addressed.',
    },
    {
      q: 'Loss of passive external rotation in adduction most strongly suggests:',
      options: [
        'Rotator cuff tear',
        'Adhesive capsulitis',
        'AC joint pathology',
        'Subacromial bursitis',
      ],
      answer: 1,
      explanation:
        'Restricted passive ER in adduction is the cardinal sign of frozen shoulder.',
    },
    {
      q: 'Pairing manual therapy with immediate active loading is recommended because:',
      options: [
        'Manual therapy alone is contraindicated',
        'The window of changed sensitivity after manual is short and best reinforced',
        'Insurance requires it',
        'It speeds up tissue healing on imaging',
      ],
      answer: 1,
      explanation:
        'The neuromodulatory effects of manual therapy are short-lived. Loading the new movement immediately reinforces the change.',
    },
    {
      q: 'A criterion-based progression to Phase 3 strength work would NOT typically include:',
      options: [
        'Pain ≤4/10 during current load with no flare',
        'Stable or improving movement quality',
        'A specific number of weeks since starting Phase 2',
        'Improving subjective function',
      ],
      answer: 2,
      explanation:
        'Time alone is not a progression criterion. Criteria are pain response, function and movement quality.',
    },
  ],
}
