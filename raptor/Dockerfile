FROM postgres:13

ENV POSTGRES_DB=raptor
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=raptor_password

COPY init.psql /docker-entrypoint-initdb.d/

EXPOSE 5432

