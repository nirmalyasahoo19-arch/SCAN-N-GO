export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 40"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4c4c4c" />
          <stop offset="100%" stopColor="#a6ce39" />
        </linearGradient>
      </defs>

      {/* Shopping Cart */}
      <g fill="#4c4c4c" transform="translate(0, 0)">
        <path d="M10.8,6.8H4.6c-0.3,0-0.6,0.2-0.7,0.5l-0.2,0.8H1.5c-0.4,0-0.8,0.4-0.8,0.8v1.6c0,0.4,0.4,0.8,0.8,0.8h1l1.6,12.8
        c0.1,0.5,0.5,0.9,1,0.9h12.8c0.5,0,0.9-0.4,1-0.9l2.4-14.5H10.8z M19.4,11.5l-2.1,12.1H6.5L5.1,11.5H19.4z"/>
        <path d="m5.2 26.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4zm11.2 0c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4z"/>
        <path d="M23.1,8.1l-1-4.8C22,3,21.7,2.8,21.3,2.8H5.9C5.4,2.8,5,3.2,5,3.6c0,0.4,0.4,0.8,0.8,0.8h14.8l0.8,3.9L23.1,8.1z"/>
      </g>
      
      {/* Money Bill */}
      <g fill="#4c4c4c" transform="translate(14, 8) scale(0.8)">
        <path d="M28,3H4C3.4,3,3,3.4,3,4v16c0,0.6,0.4,1,1,1h24c0.6,0,1-0.4,1-1V4C29,3.4,28.6,3,28,3z M27,19H5V5h22V19z"/>
        <path d="M16,15.5c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5S20.5,8.5,20.5,11S18.5,15.5,16,15.5z M16,8.5c-1.4,0-2.5,1.1-2.5,2.5
        s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S17.4,8.5,16,8.5z"/>
        <path d="M12.4,9.4c0-0.4-0.3-0.8-0.8-0.8c-0.4,0-0.8,0.3-0.8,0.8v4.3c0,0.4,0.3,0.8,0.8,0.8c0.4,0,0.8-0.3,0.8-0.8V9.4z"/>
        <path d="M20.4,9.4c0-0.4-0.3-0.8-0.8-0.8c-0.4,0-0.8,0.3-0.8,0.8v4.3c0,0.4,0.3,0.8,0.8,0.8c0.4,0,0.8-0.3,0.8-0.8V9.4z"/>
      </g>
      
      {/* Scan Line */}
      <path d="M2,18 L38,6" stroke="url(#line-gradient)" strokeWidth="1.2" strokeLinecap="round"/>

      {/* Barcode */}
      <g fill="#4c4c4c" transform="translate(35, 23) scale(0.25)">
        <path d="M0,0H2V20H0z M4,0H6V20H4z M8,0H10V20H8z M12,0H16V20H12z M18,0H20V20H18z M22,0H24V20H22z M26,0H28V20H26z" />
      </g>

      {/* Text */}
      <g transform="translate(48, 28)" fontFamily="Montserrat, sans-serif" fontSize="14" fontWeight="600" letterSpacing="-0.5">
        <text fill="#4c4c4c">
          SCAN-N-
          <tspan fill="#a6ce39" fontWeight="700">GO</tspan>
        </text>
      </g>

      {/* Checkmark */}
      <g fill="#a6ce39" transform="translate(132, 21) scale(0.5)">
        <path d="M13.7,2.3C13.3,1.9,12.7,1.9,12.3,2.3L5,9.6L2.7,7.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3
        s0.5-0.1,0.7-0.3l8-8C14.1,3.3,14.1,2.7,13.7,2.3z"/>
      </g>
    </svg>
  );
}
