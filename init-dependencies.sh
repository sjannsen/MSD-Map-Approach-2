#!/bin/bash

# Array mit den Ordnernamen
directories=("Container" "Robot-Map-Container" "Map-Micro-Frontend" "Robot-Micro-Frontend")

# Funktion zum Installieren der Abhängigkeiten
install_dependencies() {
  # Schleife durch die Ordner und führe npm install aus
  for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
      echo "Entering directory: $dir"
      cd "$dir"
      npm install
      cd ..
    else
      echo "Directory $dir does not exist."
    fi
  done
}

# Hauptlogik
install_dependencies
