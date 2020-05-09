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