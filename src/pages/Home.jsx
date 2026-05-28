import { features } from "../data/features";
import "./style.css";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className="title">Welcome to Drewry Lab</h1>
        {features.map((feature) => {
          return (
            <button
              className="feature-button"
              onClick={(e) => {
                e.preventDefault();
                window.open(feature.url, "_blank");
              }}
            >
              {feature.name}
            </button>
          );
        })}
      </div>
    </>
  );
}
