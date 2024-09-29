#!/bin/bash

# Array mit den Ordnernamen
directories=("Container" "Robot-Map-Container" "Map-Micro-Frontend" "Robot-Micro-Frontend")

# Datei zum Speichern der PIDs
pid_file="pids.txt"

# Funktion zum Starten der Prozesse
start_processes() {
  # Leere die PID-Datei
  > "$pid_file"

  # Schleife durch die Ordner und führe npm start aus
  for dir in "${directories[@]}"; do
	if [ -d "$dir" ]; then
	  echo "Entering directory: $dir"
	  cd "$dir"
	  npm start &
	  echo $! >> "../$pid_file"
	  cd ..
	else
	  echo "Directory $dir does not exist."
	fi
  done
}

# Funktion zum Beenden der Prozesse
stop_processes() {
  if [ -f "$pid_file" ]; then
	while IFS= read -r pid; do
	  echo "Killing process with PID: $pid"
	  kill "$pid"
	done < "$pid_file"
	rm "$pid_file"
  else
	echo "PID file does not exist."
  fi
}

# Hauptlogik
case "$1" in
  start)
	start_processes
	;;
  stop)
	stop_processes
	;;
  *)
	echo "Usage: $0 {start|stop}"
	;;
esac
