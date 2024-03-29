import SideBar from "@/components/SideBar";
import WelcomeScreen from "./WelcomeScreen";
import NewUsers from "@/components/NewUsers";
import ChatUsers from "@/components/ChatUsers";
import { Routes, Route } from "react-router-dom";
export function MainPage() {
  return (
    <div className="grid md:h-screen lg:h-screen w-screen pl-[53px]">
      <SideBar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-20 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Chat me</h1>
        </header>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/new-users" element={<NewUsers />} />
          <Route path="/chat-users" element={<ChatUsers />} />
        </Routes>
      </div>
    </div>
  );
}
