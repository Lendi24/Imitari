#!/bin/sh
tmux new-session -d 'tsc'
tmux new-session -d 'npx tailwindcss-cli -i ./src/css/style.css -o ./public/css/style.css --watch'

tmux -2 attach-session -d