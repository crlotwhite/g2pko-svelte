FROM oven/bun:latest

RUN apt update -y && apt install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]
