BG='''<defs><radialGradient id="bg" cx="45%" cy="45%" r="75%"><stop offset="0" stop-color="#1b2540"/><stop offset=".6" stop-color="#111827"/><stop offset="1" stop-color="#070b14"/></radialGradient>
<filter id="chalk"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .05 0"/></filter></defs>
<rect width="1600" height="1200" fill="url(#bg)"/><rect width="1600" height="1200" filter="url(#grain)"/>'''
def svg(body): return f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">{BG}<g filter="url(#chalk)" fill="none" stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>'
