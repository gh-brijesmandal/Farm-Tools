import { features } from "../data/features";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
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
                navigate(feature.url);
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
