import { useState } from "react";
import "./style.css";

export default function HarvestLossCalculator() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [spacing, setSpacing] = useState("");
  const [value, setValue] = useState({
    bu: "0",
    bua: "0",
  });

  const labelStyle = {
    display: "block",
    marginBottom: "16px",
    fontSize: "20px",
    fontWeight: "500",
    color: "#c1d4c8",
    textAlign: "left",
  };

  const selectStyle = {
    width: "100%",
    maxWidth: "400px",
    padding: "12px 16px",
    marginBottom: "24px",
    fontSize: "16px",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    border: "2px solid #2d5a3d",
    borderRadius: "8px",
    backgroundColor: "#1a2620",
    color: "#6dd5a8",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(45, 90, 61, 0.2)",
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "400px",
    padding: "12px 16px",
    marginBottom: "24px",
    fontSize: "16px",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    border: "2px solid #2d5a3d",
    borderRadius: "8px",
    backgroundColor: "#1a2620",
    color: "#6dd5a8",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(45, 90, 61, 0.2)",
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#6dd5a8",
    boxShadow:
      "0 0 0 3px rgba(109, 213, 168, 0.1), 0 4px 12px rgba(109, 213, 168, 0.2)",
    outline: "none",
  };

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  function renderResults(weight, unit, multiplicationFactor, divisionFactor) {
    if (!weight || !unit) {
      setValue({
        bu: "Enter both weight and unit",
        bua: "Enter valid values",
      });
      return;
    } else {
      let bu;
      let bua;
      weight = Number(weight);
      if (unit === "grams") {
        bu = (weight * 0.00220462) / divisionFactor;
        bua = (bu * multiplicationFactor).toString();
        console.log(bua);
        setValue({
          bu: bu.toString(),
          bua: bua,
        });
        return;
      } else if (unit === "ounces") {
        bu = (weight * 0.0625) / divisionFactor;
        bua = (bu * multiplicationFactor).toString();
        console.log(bua);

        setValue({
          bu: bu.toString(),
          bua,
        });
        return;
      }
    }
  }

  return (
    <div className="container">
      <h1 className="title">Harvest Loss Calculator</h1>
      <label htmlFor="options-harvest-loss-crop" style={labelStyle}>
        Choose your crop
      </label>
      <select
        name="cropName"
        id="options-harvest-loss-crop"
        style={selectStyle}
        value={selectedCrop}
        onChange={handleCropChange}
      >
        <option value="">Select your Crop</option>
        <option value="corn">Corn</option>
        <option value="soybeans">Soybeans</option>
        <option value="wheat">Wheat</option>
        <option value="rice">Rice</option>
      </select>

      {selectedCrop === "corn" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <select
            name=""
            id="row-spacing"
            style={selectStyle}
            onChange={(e) => setSpacing(e.target.value)}
          >
            <option value=""> Select Row Spacing</option>
            <option value="30">30</option>
            <option value="38">38</option>
          </select>
          {spacing == "30" && (
            <div className="sub-container">
              <div className="container-one">
                <h3>1 Row Width (30"x48")</h3>
                <input
                  type="text"
                  style={inputStyle}
                  id="weight"
                  placeholder="Enter weight"
                  onFocus={(e) => {
                    Object.assign(e.target.style, inputFocusStyle);
                  }}
                  onBlur={(e) => {
                    Object.assign(e.target.style, inputStyle);
                  }}
                />
                <select name="" id="weight-unit" style={selectStyle}>
                  <option value="">Choose Unit For Weight</option>
                  <option value="grams">grams</option>
                  <option value="ounces">ounces</option>
                </select>
                <p>BU: {value.bu}</p>
                <p>BU/A: {value.bua}</p>
                <button
                  className="feature-button"
                  onClick={(e) => {
                    e.preventDefault();
                    let weight = document.getElementById("weight").value;
                    let unit = document.getElementById("weight-unit").value;
                    if (Number.isNaN(Number(weight))) {
                      renderResults("", unit, 4356, 56);
                    } else {
                      renderResults(weight, unit, 4356, 56);
                    }
                  }}
                >
                  Calculate
                </button>
              </div>
              <div className="container-two">
                <h3>2 Row Width (60x48"")</h3>
              </div>
            </div>
          )}

          {spacing == "38" && <div>38 he bhai </div>}
        </div>
      )}

      {selectedCrop === "soybeans" && (
        <div>
          <select
            name=""
            id="row-spacing"
            style={selectStyle}
            onChange={(e) => setSpacing(e.target.value)}
          >
            <option value=""> Select Row Spacing</option>
            <option value="30">30</option>
            <option value="38">38</option>
          </select>
          {spacing == "30" && <div>30 he bhai</div>}
          {spacing == "38" && <div>38 he bhai</div>}
        </div>
      )}
      {selectedCrop === "wheat" && <div>HTML for Wheat goes here</div>}
      {selectedCrop === "rice" && <div>HTML for Rice goes here</div>}
    </div>
  );
}
