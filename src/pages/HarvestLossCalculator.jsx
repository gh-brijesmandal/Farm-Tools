import { useState, useEffect } from "react";

/* ── responsive hook ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 600);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 600);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

/* ── shared style factories ── */
function makeSelect(mobile) {
  return {
    width: "100%",
    padding: mobile ? "14px 12px" : "12px 16px",
    marginBottom: mobile ? "16px" : "24px",
    fontSize: mobile ? "15px" : "16px",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    border: "2px solid #5D1725",
    borderRadius: "8px",
    backgroundColor: "#2A0A10",
    color: "#F0E4E7",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(93,23,37,0.2)",
  };
}

function makeInput(mobile) {
  return {
    width: "100%",
    padding: mobile ? "14px 12px" : "12px 16px",
    fontSize: mobile ? "15px" : "16px",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    border: "2px solid #5D1725",
    borderRadius: "8px",
    backgroundColor: "#2A0A10",
    color: "#F0E4E7",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(93,23,37,0.2)",
  };
}

function makeButton(mobile, fullWidth = false) {
  return {
    width: fullWidth ? "100%" : "auto",
    padding: mobile ? "14px 16px" : "12px 20px",
    background: "linear-gradient(135deg, #5D1725, #7A1F30)",
    color: "#F0E4E7",
    border: "1px solid #F0E4E7",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: mobile ? "15px" : "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  };
}

/* ── calculation helper ── */
const GRID_CONFIGS = {
  "38x38": { label: '38"×38" Grid', multFactor: 4343.933518 },
  "76x38": { label: '76"×38" Grid', multFactor: 2171.966759 },
  "30x48": { label: '30"×48" Grid', multFactor: 4356 },
  "60x48": { label: '60"×48" Grid', multFactor: 2178 },
};

function calcBU(weight, unit, divisionFactor) {
  const w = Number(weight);
  if (!weight || isNaN(w) || !unit) return null;
  if (unit === "grams") return (w * 0.00220462) / divisionFactor;
  if (unit === "ounces") return (w * 0.0625) / divisionFactor;
  return null;
}

/* ── GridRow (wheat / rice) ── */
function GridRow({ gridKey, divisionFactor }) {
  const mobile = useIsMobile();
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [result, setResult] = useState(null);
  const { label, multFactor } = GRID_CONFIGS[gridKey];

  const handleCalc = () => {
    const bu = calcBU(weight, unit, divisionFactor);
    setResult(
      bu === null
        ? { bu: "Enter valid values", bua: "—" }
        : { bu: bu.toFixed(4), bua: (bu * multFactor).toFixed(2) },
    );
  };

  return (
    <div
      style={{
        background: "#2A0A10",
        border: "1px solid #5D1725",
        borderRadius: "10px",
        padding: mobile ? "14px" : "18px 20px",
        marginBottom: "14px",
      }}
    >
      <h3
        style={{
          color: "#F0E4E7",
          margin: "0 0 12px",
          fontSize: mobile ? "15px" : "16px",
          fontWeight: "600",
        }}
      >
        {label}
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          gap: mobile ? "10px" : "10px",
          alignItems: mobile ? "stretch" : "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="number"
          placeholder="Enter weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ ...makeInput(mobile), flex: mobile ? "unset" : "0 0 160px" }}
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{
            ...makeSelect(mobile),
            marginBottom: 0,
            flex: mobile ? "unset" : "0 0 140px",
          }}
        >
          <option value="">Unit</option>
          <option value="grams">grams</option>
          <option value="ounces">ounces</option>
        </select>
        <button onClick={handleCalc} style={makeButton(mobile, mobile)}>
          Calculate
        </button>

        {result && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              color: "#D4B8BC",
              fontSize: mobile ? "15px" : "14px",
              padding: mobile ? "10px 0 0" : "0",
            }}
          >
            <span>
              <strong style={{ color: "#F0E4E7" }}>BU:</strong> {result.bu}
            </span>
            <span>
              <strong style={{ color: "#F0E4E7" }}>BU/A:</strong> {result.bua}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── WheatRice section ── */
function WheatRiceSection({ divisionFactor }) {
  return (
    <div style={{ width: "100%" }}>
      {["38x38", "76x38", "30x48", "60x48"].map((k) => (
        <GridRow key={k} gridKey={k} divisionFactor={divisionFactor} />
      ))}
    </div>
  );
}

/* ── InlineCalc (corn / soy cards) ── */
function InlineCalc({ label, mult, divisionFactor }) {
  const mobile = useIsMobile();
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    const bu = calcBU(weight, unit, divisionFactor);
    setResult(
      bu === null
        ? { bu: "Invalid", bua: "—" }
        : { bu: bu.toFixed(4), bua: (bu * mult).toFixed(2) },
    );
  };

  return (
    <div
      style={{
        flex: "1 1 240px",
        minWidth: mobile ? "100%" : "240px",
        background: "#2A0A10",
        border: "1px solid #5D1725",
        borderRadius: "10px",
        padding: mobile ? "14px" : "16px",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          color: "#F0E4E7",
          margin: "0 0 12px",
          fontSize: mobile ? "15px" : "15px",
        }}
      >
        {label}
      </h3>
      <input
        type="number"
        placeholder="Enter weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={{ ...makeInput(mobile), marginBottom: "10px" }}
      />
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        style={{ ...makeSelect(mobile), marginBottom: "10px" }}
      >
        <option value="">Choose Unit</option>
        <option value="grams">grams</option>
        <option value="ounces">ounces</option>
      </select>
      {result && (
        <div
          style={{ color: "#D4B8BC", fontSize: "14px", marginBottom: "10px" }}
        >
          <p style={{ margin: "4px 0" }}>
            <strong style={{ color: "#F0E4E7" }}>BU:</strong> {result.bu}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong style={{ color: "#F0E4E7" }}>BU/A:</strong> {result.bua}
          </p>
        </div>
      )}
      <button onClick={handleCalc} style={makeButton(mobile, true)}>
        Calculate
      </button>
    </div>
  );
}

/* ── CornSoy section ── */
function CornSoySection({ crop }) {
  const mobile = useIsMobile();
  const [spacing, setSpacing] = useState("");
  const divisionFactor = crop === "corn" ? 56 : 60;

  const spacingOptions =
    crop === "soybeans"
      ? [
          { value: "30", label: '30"' },
          { value: "38", label: '38"' },
          { value: "drilled", label: "Drilled" },
        ]
      : [
          { value: "30", label: '30"' },
          { value: "38", label: '38"' },
        ];

  const grids30 = [
    { key: "30x48", label: '1 Row Width (30"×48")', mult: 4356 },
    { key: "60x48", label: '2 Row Width (60"×48")', mult: 2178 },
  ];
  const grids38 = [
    { key: "38x38", label: '1 Row Width (38"×38")', mult: 4343.933518 },
    { key: "76x38", label: '2 Row Width (76"×38")', mult: 2171.966759 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "16px",
          fontWeight: "500",
          color: "#D4B8BC",
        }}
      >
        Select Row Spacing
      </label>
      <select
        style={makeSelect(mobile)}
        value={spacing}
        onChange={(e) => setSpacing(e.target.value)}
      >
        <option value="">Select Row Spacing</option>
        {spacingOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {(spacing === "30" || spacing === "38") && (
        <div
          style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            gap: "16px",
            width: "100%",
            border: "2px solid #5D1725",
            borderRadius: "12px",
            padding: mobile ? "14px" : "20px",
            boxSizing: "border-box",
          }}
        >
          {(spacing === "30" ? grids30 : grids38).map(
            ({ key, label, mult }) => (
              <InlineCalc
                key={key}
                label={label}
                mult={mult}
                divisionFactor={divisionFactor}
              />
            ),
          )}
        </div>
      )}

      {spacing === "drilled" && (
        <div
          style={{
            padding: "20px",
            border: "1px solid #5D1725",
            borderRadius: "10px",
            color: "#D4B8BC",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          Any of the areas can be used for drilled beans.
        </div>
      )}
    </div>
  );
}

/* ── Root ── */
export default function HarvestLossCalculator() {
  const mobile = useIsMobile();
  const [selectedCrop, setSelectedCrop] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #1A0508 0%, #220A0F 50%, #150306 100%)",
        padding: mobile ? "16px 12px" : "40px 20px",
        fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "rgba(42, 10, 16, 0.85)",
          borderRadius: mobile ? "12px" : "16px",
          border: "1px solid #5D1725",
          padding: mobile ? "20px 16px" : "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#F0E4E7",
            fontSize: mobile ? "22px" : "28px",
            fontWeight: "700",
            marginBottom: mobile ? "24px" : "32px",
            letterSpacing: "0.5px",
          }}
        >
          🌾 Harvest Loss Calculator
        </h1>

        <label
          htmlFor="crop-select"
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: mobile ? "16px" : "20px",
            fontWeight: "500",
            color: "#D4B8BC",
          }}
        >
          Choose your crop
        </label>
        <select
          id="crop-select"
          style={makeSelect(mobile)}
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          <option value="">Select your Crop</option>
          <option value="corn">Corn</option>
          <option value="soybeans">Soybeans</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
        </select>

        {(selectedCrop === "corn" || selectedCrop === "soybeans") && (
          <CornSoySection crop={selectedCrop} />
        )}

        {selectedCrop === "wheat" && (
          <div>
            <p
              style={{
                color: "#D4B8BC",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              Wheat — bushel weight: 60 lbs. Select a grid size below.
            </p>
            <WheatRiceSection divisionFactor={60} />
          </div>
        )}

        {selectedCrop === "rice" && (
          <div>
            <p
              style={{
                color: "#D4B8BC",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              Rice — bushel weight: 45 lbs. Select a grid size below.
            </p>
            <WheatRiceSection divisionFactor={45} />
          </div>
        )}
      </div>
    </div>
  );
}
