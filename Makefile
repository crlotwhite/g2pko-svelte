ifeq ($(OS),Windows_NT)
	is_windows := true
	pwd := "%cd%"
else
	is_windows := false
	pwd := $(PWD)
endif


all:
	echo "please specify a target"
build:
	docker build -t noelvalent/g2pko .
tag:
	docker tag noelvalent/g2pko noelvalent/g2pko:latest
dev:
	docker run -it --rm \
	-v $(pwd):/app \
	-w /app \
	-p 5173:5173 \
	--name g2pko \
	noelvalent/g2pko:latest bash
install:
	bun install
run:
	bun run dev --host
enter:
	docker exec -it g2pko /bin/bash
