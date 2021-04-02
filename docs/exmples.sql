CREATE DATABASE tic_tac_toe;

CREATE TABLE users (
  id int primary key,
);

SELECT * FROM users WHERE id = 1;
SELECT id, email FROM users WHERE id = 1;

SELECT 
  u.id AS user_id,
  u.email,
  ug.token,
  g.completed_at
FROM
  users u,
  games g,
  user_games ug,
WHERE 
  u.id = 1
  AND
  ug.user_id = u.id 
  AND 
  ug.game_id = g.id;

SELECT 
  u.id AS user_id,
  u.email,
  ug.token,
  g.completed_at
FROM
  users u
INNER JOIN
  user_games ug
  ON u.id = ug.user_id
INNER JOIN
  games g
  ON ug.game_id = g.id
WHERE 
  u.id = 1

SELECT 
  u.id AS user_id,
  u.email,
  ug.token,
  g.completed_at
FROM
  users u
LEFT JOIN
  user_games ug
  ON u.id = ug.user_id
LEFT JOIN
  games g
  ON ug.game_id = g.id
WHERE 
  u.id = 1
{ user_id: 1, email: "aaron@aaroncraig.com", token: null, completed_at: null}


{ user_id: 1, email: "aaron@aaroncraig.com", token: "x", completed_at: null}