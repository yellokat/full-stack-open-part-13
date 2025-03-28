FROM postgres:latest
ENV POSTGRES_PASSWORD=mysecretpassword
ENV PGDATA=/var/lib/postgresql/data/pgdata