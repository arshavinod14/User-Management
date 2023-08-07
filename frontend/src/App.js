import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/userRouter";
import { Suspense, lazy } from "react";
const AdminRouter = lazy(() => import("./routes/adminRouter"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route
          path="/admin/*"
          element={
            <Suspense>
              <AdminRouter />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
