
// Internal Components

import { Header } from "@/components/Header";
import { SignupPageComponent } from "./components/signup-page";



function Signup() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
      <SignupPageComponent />
    </div>
    </>
  );
}

export default Signup;
