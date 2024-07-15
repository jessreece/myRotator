-- Insert data into SKILLS table
INSERT INTO SKILLS (skill)
VALUES 
  ('JavaScript'),
  ('React'),
  ('HTML/CSS'),
  ('UI/UX design'),
  ('Java'),
  ('Databases'),
  ('Python'),
  ('C++'),
  ('AWS'),
  ('Git'),
  ('Swift'),
  ('Node.js'),
  ('R'),
  ('Machine Learning'),
  ('Agile Methodology'),
  ('Security Testing'),
  ('Automated Testing'),
  ('Angular'),
  ('Android'),
  ('Azure');



-- Step 1: Insert the person without specifying supervisor_id
INSERT INTO PEOPLE (name, username, open_to_rotate_teams, email)
VALUES 
    ('Luke Shuttleworth', 'lshuttleworth', TRUE, 'luke.shuttleworth@kpmg.co.uk'),
    ('Matt Upperton', 'mupperton', FALSE, 'matt.upperton@kpmg.co.uk'),
    ('Example Manager', 'sparemanager', FALSE, 'example.manager@kpmg.co.uk'),
    ('Emily Johnson', 'ejohnson', TRUE, 'emily.johnson@example.com'),
    ('Michael Smith', 'msmith', FALSE, 'michael.smith@example.com'),
    ('Amanda Brown', 'abrown', TRUE, 'amanda.brown@example.com'),
    ('David Wilson', 'dwilson', FALSE, 'david.wilson@example.com'),
    ('Jennifer Davis', 'jdavis', TRUE, 'jennifer.davis@example.com'),
    ('Christopher Taylor', 'ctaylor', FALSE, 'christopher.taylor@example.com'),
    ('Samantha Martinez', 'smartinez', TRUE, 'samantha.martinez@example.com'),
    ('Ryan Anderson', 'randerson', FALSE, 'ryan.anderson@example.com'),
    ('Jessica Thomas', 'jthomas', TRUE, 'jessica.thomas@example.com'),
    ('Kevin Garcia', 'kgarcia', FALSE, 'kevin.garcia@example.com'),
    ('Sarah Hernandez', 'shernandez', TRUE, 'sarah.hernandez@example.com'),
    ('Daniel Nguyen', 'dnguyen', FALSE, 'daniel.nguyen@example.com'),
    ('Ashley Brown', 'abrown2', TRUE, 'ashley.brown@example.com'),
    ('James Rodriguez', 'jrodriguez', FALSE, 'james.rodriguez@example.com'),
    ('Taylor Walker', 'twalker', TRUE, 'taylor.walker@example.com');

-- Step 2: Update the supervisor_id
UPDATE PEOPLE
SET supervisor_id = (
    SELECT id FROM PEOPLE WHERE name = 'Matt Upperton' LIMIT 1
)
WHERE name IN ('Luke Shuttleworth', 'Emily Johnson', 'Amanda Brown', 'Jennifer Davis', 'Samantha Martinez', 'Jessica Thomas', 'Sarah Hernandez', 'Ashley Brown', 'Taylor Walker');

UPDATE PEOPLE
SET supervisor_id = (
    SELECT id FROM PEOPLE WHERE name = 'Example Manager' LIMIT 1
)
WHERE name IN ('Michael Smith', 'David Wilson', 'Christopher Taylor', 'Ryan Anderson', 'Kevin Garcia', 'Daniel Nguyen', 'James Rodriguez');


-- Insert data into TEAMS table
INSERT INTO TEAMS (name, description, team_lead_person_id)
VALUES 
  ('CDD Engineering', 'Lorem ipsum', (SELECT id FROM PEOPLE WHERE name = 'Matt Upperton' LIMIT 1)),
  ('Frontend Development', 'Responsible for user interfaces and client-side development', (SELECT id FROM PEOPLE WHERE name = 'Matt Upperton' LIMIT 1)),
  ('Backend Development', 'Handles server-side logic and database management', (SELECT id FROM PEOPLE WHERE name = 'Example Manager' LIMIT 1)),
  ('DevOps Team', 'Focuses on deployment, automation, and infrastructure', (SELECT id FROM PEOPLE WHERE name = 'Example Manager' LIMIT 1)),
  ('Mobile App Development', 'Specializes in mobile application development', (SELECT id FROM PEOPLE WHERE name = 'Matt Upperton' LIMIT 1)),
  ('Data Science Team', 'Works on data analysis and machine learning projects', (SELECT id FROM PEOPLE WHERE name = 'Example Manager' LIMIT 1)),
  ('Quality Assurance', 'Ensures the quality and functionality of software products', (SELECT id FROM PEOPLE WHERE name = 'Matt Upperton' LIMIT 1)),
  ('Security Team', 'Focuses on ensuring the security of applications and systems', (SELECT id FROM PEOPLE WHERE name = 'Example Manager' LIMIT 1)),
  ('Full Stack Development', 'Covers both frontend and backend development', (SELECT id FROM PEOPLE WHERE name = 'Matt Upperton' LIMIT 1)),
  ('Cloud Solutions', 'Specializes in developing applications for cloud platforms', (SELECT id FROM PEOPLE WHERE name = 'Example Manager' LIMIT 1)),
  ('Agile Project Management', 'Manages projects using Agile methodologies', (SELECT id FROM PEOPLE WHERE name = 'Matt Upperton' LIMIT 1));


-- Insert data into TEAM_SKILLS table
INSERT INTO TEAM_SKILLS (team_id, skill_id, needed_for_team)
VALUES 
  ((SELECT id FROM TEAMS WHERE name = 'CDD Engineering'), (SELECT id FROM SKILLS WHERE skill = 'JavaScript'), FALSE),  -- CDD Engineering team has JavaScript skill
  ((SELECT id FROM TEAMS WHERE name ='CDD Engineering'), (SELECT id FROM SKILLS WHERE skill = 'React'), FALSE),  -- CDD Engineering team has React skill
  ((SELECT id FROM TEAMS WHERE name = 'CDD Engineering'), (SELECT id FROM SKILLS WHERE skill = 'AWS'), FALSE),  -- CDD Engineering team has AWS skill
  ((SELECT id FROM TEAMS WHERE name = 'CDD Engineering'), (SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), FALSE),   -- CDD Engineering team has Agile Methodology skill

  ((SELECT id FROM TEAMS WHERE name = 'Frontend Development'), (SELECT id FROM SKILLS WHERE skill = 'JavaScript'), FALSE),  -- Frontend Development team has JavaScript skill
  ((SELECT id FROM TEAMS WHERE name ='Frontend Development'), (SELECT id FROM SKILLS WHERE skill = 'React'), FALSE),  -- Frontend Development team has React skill
  ((SELECT id FROM TEAMS WHERE name = 'Frontend Development'), (SELECT id FROM SKILLS WHERE skill = 'HTML/CSS'), FALSE),  -- Frontend Development team has HTML/CSS skill
  ((SELECT id FROM TEAMS WHERE name = 'Frontend Development'), (SELECT id FROM SKILLS WHERE skill = 'UI/UX design'), FALSE),   -- Frontend Development team has UI/UX design skill

  ((SELECT id FROM TEAMS WHERE name ='Backend Development'), (SELECT id FROM SKILLS WHERE skill = 'Java'), FALSE),  -- Backend Development team has Java skill
  ((SELECT id FROM TEAMS WHERE name ='Backend Development'), (SELECT id FROM SKILLS WHERE skill = 'Databases'), TRUE),  -- Backend Development team has Databases skill
  ((SELECT id FROM TEAMS WHERE name = 'Backend Development'), (SELECT id FROM SKILLS WHERE skill = 'Python'), TRUE),  -- Backend Development team has Python skill
  ((SELECT id FROM TEAMS WHERE name = 'Backend Development'), (SELECT id FROM SKILLS WHERE skill = 'C++'), FALSE),  -- Backend Development team has C++ skill

  ((SELECT id FROM TEAMS WHERE name ='DevOps Team'), (SELECT id FROM SKILLS WHERE skill = 'AWS'), TRUE),  -- DevOps Team has AWS skill
  ((SELECT id FROM TEAMS WHERE name ='DevOps Team'), (SELECT id FROM SKILLS WHERE skill = 'Git'), TRUE),  -- DevOps Team has Git skill

  ((SELECT id FROM TEAMS WHERE name ='Mobile App Development'), (SELECT id FROM SKILLS WHERE skill = 'React'), FALSE),  -- Mobile App Development team has React skill
  ((SELECT id FROM TEAMS WHERE name ='Mobile App Development'), (SELECT id FROM SKILLS WHERE skill = 'Node.js'), FALSE),  -- Mobile App Development team has Node.js skill
  ((SELECT id FROM TEAMS WHERE name = 'Mobile App Development'), (SELECT id FROM SKILLS WHERE skill = 'Swift'), FALSE),  -- Mobile App Development team has Swift skill
  ((SELECT id FROM TEAMS WHERE name = 'Mobile App Development'), (SELECT id FROM SKILLS WHERE skill = 'Android'), FALSE),  -- Mobile App Development team has Android skill

  ((SELECT id FROM TEAMS WHERE name ='Data Science Team'), (SELECT id FROM SKILLS WHERE skill = 'Databases'), TRUE),  -- Data Science Team has Databases skill
  ((SELECT id FROM TEAMS WHERE name ='Data Science Team'), (SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), FALSE),  -- Data Science Team has Agile Methodology skill
  ((SELECT id FROM TEAMS WHERE name = 'Data Science Team'), (SELECT id FROM SKILLS WHERE skill = 'R'), FALSE),  -- Data Science Team has R skill
  ((SELECT id FROM TEAMS WHERE name = 'Data Science Team'), (SELECT id FROM SKILLS WHERE skill = 'Machine Learning'), TRUE),  -- Data Science Team has Machine Learning skill

  ((SELECT id FROM TEAMS WHERE name ='Quality Assurance'), (SELECT id FROM SKILLS WHERE skill = 'Git'), FALSE),  -- Quality Assurance team has Git skill
  ((SELECT id FROM TEAMS WHERE name ='Quality Assurance'), (SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), FALSE),  -- Quality Assurance team has Agile Methodology skill
  ((SELECT id FROM TEAMS WHERE name = 'Quality Assurance'), (SELECT id FROM SKILLS WHERE skill = 'Automated Testing'), TRUE),  -- Quality Assurance team has Automated Testing skill
  ((SELECT id FROM TEAMS WHERE name = 'Quality Assurance'), (SELECT id FROM SKILLS WHERE skill = 'Security Testing'), TRUE),  -- Quality Assurance team has Security Testing skill

  ((SELECT id FROM TEAMS WHERE name ='Security Team'), (SELECT id FROM SKILLS WHERE skill = 'Databases'), TRUE),  -- Security Team has Databases skill
  ((SELECT id FROM TEAMS WHERE name ='Security Team'), (SELECT id FROM SKILLS WHERE skill = 'AWS'), TRUE),  -- Security Team has AWS skill

  ((SELECT id FROM TEAMS WHERE name ='Full Stack Development'), (SELECT id FROM SKILLS WHERE skill = 'JavaScript'), FALSE),  -- Full Stack Development team has JavaScript skill
  ((SELECT id FROM TEAMS WHERE name ='Full Stack Development'), (SELECT id FROM SKILLS WHERE skill = 'Java'), FALSE),  -- Full Stack Development team has Java skill
  ((SELECT id FROM TEAMS WHERE name = 'Full Stack Development'), (SELECT id FROM SKILLS WHERE skill = 'Angular'), FALSE),  -- Full Stack Development team has Angular skill
  ((SELECT id FROM TEAMS WHERE name = 'Full Stack Development'), (SELECT id FROM SKILLS WHERE skill = 'Node.js'), FALSE),  -- Full Stack Development team has Node.js skill

  ((SELECT id FROM TEAMS WHERE name ='Cloud Solutions'), (SELECT id FROM SKILLS WHERE skill = 'AWS'), TRUE),  -- Cloud Solutions team has AWS skill
  ((SELECT id FROM TEAMS WHERE name ='Cloud Solutions'), (SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), FALSE),  -- Cloud Solutions team has Agile Methodology skill
  ((SELECT id FROM TEAMS WHERE name = 'Cloud Solutions'), (SELECT id FROM SKILLS WHERE skill = 'Azure'), TRUE),  -- Cloud Solutions team has Azure skill
  ((SELECT id FROM TEAMS WHERE name = 'Cloud Solutions'), (SELECT id FROM SKILLS WHERE skill = 'Git'), FALSE),  -- Cloud Solutions team has Git skill

  ((SELECT id FROM TEAMS WHERE name ='Agile Project Management'), (SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), TRUE),  -- Agile Project Management team has Agile Methodology skill
  ((SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), (SELECT id FROM SKILLS WHERE skill = 'Git'), TRUE);  -- Agile Project Management team has Git skill
 
  

-- Insert data into PERSON_TEAM_CURRENT_ASSIGNMENT table
INSERT INTO PERSON_TEAM_CURRENT_ASSIGNMENT (person_id, team_id, start_date)
VALUES 
    ((SELECT id FROM PEOPLE WHERE name = 'Luke Shuttleworth'), (SELECT id FROM TEAMS WHERE name = 'Frontend Development'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Emily Johnson'), (SELECT id FROM TEAMS WHERE name = 'Frontend Development'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Michael Smith'), (SELECT id FROM TEAMS WHERE name = 'Backend Development'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Amanda Brown'), (SELECT id FROM TEAMS WHERE name = 'DevOps Team'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'David Wilson'), (SELECT id FROM TEAMS WHERE name = 'DevOps Team'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Jennifer Davis'), (SELECT id FROM TEAMS WHERE name = 'Mobile App Development'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Christopher Taylor'), (SELECT id FROM TEAMS WHERE name = 'Data Science Team'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Samantha Martinez'), (SELECT id FROM TEAMS WHERE name = 'Quality Assurance'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Ryan Anderson'), (SELECT id FROM TEAMS WHERE name = 'Security Team'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Jessica Thomas'), (SELECT id FROM TEAMS WHERE name = 'Full Stack Development'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Kevin Garcia'), (SELECT id FROM TEAMS WHERE name = 'Cloud Solutions'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Sarah Hernandez'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Daniel Nguyen'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Ashley Brown'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'James Rodriguez'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2023-01-01'),
    ((SELECT id FROM PEOPLE WHERE name = 'Taylor Walker'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2023-01-01');


-- Insert data into PERSON_TEAM_PAST_ASSIGNMENT table
INSERT INTO PERSON_TEAM_PAST_ASSIGNMENT (person_id, team_id, start_date, end_date)
VALUES 
    ((SELECT id FROM PEOPLE WHERE name = 'Luke Shuttleworth'), (SELECT id FROM TEAMS WHERE name = 'Full Stack Development'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Matt Upperton'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Example Manager'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Emily Johnson'), (SELECT id FROM TEAMS WHERE name = 'Frontend Development'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Michael Smith'), (SELECT id FROM TEAMS WHERE name = 'Backend Development'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Amanda Brown'), (SELECT id FROM TEAMS WHERE name = 'DevOps Team'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'David Wilson'), (SELECT id FROM TEAMS WHERE name = 'DevOps Team'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Jennifer Davis'), (SELECT id FROM TEAMS WHERE name = 'Mobile App Development'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Christopher Taylor'), (SELECT id FROM TEAMS WHERE name = 'Data Science Team'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Samantha Martinez'), (SELECT id FROM TEAMS WHERE name = 'Quality Assurance'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Ryan Anderson'), (SELECT id FROM TEAMS WHERE name = 'Security Team'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Jessica Thomas'), (SELECT id FROM TEAMS WHERE name = 'Full Stack Development'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Kevin Garcia'), (SELECT id FROM TEAMS WHERE name = 'Cloud Solutions'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Sarah Hernandez'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Daniel Nguyen'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Ashley Brown'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'James Rodriguez'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2022-01-01', '2022-12-31'),
    ((SELECT id FROM PEOPLE WHERE name = 'Taylor Walker'), (SELECT id FROM TEAMS WHERE name = 'Agile Project Management'), '2022-01-01', '2022-12-31');



-- Insert data into TEAM_AVAILABILITY table
INSERT INTO TEAM_AVAILABILITY (team_id, grade, quantity)
VALUES 
    ((SELECT id FROM TEAMS WHERE name = 'Frontend Development'),'D', 5),   -- Frontend Development team has 5 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Frontend Development'), 'E', 3),   -- Frontend Development team has 3 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'Backend Development'), 'D', 6),   -- Backend Development team has 6 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Backend Development'), 'E', 4),   -- Backend Development team has 4 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'DevOps Team'), 'D', 4),   -- DevOps Team has 4 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'DevOps Team'), 'E', 2),   -- DevOps Team has 2 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'Mobile App Development'), 'D', 5),   -- Mobile App Development team has 5 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Mobile App Development'), 'E', 3),   -- Mobile App Development team has 3 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'Data Science Team'), 'D', 7),   -- Data Science Team has 7 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Data Science Team'), 'E', 5),   -- Data Science Team has 5 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'Quality Assurance'), 'D', 4),   -- Quality Assurance team has 4 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Quality Assurance'), 'E', 2),   -- Quality Assurance team has 2 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'Security Team'), 'D', 6),   -- Security Team has 6 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Security Team'), 'E', 4),   -- Security Team has 4 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'Full Stack Development'), 'D', 5),   -- Full Stack Development team has 5 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Full Stack Development'), 'E', 3),   -- Full Stack Development team has 3 members available for grade E
    ((SELECT id FROM TEAMS WHERE name = 'Cloud Solutions'), 'D', 4),  -- Cloud Solutions team has 4 members available for grade D
    ((SELECT id FROM TEAMS WHERE name = 'Cloud Solutions'), 'E', 2);  -- Cloud Solutions team has 2 members available for grade E

INSERT INTO LEARNING (skill_id, resource_name, resource_type, resource_link)
VALUES 
  ((SELECT id FROM SKILLS WHERE skill = 'JavaScript'), 'JavaScript Course on Codecademy', 'Codecademy', 'https://www.codecademy.com/learn/introduction-to-javascript'),
  ((SELECT id FROM SKILLS WHERE skill = 'JavaScript'), 'JavaScript Tutorial for Beginners: Learn JavaScript Basics in 1 Hour', 'YouTube', 'https://www.youtube.com/watch?v=W6NZfCO5SIk'),
  ((SELECT id FROM SKILLS WHERE skill = 'JavaScript'), 'JavaScript Crash Course For Beginners', 'YouTube', 'https://www.youtube.com/watch?v=hdI2bqOjy3c'),
  ((SELECT id FROM SKILLS WHERE skill = 'React'), 'React Course on Codecademy', 'Codecademy', 'https://www.codecademy.com/learn/react-101'),
  ((SELECT id FROM SKILLS WHERE skill = 'React'), 'React JS Crash Course', 'YouTube', 'https://www.youtube.com/watch?v=sBws8MSXN7A'),
  ((SELECT id FROM SKILLS WHERE skill = 'React'), 'Learn React In 30 Minutes', 'YouTube', 'https://www.youtube.com/watch?v=hQAHSlTtcmY'),
  ((SELECT id FROM SKILLS WHERE skill = 'HTML/CSS'), 'HTML & CSS Learning Path', 'PluralSight', 'https://www.pluralsight.com/paths/html-and-css'),
  ((SELECT id FROM SKILLS WHERE skill = 'HTML/CSS'), 'HTML Full Course - Build a Website Tutorial', 'YouTube', 'https://www.youtube.com/watch?v=pQN-pnXPaVg'),
  ((SELECT id FROM SKILLS WHERE skill = 'HTML/CSS'), 'CSS Crash Course For Absolute Beginners', 'YouTube', 'https://www.youtube.com/watch?v=yfoY53QXEnI'),
  ((SELECT id FROM SKILLS WHERE skill = 'UI/UX design'), 'Interaction Design Fundamentals | Path', 'PluralSight', 'https://www.pluralsight.com/courses/interaction-design-fundamentals'),
  ((SELECT id FROM SKILLS WHERE skill = 'UI/UX design'), 'Introduction to UI and UX Design', 'Codecademy', 'https://www.codecademy.com/learn/intro-to-ui-ux'),
  ((SELECT id FROM SKILLS WHERE skill = 'UI/UX design'), 'UI / UX Design Tutorial – Wireframe, Mockup & Design in Figma', 'YouTube', 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU'),
  ((SELECT id FROM SKILLS WHERE skill = 'Java'), 'Java Course on Codecademy', 'Codecademy', 'https://www.codecademy.com/learn/learn-java'),
  ((SELECT id FROM SKILLS WHERE skill = 'Java'), 'Java Tutorial For Beginners', 'YouTube', 'https://www.youtube.com/watch?v=eIrMbAQSU34'),
  ((SELECT id FROM SKILLS WHERE skill = 'Java'), 'Learn Java 8 | Full Tutorial for Beginners', 'YouTube', 'https://www.youtube.com/watch?v=grEKMHGYyns'),
  ((SELECT id FROM SKILLS WHERE skill = 'UI/UX design'), 'UX Strategy Fundamentals', 'PluralSight', 'https://www.pluralsight.com/courses/ux-strategy-fundamentals'),
  ((SELECT id FROM SKILLS WHERE skill = 'Java'), 'Java Full Course', 'YouTube', 'https://www.youtube.com/watch?v=Qgl81fPcLc8'),
  ((SELECT id FROM SKILLS WHERE skill = 'Databases'), 'SQL Tutorial - Full Database Course For Beginners', 'YouTube', 'https://www.youtube.com/watch?v=HXV3zeQKqGY'),
  ((SELECT id FROM SKILLS WHERE skill = 'Databases'), 'SQL Course on Codecademy', 'Codecademy', 'https://www.codecademy.com/learn/learn-sql'),
  ((SELECT id FROM SKILLS WHERE skill = 'Python'), 'Python Course on Codecademy', 'Codecademy', 'https://www.codecademy.com/learn/learn-python'),
  ((SELECT id FROM SKILLS WHERE skill = 'Python'), 'Python Tutorial | Python Full Course for Beginners', 'YouTube', 'https://www.youtube.com/watch?v=_uQrJ0TkZlc'),
  ((SELECT id FROM SKILLS WHERE skill = 'C++'), 'C++ Course on Codecademy', 'Codecademy', 'https://www.codecademy.com/learn/learn-c-plus-plus'),
  ((SELECT id FROM SKILLS WHERE skill = 'C++'), 'C++ Tutorial for Beginners', 'YouTube', 'https://www.youtube.com/watch?v=vLnPwxZdW4Y'),
  ((SELECT id FROM SKILLS WHERE skill = 'AWS'), 'AWS Certified Solutions Architect - Associate 2020', 'YouTube', 'https://www.youtube.com/watch?v=Ia-UEYYR44s'),
  ((SELECT id FROM SKILLS WHERE skill = 'AWS'), 'AWS Certified Cloud Practitioner Training 2020', 'YouTube', 'https://www.youtube.com/watch?v=3hLmDS179YE'),
  ((SELECT id FROM SKILLS WHERE skill = 'Git'), 'Git & GitHub Crash Course For Beginners', 'YouTube', 'https://www.youtube.com/watch?v=SWYqp7iY_Tc'),
  ((SELECT id FROM SKILLS WHERE skill = 'Git'), 'Git Tutorial for Beginners: Command-Line Fundamentals', 'YouTube', 'https://www.youtube.com/watch?v=HVsySz-h9r4'),
  ((SELECT id FROM SKILLS WHERE skill = 'Swift'), 'Swift Programming Tutorial for Beginners', 'YouTube', 'https://www.youtube.com/watch?v=comQ1-x2a1Q'),
  ((SELECT id FROM SKILLS WHERE skill = 'Node.js'), 'Node.js Crash Course', 'YouTube', 'https://www.youtube.com/watch?v=fBNz5xF-Kx4'),
  ((SELECT id FROM SKILLS WHERE skill = 'R'), 'R Programming Tutorial - Learn the Basics of Statistical Computing', 'YouTube', 'https://www.youtube.com/watch?v=_V8eKsto3Ug'),
  ((SELECT id FROM SKILLS WHERE skill = 'Machine Learning'), 'Machine Learning Course on Codecademy', 'Codecademy', 'https://www.codecademy.com/learn/machine-learning'),
  ((SELECT id FROM SKILLS WHERE skill = 'Machine Learning'), 'Machine Learning Tutorial - Full Course for Beginners', 'YouTube', 'https://www.youtube.com/watch?v=pHiMN_gy9mk'),
  ((SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), 'Learning the Truth About Agile Versus Waterfall', 'PluralSight', 'https://www.pluralsight.com/courses/learning-agile-versus-waterfall'),
  ((SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), 'Agile Explained', 'PluralSight', 'https://www.pluralsight.com/courses/agile-explained'),
  ((SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), 'Project Management Basics for Non-project Managers', 'PluralSight', 'https://pluralsight.com/courses/project-management-basics'),
  ((SELECT id FROM SKILLS WHERE skill = 'Agile Methodology'), 'What is Agile?', 'YouTube', 'https://www.youtube.com/watch?v=Z9QbYZh1YXY'),
  ((SELECT id FROM SKILLS WHERE skill = 'Security Testing'), 'DevSecOps: Automated Security Testing Fundamentals', 'PluralSight', 'https://www.pluralsight.com/courses/devsecops-automated-security-testing-fundamentals'),
  ((SELECT id FROM SKILLS WHERE skill = 'Security Testing'), 'Fundamentals of Cybersecurity', 'Codecademy', 'https://www.codecademy.com/learn/paths/fundamentals-of-cybersecurity'),
  ((SELECT id FROM SKILLS WHERE skill = 'Automated Testing'), 'Test Automation', 'PluralSight', 'https://www.pluralsight.com/paths/test-automation'),
  ((SELECT id FROM SKILLS WHERE skill = 'Angular'), 'Angular', 'PluralSight', 'https://www.pluralsight.com/paths/angular-development'),
  ((SELECT id FROM SKILLS WHERE skill = 'Android'), 'Android  Development for Beginners | Full Course', 'YouTube', 'https://www.youtube.com/watch?v=fis26HvvDII'),
  ((SELECT id FROM SKILLS WHERE skill = 'Azure'), 'Microsoft DP-900 : Azure Data Fundamentals', 'PluralSight', 'https://www.pluralsight.com/paths/microsoft-dp-900-azure-data-fundamentals'); 
  
