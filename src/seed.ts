/* eslint-disable */
// @ts-nocheck

import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Intelligence } from './entities/intelligence.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { Child } from './entities/child.entity';
import { Assessment } from './entities/assessment.entity'; // 👈 NEW IMPORT
import { StudentResponse } from './entities/student-response.entity';
import { StudentScore } from './entities/student-score.entity';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'aadhya',
  password: 'super_secret_password',
  database: 'aadhya',
  entities: ['src/entities/*.entity.ts'],
  synchronize: true,
  dropSchema: true, // <--- 🧨 THIS DELETES EVERYTHING! 
});

async function seed() {
  try {
    console.log('🧨 Wiping Database Clean...');
    await dataSource.initialize();

    const intelRepo = dataSource.getRepository(Intelligence);
    const questionRepo = dataSource.getRepository(Question);
    const optionRepo = dataSource.getRepository(Option);
    const childRepo = dataSource.getRepository(Child);
    const assessmentRepo = dataSource.getRepository(Assessment); // 👈 NEW REPO

    console.log('🌱 Building Fresh Data...');

    // --- 1. Create Test Child ---
    const child = childRepo.create({ name: "Test Student", yob: 2015 });
    await childRepo.save(child);
    console.log('   ✅ Created Child');

    // --- 2. Create the Master Assessment (The "Test Paper") ---
    // 👇 THIS IS THE NEW PART
    const mainAssessment = assessmentRepo.create({
      title: "Multiple Intelligence Assessment Level 1",
      description: "Standard test for students aged 10-15"
    });
    await assessmentRepo.save(mainAssessment);
    console.log('   ✅ Created Assessment: "Level 1"');

    // --- 3. Define Clean Data ---
    const allData = [
      { type: 'Logical-Mathematical', questions: ['I enjoy solving puzzles.', 'Math is fun for me.'] },
      { type: 'Musical', questions: ['I remember tunes easily.', 'I like singing.'] },
      { type: 'Naturalistic', questions: ['I love animals.', 'I like being outdoors.'] },
      { type: 'Existential', questions: ['I think about life often.', 'I wonder about the universe.'] },
      { type: 'Interpersonal', questions: ['I make friends easily.', 'I like helping others.'] },
      { type: 'Bodily-Kinesthetic', questions: ['I am good at sports.', 'I move around a lot.'] },
      { type: 'Linguistic', questions: ['I love reading.', 'I write stories.'] },
      { type: 'Intra-personal', questions: ['I know myself well.', 'I like being alone sometimes.'] },
    ];

    const optionsData = [
      { text: 'Very Positive', weight: 5 },
      { text: 'Positive', weight: 2 },
      { text: 'Neutral', weight: 0 },
      { text: 'Negative', weight: -2 },
      { text: 'Very Negative', weight: -5 },
    ];

    // --- 4. Insert Data (Questions linked to Assessment) ---
    for (const group of allData) {
      let intel = intelRepo.create({ name: group.type });
      await intelRepo.save(intel);

      for (const qText of group.questions) {
        const question = questionRepo.create({ 
            text: qText, 
            intelligence: intel,
            assessment: mainAssessment // 👈 LINK QUESTION TO ASSESSMENT
        });
        await questionRepo.save(question);

        for (const opt of optionsData) {
          const option = optionRepo.create({ text: opt.text, weight: opt.weight, question: question });
          await optionRepo.save(option);
        }
      }
      console.log(`   ✅ Added ${group.type}`);
    }

    console.log('✨ Database Reborn! 100% Clean.');
    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', error);
    await dataSource.destroy();
  }
}

seed();