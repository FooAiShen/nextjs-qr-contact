// import React from "react";
// import ReactDOM from "react-dom/client";
// import "styles/global.css";
// import App from "./App";
// // import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
"use client";
import React from "react";
import Profile from "./screens/Profile";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App!</h1>
      <Profile />
      {/* Add your content here */}
    </div>
  );
};

export default HomePage;
