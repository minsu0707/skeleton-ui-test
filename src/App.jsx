import { useState } from "react";
import "./index.css";
import SkeletonCard from "./components/SkeletonCard";
import SkeletonListItem from "./components/SkeletonListItem";
import SkeletonImageCard from "./components/SkeletonImageCard";
import Card from "./components/Card";
import ListItem from "./components/ListItem";
import ImageCard from "./components/ImageCard";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleToggle = () => {
    if (isLoaded) {
      setIsLoaded(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLoaded(true);
      }, 2000);
    }
  };

  return (
    <div className="container">
      <h1>Skeleton UI 데모</h1>

      <button className="btn" onClick={handleToggle} disabled={isLoading}>
        {isLoading
          ? "로딩 중..."
          : isLoaded
          ? "스켈레톤으로 되돌리기"
          : "데이터 로드 시뮬레이션"}
      </button>

      {!isLoaded ? (
        <div id="content">
          <SkeletonCard />
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonImageCard />
        </div>
      ) : (
        <div id="loadedContent" className="fade-in">
          <Card
            avatar="👤"
            title="사용자 프로필"
            content="이것은 로드된 실제 콘텐츠입니다."
            small="Skeleton UI가 실제 데이터로 대체되었습니다."
          />
          <ListItem
            avatar="A"
            name="앨리스"
            content="안녕하세요! 이것은 첫 번째 리스트 항목입니다."
          />
          <ListItem
            avatar="B"
            name="밥"
            content="두 번째 리스트 항목의 실제 데이터입니다."
          />
          <ImageCard
            image="🖼️"
            title="이미지 카드"
            content="이미지가 로드되었습니다."
          />
        </div>
      )}
    </div>
  );
}

export default App;
