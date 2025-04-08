USE Family;
GO
--תרגיל 1: יצירת טבלת קרובים
CREATE TABLE Relatives (
    Id INT IDENTITY PRIMARY KEY,
    PersonId INT,
    RelativeId INT,
    ConnectionType NVARCHAR(20)
);
INSERT INTO Relatives (PersonId, RelativeId, ConnectionType)
SELECT PersonId, FatherId, 'אב'
FROM People
WHERE FatherId IS NOT NULL
UNION ALL
SELECT PersonId, MotherId, 'אם'
FROM People
WHERE MotherId IS NOT NULL
UNION ALL
SELECT PersonId, SpouseId,
       CASE Gender WHEN 'זכר' THEN 'בת זוג' ELSE 'בן זוג' END
FROM People
WHERE SpouseId IS NOT NULL
UNION ALL
SELECT FatherId, PersonId,
       CASE Gender WHEN 'זכר' THEN 'בן' ELSE 'בת' END
FROM People
WHERE FatherId IS NOT NULL
UNION ALL
SELECT MotherId, PersonId,
       CASE Gender WHEN 'זכר' THEN 'בן' ELSE 'בת' END
FROM People
WHERE MotherId IS NOT NULL
UNION ALL
SELECT p1.PersonId, p2.PersonId,
       CASE p2.Gender WHEN 'זכר' THEN 'אח' ELSE 'אחות' END
FROM People p1 JOIN People p2 
ON p1.PersonId <> p2.PersonId AND (
        (p1.FatherId IS NOT NULL AND p1.FatherId = p2.FatherId) OR
        (p1.MotherId IS NOT NULL AND p1.MotherId = p2.MotherId)
    );

--  תרגיל 2: השלמת בן/בת זוג 
UPDATE p2
SET SpouseId = p1.PersonId
FROM People p1
JOIN People p2 ON p1.SpouseId = p2.PersonId
WHERE p2.SpouseId IS NULL;

INSERT INTO Relatives (PersonId, RelativeId, ConnectionType)
SELECT p.SpouseId, p.PersonId,
       CASE p.Gender WHEN 'זכר' THEN 'בן זוג' ELSE 'בת זוג' END
FROM People p
WHERE p.SpouseId IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM Relatives r
    WHERE r.PersonId = p.SpouseId AND r.RelativeId = p.PersonId
          AND r.ConnectionType IN ('בן זוג', 'בת זוג')
);
