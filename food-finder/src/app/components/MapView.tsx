export function MapView() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#C94B2C]">
      <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#C94B2C" />
        {/* City blocks */}
        <rect x="0" y="0" width="70" height="40" fill="#B8431F" />
        <rect x="85" y="0" width="55" height="30" fill="#B8431F" />
        <rect x="155" y="0" width="80" height="35" fill="#B8431F" />
        <rect x="250" y="0" width="60" height="25" fill="#B8431F" />
        <rect x="325" y="0" width="75" height="40" fill="#B8431F" />
        <rect x="0" y="55" width="50" height="50" fill="#B8431F" />
        <rect x="330" y="55" width="70" height="45" fill="#B8431F" />
        <rect x="0" y="165" width="55" height="55" fill="#B8431F" />
        <rect x="70" y="175" width="85" height="45" fill="#B8431F" />
        <rect x="230" y="170" width="65" height="50" fill="#B8431F" />
        <rect x="315" y="160" width="85" height="60" fill="#B8431F" />
        {/* Main streets - horizontal */}
        <path d="M 0 45 L 400 45" stroke="#E8D5B8" strokeWidth="5" />
        <path d="M 0 110 L 400 110" stroke="#E8D5B8" strokeWidth="4" />
        <path d="M 0 160 L 400 160" stroke="#E8D5B8" strokeWidth="5" />
        {/* Main streets - vertical */}
        <path d="M 75 0 L 75 220" stroke="#E8D5B8" strokeWidth="4" />
        <path d="M 155 0 L 155 220" stroke="#E8D5B8" strokeWidth="3" />
        <path d="M 240 0 L 240 220" stroke="#E8D5B8" strokeWidth="3" />
        <path d="M 320 0 L 320 220" stroke="#E8D5B8" strokeWidth="4" />
        {/* River / water body */}
        <path
          d="M -20 75 Q 60 55 120 80 Q 180 105 240 90 Q 300 75 360 100 Q 390 112 420 95"
          stroke="#E8D5B8"
          strokeWidth="28"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M -20 75 Q 60 55 120 80 Q 180 105 240 90 Q 300 75 360 100 Q 390 112 420 95"
          stroke="#F5EDDC"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Diagonal avenues */}
        <path d="M 75 160 L 240 45" stroke="#E8D5B8" strokeWidth="2.5" opacity="0.6" />
        <path d="M 155 160 L 320 45" stroke="#E8D5B8" strokeWidth="2" opacity="0.4" />
        {/* Location pin — Sul & Brasa */}
        <g transform="translate(200, 122)">
          <rect x="-38" y="-14" width="76" height="26" rx="13" fill="#1C1C1E" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Sul &amp; Brasa</text>
        </g>
        <circle cx="200" cy="137" r="3.5" fill="white" />
        <line x1="200" y1="137" x2="200" y2="143" stroke="white" strokeWidth="1.5" />
        {/* District label */}
        <text x="295" y="213" fill="#E8D5B8" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" letterSpacing="2.5" opacity="0.8">SANTO AMARO</text>
        {/* Compass tick */}
        <g transform="translate(28, 195)" opacity="0.6">
          <text x="0" y="0" fill="#E8D5B8" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif">N</text>
          <line x1="4" y1="2" x2="4" y2="-8" stroke="#E8D5B8" strokeWidth="1" />
          <polygon points="4,-8 2,-2 6,-2" fill="#E8D5B8" />
        </g>
      </svg>
    </div>
  );
}
