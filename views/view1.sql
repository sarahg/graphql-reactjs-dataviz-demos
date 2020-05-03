/*
 * For the customer that rented the most films overall,
 * how many films did they have for each film_category?
 */

CREATE VIEW s1_top_customers_films_by_category AS (
    SELECT c.customer_id, cat.name, COUNT(*)
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
    GROUP BY 1, 2
    ORDER BY 3 DESC
);