-- Create SKILLS table
CREATE TABLE IF NOT EXISTS SKILLS (
    id BIGSERIAL PRIMARY KEY,
    skill VARCHAR(255) UNIQUE NOT NULL
);

-- Create PEOPLE table
CREATE TABLE IF NOT EXISTS PEOPLE (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    open_to_rotate_teams BOOLEAN NOT NULL,
    email VARCHAR(255) NOT NULL,
    supervisor_id BIGINT,
    FOREIGN KEY (supervisor_id) REFERENCES PEOPLE(id)
);


-- Create PERSON_SKILLS table
CREATE TABLE IF NOT EXISTS PERSON_SKILLS (
    person_id BIGINT,
    skill_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES PEOPLE(id),
    FOREIGN KEY (skill_id) REFERENCES SKILLS(id),
    PRIMARY KEY (person_id, skill_id)
);


-- Create PERSON_SKILL_INTERESTS table
CREATE TABLE IF NOT EXISTS PERSON_SKILL_INTERESTS (
    person_id BIGINT,
    skill_id BIGINT,
    FOREIGN KEY (person_id) REFERENCES PEOPLE(id),
    FOREIGN KEY (skill_id) REFERENCES SKILLS(id),
    PRIMARY KEY (person_id, skill_id)
);


-- Create TEAMS table
CREATE TABLE IF NOT EXISTS TEAMS (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    team_lead_person_id INT,
    FOREIGN KEY (team_lead_person_id) REFERENCES PEOPLE(id)
);

-- Create TEAM_SKILLS table
CREATE TABLE IF NOT EXISTS TEAM_SKILLS (
    team_id BIGINT,
    skill_id BIGINT,
    needed_for_team BOOLEAN NOT NULL,
    FOREIGN KEY (team_id) REFERENCES TEAMS(id),
    FOREIGN KEY (skill_id) REFERENCES SKILLS(id),
    PRIMARY KEY (team_id, skill_id)
);



-- Create PERSON_TEAM_CURRENT_ASSIGNMENT table
CREATE TABLE IF NOT EXISTS PERSON_TEAM_CURRENT_ASSIGNMENT (
    person_id BIGINT,
    team_id BIGINT,
    start_date DATE,
    FOREIGN KEY (person_id) REFERENCES PEOPLE(id),
    FOREIGN KEY (team_id) REFERENCES TEAMS(id),
    PRIMARY KEY (person_id, team_id)
);


-- Create PERSON_TEAM_PAST_ASSIGNMENT table
CREATE TABLE IF NOT EXISTS PERSON_TEAM_PAST_ASSIGNMENT (
    person_id BIGINT,
    team_id BIGINT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (person_id) REFERENCES PEOPLE(id),
    FOREIGN KEY (team_id) REFERENCES TEAMS(id),
    PRIMARY KEY (person_id, team_id, start_date)
);


-- Create GRADES table
CREATE TABLE IF NOT EXISTS GRADES (
    grade CHAR(1) PRIMARY KEY
);

-- Insert data into GRADES table
INSERT INTO GRADES (grade)
VALUES ('E'), ('D'), ('C'), ('B')
ON CONFLICT DO NOTHING;


-- Create TEAM_AVAILABILITY table
CREATE TABLE IF NOT EXISTS TEAM_AVAILABILITY (
    team_id BIGINT,
    grade CHAR(1),
    quantity INT,
    FOREIGN KEY (team_id) REFERENCES TEAMS(id),
    FOREIGN KEY (grade) REFERENCES GRADES(grade),
    PRIMARY KEY (team_id, grade)
);


-- Create LEARNING table
CREATE TABLE IF NOT EXISTS LEARNING (
    id BIGSERIAL PRIMARY KEY,
    skill_id BIGINT,
    resource_name VARCHAR(255),
    resource_type VARCHAR(50),
    resource_link TEXT,
    FOREIGN KEY (skill_id) REFERENCES SKILLS(id)
);

