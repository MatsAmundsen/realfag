import math,random
from common import svg
random.seed(6)
C="#e5e7eb"; P="#f472b6"
# kap6: scatter + exponential regression curve
ax=f'<path d="M260 960 H1340 M300 1000 V220" stroke="{C}" stroke-opacity=".75" stroke-width="5"/><path d="M1320 945 l25 15 -25 15 M285 240 l15 -25 15 25" stroke="{C}" stroke-opacity=".75" stroke-width="5"/>'
f=lambda x: 920-55*math.exp((x-300)/330)
curve="M"+" L".join(f"{x:.0f} {f(x):.0f}" for x in range(320,1235,10))
pts="".join(f'<circle cx="{x}" cy="{f(x)+random.uniform(-45,45):.0f}" r="11" fill="{C}" fill-opacity=".85" stroke="none"/>' for x in range(380,1230,85))
lin=f'<path d="M330 880 L1290 420" stroke="{C}" stroke-opacity=".35" stroke-width="4" stroke-dasharray="18 16"/>'
k6=ax+lin+f'<path d="{curve}" stroke="{P}" stroke-width="8"/>'+pts
open("kap6.svg","w").write(svg(k6))
# kap7: unit circle + right triangle
O="#fb923c"; cx,cy,r=760,640,380; v=math.radians(38)
px,py=cx+r*math.cos(v),cy-r*math.sin(v)
k7=(f'<path d="M300 {cy} H1300 M{cx} 1120 V140" stroke="{C}" stroke-opacity=".6" stroke-width="5"/>'
 f'<circle cx="{cx}" cy="{cy}" r="{r}" stroke="{C}" stroke-opacity=".8" stroke-width="6"/>'
 f'<path d="M{cx} {cy} L{px:.0f} {py:.0f} L{px:.0f} {cy} Z" stroke="{O}" stroke-width="8"/>'
 f'<path d="M{px-40:.0f} {cy} v-40 h40" stroke="{O}" stroke-width="5"/>'
 f'<path d="M{cx+110} {cy} A110 110 0 0 0 {cx+110*math.cos(v):.0f} {cy-110*math.sin(v):.0f}" stroke="{C}" stroke-width="5"/>'
 f'<circle cx="{px:.0f}" cy="{py:.0f}" r="14" fill="{O}" stroke="none"/>'
 f'<path d="M1180 1000 L1460 1000 L1460 780 Z" stroke="{C}" stroke-opacity=".45" stroke-width="5"/><path d="M1425 1000 v-35 h35" stroke="{C}" stroke-opacity=".45" stroke-width="4"/>')
open("kap7.svg","w").write(svg(k7))
