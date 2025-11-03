#!/usr/bin/env python3
import sqlite3
import os
import sys

db_path = "/Volumes/M2_Vault/Archives_2025/ethraeon/_PROJECTS/Trinity_Live/art_catalog/catalog.sqlite"
output_dir = "content/artworks"

os.makedirs(output_dir, exist_ok=True)

con = sqlite3.connect(db_path)
con.row_factory = sqlite3.Row
cur = con.cursor()

artworks = cur.execute("SELECT * FROM artworks ORDER BY ref").fetchall()

for artwork in artworks:
    ref = artwork['ref'] or f"item_{artwork['id']}"
    filename = f"{output_dir}/{ref}.md"
    
    with open(filename, 'w') as f:
        f.write(f"---\n")
        f.write(f"ref: {ref}\n")
        f.write(f"title: {artwork['title'] or ''}\n")
        f.write(f"artist: {artwork['artist'] or ''}\n")
        f.write(f"year: {artwork['year'] or ''}\n")
        f.write(f"medium: {artwork['medium'] or ''}\n")
        f.write(f"dimensions: {artwork['dimensions'] or ''}\n")
        f.write(f"est_value: {artwork['est_value'] or ''}\n")
        f.write(f"photo: {artwork['photo'] or ''}\n")
        f.write(f"priority: {artwork['priority'] or 0}\n")
        f.write(f"---\n\n")
        f.write(f"## Location / Provenance\n\n")
        f.write(f"{artwork['location'] or ''}\n\n")
        f.write(f"## Notes\n\n")
        f.write(f"{artwork['notes'] or ''}\n")

con.close()
print(f"Exported {len(artworks)} artworks to {output_dir}/")
