import { useState } from "react";

export default function HarvestLossCalculator() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [rowSpacing, setRowSpacing] = useState("");
  const [weight30, setWeight30] = useState("");
  const [weight38, setWeight38] = useState("");

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
    padding: "10px 12px",
    marginTop: "8px",
    marginBottom: "16px",
    fontSize: "14px",
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    border: "2px solid #2d5a3d",
    borderRadius: "6px",
    backgroundColor: "#1a2620",
    color: "#6dd5a8",
    transition: "all 0.3s ease",
  };

  const rowDivStyle = {
    backgroundColor: "#1a2620",
    border: "1px solid #2d5a3d",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    maxWidth: "400px",
    width: "100%",
  };

  const headerStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#6dd5a8",
    marginBottom: "12px",
  };

  const paragraphStyle = {
    color: "#c1d4c8",
    marginTop: "8px",
    marginBottom: "8px",
    lineHeight: "1.5",
  };

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
    setRowSpacing("");
    setWeight30("");
    setWeight38("");
  };

  const handleRowSpacingChange = (e) => {
    setRowSpacing(e.target.value);
    setWeight30("");
    setWeight38("");
  };

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

      {selectedCrop && (
        <>
          <label htmlFor="row-spacing" style={labelStyle}>
            Choose row spacing
          </label>
          <select
            name="rowSpacing"
            id="row-spacing"
            style={selectStyle}
            value={rowSpacing}
            onChange={handleRowSpacingChange}
          >
            <option value="">Select row spacing</option>
            <option value="30">30</option>
            <option value="38">38</option>
          </select>
        </>
      )}

      {rowSpacing && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={rowDivStyle}>
            <div style={headerStyle}>Row Width: 30</div>
            <label
              htmlFor="weight-30"
              style={{ ...labelStyle, fontSize: "14px", marginBottom: "8px" }}
            >
              Enter weight (lbs)
            </label>
            <input
              type="text"
              id="weight-30"
              style={inputStyle}
              placeholder="Enter weight"
              value={weight30}
              onChange={(e) => setWeight30(e.target.value)}
            />
            {weight30 && (
              <>
                <p style={paragraphStyle}>
                  Weight entered for row width 30: {weight30} lbs
                </p>
                <p style={paragraphStyle}>
                  This value will be used for harvest loss calculation.
                </p>
              </>
            )}
          </div>

          <div style={rowDivStyle}>
            <div style={headerStyle}>Row Width: 38</div>
            <label
              htmlFor="weight-38"
              style={{ ...labelStyle, fontSize: "14px", marginBottom: "8px" }}
            >
              Enter weight (lbs)
            </label>
            <input
              type="text"
              id="weight-38"
              style={inputStyle}
              placeholder="Enter weight"
              value={weight38}
              onChange={(e) => setWeight38(e.target.value)}
            />
            {weight38 && (
              <>
                <p style={paragraphStyle}>
                  Weight entered for row width 38: {weight38} lbs
                </p>
                <p style={paragraphStyle}>
                  This value will be used for harvest loss calculation.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
