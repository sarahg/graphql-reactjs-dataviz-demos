/* Query 1 */
SELECT c.customer_id, CONCAT(c.first_name, ' ', c.last_name) AS cust_name, cat.name, COUNT(*)
FROM customer c
JOIN rental r
ON r.customer_id = c.customer_id AND c.customer_id = (SELECT customer_id
    FROM (SELECT c.customer_id, c.first_name, COUNT(r.rental_id) total_rentals
            FROM customer c
            JOIN rental r
            ON r.customer_id = c.customer_id
            GROUP BY 1, 2
            ORDER BY 3 DESC
            LIMIT 1) inner_table)
JOIN inventory i
ON i.inventory_id = r.inventory_id
JOIN film f
ON f.film_id = i.film_id
JOIN film_category fc
ON fc.film_id = f.film_id
JOIN category cat 
ON cat.category_id = fc.category_id
GROUP BY 1, 2, 3
ORDER BY 4 DESC;

/* Query 2 */
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

/* Query 3 */
WITH t1 AS (
    SELECT 
        f.film_id,
        f.replacement_cost,
        fc.category_id,
        NTILE(4) OVER (ORDER BY f.replacement_cost) AS quartile
    FROM film f
    JOIN film_category fc 
    ON fc.film_id = f.film_id
)
SELECT COUNT(*), c.name
FROM t1
JOIN category c
ON c.category_id = t1.category_id
WHERE quartile = 4
GROUP BY 2
ORDER BY 1 DESC;

/* Query 4 */
WITH t1 AS (
    SELECT f.rating, (r.return_date - r.rental_date) rental_length
    FROM rental r
    JOIN inventory i
    ON i.inventory_id = r.inventory_id
    JOIN film f
    ON f.film_id = i.inventory_id
)
SELECT rating, COUNT(rating) rental_count
FROM t1
WHERE DATE_PART('day', rental_length) >= 7
GROUP BY rating
ORDER BY rental_count DESC;