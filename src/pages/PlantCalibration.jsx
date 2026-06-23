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

export default function PlantCalibration() {
  const [plantsPerAcre, setPlantsPerAcre] = useState();
  const [germs, setGerms] = useState();
  const [focusedField, setFocusedField] = useState(null);

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

  return <>{targetPopulation()}</>;
}
