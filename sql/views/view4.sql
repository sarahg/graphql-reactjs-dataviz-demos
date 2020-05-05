CREATE VIEW s4_average_spending_top10_customers AS (
   WITH t1 AS (
      SELECT c.customer_id, CONCAT(c.first_name, ' ', c.last_name) AS name, SUM(p.amount) tot_spent
      FROM customer c
      JOIN payment p
      ON p.customer_id = c.customer_id
      GROUP BY c.customer_id, name
      ORDER BY 3 DESC
      LIMIT 10)

   SELECT ROUND(AVG(tot_spent), 2)
   FROM t1
);