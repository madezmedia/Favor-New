import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  showTagline?: boolean;
  iconOnly?: boolean;
}

export function Logo({ className, showTagline = true, iconOnly = false, ...props }: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-auto", className)}
        {...props}
      >
        <g transform="translate(15, 15)">
          {/* Outer ring with subtle glow */}
          <circle
            cx="35"
            cy="35"
            r="32"
            className={cn(
              "stroke-2.5",
              isDark ? "stroke-white/80" : "stroke-black/80"
            )}
            fill="none"
            filter="url(#glow)"
          />
          
          {/* Middle ring */}
          <circle
            cx="35"
            cy="35"
            r="22"
            className="stroke-accent"
            fill="none"
            strokeWidth="2"
          />
          
          {/* Inner ring */}
          <circle
            cx="35"
            cy="35"
            r="12"
            className="stroke-primary"
            fill="none"
            strokeWidth="2"
          />
          
          {/* Center dot */}
          <circle
            cx="35"
            cy="35"
            r="4"
            className="fill-primary animate-pulse"
          />

          {/* Arrow */}
          <path
            d="M75 35 L58 27 L58 43 Z"
            className="fill-accent"
          />
          <line
            x1="10"
            y1="35"
            x2="58"
            y2="35"
            className="stroke-accent"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 120"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto", className)}
      {...props}
    >
      <g transform="translate(16, 20)">
        <g transform="scale(0.85)">
          {/* Outer ring with subtle glow */}
          <circle
            cx="40"
            cy="40"
            r="35"
            className={cn(
              "stroke-2.5",
              isDark ? "stroke-white/80" : "stroke-black/80"
            )}
            fill="none"
            filter="url(#glow)"
          />
          
          {/* Middle ring */}
          <circle
            cx="40"
            cy="40"
            r="25"
            className="stroke-accent"
            fill="none"
            strokeWidth="2"
          />
          
          {/* Inner ring */}
          <circle
            cx="40"
            cy="40"
            r="15"
            className="stroke-primary"
            fill="none"
            strokeWidth="2"
          />
          
          {/* Center dot */}
          <circle
            cx="40"
            cy="40"
            r="5"
            className="fill-primary animate-pulse"
          />

          {/* Arrow */}
          <path
            d="M85 40 L65 30 L65 50 Z"
            className="fill-accent"
          />
          <line
            x1="10"
            y1="40"
            x2="65"
            y2="40"
            className="stroke-accent"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </g>

      <g transform="translate(95, 55)">
        <text
          fontFamily="Arial Black, sans-serif"
          fontSize="42"
          fontWeight="bold"
          letterSpacing="1"
        >
          <tspan 
            x="2" 
            y="2" 
            className={isDark ? "fill-white/10" : "fill-black/10"}
          >
            FAVOR
          </tspan>
          <tspan x="0" y="0" className="fill-primary">
            FAVOR
          </tspan>
        </text>
      </g>

      {showTagline && (
        <g transform="translate(98, 75)">
          <text
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="600"
            letterSpacing="1.5"
            className={cn(
              isDark ? "fill-white/80" : "fill-black/80"
            )}
          >
            AI BETTING ANALYTICS
          </text>
        </g>
      )}

      <g 
        transform="translate(260, 40)" 
        className={cn(
          isDark ? "fill-accent/40" : "fill-accent/60"
        )}
      >
        <circle cx="0" cy="0" r="2" />
        <circle cx="8" cy="-4" r="1.5" />
        <circle cx="-4" cy="8" r="1.5" />
      </g>

      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}