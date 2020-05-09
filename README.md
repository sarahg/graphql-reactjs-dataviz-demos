# SQL/GraphQL/React Data Visualizations Demo

Data visualizations created from queries on the [Sakila DVD Rental](https://www.postgresqltutorial.com/postgresql-sample-database/) demo database.

I submitted this for the "Investigating a Relational Database" project for the "Programming for Data Science" [Udacity course](https://www.udacity.com/course/programming-for-data-science-nanodegree--nd104).

## Run the demo, or roll your own

Requirements: Docker, Postgres

1. [Load the PostgreSQL Sample Database](https://www.postgresqltutorial.com/load-postgresql-sample-database/)

2. Clone this repository, and modify `docker-run.sh` to include your Postgres connection string. [More info](https://hasura.io/docs/1.0/graphql/manual/deployment/docker/index.html#step-2-configure-the-docker-run-sh-script)

3. Start Hasura GraphQL Engine:
    `./docker-run.sh`
    Open Hasura at http://localhost:8080/console

4. Create views in Hasura for queries to visualize. In this demo, I used the queries in `sql/views`. [More info, see "Setting up the database"](https://www.smashingmagazine.com/2019/03/realtime-charts-graphql-postgres/)

5.  Start the React front-end:
    `cd react-frontend && npm start`

View the React app (containing charts generated with ChartJS) in your browser at http://localhost:3000.