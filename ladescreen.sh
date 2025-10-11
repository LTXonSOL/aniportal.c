#!/bin/bash

# -----------------------------
# AniPortal.live Loading Screen
# -----------------------------

# Terminal größe ermitteln
rows=$(tput lines)
cols=$(tput cols)

# Logo URL oder ASCII ersetzen
# Da Shell keine Bilder direkt anzeigen kann, wir nutzen ASCII-Logo-Platzhalter
logo="
   ___      _        _____       _ _ _ 
  / _ \__ _| |_ ___ |  _  | __ _| | | |
 / /_\/ _\` | __/ _ \| | | |/ _\` | | | |
/ /_\\ (_| | ||  __/| |_| | (_| | | | |
\____/\__,_|\__\___|\_____/ \__,_|_|_|_|
"

# Logo zentrieren
logo_lines=$(echo "$logo" | wc -l)
logo_padding=$(( (rows / 2) - (logo_lines / 2) ))

clear

# Leere Zeilen vor Logo ausgeben
for ((i=0;i<logo_padding;i++)); do
    echo ""
done

# Logo ausgeben
echo "$logo"

# Ladebalken
echo ""
progress_bar_length=30
for i in $(seq 1 $progress_bar_length); do
    printf "\rLoading: ["
    for ((j=1;j<=progress_bar_length;j++)); do
        if [ $j -le $i ]; then
            printf "="
        else
            printf " "
        fi
    done
    printf "] %d%%" $((i*100/progress_bar_length))
    sleep 0.13  # 30 Schritte x 0.13s ≈ 4 Sekunden
done

echo ""
echo "Ready! Enjoy your anime on AniPortal.live!"
sleep 1
clear
