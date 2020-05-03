/**
 * Find the name of the staff member in each store 
 * with the largest amount of sales.
 */

CREATE VIEW s2_staff_most_sales AS (
    WITH t1 AS (
        SELECT CONCAT(s.first_name, ' ', s.last_name) AS name, s.store_id, SUM(p.amount) total_amt
        FROM staff s
        JOIN payment p
        ON p.staff_id = s.staff_id
        GROUP BY 1, 2
        ORDER BY 3 DESC
    ),
    t2 AS (
        SELECT store_id, MAX(total_amt) total_amt
        FROM t1
        GROUP BY 1
    )
    SELECT t1.name, t1.store_id, t1.total_amt
    FROM t1
    JOIN t2
    ON t1.store_id = t2.store_id AND t1.total_amt = t2.total_amt;
)