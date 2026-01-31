const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../server/models/User');
const Note = require('../server/models/Note');
const Quiz = require('../server/models/Quiz');

dotenv.config({ path: '../server/.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ghana-study-guide';

// Sample users
const users = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    gradeLevel: 'SHS 3',
    role: 'admin'
  },
  {
    name: 'Kwame Mensah',
    email: 'student@test.com',
    password: 'student123',
    gradeLevel: 'Basic 6',
    role: 'student'
  }
];

// Sample notes for Basic 6 Mathematics
const basic6MathNotes = [
  {
    title: 'Introduction to Fractions',
    content: `# Understanding Fractions

A fraction represents a part of a whole. It consists of two numbers:
- **Numerator** (top number): Shows how many parts we have
- **Denominator** (bottom number): Shows how many equal parts the whole is divided into

## Example:
In the fraction 3/4:
- 3 is the numerator
- 4 is the denominator
- This means we have 3 parts out of 4 equal parts

## Types of Fractions:
1. **Proper Fractions**: Numerator < Denominator (e.g., 2/5, 3/7)
2. **Improper Fractions**: Numerator ≥ Denominator (e.g., 7/4, 5/5)
3. **Mixed Numbers**: A whole number and a fraction (e.g., 2 1/3)

## Converting Between Types:
- To convert improper to mixed: Divide numerator by denominator
- To convert mixed to improper: Multiply whole number by denominator, add numerator`,
    subject: 'Mathematics',
    gradeLevel: 'Basic 6',
    topic: 'Fractions',
    videoUrl: 'https://www.youtube.com/watch?v=uRJNNl_4DjQ',
    tags: ['fractions', 'basics', 'numerator', 'denominator'],
    difficulty: 'Easy',
    orderIndex: 1
  },
  {
    title: 'Adding and Subtracting Fractions',
    content: `# Adding and Subtracting Fractions

## Same Denominator:
When fractions have the same denominator, simply add or subtract the numerators:

**Addition**: 2/7 + 3/7 = 5/7
**Subtraction**: 5/8 - 2/8 = 3/8

## Different Denominators:
1. Find the Least Common Denominator (LCD)
2. Convert fractions to equivalent fractions with LCD
3. Add or subtract numerators
4. Simplify if possible

**Example**: 1/3 + 1/4
- LCD of 3 and 4 is 12
- 1/3 = 4/12 and 1/4 = 3/12
- 4/12 + 3/12 = 7/12

## Practice Tips:
- Always check if your answer can be simplified
- For mixed numbers, convert to improper fractions first
- Double-check your LCD calculation`,
    subject: 'Mathematics',
    gradeLevel: 'Basic 6',
    topic: 'Fractions',
    videoUrl: 'https://www.youtube.com/watch?v=aNu5AaETpoU',
    tags: ['fractions', 'addition', 'subtraction'],
    difficulty: 'Medium',
    orderIndex: 2
  },
  {
    title: 'Understanding Decimals',
    content: `# Decimals

A decimal is another way to represent parts of a whole using place value.

## Place Value:
- Ones | Tenths | Hundredths | Thousandths
- 3 . 1 4 5

## Reading Decimals:
- 0.5 = "five tenths"
- 0.25 = "twenty-five hundredths"
- 3.14 = "three and fourteen hundredths"

## Converting Fractions to Decimals:
Divide the numerator by the denominator:
- 1/2 = 1 ÷ 2 = 0.5
- 3/4 = 3 ÷ 4 = 0.75
- 1/5 = 1 ÷ 5 = 0.2

## Converting Decimals to Fractions:
1. Count decimal places
2. Put decimal number over power of 10
3. Simplify

Example: 0.75 = 75/100 = 3/4`,
    subject: 'Mathematics',
    gradeLevel: 'Basic 6',
    topic: 'Decimals',
    videoUrl: 'https://www.youtube.com/watch?v=pUWUFDt-9gE',
    tags: ['decimals', 'place value', 'conversion'],
    difficulty: 'Easy',
    orderIndex: 1
  }
];

// Sample notes for SHS 2 Chemistry
const shs2ChemistryNotes = [
  {
    title: 'Introduction to Acids and Bases',
    content: `# Acids and Bases

## Acids:
Substances that produce hydrogen ions (H⁺) when dissolved in water.

**Properties of Acids:**
- Sour taste (DO NOT taste in lab!)
- Turn blue litmus paper red
- pH less than 7
- React with metals to produce hydrogen gas
- React with carbonates to produce CO₂

**Common Acids:**
- Hydrochloric acid (HCl)
- Sulfuric acid (H₂SO₄)
- Nitric acid (HNO₃)
- Citric acid (in citrus fruits)

## Bases:
Substances that produce hydroxide ions (OH⁻) when dissolved in water.

**Properties of Bases:**
- Bitter taste and slippery feel
- Turn red litmus paper blue
- pH greater than 7
- React with acids to form salt and water (neutralization)

**Common Bases:**
- Sodium hydroxide (NaOH)
- Potassium hydroxide (KOH)
- Calcium hydroxide (Ca(OH)₂)
- Ammonia (NH₃)

## pH Scale:
- 0-6: Acidic
- 7: Neutral
- 8-14: Basic (Alkaline)`,
    subject: 'Chemistry',
    gradeLevel: 'SHS 2',
    topic: 'Acids and Bases',
    videoUrl: 'https://www.youtube.com/watch?v=DupXDD87oHc',
    tags: ['acids', 'bases', 'pH', 'indicators'],
    difficulty: 'Medium',
    orderIndex: 1
  },
  {
    title: 'The Periodic Table',
    content: `# The Periodic Table

The periodic table organizes all known chemical elements based on their atomic number and properties.

## Organization:
- **Periods**: Horizontal rows (1-7)
- **Groups**: Vertical columns (1-18)
- Elements in the same group have similar chemical properties

## Important Groups:
1. **Group 1 - Alkali Metals**: Li, Na, K, Rb, Cs, Fr
   - Very reactive
   - Soft metals
   - React vigorously with water

2. **Group 17 - Halogens**: F, Cl, Br, I, At
   - Very reactive non-metals
   - Form salts with metals

3. **Group 18 - Noble Gases**: He, Ne, Ar, Kr, Xe, Rn
   - Very unreactive
   - Complete outer electron shells

## Element Information:
Each element box shows:
- Atomic number (number of protons)
- Element symbol
- Element name
- Atomic mass

## Metals, Non-metals, and Metalloids:
- **Metals**: Left side and center (shiny, conduct electricity)
- **Non-metals**: Right side (dull, insulators)
- **Metalloids**: Along the "staircase" (properties of both)`,
    subject: 'Chemistry',
    gradeLevel: 'SHS 2',
    topic: 'Periodic Table',
    videoUrl: 'https://www.youtube.com/watch?v=fPnwBITSmgU',
    tags: ['periodic table', 'elements', 'groups', 'periods'],
    difficulty: 'Easy',
    orderIndex: 1
  },
  {
    title: 'Chemical Bonding',
    content: `# Chemical Bonding

Chemical bonds are forces that hold atoms together in compounds.

## Types of Bonds:

### 1. Ionic Bonding
- Transfer of electrons from metal to non-metal
- Forms ions (charged particles)
- Strong electrostatic attraction between oppositely charged ions
- Example: NaCl (sodium chloride)
  - Na loses 1 electron → Na⁺
  - Cl gains 1 electron → Cl⁻

**Properties of Ionic Compounds:**
- High melting and boiling points
- Conduct electricity when molten or dissolved
- Usually soluble in water
- Form crystalline structures

### 2. Covalent Bonding
- Sharing of electrons between non-metals
- Forms molecules
- Example: H₂O (water)
  - Each H shares 1 electron with O
  - O shares 2 electrons (one with each H)

**Properties of Covalent Compounds:**
- Lower melting and boiling points
- Usually don't conduct electricity
- Can be solid, liquid, or gas
- Many are soluble in organic solvents

### 3. Metallic Bonding
- Found in metals
- "Sea" of delocalized electrons
- Explains why metals conduct electricity and are malleable

## Drawing Dot-and-Cross Diagrams:
Use dots for one atom's electrons and crosses for another's to show electron sharing or transfer.`,
    subject: 'Chemistry',
    gradeLevel: 'SHS 2',
    topic: 'Chemical Bonding',
    videoUrl: 'https://www.youtube.com/watch?v=QqjcCvzWwgw',
    tags: ['bonding', 'ionic', 'covalent', 'metallic'],
    difficulty: 'Hard',
    orderIndex: 1
  }
];

// Sample quiz for Basic 6 Mathematics
const basic6MathQuiz = {
  title: 'Fractions Quiz',
  description: 'Test your understanding of fractions',
  subject: 'Mathematics',
  gradeLevel: 'Basic 6',
  topic: 'Fractions',
  duration: 15,
  passingScore: 60,
  questions: [
    {
      question: 'What is 2/5 + 1/5?',
      type: 'multiple-choice',
      options: ['1/5', '3/5', '3/10', '2/10'],
      correctAnswer: '3/5',
      explanation: 'When adding fractions with the same denominator, add the numerators: 2 + 1 = 3, so the answer is 3/5',
      difficulty: 'Easy',
      points: 1
    },
    {
      question: 'Which of these is an improper fraction?',
      type: 'multiple-choice',
      options: ['2/3', '5/8', '7/4', '1/2'],
      correctAnswer: '7/4',
      explanation: 'An improper fraction has a numerator greater than or equal to the denominator. 7/4 = 1.75',
      difficulty: 'Easy',
      points: 1
    },
    {
      question: 'What is 1/2 + 1/4?',
      type: 'multiple-choice',
      options: ['2/6', '3/4', '1/6', '2/4'],
      correctAnswer: '3/4',
      explanation: 'Convert to common denominator: 1/2 = 2/4, then 2/4 + 1/4 = 3/4',
      difficulty: 'Medium',
      points: 2
    },
    {
      question: 'Convert 5/2 to a mixed number',
      type: 'multiple-choice',
      options: ['2 1/2', '1 1/2', '2 1/3', '3 1/2'],
      correctAnswer: '2 1/2',
      explanation: '5 ÷ 2 = 2 remainder 1, so 5/2 = 2 1/2',
      difficulty: 'Medium',
      points: 2
    },
    {
      question: 'A fraction has a numerator smaller than its denominator',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'This describes a proper fraction, not all fractions. Improper fractions have numerators equal to or greater than denominators.',
      difficulty: 'Easy',
      points: 1
    }
  ]
};

// Sample quiz for SHS 2 Chemistry
const shs2ChemistryQuiz = {
  title: 'Acids and Bases Quiz',
  description: 'Test your knowledge of acids and bases',
  subject: 'Chemistry',
  gradeLevel: 'SHS 2',
  topic: 'Acids and Bases',
  duration: 20,
  passingScore: 60,
  questions: [
    {
      question: 'What is the pH of a neutral solution?',
      type: 'multiple-choice',
      options: ['0', '7', '14', '1'],
      correctAnswer: '7',
      explanation: 'A neutral solution has a pH of 7, which is neither acidic nor basic.',
      difficulty: 'Easy',
      points: 1
    },
    {
      question: 'Which of these is a property of acids?',
      type: 'multiple-choice',
      options: ['Slippery feel', 'Bitter taste', 'Turn blue litmus red', 'pH greater than 7'],
      correctAnswer: 'Turn blue litmus red',
      explanation: 'Acids turn blue litmus paper red. The other options are properties of bases.',
      difficulty: 'Easy',
      points: 1
    },
    {
      question: 'What is produced when an acid reacts with a base?',
      type: 'multiple-choice',
      options: ['Water only', 'Salt only', 'Salt and water', 'Hydrogen gas'],
      correctAnswer: 'Salt and water',
      explanation: 'This is called a neutralization reaction: Acid + Base → Salt + Water',
      difficulty: 'Medium',
      points: 2
    },
    {
      question: 'Sodium hydroxide (NaOH) is a strong base',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'NaOH is indeed a strong base that completely dissociates in water.',
      difficulty: 'Easy',
      points: 1
    },
    {
      question: 'Which acid is found in the stomach?',
      type: 'multiple-choice',
      options: ['Sulfuric acid', 'Hydrochloric acid', 'Nitric acid', 'Acetic acid'],
      correctAnswer: 'Hydrochloric acid',
      explanation: 'The stomach produces hydrochloric acid (HCl) to help digest food.',
      difficulty: 'Medium',
      points: 2
    }
  ]
};

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Note.deleteMany({});
    await Quiz.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log('👥 Created users');

    const adminUser = createdUsers.find(u => u.role === 'admin');

    // Create notes
    const allNotes = [...basic6MathNotes, ...shs2ChemistryNotes].map(note => ({
      ...note,
      createdBy: adminUser._id
    }));
    await Note.create(allNotes);
    console.log('📝 Created notes');

    // Create quizzes
    await Quiz.create([
      { ...basic6MathQuiz, createdBy: adminUser._id },
      { ...shs2ChemistryQuiz, createdBy: adminUser._id }
    ]);
    console.log('✅ Created quizzes');

    console.log('\n✨ Database seeded successfully!');
    console.log('\nSample Credentials:');
    console.log('Admin - Email: admin@test.com | Password: admin123');
    console.log('Student - Email: student@test.com | Password: student123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
