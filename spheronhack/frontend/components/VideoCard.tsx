// components/VideoCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  title: string;
  imageUrl: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, imageUrl, description }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-t-md"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
