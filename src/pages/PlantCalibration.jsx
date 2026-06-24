import { useState } from "react";

const styles = {
  card: {
    maxWidth: "420px",
    width: "100%",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    border: "1px solid #E8DCD3",
    boxShadow: "0 2px 8px rgba(123, 45, 38, 0.06)",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#3A1F1B",
    margin: "0 0 18px 0",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    color: "#3A1F1B",
    backgroundColor: "#FBF6F1",
    border: "1px solid #E8DCD3",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  },
  inputFocus: {
    borderColor: "#7B2D26",
    boxShadow: "0 0 0 3px rgba(123, 45, 38, 0.1)",
  },
  divider: {
    height: "1px",
    backgroundColor: "#E8DCD3",
    margin: "0 0 18px 0",
  },
  resultRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "16px",
    backgroundColor: "#FBF6F1",
    borderRadius: "8px",
    border: "1px solid #E8DCD3",
  },
  resultValue: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#7B2D26",
    margin: 0,
    lineHeight: 1.2,
  },
};

const plantCalibrationStyles = {
  body: {
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};

const seedCountStyles = {
  card: {
    maxWidth: "420px",
    width: "100%",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    border: "1px solid #E8DCD3",
    boxShadow: "0 2px 8px rgba(123, 45, 38, 0.06)",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#3A1F1B",
    margin: "0 0 18px 0",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "8px",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#7B2D26",
    letterSpacing: "0.01em",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    color: "#3A1F1B",
    backgroundColor: "#FBF6F1",
    border: "1px solid #E8DCD3",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  },
  inputFocus: {
    borderColor: "#7B2D26",
    boxShadow: "0 0 0 3px rgba(123, 45, 38, 0.1)",
  },
  orDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "14px 0",
    fontSize: "12px",
    fontWeight: 700,
    color: "#7B2D26",
    letterSpacing: "0.08em",
  },
  orLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#E8DCD3",
  },
  orText: {
    padding: "0 10px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#E8DCD3",
    margin: "18px 0",
  },
  resultRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "16px",
    backgroundColor: "#FBF6F1",
    borderRadius: "8px",
    border: "1px solid #E8DCD3",
  },
  resultValue: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#7B2D26",
    margin: 0,
    lineHeight: 1.2,
  },
};

export default function PlantCalibration() {
  const [plantsPerAcre, setPlantsPerAcre] = useState();
  const [germs, setGerms] = useState();
  const [focusedField, setFocusedField] = useState(null);

  const [seedPerLb, setSeedPerLb] = useState();
  const [grams, setGrams] = useState();
  const [oz, setOz] = useState();
  const [seedFocusedField, setSeedFocusedField] = useState(null);

  function targetPopulation() {
    const result =
      germs && germs !== 0 ? Number(plantsPerAcre) / Number(germs) : "";
    return (
      <div style={styles.card}>
        <h3 style={styles.heading}>Target Population</h3>
        <div style={styles.fieldGroup}>
          <input
            type="text"
            value={plantsPerAcre}
            id="plantsPerAcre"
            placeholder="Enter the desired plants per acre"
            onFocus={() => setFocusedField("plantsPerAcre")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => {
              e.preventDefault();
              setPlantsPerAcre(e.target.value);
            }}
            style={{
              ...styles.input,
              ...(focusedField === "plantsPerAcre" ? styles.inputFocus : {}),
            }}
          />
          <input
            type="text"
            id="germs"
            placeholder="Germ"
            value={germs}
            onFocus={() => setFocusedField("germs")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => {
              e.preventDefault();
              setGerms(e.target.value);
            }}
            style={{
              ...styles.input,
              ...(focusedField === "germs" ? styles.inputFocus : {}),
            }}
          />
        </div>
        <div style={styles.divider} />
        <div style={styles.resultRow}>
          <h4 style={styles.resultValue}>Target Population: {result}</h4>
        </div>
      </div>
    );
  }

  function seedCount() {
    const result =
      grams && grams !== ""
        ? (Number(seedPerLb) * Number(grams)) / 453.47239
        : oz && oz !== ""
          ? (Number(seedPerLb) * Number(oz)) / 16
          : "";

    return (
      <div style={seedCountStyles.card}>
        <h3 style={seedCountStyles.heading}>Seed Count</h3>

        <div style={seedCountStyles.fieldGroup}>
          <div style={seedCountStyles.fieldWrapper}>
            <label style={seedCountStyles.label} htmlFor="seedPerLb">
              Seed/lb
            </label>
            <input
              type="text"
              id="seedPerLb"
              placeholder="Enter seed per pound"
              value={seedPerLb}
              onFocus={() => setSeedFocusedField("seedPerLb")}
              onBlur={() => setSeedFocusedField(null)}
              onChange={(e) => {
                e.preventDefault();
                setSeedPerLb(e.target.value);
              }}
              style={{
                ...seedCountStyles.input,
                ...(seedFocusedField === "seedPerLb"
                  ? seedCountStyles.inputFocus
                  : {}),
              }}
            />
          </div>

          <div style={seedCountStyles.fieldWrapper}>
            <label style={seedCountStyles.label} htmlFor="grams">
              Collected weight in grams
            </label>
            <input
              type="text"
              id="grams"
              placeholder="Enter weight in grams"
              value={grams}
              onFocus={() => setSeedFocusedField("grams")}
              onBlur={() => setSeedFocusedField(null)}
              onChange={(e) => {
                e.preventDefault();
                setGrams(e.target.value);
              }}
              style={{
                ...seedCountStyles.input,
                ...(seedFocusedField === "grams"
                  ? seedCountStyles.inputFocus
                  : {}),
              }}
            />
          </div>
        </div>

        <div style={seedCountStyles.orDivider}>
          <span style={seedCountStyles.orLine}></span>
          <span style={seedCountStyles.orText}>OR</span>
          <span style={seedCountStyles.orLine}></span>
        </div>

        <div style={seedCountStyles.fieldGroup}>
          <div style={seedCountStyles.fieldWrapper}>
            <label style={seedCountStyles.label} htmlFor="oz">
              Collected weight in oz
            </label>
            <input
              type="text"
              id="oz"
              placeholder="Enter weight in oz"
              value={oz}
              onFocus={() => setSeedFocusedField("oz")}
              onBlur={() => setSeedFocusedField(null)}
              onChange={(e) => {
                e.preventDefault();
                setOz(e.target.value);
              }}
              style={{
                ...seedCountStyles.input,
                ...(seedFocusedField === "oz"
                  ? seedCountStyles.inputFocus
                  : {}),
              }}
            />
          </div>
        </div>

        <div style={seedCountStyles.divider} />

        <div style={seedCountStyles.resultRow}>
          <h4 style={seedCountStyles.resultValue}>Seed count: {result}</h4>
        </div>
      </div>
    );
  }

  return (
    <div id="plantCalibration" style={plantCalibrationStyles.body}>
      {targetPopulation()}
      {seedCount()}
    </div>
  );
}
