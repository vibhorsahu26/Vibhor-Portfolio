export default function ProjectArt({ index, color, className = '', src, alt, artId = `art-${index}` }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

  if (src) {
    return <img className={`project-art ${className}`} src={src} alt={alt ?? `Project ${index + 1} screenshot`} />;
  }

  const drawings = [
    <g key="business-map" {...common}>
      <path d="M24 140 74 96 126 111 177 58 226 80 296 36" opacity=".35" />
      <path d="M24 140 74 96 126 111 177 58 226 80 296 36" strokeWidth="2.5" />
      <path d="M36 40 92 69 138 31 192 51 252 27" opacity=".25" />
      {[ [24,140],[74,96],[126,111],[177,58],[226,80],[296,36],[92,69],[138,31],[192,51] ].map(([x,y], i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 6 : 4} fill="#0a0810" stroke="currentColor" />)}
      <rect x="207" y="113" width="80" height="36" rx="7" fill="#0a0810" stroke="currentColor" opacity=".8" />
      <path d="M222 124h43M222 134h27" />
    </g>,
    <g key="open-source" {...common}>
      <path d="M46 44 120 87 190 42 274 82M120 87 106 142 202 145 274 82M46 44 58 126" opacity=".35" />
      <path d="M46 44 120 87 190 42 274 82" strokeWidth="2.5" />
      {[ [46,44],[120,87],[190,42],[274,82],[106,142],[202,145],[58,126] ].map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i<4?7:5} fill="#0a0810" stroke={i%2?'#DCC5FF':'currentColor'} />)}
      <rect x="217" y="119" width="82" height="34" rx="6" fill="#0a0810" stroke="currentColor" />
      <text x="229" y="141" fill="currentColor" stroke="none" fontSize="12" fontFamily="monospace">&gt;_ open</text>
    </g>,
    <g key="weather" {...common}>
      <ellipse cx="160" cy="90" rx="105" ry="54" opacity=".45" />
      <ellipse cx="162" cy="88" rx="70" ry="34" opacity=".65" />
      <ellipse cx="165" cy="88" rx="32" ry="16" />
      <path d="M44 35h232M35 70h250M35 109h250M66 10v160M116 10v160M166 10v160M216 10v160M266 10v160" opacity=".17" />
      <path d="M74 44 133 30 151 69 101 83ZM197 107 261 99 273 139 215 151Z" stroke="#B78AFF" opacity=".65" />
      {[ [165,88,4],[139,105,3],[205,71,3],[116,59,3],[240,126,3] ].map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r} fill="currentColor" stroke="none" />)}
    </g>,
    <g key="civic-tech" {...common}>
      <path d="M50 140 110 90 160 90 215 55 270 70M160 90 200 135 260 130" opacity=".55" />
      {[[34,124],[96,72],[200,38],[256,52],[186,118],[246,112]].map(([x,y],i)=><g key={i}><rect x={x} y={y} width="28" height="34" rx="4" fill="#0a0810" stroke="currentColor" /><path d={`M${x+8} ${y+11}h12M${x+8} ${y+18}h12`} /></g>)}
      <circle cx="160" cy="90" r="19" /><circle cx="160" cy="90" r="7" fill="currentColor" />
    </g>,
  ];

  return (
    <svg
      className={`project-art ${className}`}
      viewBox="0 0 320 180"
      role="img"
      aria-label={`Abstract artwork for project ${index + 1}`}
      style={{ color }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`artGlow-${artId}`} cx="50%" cy="50%" r="70%">
          <stop offset="0" stopColor={color} stopOpacity=".14" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#artGlow-${artId})`} />
      <g>{drawings[index]}</g>
    </svg>
  );
}
