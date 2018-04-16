------------------ RELEASE 3 ------------------------

-- SOAL 1
SELECT name, party, grade_current from politicians where party = 'R' and grade_current between 9 and 11;

-- SOAL 2
select
  count(*) as totalVote, politicians.name from votes
  join politicians on votes.politicianId = politicians.id
  where politicians.name = 'Olympia Snowe';

-- SOAL 3
select count(*) as totalVote, politicians.name
  from votes join politicians on votes.politicianId = politicians.id
  where politicians.name like '%Adam%' group by politicians.name;

-- SOAL 4
-- select
--     count(*) as totalVote,
--     politicians.name,
--     politicians.party,
--     politicians.location
--   from votes
--   join politicians on votes.politicianId = politicians.id group by politicians.name
--   order by totalVote desc limit 3;