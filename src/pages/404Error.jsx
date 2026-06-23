import { useEffect, useState } from "react";

export default function NotFoundPage({ onGoHome }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleHome = () => {
    if (onGoHome) {
      onGoHome();
    } else if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(2200%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nf-scanline, .nf-code { animation: none !important; }
        }
        .nf-home-btn:hover {
          background-color: #7B2D26 !important;
          color: #FBF6F1 !important;
          border-color: #7B2D26 !important;
        }
        .nf-home-btn:focus-visible {
          outline: 2px solid #7B2D26;
          outline-offset: 3px;
        }
      `}</style>

      <div className="nf-scanline" style={styles.scanline} />

      <div style={styles.container}>
        <div style={styles.eyebrow}>
          SYSTEM&nbsp;LOG&nbsp;//&nbsp;ROUTE_ERROR
        </div>

        <h1
          className="nf-code"
          style={{
            ...styles.code,
            ...(glitch ? styles.codeGlitch : {}),
          }}
        >
          404
        </h1>

        <p style={styles.heading}>Signal lost.</p>
        <p style={styles.body}>
          The page you requested doesn't exist, was moved, or was never
          broadcast on this frequency. Check the address, or head back to known
          territory.
        </p>

        <div style={styles.divider} />

        <div style={styles.row}>
          <span style={styles.label}>REQUESTED_PATH</span>
          <span style={styles.value}>
            {typeof window !== "undefined"
              ? window.location.pathname
              : "/unknown"}
          </span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>STATUS</span>
          <span style={{ ...styles.value, color: "#7B2D26" }}>NOT_FOUND</span>
        </div>

        <button
          className="nf-home-btn"
          style={styles.button}
          onClick={handleHome}
        >
          ← Back to home
        </button>
      </div>

      <div style={styles.footer}>NO CARRIER</div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#FBF6F1",
    color: "#3A1F1B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "24px",
    boxSizing: "border-box",
  },
  scanline: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #7B2D26, transparent)",
    animation: "scanline 6s linear infinite",
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    maxWidth: "480px",
    width: "100%",
    textAlign: "left",
    zIndex: 1,
  },
  eyebrow: {
    fontFamily: "'SF Mono', 'Roboto Mono', Consolas, monospace",
    fontSize: "11px",
    letterSpacing: "0.12em",
    color: "#A98F84",
    marginBottom: "20px",
  },
  code: {
    fontSize: "clamp(72px, 18vw, 128px)",
    fontWeight: 800,
    lineHeight: 1,
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
    color: "#3A1F1B",
    transition: "opacity 0.05s linear",
  },
  codeGlitch: {
    opacity: 0.4,
    textShadow: "2px 0 #7B2D26, -2px 0 #A98F84",
  },
  heading: {
    fontSize: "20px",
    fontWeight: 600,
    margin: "0 0 10px 0",
    color: "#3A1F1B",
  },
  body: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#8A6F65",
    margin: "0 0 28px 0",
    maxWidth: "420px",
  },
  divider: {
    height: "1px",
    width: "100%",
    backgroundColor: "#E8DCD3",
    margin: "0 0 20px 0",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'SF Mono', 'Roboto Mono', Consolas, monospace",
    fontSize: "12px",
    padding: "8px 0",
    borderBottom: "1px solid #E8DCD3",
  },
  label: {
    color: "#A98F84",
    letterSpacing: "0.06em",
  },
  value: {
    color: "#3A1F1B",
    maxWidth: "260px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  button: {
    marginTop: "32px",
    backgroundColor: "transparent",
    color: "#3A1F1B",
    border: "1px solid #7B2D26",
    borderRadius: "4px",
    padding: "12px 22px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition:
      "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
    fontFamily: "inherit",
  },
  footer: {
    position: "absolute",
    bottom: "24px",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: "'SF Mono', 'Roboto Mono', Consolas, monospace",
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: "#E8DCD3",
  },
};
