
// Internal Components

import { Header } from "@/components/Header";
import VideoCardList from "./components/VideoCardList";


function App2() {
  const videos = [
    {
      title: "Introduction to Blockchain",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "A beginner-friendly introduction to blockchain technology.",
    },
    {
      title: "Learn Move Programming",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "Get started with the Move language in Aptos.",
    },
    {
      title: "How to Build a DApp",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "Step-by-step guide on building decentralized applications.",
    },
    {
      title: "Introduction to Blockchain",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "A beginner-friendly introduction to blockchain technology.",
    },
    {
      title: "Learn Move Programming",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "Get started with the Move language in Aptos.",
    },
    {
      title: "How to Build a DApp",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "Step-by-step guide on building decentralized applications.",
    },
    {
      title: "Introduction to Blockchain",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "A beginner-friendly introduction to blockchain technology.",
    },
    {
      title: "Learn Move Programming",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "Get started with the Move language in Aptos.",
    },
    {
      title: "How to Build a DApp",
      imageUrl: "https://via.placeholder.com/400x200",
      description: "Step-by-step guide on building decentralized applications.",
    },
  ];
  return (
    <>
      <Header />
      <div className="min-h-screen">
      <VideoCardList heading="Featured Videos" videos={videos} />
    </div>
    </>
  );
}

export default App2;
