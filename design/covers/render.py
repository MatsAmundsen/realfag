from playwright.sync_api import sync_playwright
import pathlib
with sync_playwright() as p:
  b=p.chromium.launch(channel="chrome"); pg=b.new_page(viewport={"width":1600,"height":1200})
  for k in ("kap6","kap7"):
    pg.goto("file://"+str(pathlib.Path(k+".svg").resolve())); pg.screenshot(path=f"../../public/images/{k}.jpg",type="jpeg",quality=82)
  b.close()
