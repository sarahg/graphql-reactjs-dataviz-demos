/**
 * Which category of film costs most to replace?
 */

CREATE VIEW s3_fc_replacement_cost AS (
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
    ORDER BY 1 DESC
);